import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../pages/utils/helper';

const IncomeOverview = ({ transaction, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transaction?.length) {
      const result = prepareIncomeBarChartData(transaction);
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [transaction]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trend.
          </p>
        </div>
        <button className="add-btn flex items-center gap-1" onClick={onAddIncome}>
          <LuPlus className="text-base" />
          <span>Add Income</span>
        </button>
      </div>

      <div className="mt-10">
        {chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <p className="text-center text-sm text-gray-500 mt-4">No income data available.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
