import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { get, post } from "utils/api";
import { StateContext } from "context/StateContext";
import { Grid } from "@material-ui/core";
import bg from "assets/billing-background.jpg";
import "./style/index.scss";
const SignIn = ({ history }) => {
  const { dispatch } = useContext(StateContext);

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
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={6} style={{ backgroundImage: `url(${bg})` }}></Grid>
      <Grid
        className="login-container"
        container
        item
        xs={6}
        justify="center"
        alignItems="center"
      >
        <GoogleLogin
          className="LoginSignIn"
          clientId="28861163542-0mub2dqtubvcjgun3n9vlrnkgfhgi7n4.apps.googleusercontent.com"
          buttonText={<span>SIGN IN WITH GOOGLE</span>}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Grid>
    </Grid>
  );
};

export default SignIn;
