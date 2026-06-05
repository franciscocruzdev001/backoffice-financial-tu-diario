import { Divider } from '@mui/material';
import React from 'react'
import { FilterByModalSelectArea } from '../FilterByModalSelectArea/FilterByModalSelectArea';
import { FilterByModalSelectPreview } from '../FilterByModalSelectPreview/FilterByModalSelectPreview';
import { Category } from '@/shared/constants/table_types_data';

export interface FilterByModalBodyStateProps {
    totalActive: number;
    //options: { estatus: string[], registro: string[] },
    //currentFilters: { estatus: string[], registro: string[] }
    //optionsV2: { category: string, values:[] }[],
    //currentFiltersV2: { category: string, values:[] }[]
    //options: { category: string, value: string }[],
    options: Record<Category, string[]>,
    currentFilters: { category: string, value: string }[]
}

export interface FilterByModalBodyFunctionsProps {
    onToggle: (category: string, value: string) => void;
    onCleanAllFilters: (category: string) => void;
}

export type FilterByModalBodyProps = FilterByModalBodyStateProps & FilterByModalBodyFunctionsProps;

export const FilterByModalBody: React.FC<FilterByModalBodyProps> = (props: FilterByModalBodyProps) => {
    //const itemsOptionsByCategory = groupBy(props.options, "category");
    return (
        <React.Fragment>
            {/* Select Area */}
            {Object.entries(props.options).map(([category, values], index: number) => {
                //console.log("FilterByModalBody-category: ", category);
                //console.log("FilterByModalBody-value: ", values);

                return (
                    <React.Fragment key={`selectArea_${category}_${index}`}>
                        {index > 0 && (
                            <Divider sx={{ mb: 2 }} />
                        )}
                        <FilterByModalSelectArea
                            //category={category}
                            options={{ category: category, values: values }}
                            currentFilters={props.currentFilters}
                            //options={props.options}
                            //currentFilters={props.currentFilters}
                            onToggle={props.onToggle}
                            onCleanAllFilters={props.onCleanAllFilters}
                        />
                    </React.Fragment>
                )
            })}
            {/* Select Preview */}
            {
                (props.currentFilters.length > 0) && (
                    <FilterByModalSelectPreview currentFilters={props.currentFilters} onToggle={props.onToggle} />
                )}
        </React.Fragment>
    )
}
