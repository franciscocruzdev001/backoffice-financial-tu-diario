export const useCreditInformationTagStyle = () => {
    return {
        creditInformationTagContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 2, sm: 3, lg: 4 },
            mb: 1.5,
            flexWrap: { xs: 'wrap', lg: 'nowrap' }, // Wrap en mobile, no wrap en desktop
            justifyContent: 'space-between',
            width: '100%'
        },
        phoneNumberContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            flex: { lg: 1 },
            minWidth: 'max-content'
        },
        createdDateContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            flex: { lg: 1 },
            minWidth: 'max-content'
        },
        statusChip: (color:string) => {
            return {
                bgcolor: color,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
                px: 1
            }
        }
    };
};