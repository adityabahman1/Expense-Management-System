import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/layout/DashboardLayout';
import { API_PATHS } from '../utils/apiPath';
import IncomeOverview from '../../Components/Income/IncomeOverview';
import Modal from '../../Components/Modal';
import AddIncomeForm from '../../Components/Income/AddIncomeForm';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import IncomeList from '../../Components/Income/IncomeList';
import DeleteAlert from '../../Components/DeleteAlert';

const Income = () => {
  const [loading, setLoading] = useState(false);
  const [incomedata, setincomedata] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setincomedata(response.data);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error('Source is required');
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success('Income added successfully');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        'Error Adding Income: ',
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteIncome = async (incomeid) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeid));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Income details deleted successfully');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        'Error Deleting Income:',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to delete income');
    }
  };

  const handleDownloadIncomeDetails = async () =>{
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading income details:', error);
      toast.error('Failed to download income details. Please try again.');
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activemenu="Income">
      <div className="my-5 mx-auto">
        <IncomeOverview
          transaction={incomedata}
          onAddIncome={() => setOpenAddIncomeModal(true)}
        />

        <IncomeList
          transactions={incomedata}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id }); // ✅ Correct casing
          }}
          onDownload={handleDownloadIncomeDetails}
        />

      </div>

      <Modal
        isOpen={OpenAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Income;
