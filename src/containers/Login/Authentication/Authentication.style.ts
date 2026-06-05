export const useAuthenticationStyle = () => {
  return {
    boxContainer: {
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'relative'
    },
    gridContainer: {
      height: '100%',
      width: '100%',
      margin: 0,
      // Remover el padding de los Grid items
      '& .MuiGrid-item': {
        paddingLeft: '0 !important',
        paddingTop: '0 !important'
      }
    },
    brandingContainer: {
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: { xs: 'none', md: 'flex' },
      height: '100%',
      width: '50%',
      minHeight: '100vh',
      position: 'relative',
      // Agregar patrones decorativos
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255,255,255,0.03) 0%, transparent 50%)
      `,
        pointerEvents: 'none'
      }
    },
    formContainer: {
      height: '100%',
      width: { xs: '100%', md: '50%' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: { xs: 2, md: 4 },
      background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
      position: 'relative',
      // Efecto de textura sutil
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)
      `,
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }
    },
    paperContainer: {
      width: '100%',
      maxWidth: 480,
      padding: { xs: 3, md: 5 },
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: `
      0 25px 50px -12px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
      position: 'relative',
      overflow: 'hidden',
      // Efecto de brillo sutil
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none'
      },
      '&:hover::before': {
        left: '100%'
      },
      // Animación de entrada
      animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      '@keyframes slideUp': {
        '0%': {
          opacity: 0,
          transform: 'translateY(30px) scale(0.95)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }
      }
    },
    burbleeAnimationTop: {
      position: 'absolute',
      top: '10%',
      right: '10%',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #1a237e20, #3f51b520)',
      backdropFilter: 'blur(10px)',
      animation: 'float 6s ease-in-out infinite',
      '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' }
      }
    },
    burbleeAnimationBottom: {
      position: 'absolute',
      bottom: '10%',
      left: '10%',
      width: '40px',
      height: '40px',
      borderRadius: '30%',
      background: 'linear-gradient(135deg, #3f51b515, #1a237e15)',
      backdropFilter: 'blur(10px)',
      animation: 'float 8s ease-in-out infinite reverse',
    }
  }
}