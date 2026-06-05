export const useFilterByModalStyle = () => {
    return {
        filterByModalContainer: {
            borderRadius: 3,
            overflow: "hidden",
        },
        filterByModalHeaderContainer: {
            bgcolor: "primary.main",
            color: "#fff",
            py: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
        },
        filterByModalFooterContainer: {
            px: 3,
            py: 2,
            gap: 1,
            borderTop: "1px solid",
            borderColor: "divider"
        }
    };
};