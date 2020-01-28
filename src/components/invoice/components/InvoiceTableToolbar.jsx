import React from 'react'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Checkbox, IconButton, Tooltip } from '@material-ui/core'

import { Add, Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons'


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const InvoiceTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            List of all Invoices
          </Typography>

        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Add new incoice">
            <Button className="add-btn" onClick={() => { return null }}>
              <Add /> New Invoice
            </Button>
          </Tooltip>
        )}

    </Toolbar>
  );
};

export default InvoiceTableToolbar