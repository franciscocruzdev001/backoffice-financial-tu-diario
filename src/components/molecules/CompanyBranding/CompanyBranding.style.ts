export const useCompanyBrandingStyle = () => {
    return {
        boxContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            color: 'white',
            textAlign: 'center',
            padding: 4,
            position: 'relative'
        },
        logoContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
        },
        imageLogo: {
            width: { xs: '260px', md: '360px' },
            height: { xs: '160px', md: '220px' },
            objectFit: 'contain',
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                transform: 'scale(1.05)'
            }
        },
        tittleTagline: {
            lineHeight: 1.6,
            fontWeight: 300,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            mb: 1,
            opacity: 0.95
        },
        complementTagline: {
            lineHeight: 1.6,
            fontWeight: 300,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            mb: 1,
            opacity: 0.95
        },
    }
};