import { LAST_CREDITS } from "@/shared/constants/dashbboard_home_initial_data_info";
import { CreditResponse } from "@/types/CreditResponse";

export interface IUseDashboardHomeState {
    lastCreditsItems: CreditResponse[]
    handleOnClick: (event: object | any) => void;
    handleOnClickItem: (event: object | any) => void;
}

export const useDashboardHomeState = (): IUseDashboardHomeState => {
    //Items
    const mockLlastCredits: CreditResponse[] = LAST_CREDITS;
    const handleOnClick = (event?: object | any) => {
        console.log("handleOnClick-event: ", event);
        console.log("Actualizando...");
    };
    const handleOnClickItem = (event?: object | any) => {
        console.log("handleOnClick-event: ", event);
        console.log("Actualizando...");
    };

    return {
        lastCreditsItems: mockLlastCredits,
        handleOnClick,
        handleOnClickItem
    }
}