const BillingProfileReducer = (state, action) => {
  switch (action.type) {
    case "set-companies":
      return { ...state, companies: action.payload.companies };
    case "set-selected-company":
      return { ...state, selectedCompany: action.payload.selectedCompany };
    case "set-edit":
      return { ...state, edit: action.payload.edit };
    case "set-billing-type":
      return {
        ...state,
        selectedBillingType: action.payload.selectedBillingType
      };
    default:
      return null;
  }
};

export default BillingProfileReducer;
