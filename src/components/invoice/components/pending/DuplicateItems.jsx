import React from "react";
import { LoadingModal } from "common-components";
import { StateContext } from "context/StateContext";

const DuplicateItems = ({
  duplicateLoading,
  setDuplicateLoading,
  duplicateCount
}) => {
  const { selectedItems } = React.useContext(StateContext);

  return (
    <LoadingModal
      open={duplicateLoading}
      text={`Duplicating ${duplicateCount} of ${selectedItems.length} selected items`}
      cancelFn={() => {
        setDuplicateLoading(false);
      }}
    />
  );
};

export default DuplicateItems;
