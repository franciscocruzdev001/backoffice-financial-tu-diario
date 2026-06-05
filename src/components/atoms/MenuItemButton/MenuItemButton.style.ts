export const useMenuItemButtonStyle = () => {
    return {
        clientMenuItemsButton: (focus: boolean) => {
            return {
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: focus ? 'rgba(30, 60, 114, 0.1)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(30, 60, 114, 0.05)',
                },
                '& .MuiListItemIcon-root': {
                    color: focus ? '#1e3c72' : '#666',
                },
                '& .MuiListItemText-primary': {
                    color: focus ? '#1e3c72' : '#333',
                    fontWeight: focus ? 600 : 400,
                }
            }
        },
        clientSubMenuItemButton: (focus:boolean) => {
            return {
                pl: 4,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: focus ? 'rgba(30, 60, 114, 0.15)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(30, 60, 114, 0.08)',
                },
                '& .MuiListItemIcon-root': {
                    color: focus ? '#1e3c72' : '#888',
                    minWidth: 36,
                },
                '& .MuiListItemText-primary': {
                    color: focus ? '#1e3c72' : '#555',
                    fontWeight: focus ? 600 : 400,
                    fontSize: '0.9rem'
                }
            }
        },
        clientMenuItemText: { fontSize: '0.75rem', color: '#999' }
    };
};