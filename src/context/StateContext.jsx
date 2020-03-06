import React, { useReducer, useState, useEffect } from "react";
import { postLog } from "utils/time";
import { get, patch } from "utils/api";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
const initialState = {
  active_tab: 0,
  loading: false,
  data: [],
  openEdit: false,
  openManage: false,
  openDuplicate: false,
  selectedData: {},
  itemTable: {
    services: {},
    litigator: {},
    tax: {},
    merchant: {},
    customerRef: ""
  },
  userProfile: {},
  editManageData: false,
  updateLoading: false,
  auth: false,
  applyPrevious: true
};
const confirmModalInitial = {
  approve: false,
  delete: false
};

const StateContext = React.createContext();

const dateRangeInitial = {
  startDate: null,
  endDate: null
};
const defaultFilterOptions = {
  invoiceType: " ",
  billingType: " ",
  status: false
};

const StateProvider = ({ children }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [formState, setFormState] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [confirmModal, setConfirmModal] = React.useState(confirmModalInitial);
  const [filterOpt, setFilterOpt] = React.useState(defaultFilterOptions);
  const [dateRange, setDateRange] = React.useState(dateRangeInitial);

  const filter = (data = originalData) => {
    let filterOptions = {};
    if (filterOpt.invoiceType !== " ") {
      filterOptions["invoiceType"] = filterOpt.invoiceType;
    }
    if (filterOpt.billingType !== " ") {
      filterOptions["billingType"] = filterOpt.billingType;
    }
    if (filterOpt.status !== false) {
      filterOptions["status"] = filterOpt.status;
    }
    let filtered = data.filter(item => {
      for (let key in filterOptions) {
        if (item[key] === undefined || item[key] !== filterOptions[key])
          return false;
      }
      return true;
    });
    if (dateRange.startDate && dateRange.endDate) {
      let startDate = moment(dateRange.startDate);
      let endDate = moment(dateRange.endDate);
      const range = moment().range(startDate, endDate);
      filtered = filtered.filter(item => {
        return (
          range.contains(new Date(item.startDate)) ||
          range.contains(new Date(item.endDate))
        );
      });
    }
    setData(filtered);
  };
  const resetFilter = () => {
    setFilterOpt(defaultFilterOptions);
    setDateRange(dateRangeInitial);
  };
  const handleFilterChange = (e, label) => {
    setFilterOpt({
      ...filterOpt,
      [label]: e.target.value
    });
  };
  useEffect(() => {
    filter();
  }, [filterOpt, dateRange]); // eslint-disable-line
  const setLoading = value => {
    dispatch({ type: "set-loading", payload: { loading: value } });
  };
  const setData = value => {
    dispatch({ type: "set-data", payload: { data: value } });
  };
  const setEditModal = value => {
    dispatch({ type: "set-edit-modal", payload: { openEdit: value } });
  };
  const setTab = value => {
    dispatch({ type: "set-tab", payload: { active_tab: value } });
  };
  const getPendingInvoicesData = (status = filterStatus) => {
    console.log(filterStatus);
    setLoading(true);
    get("/api/pending/list").then(res => {
      setOriginalData(res.data);
      filter(res.data);
      setLoading(false);
    });
  };
  const deletePendingStatus = id => {
    dispatch({
      type: "set-update-loading",
      payload: { updateLoading: true }
    });

    patch(`/api/pending/edit/${id}`, { status: 3 }).then(() => {
      dispatch({
        type: "set-update-loading",
        payload: { updateLoading: false }
      });
      dispatch({
        type: "set-manage-modal",
        payload: { openManage: false }
      });
      getPendingInvoicesData();
    });
    postLog({
      type: "delete-invoice",
      description: `${state.userProfile.name} moved invoice #${id} to the trash.`,
      invoiceID: id
    });
  };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-auth":
        return { ...state, auth: action.payload.auth };
      case "set-tab":
        return { ...state, active_tab: action.payload.active_tab };
      case "set-loading":
        return { ...state, loading: action.payload.loading };
      case "set-data":
        return { ...state, data: action.payload.data };
      case "set-edit-modal":
        return { ...state, openEdit: action.payload.openEdit };
      case "set-manage-modal":
        return { ...state, openManage: action.payload.openManage };
      case "set-duplicate-modal":
        return { ...state, openDuplicate: action.payload.openDuplicate };
      case "set-selected-data":
        return { ...state, selectedData: action.payload.selectedData };
      case "set-item-table":
        return { ...state, itemTable: action.payload.itemTable };
      case "set-edit-manage-data":
        return { ...state, editManageData: action.payload.editManageData };
      case "set-update-loading":
        return { ...state, updateLoading: action.payload.updateLoading };
      case "set-user-profile":
        return { ...state, userProfile: action.payload.userProfile };
      case "set-apply-prev":
        return { ...state, applyPrevious: action.payload.applyPrevious };
      default:
        return null;
    }
  }, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
        setLoading,
        setData,
        setEditModal,
        setTab,
        modalLoading,
        setModalLoading,
        getPendingInvoicesData,
        deletePendingStatus,
        originalData,
        setOriginalData,
        formState,
        setFormState,
        selectedItems,
        setSelectedItems,
        confirmModal,
        setConfirmModal,
        dateRange,
        setDateRange,
        filterStatus,
        setFilterStatus,
        handleFilterChange,
        filterOpt,
        setFilterOpt,
        resetFilter
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };
