import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { useGetStatisticsQuery } from "../../../api/statisticsApi";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import StatsCard from "../components/StatsCard";

const Statistics = () => {
  const { data: stats, error, isLoading } = useGetStatisticsQuery();

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        Не вдалося завантажити статистику: {error?.data?.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Загальна кількість користувачів"
            value={stats.totalUsers}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Кількість активних лотів"
            value={stats.activeLots}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Кількість завершених лотів"
            value={stats.completedLots}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Загальна кількість ставок"
            value={stats.totalBids}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Середня ставка"
            value={`${parseFloat(stats.averageBid).toFixed(2)} грн.`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatsCard
            title="Кількість активних замовлень"
            value={stats.processingOrders}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5 }} />
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Кількість ставок за останні 30 днів
        </Typography>
        <BarChart
          xAxis={[{ scaleType: "band", data: stats.bidDates }]}
          series={[{ data: stats.bidsCount }]}
          width={800}
          height={400}
        />
      </Box>
      <Divider sx={{ mt: 5 }} />
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Розподіл активних замовлень
        </Typography>
        <PieChart
          series={[
            {
              data: stats.processingOrdersCount.map((count, index) => ({
                id: stats.processingOrderDates[index],
                value: count,
                label: stats.processingOrderDates[index],
              })),
            },
          ]}
          width={800}
          height={400}
        />
      </Box>
      <Divider sx={{ mt: 5 }} />
    </Box>
  );
};

export default Statistics;
