export const useQuickActionsCardStyle = () => {
    return {
        tittle: {
            mb: 3,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        },
        subtittle: {
            fontWeight: 600, mb: 2
        },
        quickActionsButtonContainer: {
            xs: 12, sm: 6, lg: 12
        },
        quickActionsButton: {
            py: 1.5, fontSize: '1rem', fontWeight: 600
        },
        activeEmployeesCard: {
            p: 3,
            textAlign: 'center',
            bgcolor: '#f8f9fa',
            borderRadius: 2,
            border: '1px solid #e9ecef'
        }
    };
};