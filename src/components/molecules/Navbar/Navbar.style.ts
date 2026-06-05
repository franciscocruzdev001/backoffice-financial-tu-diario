export const useNavbarStyle = () => {
    return {
        appBarContainer: {
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        CompanyNameContainer: {
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1
        },
        menuOptionsContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: 2
        },
        welcomeMessage: {
            display: { xs: 'none', md: 'block' }
        }
    };
};