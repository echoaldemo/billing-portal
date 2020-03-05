import React from "react";
import { Save, SaveText, DisSave, DisText } from "./styles";
const SaveButton = ({ disabled, children, handleClick, ...rest }) => {
  const renderDisabled = () => {
    return (
      <>
        <DisSave disabled={disabled} onClick={handleClick} {...rest}>
          <DisText>{children}</DisText>
        </DisSave>
      </>
    );
  };
  const renderSave = () => {
    return (
      <>
        <Save disabled={disabled} onClick={handleClick} {...rest}>
          <SaveText>{children}</SaveText>
        </Save>
      </>
    );
  };
  return disabled ? renderDisabled() : renderSave();
};
export { SaveButton };
