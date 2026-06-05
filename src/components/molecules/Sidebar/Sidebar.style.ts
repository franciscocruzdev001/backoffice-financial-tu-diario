export const useSidebarStyle = () => {
    return {
        drawerContainer: {
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 280,
                boxSizing: 'border-box',
                backgroundColor: '#f8f9fa',
                borderRight: '1px solid #e0e0e0',
                top: '64px', // ✅ REVERTIDO: Volver a poner debajo del navbar
                height: 'calc(100vh - 64px)', // ✅ AJUSTADO: Altura menos el navbar
                position: 'fixed', // ✅ MANTENER: Posición fija
            },
        },
        sidebarContainer: {
            overflow: 'auto', pt: 2, height: '100%'
        },
        dashboardItemButton: (locationPath: string = "", path: string) => {
            return {
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: locationPath === path ? 'rgba(30, 60, 114, 0.1)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(30, 60, 114, 0.05)',
                },
                '& .MuiListItemIcon-root': {
                    color: locationPath === path ? '#1e3c72' : '#666',
                },
                '& .MuiListItemText-primary': {
                    color: locationPath === path ? '#1e3c72' : '#333',
                    fontWeight: locationPath === path ? 600 : 400,
                }
            }
        },
        clientMenuItemsButton: (locationPath: string = "", path: string) => {
            return {
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: locationPath === path ? 'rgba(30, 60, 114, 0.1)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(30, 60, 114, 0.05)',
                },
                '& .MuiListItemIcon-root': {
                    color: locationPath === path ? '#1e3c72' : '#666',
                },
                '& .MuiListItemText-primary': {
                    color: locationPath === path ? '#1e3c72' : '#333',
                    fontWeight: locationPath === path ? 600 : 400,
                }
            }
        },
        clientSubMenuItemButton: (locationPath: string = "", path: string) => {
            return {
                pl: 4,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: locationPath === path ? 'rgba(30, 60, 114, 0.15)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(30, 60, 114, 0.08)',
                },
                '& .MuiListItemIcon-root': {
                    color: locationPath === path ? '#1e3c72' : '#888',
                    minWidth: 36,
                },
                '& .MuiListItemText-primary': {
                    color: locationPath === path ? '#1e3c72' : '#555',
                    fontWeight: locationPath === path ? 600 : 400,
                    fontSize: '0.9rem'
                }
            }
        },
        clientMenuItemText: { fontSize: '0.75rem', color: '#999' },
        aboutDevContainer: {
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            p: 2,
            borderRadius: 2,
            textAlign: 'center'
        }
    };
};