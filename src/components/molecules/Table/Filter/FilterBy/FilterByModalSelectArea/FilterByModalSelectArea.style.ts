import { ChipColorEnum } from "@/shared/constants/PropertiesEnumMuiComponets";
import { MES_CHIP_COLOR, STATUS_CHIP_COLOR } from "@/shared/utils/ProcessStatusDataUtils";
import { isEmpty } from "lodash";

export const useFilterByModalSelectAreaStyle = () => {
    return {
        selectAreaContainer: { px: 3, pt: 3, pb: 3 },
        selectAreaHeaderContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5
        },
        selectAreaTittle: { cursor: "pointer", fontWeight: 600 },
        selectAreaItemsCotainer: { display: "flex", flexWrap: "wrap", gap: 1 },
        selectAreaItem: (item: { category: string, value: string }, isSelected: boolean) => {
            const statusColor: ChipColorEnum | string = item.category === "estatus" ? STATUS_CHIP_COLOR(item.value) : "";
            const monthStyleColor: object = item.category === "registro" ? isSelected ? {
                bgcolor: MES_CHIP_COLOR(item.value),
                color: "#fff",
                borderColor: MES_CHIP_COLOR(item.value),
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                "&:hover": { bgcolor: MES_CHIP_COLOR(item.value), opacity: 0.9 },
            } : {
                borderColor: MES_CHIP_COLOR(item.value),
                color: MES_CHIP_COLOR(item.value),
                "&:hover": { bgcolor: `${MES_CHIP_COLOR(item.value)}15` },
            } : {};

            return {
                ...!isEmpty(statusColor) ? { color: statusColor as ChipColorEnum } : {},
                sx: {
                    cursor: "pointer",
                    fontWeight: isSelected ? 600 : 400,
                    transition: "all 0.18s",
                    transform: isSelected ? "scale(1.04)" : "scale(1)",
                    boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                    ...monthStyleColor
                }
            }
        }
    };
};