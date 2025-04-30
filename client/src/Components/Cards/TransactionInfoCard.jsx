import React from 'react';
import { LuUtensils, LuTrendingDown, LuTrendingUp, LuTrash2, LuWallet, LuShoppingCart } from 'react-icons/lu';
import { addThousandsSeparator } from '../../pages/utils/helper'; // optional for formatting

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, // also you forgot to accept onDelete before!
}) => {
  
  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';

  const getDefaultIcon = () => {
    if (type === 'income') return <LuWallet />;
    if (type === 'expense') return <LuShoppingCart />;
    return <LuUtensils />; // fallback for other types
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title || 'Transaction Icon'} className="w-6 h-6" />
        ) : (
          getDefaultIcon()
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === 'income' ? '+' : '-'} ₹ {addThousandsSeparator(amount)}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
