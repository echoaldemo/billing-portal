const IdentityReducer = (state, action) => {
  switch (action.type) {
    case "set-data":
      return {
        ...state,
        companies: action.payload.companies,
        campaigns: action.payload.campaigns
      };

    default:
      return null;
  }
}

export default IdentityReducer