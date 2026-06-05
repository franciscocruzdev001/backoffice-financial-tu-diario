export const useToolbarDashboardFilterStyle = () => {
    return {
        toolbarContainer: {
            px: 3,
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
        },
        showModalFilterButton: (filtersApplied: boolean) => {
            return {
                bgcolor: filtersApplied ? "secondary.main" : "primary.main",
                color: "#fff",
                borderRadius: 2,
                "&:hover": {
                    bgcolor: filtersApplied ? "#c73652" : "#0d0d1f",
                },
                transition: "background-color 0.2s",
            }
        }
    };
};