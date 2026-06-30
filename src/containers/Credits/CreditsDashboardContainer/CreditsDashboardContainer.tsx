import React from 'react'
import DashboardHeader from '@/components/atoms/DashboardHeader/DashboardHeader';
import { useCreditsDashboardState } from './state/useCreditsDashboardState';
import CustomCard from '@/components/atoms/CustomCard/CustomCard';
import DashboardTable from '@/components/molecules/Table/DahsboardTable/DashboardTable';



const CreditsDashboardContainer = () => {
    const {
        dashboardHeaderProps,
        dashboardTableProps
    
    } = useCreditsDashboardState();
    const error: string = "esto es un mensaje de error de prueba, LIC TAPIAAAAAAAAAAA";

    return (
        <React.Fragment>
            {/* Client Header - Sustituir por DashboardHeader */}
            <DashboardHeader {...dashboardHeaderProps} />
            {/* Alert Message if exist error*/}

             {/* Credits table whit information*/}
            <CustomCard>
                {/* Refactorizar esto debe ser un children lo demas es estatico para las demas entidades */}
                <DashboardTable {...dashboardTableProps} />
            </CustomCard>

        </React.Fragment>
    )
}

export default CreditsDashboardContainer;