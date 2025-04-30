import React, { useState, useEffect } from 'react';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosInstance';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import ExpenseOverview from '../../Components/Expense/ExpenseOverview';
import Modal from '../../Components/Modal';
import AddExpenseForm from '../../Components/Expense/AddExpenseForm';
import toast from 'react-hot-toast';
import ExpenseList from '../../Components/Expense/ExpenseList';
import DeleteAlert from '../../Components/DeleteAlert';

const Expense = () => {
  const [loading, setLoading] = useState(false);
  const [expensedata, setExpensedata] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpensedata(response.data);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (income) => {
    const { category, amount, date, icon } = income;

    if (!category.trim()) {
      toast.error('Category is required');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0');
      return;
    }

    if (!date) {
      toast.error('Date is required.');
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success('Expense added successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error Adding Income: ',
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Expense details deleted successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error Deleting Expense:',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to delete Expense');
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading expense details:', error);
      toast.error('Failed to download expense details. Please try again.');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activemenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expensedata}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expensedata}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
