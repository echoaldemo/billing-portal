import React, { useReducer, useState } from "react";
import { get, remove } from "utils/api";
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
  editManageData: false,
  updateLoading: false
};
const confirmModalInitial = {
  approve: false,
  delete: false
};

const StateContext = React.createContext();

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const dateRangeInitial = {
  startDate:
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
  endDate:
    today.getFullYear() + "-" + (today.getMonth() + 2) + "-" + today.getDate()
};

const StateProvider = ({ children }) => {
  const [modalLoading, setModalLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [formState, setFormState] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [confirmModal, setConfirmModal] = React.useState(confirmModalInitial);

  const [dateRange, setDateRange] = React.useState(dateRangeInitial);

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
  const getPendingInvoicesData = () => {
    setLoading(true);
    get("/api/pending/list")
      .then(res => {
        setLoading(false);
        setOriginalData(res.data);

        setData(res.data);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const deletePendingStatus = id => {
    dispatch({
      type: "set-update-loading",
      payload: { updateLoading: true }
    });

    remove(`/api/pending/delete/${id}`).then(() => {
      dispatch({
        type: "set-update-loading",
        payload: { updateLoading: false }
      });
      dispatch({
        type: "set-manage-modal",
        payload: { selectedData: false }
      });
      getPendingInvoicesData();
    });
  };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
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
        setDateRange
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export { StateProvider, StateContext };
