import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { StateContext } from "context/StateContext";
import { HeaderCont, Subtitle, Grid, InnerGrid, Label } from "../styles";

const Upper = () => {
  const { state } = useContext(StateContext);
  const { familyName, givenName, email } = state.userProfile;
  return (
    <>
      <HeaderCont>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Subtitle>
          Our team is happy to answer your questions. Fill out the form and
          we'll be in touch as soon as possible.
        </Subtitle>
      </HeaderCont>

      <Grid>
        <InnerGrid>
          <Label>NAME:</Label>
          <span>
            <b>
              {Object.entries(state.userProfile).length
                ? `${givenName} ${familyName}`
                : ""}
            </b>
          </span>
        </InnerGrid>
        <InnerGrid>
          <Label>EMAIL:</Label>
          <span>
            <b>{email}</b>
          </span>
        </InnerGrid>
      </Grid>
    </>
  );
};
export default Upper;
