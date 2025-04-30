import React, { useState, useEffect } from 'react';
import CustomPiechart from '../Charts/CustomPiechart';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // You can customize these colors

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      <CustomPiechart
        data={chartData}
        label="Total Income"
        totalAmount={`${totalIncome}`}
        showTextAnchor
        color={COLORS}   
      />
    </div>
  );
};

export default RecentIncomeWithChart;
