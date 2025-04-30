export const ValidateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};


export const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    const initials = words
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2) // Get at most 2 initials
      .join('');
    return initials;
  };



export const addThousandsSeparator = (num) => {
    if (isNaN(num)) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

export const prepareExpenseBarCharData = (data = []) => {
  const charData = data.map((item)=>({
    category : item?.category,
    amount : item?.amount

  }))
  return charData;
};

import moment from "moment";

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('D MMM'), // ✅ 'D' for day, 'MMM' for short month name
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};


// Group and sum expense transactions by month
export const prepareExpenseLineCharData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const chartData = sortedData.map(item => ({
    month: moment(item?.date).format('Do MMM'),
    total: item?.amount, // <-- match with dataKey="total"
    category: item?.category
  }));

  return chartData;
};
