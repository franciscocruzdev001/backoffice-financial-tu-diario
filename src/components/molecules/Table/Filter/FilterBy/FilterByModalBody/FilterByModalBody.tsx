import { Divider } from '@mui/material';
import React from 'react'
import { FilterByModalSelectArea } from '../FilterByModalSelectArea/FilterByModalSelectArea';
import { FilterByModalSelectPreview } from '../FilterByModalSelectPreview/FilterByModalSelectPreview';
import { FilterByModalDateArea } from '../FilterByModalDateArea/FilterByModalDateArea';
import { FilterByModalEmployeeArea } from '../FilterByModalEmployeeArea/FilterByModalEmployeeArea';
import { FilterByModalCustomerArea } from '../FilterByModalCustomerArea/FilterByModalCustomerArea';
import { Category } from '@/shared/constants/table_types_data';
import { type DateRangeValue } from '@/components/molecules/Table/Filter/DateRangeSection/DateRangeSection';
import { EmployeeWalletOption } from '@/shared/constants/catalogs/employeeWallets.catalog';
import { CustomerOption } from '@/shared/constants/catalogs/customers.catalog';

export interface FilterByModalBodyStateProps {
    totalActive: number;
    //options: { estatus: string[], registro: string[] },
    //currentFilters: { estatus: string[], registro: string[] }
    //optionsV2: { category: string, values:[] }[],
    //currentFiltersV2: { category: string, values:[] }[]
    //options: { category: string, value: string }[],
    options: Record<Category, string[]>,
    currentFilters: { category: string, value: string }[]
    dateRange?: DateRangeValue;
    // Opt-in: solo se renderiza el Autocomplete de trabajador si la vista
    // padre provee este catálogo (por ahora únicamente Transactions).
    employeeOptions?: EmployeeWalletOption[];
    selectedEmployeeId?: string | null;
    // Opt-in: solo se renderiza el Autocomplete de cliente si la vista
    // padre provee este catálogo (por ahora únicamente Credits).
    customerOptions?: CustomerOption[];
    selectedCustomerId?: string | null;
}

export interface FilterByModalBodyFunctionsProps {
    onToggle: (category: string, value: string) => void;
    onCleanAllFilters: (category: string) => void;
    onDateRangeChange?: (value: DateRangeValue) => void;
    onEmployeeChange?: (employeeId: string | null) => void;
    onCustomerChange?: (customerId: string | null) => void;
}

export type FilterByModalBodyProps = FilterByModalBodyStateProps & FilterByModalBodyFunctionsProps;

export const FilterByModalBody: React.FC<FilterByModalBodyProps> = (props: FilterByModalBodyProps) => {
    //const itemsOptionsByCategory = groupBy(props.options, "category");
    return (
        <React.Fragment>
            {/* Employee Area — opt-in, mismo patrón que Date Area: solo aparece
                si la vista padre pasa employeeOptions + onEmployeeChange */}
            {props.employeeOptions && props.onEmployeeChange && (
                <>
                    <FilterByModalEmployeeArea
                        options={props.employeeOptions}
                        selectedEmployeeId={props.selectedEmployeeId ?? null}
                        onChange={props.onEmployeeChange}
                    />
                    <Divider sx={{ mb: 2 }} />
                </>
            )}
            {/* Customer Area — opt-in, mismo patrón que Employee Area: solo aparece
                si la vista padre pasa customerOptions + onCustomerChange */}
            {props.customerOptions && props.onCustomerChange && (
                <>
                    <FilterByModalCustomerArea
                        options={props.customerOptions}
                        selectedCustomerId={props.selectedCustomerId ?? null}
                        onChange={props.onCustomerChange}
                    />
                    <Divider sx={{ mb: 2 }} />
                </>
            )}
            {/* Date Area */}
            {props.dateRange && props.onDateRangeChange && (
                <>
                    <FilterByModalDateArea value={props.dateRange} onChange={props.onDateRangeChange} />
                    <Divider sx={{ mb: 2 }} />
                </>
            )}
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