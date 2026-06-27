import { groupBy, isEqual } from 'lodash';
import { useState } from 'react';
import { ToolbarDashboardFilterProps } from '../ToolbarDashboardFilter';

export interface IUseToolbarDashboardFilterState {
    chipsArea: {
        handleClearAll: () => void,
        handleRemoveChip: (category: string, value: string) => void
    },
    filterByModal: {
        modalOpen: boolean,
        //activeFilters: { estatus: string[], registro: string[] },
        activeFilters: { category: string, value: string }[],
        showFilterByModal: (value: boolean) => void,
        handleApplyFilters: (filters: { category: string, value: string }[]) => void
    };
}

export const useToolbarDashboardFilterState = (props: ToolbarDashboardFilterProps): IUseToolbarDashboardFilterState => {
    /**
     * useToolbarDashboardFilterState - states
     */
    const [modalOpen, setModalOpen] = useState(false);
    //const [activeFilters, setActiveFilters] = useState<{ estatus: string[], registro: string[] }>({ estatus: [], registro: [] });
    const [activeFilters, setActiveFilters] = useState<{ category: string, value: string }[]>([]);

    /*
    *   filterByModal - funtions
    */
    const showFilterByModal = (value: boolean) => {
        setModalOpen(value);
        //setPage(0);}
    };
    /*const handleApplyFilters = (filters: { estatus: string[], registro: string[] }) => {
        setActiveFilters(filters);
        //setPage(0);
        setModalOpen(false);
    };*/
    const handleApplyFilters = (filters: { category: string, value: string }[]) => {
        setActiveFilters(filters);
        // Groups items directly into a Map object
        const groupedByCategory: Record<string, { category: string, value: string }[]> = groupBy(
            filters, (filter: { category: string, value: string }) => filter.category
        );
        console.log("handleApplyFilters-groupedByCategory: ", groupedByCategory);
        console.log("handleApplyFilters-filters: ", groupedByCategory);
        //BUILD DOCUMENT INDEX FILTER
        props.handleOnChangeFilters(groupedByCategory);

        //setPage(0);
        setModalOpen(false);
    };
    /*
    *   chipsArea - funtions
    */
    /*const handleClearAll = () => {
        setActiveFilters({ estatus: [], registro: [] });
        //setSearch("");
        //setPage(0);
    };
    const handleRemoveChip = (category: string, value: string) => {
        setActiveFilters((prev: { estatus: string[]; registro: string[]; }) => ({
            ...prev,
            [category]: prev[category as keyof typeof prev].filter((v) => v !== value),
        }));
        //setPage(0);
    };*/

    const handleClearAll = () => {
        //setActiveFilters([]);
        handleApplyFilters([]);
        //setSearch("");
        //setPage(0);
    };
    const handleRemoveChip = (category: string, value: string) => {
        /*setActiveFilters((prev) => [
            ...prev.filter((item) => !(isEqual(item.category, category) && isEqual(item.value, value)))
        ]);*/

        handleApplyFilters([
            ...activeFilters.filter((item) => !(isEqual(item.category, category) && isEqual(item.value, value))),
        ]);
        //setPage(0);
    };


    return {
        chipsArea: {
            handleClearAll,
            handleRemoveChip
        },
        filterByModal: {
            modalOpen,
            activeFilters,
            showFilterByModal,
            handleApplyFilters
        }
    }
}