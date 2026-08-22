import { useEffect, useState } from 'react';
import { FilterByModalProps } from '../FilterByModal';
import { defaultTo, isEqual } from 'lodash';
import { SnippetFolder } from '@mui/icons-material';
import { type DateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';

const DEFAULT_DATE_RANGE: DateRangeValue = { preset: 'TODOS', range: null };

export interface IUseFilterByModalState {
    draft: { category: string, value: string }[];
    draftDateRange: DateRangeValue;
    draftEmployeeId: string | null;
    draftCustomerId: string | null;
    totalActive: number;
    handleOnReset: () => void;
    toggle: (category: string, value: string) => void;
    cleanAllFilters: (category: string) => void;
    onDateRangeChange: (value: DateRangeValue) => void;
    onEmployeeChange: (employeeId: string | null) => void;
    onCustomerChange: (customerId: string | null) => void;
    onApply: () => void;
}

export const useFilterByModalState = (props: FilterByModalProps): IUseFilterByModalState => {
    const [draft, setDraft] = useState<{ category: string, value: string }[]>([]);
    const [draftDateRange, setDraftDateRange] = useState<DateRangeValue>(props.dateRange ?? DEFAULT_DATE_RANGE);
    const [draftEmployeeId, setDraftEmployeeId] = useState<string | null>(props.selectedEmployeeId ?? null);
    const [draftCustomerId, setDraftCustomerId] = useState<string | null>(props.selectedCustomerId ?? null);

    // totalActive cuenta también el rango de fecha si está activo (no es "TODOS")
    // y el trabajador seleccionado, si hay alguno
    // y el cliente seleccionado, si hay alguno
    const totalActive = draft.length + (draftDateRange.preset !== 'TODOS' ? 1 : 0) + (draftEmployeeId ? 1 : 0) + (draftCustomerId ? 1 : 0);

    //const handleReset = () => setDraft({ estatus: [], registro: [] });

    const handleOnReset = () => {
        setDraft([]);
        setDraftDateRange(DEFAULT_DATE_RANGE);
        setDraftEmployeeId(null);
        setDraftCustomerId(null);
        /*setDraftV2((prev) => ([
            ...prev.map((item) => (
                { category: item.category, values: [] }
            ))
        ]));*/
    };


    /*const toggle = (category: string, value: string) => {
        console.log("onToggle-category: ", category);
        console.log("onToggle-value: ", value);
        setDraft((prev) => {
            const arr = prev[category as keyof typeof prev];
            return {
                ...prev,
                [category]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            };
        });
    };*/

    const toggle = (category: string, value: string) => {
        console.log("-category: ", category);
        console.log("onToggleV2-value: ", value);
        setDraft((prev) => {
            const appliedFilter: boolean = prev.some((item) => isEqual(item.category, category) && isEqual(item.value, value));
            const filterApplied = prev.filter((item) => !(isEqual(item.category, category) && isEqual(item.value, value)));
            console.log("onToggleV2-appliedFilter", appliedFilter);
            console.log("onToggleV2-draftPrev: ", prev);
            console.log("onToggleV2-draftPrevWithFilter: ", filterApplied);
            return [
                ...appliedFilter ? prev.filter((item) =>
                    !(isEqual(item.category, category) && isEqual(item.value, value))) : [...prev, { category: category, value: value }]
                //{ category: category, value: value }
            ]
        });
        /*setDraftV2((prev) => {
            const itemValues = defaultTo(prev.find((item: { category: string; values: string[]; }) => isEqual(item.category, category)), { category: "", values: [] });
            return [
                ...prev.filter((item) => (!isEqual(item.category, category))),
                { category: category, values: itemValues.values.includes(value) ? itemValues.values : [...itemValues.values, value] }
            ]
        });*/
        /*setDraft((prev) => {
            const arr = prev[category as keyof typeof prev];
            return {
                ...prev,
                [category]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            };
        });*/
    };

    /*
    const cleanAllFilters = (category: string) => {
        setDraft((prev) => ({ ...prev, [category]: [] }));
    }*/
    const cleanAllFilters = (category: string) => {
        setDraft((prev) => [
            ...prev.filter((item) => (!isEqual(item.category, category)))
        ]);
        /*setDraftV2((prev) => ([
            ...prev.filter((item) => (!isEqual(item.category, category))),
            { category: category, values: [] }
        ]));*/
    }

    const onDateRangeChange = (value: DateRangeValue) => {
        setDraftDateRange(value);
    };

    const onEmployeeChange = (employeeId: string | null) => {
        setDraftEmployeeId(employeeId);
    };

    const onCustomerChange = (customerId: string | null) => {
        setDraftCustomerId(customerId);
    };

    const onApply = () => {
        //props.handleApplyFilters(draft);
        console.log("onApply-draft:", draft);
        console.log("onApply-draftDateRange:", draftDateRange);
        console.log("onApply-draftEmployeeId:", draftEmployeeId);
        console.log("onApply-draftCustomerId:", draftCustomerId);
        props.handleApplyFilters(draft, draftDateRange, draftEmployeeId, draftCustomerId);
    };

    /*useEffect(() => {
        console.log("useEffect_open: ", props.open);
        console.log("useEffect_currentFilters: ", props.currentFilters);
        if(props.open) setDraft({ ...props.currentFilters });
        //if (props.open) setDraft({ ...props.currentFilters });
    }, [open, props.currentFilters]);*/

    useEffect(() => {
        //console.log("useEffect_open: ", props.open);
        //console.log("useEffect_currentFilters: ", props.currentFilters);
        setDraft([...props.currentFilters]);
        setDraftDateRange(props.dateRange ?? DEFAULT_DATE_RANGE);
        setDraftEmployeeId(props.selectedEmployeeId ?? null);
        setDraftCustomerId(props.selectedCustomerId ?? null);
        //if (props.open) setDraft({ ...props.currentFilters });
    }, [props.currentFilters, props.dateRange, props.selectedEmployeeId, props.selectedCustomerId]);

    /*useEffect(() => {
        if (props.open) setDraft([...props.currentFiltersV2]);
    }, [open, props.currentFiltersV2]);*/

    return {
        draft,
        draftDateRange,
        draftEmployeeId,
        draftCustomerId,
        totalActive,
        handleOnReset,
        toggle,
        cleanAllFilters,
        onDateRangeChange,
        onEmployeeChange,
        onCustomerChange,
        onApply
    }
}