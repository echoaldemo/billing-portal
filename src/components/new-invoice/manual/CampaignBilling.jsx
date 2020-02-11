import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState(null);
  return (
    <div style={{ border: "solid 1px #F1F1F1" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Campaign</b>
            </TableCell>
            <TableCell align="right">
              <b>Service</b>
            </TableCell>
            <TableCell align="right">
              <b>Quantity</b>
            </TableCell>
            <TableCell align="right">
              <b>Rate</b>
            </TableCell>
            <TableCell align="right">
              <b>Amount</b>
            </TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>adasd</b>
            </TableCell>
            <TableCell align="right">3</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">$33 23</TableCell>
            <TableCell align="right">$32.21</TableCell>
            <TableCell align="right">
              <ExpandMore
                onClick={() => {
                  setRowCollapse(true);
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Collapse in={rowCollapse}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>adasd</b>
              </TableCell>
              <TableCell align="right">3</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">$33 23</TableCell>
              <TableCell align="right">$32.21</TableCell>
              <TableCell align="right">
                <ExpandMore
                  onClick={() => {
                    setRowCollapse(1);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </div>
  );
};

const RowDetails = ({ elementDetails, index, rowCollapse, setRowCollapse }) => {
  const ShowExpand = () => {
    return (
      <React.Fragment>
        {rowCollapse !== index ? (
          <ExpandMore
            onClick={() => {
              setRowCollapse(index);
            }}
          />
        ) : (
          <ExpandLess
            onClick={() => {
              setRowCollapse(null);
            }}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <b>{elementDetails.name}</b>
        </TableCell>
        <TableCell align="right">3</TableCell>
        <TableCell align="right">2</TableCell>
        <TableCell align="right">$33 23</TableCell>
        <TableCell align="right">$32.21</TableCell>
        <TableCell align="right">
          <ShowExpand />
        </TableCell>
      </TableRow>
      <Collapse in={rowCollapse === index} unmountOnExit>
        <Table>
          <TableRow>
            <TableCell>
              <b>{elementDetails.name}</b>
            </TableCell>
            <TableCell align="right">3</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">$33 23</TableCell>
            <TableCell align="right">$32.21</TableCell>
            <TableCell align="right">
              <ShowExpand />
            </TableCell>
          </TableRow>
        </Table>
      </Collapse>
    </React.Fragment>
  );
};

export default CampaignBilling;
