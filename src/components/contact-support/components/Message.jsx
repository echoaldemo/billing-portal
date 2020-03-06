import React, { useContext } from "react";
import { InputField, SaveButton } from "common-components";
import { SupportContext } from "context/SupportContext";
import { BtnCont, Label, Container, Divider } from "../styles";

const Message = () => {
  const { state, dispatch, handleSubmit } = useContext(SupportContext);
  const { subject, description } = state;
  return (
    <>
      <Container>
        <Label>SUBJECT*</Label>
        <InputField
          placeholder="What's this about?"
          variant="outlined"
          fullWidth
          required
          value={subject}
          onChange={e => {
            dispatch({
              type: "set-subject",
              payload: { subject: e.target.value }
            });
          }}
        />
      </Container>
      <Divider />
      <Container>
        <Label>MESSAGE*</Label>
        <InputField
          variant="outlined"
          fullWidth
          multiline
          rows="15"
          required
          placeholder="Go ahead, we're listening..."
          value={description}
          onChange={e => {
            dispatch({
              type: "set-description",
              payload: { description: e.target.value }
            });
          }}
        />
      </Container>
      <BtnCont>
        <SaveButton
          disabled={subject.length && description.length ? false : true}
          handleClick={handleSubmit}
        >
          SUBMIT
        </SaveButton>
      </BtnCont>
    </>
  );
};
export default Message;
