import React from 'react';
import CustomPiechart from '../Charts/CustomPiechart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]; // Fixed the missing # in the third color

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const balanceData = [
        {name: "Total Balance", amount: totalBalance},
        {name: "Total Income", amount: totalIncome},
        {name: "Total Expense", amount: totalExpense}
    ];
  
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>
            <CustomPiechart
                data={balanceData}
                label="Total Balance"
                totalAmount={`${totalBalance}`}
                color={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
