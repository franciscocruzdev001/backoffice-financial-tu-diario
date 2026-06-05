export const useCreditInformationItemStyle = () => {
    return {
        creditInformationItemContainer: {
            display: 'flex',
            alignItems: 'center',
            p: { xs: 2, sm: 2.5, lg: 3.5 }, // Padding responsive
            mb: 2,
            border: '1px solid #e0e0e0',
            borderRadius: 3,
            bgcolor: '#fafafa',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            minHeight: '100px',
            width: '100%', // Asegurar que ocupe todo el ancho
            '&:hover': {
                bgcolor: '#f0f7ff',
                borderColor: '#1976d2',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.15)'
            },
            '&:last-child': { mb: 0 }
        },
        clientAvatar: (color: string) => {
            return {
                bgcolor: color,
                width: 60,
                height: 60,
                fontSize: '1.4rem',
                fontWeight: 700,
                mr: 4,
                boxShadow: 3
            }
        },
        amountContainer: {
            textAlign: 'right',
            ml: { xs: 2, lg: 4 },
            minWidth: {
                xs: '120px', lg: '150px'
            }
        },
        amount: {
            fontWeight: 700,
            color: '#1e3c72',
            mb: 0.5
        }
    }
};