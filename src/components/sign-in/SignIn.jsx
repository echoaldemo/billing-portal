import React, { useContext, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { get, post } from "utils/api";
import { StateContext } from "context/StateContext";
import logo from "assets/pp_logo_transparent_bkgrd.png";
import "./style/index.scss";
const SignIn = ({ history }) => {
  const { state, dispatch } = useContext(StateContext);
  useEffect(() => {
    if (state.userProfile.name) {
      history.push("/overview");
    }
  }, []);
  const responseGoogle = async res => {
    const find = await get(`/api/users/${res.googleId}`);
    if (find.data) {
      dispatch({
        type: "set-user-profile",
        payload: { userProfile: find.data }
      });
    } else {
      res.profileObj.status = "active";
      post("/api/users/create", res.profileObj).then(res =>
        dispatch({
          type: "set-user-profile",
          payload: { userProfile: res.data }
        })
      );
    }
    console.log(res);
    localStorage.setItem("gooleToken", res.tokenId);
    history.push("/overview");
  };

  return (
    <div className="landing-page-wrapper">
      <div className="left-component-container">
        <div className="landing-component-wrapper">
          <div className="logo-container">
            <img src={logo} width={180} />
          </div>
          <div className="message-container">
            <h2 className="message-header">Welcome to Billing Portal</h2>
            <div>
              <p className="message-text">
                Laborum aliquip deserunt duis consequat laboris. Ut aliquip
                ullamco tempor deserunt dolore culpa cillum.
              </p>
            </div>
          </div>
          <div className="render-component-container">
            <div className="login-btn-container">
              <GoogleLogin
                className="LoginSignIn"
                clientId="28861163542-0mub2dqtubvcjgun3n9vlrnkgfhgi7n4.apps.googleusercontent.com"
                buttonText={
                  <span style={{ textTransform: "none", fontWeight: 600 }}>
                    Sign in with Google
                  </span>
                }
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center"
                }}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
        <div className="landing-footer">
          <span>All rights reserved, Perfect Pitch 2019</span>
        </div>
      </div>
      <div className="right-component-container" />
    </div>
  );
};

export default SignIn;
