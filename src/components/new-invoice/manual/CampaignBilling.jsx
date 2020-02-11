import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CampaignBilling = ({ campaignDetails }) => {
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
            <TableCell align="right">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {campaignDetails.map((el, i) => {
            return (
              <React.Fragment key={i}>
                <TableRow>
                  <TableCell>
                    <b>{el.name}</b>
                  </TableCell>
                  <TableCell align="right">Billable Hourse</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">$33 23</TableCell>
                  <TableCell align="right">$32.21</TableCell>
                  <TableCell align="right">Add | Delete</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell align="right">DID Billing</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">$33 23</TableCell>
                  <TableCell align="right">$32.21</TableCell>
                  <TableCell align="right">&nbsp;</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell align="right">Performance</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">$33 23</TableCell>
                  <TableCell align="right">$32.21</TableCell>
                  <TableCell align="right">&nbsp;</TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignBilling;
