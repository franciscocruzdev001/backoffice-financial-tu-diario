import { useEffect, useState } from 'react';
import { FilterByModalProps } from '../FilterByModal';
import { defaultTo, isEqual } from 'lodash';
import { SnippetFolder } from '@mui/icons-material';

export interface IUseFilterByModalState {
    draft: { category: string, value: string }[];
    totalActive: number;
    handleOnReset: () => void;
    toggle: (category: string, value: string) => void;
    cleanAllFilters: (category: string) => void;
    onApply: () => void;
}

export const useFilterByModalState = (props: FilterByModalProps): IUseFilterByModalState => {
    const [draft, setDraft] = useState<{ category: string, value: string }[]>([]);
    const totalActive = draft.length;

    //const handleReset = () => setDraft({ estatus: [], registro: [] });

    const handleOnReset = () => {
        setDraft([]);
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

    const onApply = () => {
        //props.handleApplyFilters(draft);
        console.log("onApply-draft:",draft);
        props.handleApplyFilters(draft);
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
        //if (props.open) setDraft({ ...props.currentFilters });
    }, [props.currentFilters]);

    /*useEffect(() => {
        if (props.open) setDraft([...props.currentFiltersV2]);
    }, [open, props.currentFiltersV2]);*/

    return {
        draft,
        totalActive,
        handleOnReset,
        toggle,
        cleanAllFilters,
        onApply
    }
}