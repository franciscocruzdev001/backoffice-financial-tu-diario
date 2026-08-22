import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FilterByModalHeader } from '../FilterByModalHeader/FilterByModalHeader';
import { FilterByModalFooter } from '../FilterByModalFooter/FilterByModalFooter';
import { FilterByModalBody } from '../FilterByModalBody/FilterByModalBody';
import { useFilterByModalState } from './state/useFilterByModalState';
import { useFilterByModalStyle } from './FilterByModal.style';
import { Category } from '@/shared/constants/table_types_data';
import { type DateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';
import { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

export interface FilterByModalStateProps {
    open: boolean,
    //options: { category: string, value: string }[],
    options: Record<Category, string[]>,
    currentFilters: { category: string, value: string }[]
    dateRange?: DateRangeValue, // <- agregar esto
    // Opt-in: solo la vista que lo necesite (Transactions) provee este catálogo
    employeeOptions?: EmployeeWalletOption[],
    selectedEmployeeId?: string | null,
    // Opt-in: solo la vista que lo necesite (Credits) provee este catálogo
    customerOptions?: CustomerOption[],
    selectedCustomerId?: string | null,
}

export interface FilterByModalFunctionsProps {
    handleApplyFilters: (
        documentFilter: { category: string, value: string }[],
        dateRange: DateRangeValue,
        employeeId: string | null,
        customerId: string | null
    ) => void;
    onClose: (event?: object | any) => void;
}

export type FilterByModalProps = FilterByModalStateProps & FilterByModalFunctionsProps;

export const FilterByModal: React.FC<FilterByModalProps> = (props: FilterByModalProps) => {
    const classes = useFilterByModalStyle();
    const {
        draft,
        draftDateRange,
        draftEmployeeId,
        draftCustomerId,
        totalActive,
        handleOnReset,
        cleanAllFilters,
        toggle,
        onApply,
        onDateRangeChange,
        onEmployeeChange,
        onCustomerChange,
    } = useFilterByModalState(props);

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { ...classes.filterByModalContainer } }}
        >
            {/* Header */}
            <DialogTitle
                sx={{ ...classes.filterByModalHeaderContainer }}
            >
                <FilterByModalHeader
                    totalActive={totalActive}
                    onClose={props.onClose}
                />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <FilterByModalBody
                    totalActive={totalActive}
                    //options={props.options}
                    //currentFilters={draft}
                    onToggle={toggle}
                    onCleanAllFilters={cleanAllFilters}
                    options={props.options}
                    currentFilters={draft}
                    dateRange={draftDateRange}
                    onDateRangeChange={onDateRangeChange}
                    employeeOptions={props.employeeOptions}
                    selectedEmployeeId={draftEmployeeId}
                    onEmployeeChange={onEmployeeChange}
                    customerOptions={props.customerOptions}
                    selectedCustomerId={draftCustomerId}
                    onCustomerChange={onCustomerChange}
                />
            </DialogContent>

            <DialogActions sx={{ ...classes.filterByModalFooterContainer }}>
                <FilterByModalFooter
                    totalActive={totalActive}
                    onClose={props.onClose}
                    onApply={onApply}
                    handleReset={handleOnReset}
                />
            </DialogActions>
        </Dialog>
    )
}