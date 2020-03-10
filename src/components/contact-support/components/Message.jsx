import React, { useContext } from "react";
import { InputField, SaveButton } from "common-components";
import { SupportContext } from "context/SupportContext";
import { InputAdornment } from "@material-ui/core";

import {
  BtnCont,
  Label,
  Container,
  Divider,
  UploadBtn,
  BtnText
} from "../styles";

const Message = () => {
  const { state, dispatch, handleSubmit } = useContext(SupportContext);
  const { subject, description } = state;
  const inputEl = React.useRef(null);
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
          InputProps={{
            style: { borderRadius: 0 }
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
          InputProps={{
            style: { borderRadius: 0 }
          }}
        />
      </Container>
      {/* <Divider />
      <Container>
        <Label>ATTACH IMAGE</Label>
        <input
          ref={inputEl}
          accept="image/*"
          style={{ display: "none" }}
          type="file"
          onChange={e =>
            dispatch({
              type: "set-attachment",
              payload: { attachment: e.target.files[0].name }
            })
          }
        />
        <InputField
          variant="outlined"
          InputProps={{
            endAdornment: (
              <UploadBtn onClick={() => inputEl.current.click()}>
                <BtnText>Choose File</BtnText>
              </UploadBtn>
            ),
            style: { borderRadius: 0 }
          }}
          inputProps={{
            readOnly: true
          }}
          value={state.attachment}
          placeholder="No image selected."
        />
      </Container> */}
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
