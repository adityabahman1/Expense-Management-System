import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import customTooltip from './customTooltip';
import customLegend from './customLegend';

const CustomPiechart = ({ data, label, totalAmount, color, showTextAnchor }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Format the amount with rupee symbol
  const formattedAmount = typeof totalAmount === 'number' 
    ? `₹${totalAmount.toLocaleString('en-IN')}` 
    : `₹${totalAmount}`;

  return (
    <div className="relative w-full h-80">
      {/* Overlay div for center text */}
      {showTextAnchor && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-semibold text-gray-800">
            {formattedAmount}
          </p>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            activeIndex={activeIndex}
            activeOuterRadius={140}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            isAnimationActive={true}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend content={customLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPiechart;