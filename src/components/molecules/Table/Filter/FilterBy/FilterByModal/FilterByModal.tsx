import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FilterByModalHeader } from '../FilterByModalHeader/FilterByModalHeader';
import { FilterByModalFooter } from '../FilterByModalFooter/FilterByModalFooter';
import { FilterByModalBody } from '../FilterByModalBody/FilterByModalBody';
import { useFilterByModalState } from './state/useFilterByModalState';
import { useFilterByModalStyle } from './FilterByModal.style';
import { Category } from '@/shared/constants/table_types_data';

export interface FilterByModalStateProps {
    open: boolean,
    //options: { category: string, value: string }[],
    options: Record<Category, string[]>,
    currentFilters: { category: string, value: string }[]
}

export interface FilterByModalFunctionsProps {
    handleApplyFilters: (draft: { category: string, value: string }[]) => void;
    onClose: (event?: object | any) => void;
}

export type FilterByModalProps = FilterByModalStateProps & FilterByModalFunctionsProps;

export const FilterByModal: React.FC<FilterByModalProps> = (props: FilterByModalProps) => {
    const classes = useFilterByModalStyle();
    const { draft, totalActive, handleOnReset, cleanAllFilters, toggle, onApply } = useFilterByModalState(props);

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
