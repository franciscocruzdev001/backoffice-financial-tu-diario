export const useStatsCardStyle = () => {
    return {
        paperContainer: (isOnclick: boolean, color: string) => {
            return {
                p: 3,
                textAlign: 'center',
                height: '100%',
                background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
                border: `1px solid ${color}30`,
                transition: 'all 0.3s ease',
                cursor: isOnclick ? 'pointer' : 'default',
                '&:hover': isOnclick ? {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 25px ${color}40`,
                    border: `1px solid ${color}60`,
                } : {}
            }
        },
        messageValue: (color: string) => {
            return {
                fontWeight: 700,
                color: color,
                mb: 1
            }
        },
        tittle: (hasSubtittle: boolean) => {
            return {
                fontWeight: 600,
                color: 'text.primary',
                mb: hasSubtittle ? 1 : 0
            }
        },
        subtittle: {
            color: 'text.secondary',
            fontSize: '0.875rem'
        },
    };
};