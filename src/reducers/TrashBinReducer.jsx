const TrashBinReducer = (state, action) => {
  switch (action.type) {
    case "set-data":
      return {
        ...state,
        data: action.payload.data,
        loading: action.payload.loading
      };
    case "set-selected-company":
      return {
        ...state,
        selectedCompany: action.payload.selectedCompany
      };

    case "set-warning-modal": {
      return {
        ...state,
        warningModal: action.payload.warningModal
      };
    }
    case "set-restore-modal": {
      return {
        ...state,
        restoreModal: action.payload.restoreModal
      };
    }

    default:
      return null;
  }
};

export default TrashBinReducer;
