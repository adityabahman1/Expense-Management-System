export const BASE_URL = "http://localhost:8000"; // Change this to your deployed backend URL

export const API_PATHS = {
    AUTH: {
        REGISTER: `/api/v1/auth/register`,
        LOGIN: `/api/v1/auth/login`,
        GET_USER_INFO: `/api/v1/auth/getUser`,
    },

    DASHBOARD: {
        GET_DATA: `/api/v1/dashboard`,
    },

    INCOME: {
        ADD_INCOME: `/api/v1/income/add`,
        GET_ALL_INCOME: `/api/v1/income/get`,
        DELETE_INCOME: (incomeid) => `/api/v1/income/${incomeid}`, // ✅ FIXED
        DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
    },

    EXPENSE: {
        ADD_EXPENSE: `/api/v1/expense/add`,
        GET_ALL_EXPENSE: `/api/v1/expense/get`,
        DELETE_EXPENSE: (expenseid) => `/api/v1/expense/${expenseid}`, // ✅ FIXED
        DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
    },

    IMAGE: {
        UPLOAD_IMAGE: `/api/v1/auth/upload-image`,
    },
};
