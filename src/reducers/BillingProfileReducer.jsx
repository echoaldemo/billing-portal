const BillingProfileReducer = (state, action) => {
  switch (action.type) {
    case "set-companies":
      return { ...state, companies: action.payload.companies };
    case "set-selected-company":
      return { ...state, selectedCompany: action.payload.selectedCompany };
    case "set-edit":
      return { ...state, edit: action.payload.edit };
    case "set-apply-prev":
      return { ...state, applyPrevious: action.payload.applyPrevious };

    default:
      return null;
  }
};

export default BillingProfileReducer;
