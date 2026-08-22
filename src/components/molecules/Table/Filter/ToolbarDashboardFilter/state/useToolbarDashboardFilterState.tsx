import { groupBy, isEqual } from 'lodash';
import { useState } from 'react';
import { ToolbarDashboardFilterProps } from '../ToolbarDashboardFilter';
import { type DateRangeValue, describeDateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';
import { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

const DEFAULT_DATE_RANGE: DateRangeValue = { preset: 'TODOS', range: null };
const DATE_CATEGORY = 'periodo'; // categoría sintética usada solo para mostrar/quitar el chip de fecha
const EMPLOYEE_CATEGORY = 'trabajador'; // categoría sintética usada solo para mostrar/quitar el chip de trabajador
const CUSTOMER_CATEGORY = 'cliente'; // categoría sintética usada solo para mostrar/quitar el chip de cliente

export interface IUseToolbarDashboardFilterState {
    chipsArea: {
        chipsData: { category: string, value: string }[],
        handleClearAll: () => void,
        handleRemoveChip: (category: string, value: string) => void
    },
    filterByModal: {
        modalOpen: boolean,
        activeFilters: { category: string, value: string }[],
        dateRange: DateRangeValue,
        selectedEmployeeId: string | null,
        selectedCustomerId: string | null,
        showFilterByModal: (value: boolean) => void,
        handleApplyFilters: (
            filters: { category: string, value: string }[],
            dateRange: DateRangeValue,
            employeeId: string | null,
            customerId: string | null
        ) => void
    };
}

export const useToolbarDashboardFilterState = (props: ToolbarDashboardFilterProps): IUseToolbarDashboardFilterState => {
    /**
     * useToolbarDashboardFilterState - states
     */
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState<{ category: string, value: string }[]>([]);
    const [dateRange, setDateRange] = useState<DateRangeValue>(DEFAULT_DATE_RANGE);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    /*
    *   filterByModal - funtions
    */
    const showFilterByModal = (value: boolean) => {
        setModalOpen(value);
    };

    const handleApplyFilters = (
        filters: { category: string, value: string }[],
        newDateRange: DateRangeValue,
        employeeId: string | null,
        customerId: string | null
    ) => {
        setActiveFilters(filters);
        setDateRange(newDateRange);
        setSelectedEmployeeId(employeeId);
        setSelectedCustomerId(customerId);

        // Groups items directly into a Map object
        const groupedByCategory: Record<string, { category: string, value: string }[]> = groupBy(
            filters, (filter: { category: string, value: string }) => filter.category
        );
        console.log("handleApplyFilters-groupedByCategory: ", groupedByCategory);
        console.log("handleApplyFilters-dateRange: ", newDateRange);
        console.log("handleApplyFilters-employeeId: ", employeeId);
        console.log("handleApplyFilters-customerId: ", customerId);

        // Resuelve el objeto completo del trabajador (con walletId/accountNumber)
        // a partir del id seleccionado, usando el catálogo que la vista padre proveyó
        const selectedEmployee: EmployeeWalletOption | null =
            props.employeeOptions?.find((o) => o.optionId === employeeId) ?? null;

        // Resuelve el objeto completo del cliente a partir del id seleccionado,
        // usando el catálogo que la vista padre proveyó
        const selectedCustomer: CustomerOption | null =
            props.customerOptions?.find((o) => o.optionId === customerId) ?? null;

        //BUILD DOCUMENT INDEX FILTER
        props.handleOnChangeFilters(groupedByCategory, newDateRange, selectedEmployee, selectedCustomer);

        setModalOpen(false);
    };

    /*
    *   chipsArea - funtions
    */
    // Label legible del trabajador seleccionado, para el chip sintético
    const selectedEmployeeLabel = props.employeeOptions?.find((o) => o.optionId === selectedEmployeeId)?.label;

    // Label legible del cliente seleccionado, para el chip sintético
    const selectedCustomerLabel = props.customerOptions?.find((o) => o.optionId === selectedCustomerId)?.label;

    // Chip sintético de fecha, solo visible cuando el preset no es "TODOS"
    // + chip sintético de trabajador, solo visible cuando hay uno seleccionado
    // + chip sintético de cliente, solo visible cuando hay uno seleccionado
    const chipsData: { category: string, value: string }[] = [
        ...activeFilters,
        ...(dateRange.preset !== 'TODOS' ? [{ category: DATE_CATEGORY, value: describeDateRangeValue(dateRange) }] : []),
        ...(selectedEmployeeLabel ? [{ category: EMPLOYEE_CATEGORY, value: selectedEmployeeLabel }] : []),
        ...(selectedCustomerLabel ? [{ category: CUSTOMER_CATEGORY, value: selectedCustomerLabel }] : []),
    ];

    const handleClearAll = () => {
        handleApplyFilters([], DEFAULT_DATE_RANGE, null, null);
    };

    const handleRemoveChip = (category: string, value: string) => {
        if (category === DATE_CATEGORY) {
            handleApplyFilters(activeFilters, DEFAULT_DATE_RANGE, selectedEmployeeId, selectedCustomerId);
            return;
        }
        if (category === EMPLOYEE_CATEGORY) {
            handleApplyFilters(activeFilters, dateRange, null, selectedCustomerId);
            return;
        }
        if (category === CUSTOMER_CATEGORY) {
            handleApplyFilters(activeFilters, dateRange, selectedEmployeeId, null);
            return;
        }
        handleApplyFilters(
            [...activeFilters.filter((item) => !(isEqual(item.category, category) && isEqual(item.value, value)))],
            dateRange,
            selectedEmployeeId,
            selectedCustomerId
        );
    };

    return {
        chipsArea: {
            chipsData,
            handleClearAll,
            handleRemoveChip
        },
        filterByModal: {
            modalOpen,
            activeFilters,
            dateRange,
            selectedEmployeeId,
            selectedCustomerId,
            showFilterByModal,
            handleApplyFilters
        }
    }
}