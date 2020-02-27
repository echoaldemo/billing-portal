// Make your function for auths here
function loginChecker() {
  return 'sample function'
}

// Function for authentication

// Note: This function will be used in `ManageRoute.tsx` and `GatewayRoute.tsx`
const isAuth = () => {
  var token = localStorage.getItem('gooleToken')

  if (token) {
    return true
  } else {
    return false
  }
}

export { loginChecker, isAuth }
