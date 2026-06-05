export const useAuthenticationFormStyle = () => {
    return {
        boxContainer: {
            width: '100%',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1a237e 0%, #283593 50%, )',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px'
            }
        },
        tittleHeader: {
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.125rem' },
            letterSpacing: '-0.025em'
        },
        subTittleHeader: {
            color: '#64748b',
            fontWeight: 400,
            fontSize: '1rem'
        },
        alert: {
            mb: 4,
            borderRadius: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            '& .MuiAlert-icon': {
                color: '#dc2626'
            },
            '& .MuiAlert-message': {
                fontWeight: 500
            }
        },
        userNameLabel: {
            mb: 2,
            fontWeight: 600,
            color: '#374151',
            fontSize: '14px',
            letterSpacing: '0.025em'
        },
        passwordLabel: {
            mb: 2,
            fontWeight: 600,
            color: '#374151',
            fontSize: '14px',
            letterSpacing: '0.025em'
        },
        userNameInput: {
            '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#fafbfc',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                    borderColor: '#e2e8f0',
                    borderWidth: '2px'
                },

                '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                    borderWidth: '2px'
                },
                '&.Mui-focused': {
                    backgroundColor: '#fafbfc',
                    boxShadow: '0 0 0 4px rgba(26, 35, 126, 0.1)'
                }
            },
            '& .MuiOutlinedInput-input': {
                padding: '14px 16px',
                fontSize: '16px',
                '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1
                }
            }
        },
        passwordInput: {
            '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#fafbfc',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                    borderColor: '#e2e8f0',
                    borderWidth: '2px'
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                    borderWidth: '2px'
                },
                '&.Mui-focused': {
                    backgroundColor: '#fafbfc',
                    boxShadow: '0 0 0 4px rgba(26, 35, 126, 0.1)'
                }
            },
            '& .MuiOutlinedInput-input': {
                padding: '14px 16px',
                fontSize: '16px',
                '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1
                }
            }
        },
        loginButton: {
            mb: 4,
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#1a237e',
            background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'none',
            boxShadow: '0 4px 15px rgba(26, 35, 126, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(26, 35, 126, 0.4)'
            },
            '&:active': {
                transform: 'translateY(0px)'
            },
            '&.Mui-disabled': {
                background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                boxShadow: 'none',
                transform: 'none'
            }
        }
    }
};