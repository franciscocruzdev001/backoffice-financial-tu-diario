import StatsCard from '@/components/molecules/StatsCard/StatsCard';
import { Alert, Grid } from '@mui/material';
import React from 'react'
import DashboardHeader from '@/components/atoms/DashboardHeader/DashboardHeader';
import { ALL_QUICK_ACTIONS, METRICS } from '@/shared/constants/dashbboard_home_initial_data_info';
import { defaultTo } from 'lodash';
import { IFinancialCardInfoItem } from '@/shared/interfaces/IFinancialCardInfoItem';
import { IFinancialButtonInfoItem } from '@/shared/interfaces/IFinancialButtonInfoItem';
import QuickActionsCard from '@/components/molecules/QuickActionsCard/QuickActionsCard';
import LastCreditsCard from '@/components/molecules/LastCreditsCard/LastCreditsCard';
import StatsChargeCard from '@/components/atoms/StatsChargeCard/StatsChargeCard';
import { useDashnboardHomeStyle } from './DashboardHome.style';
import { useDashboardHomeState } from './state/useDashboardHomeState';

const DashnboardHome = () => {
  const classes = useDashnboardHomeStyle();
  const { handleOnClick, handleOnClickItem, lastCreditsItems } = useDashboardHomeState();
  //Catologos
  const metrics: { performanceMetrics: IFinancialCardInfoItem[], chargeMetrics: IFinancialCardInfoItem[] } = METRICS;
  const quickActions: IFinancialButtonInfoItem[] = ALL_QUICK_ACTIONS;

  return (
    <React.Fragment>
      <DashboardHeader
        tittle={"Dashboard"}
        handleOnClick={handleOnClick}
      />
      {/* Alertas importantes */}
      {(1 > 0 || 1 > 0) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          ⚠️ Atención requerida: {1} pagos vencidos, {1} clientes morosos
        </Alert>
      )}

      {/* Resume principal metrics   REFACTOR-PENDING*/}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.performanceMetrics.map((item: IFinancialCardInfoItem, index: number) => (
          <Grid key={`PerformanceCard_${index}`} size={{...classes.performanceCardSize}}>
            <StatsCard
              key={`StatsCard_${index}`}
              tittle={item.tittle()}
              value={1}
              icon={item.icon}
              color={item.color}
              subtittle={item.subtittle("1")}
              handleOnClick={() => { console.log(`StatsCard_${item.tittle}...`); }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Segunda fila de estadísticas - MEJORADA CON MEJOR DISTRIBUCIÓN */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.chargeMetrics.map((item: IFinancialCardInfoItem, index: number) => (
          <Grid key={`ChargeCard_${index}`} size={{...classes.chargeCardSize}}>
            <StatsChargeCard 
              tittle={item.tittle(100)}
              subtittle={item.subtittle()}
              icon={item.icon}
              color={item.color}
              secundaryColor={defaultTo(item.secondaryColor, "success.main")}
            />
          </Grid>
        ))}
      </Grid>

      {/* NUEVA DISTRIBUCIÓN - LAYOUT BALANCEADO */}
      <Grid container spacing={4} sx={{...classes.layoutsCardsContainer}}>
        {/* Acciones Rápidas - COMPACTO A LA IZQUIERDA */}
        <Grid size={{...classes.quickActionsContainerSize}}>
          <QuickActionsCard 
            activeEmployees={10}
            quickActionsCatalog={quickActions}
            handleOnClick={handleOnClick}
          />
        </Grid>


        {/* Últimos Préstamos - MÁS ANCHO CON ESPACIO A LA DERECHA */}
        <Grid size={{...classes.lastCreditsContainerSize}}>
          <LastCreditsCard 
            lastCreditsItems={lastCreditsItems}
            handleOnClick={handleOnClick}
            handleOnClickLastCredisItem={handleOnClickItem}
          />
        </Grid>
      </Grid>

    </React.Fragment>
  )
}

export default DashnboardHome;