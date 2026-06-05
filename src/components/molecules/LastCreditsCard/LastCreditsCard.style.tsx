export const useLastCreditsCardStyle = () => {
    return {
        lastCreditsCardContainer: {
            width: '100%',
            maxWidth: '990px', // Ancho máximo definido
            minHeight: "100%",
            minWidth: { xs: '100%', sm: '500px', lg: '600px' }, // Responsive min-width
            '@media (min-width: 1200px)': {
                minWidth: '100%' // En pantallas grandes, más ancho
            }
        },
        lastCreditsCardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
        },
        emptyItemMessageContainer: {
            textAlign: 'center', py: 6, color: 'text.secondary'
        },
        lastCreditsItemsContainer: {
            maxHeight: "464px", overflowY: 'auto'
        },
        tittleHeader: {
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }
    };
};