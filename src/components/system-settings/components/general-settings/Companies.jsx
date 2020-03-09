import React, { useContext } from "react";
import { StateContext } from "context/StateContext";
import { Row } from "common-components";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
const Companies = props => {
  const {
    state: { companies }
  } = useContext(StateContext);
  return (
    <div {...props}>
      <h4 className="section-title">
        <span>Companies</span>
        <IconButton style={{ padding: 0 }}>
          <SearchIcon />
        </IconButton>
      </h4>
      <div className="row-container">
        {companies.map(item => {
          return (
            <Row
              rowData={[{ size: 12, label: item.name }]}
              style={{ borderBottom: "solid 1px #F1F1F1" }}
              key={item.uuid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Companies;
