import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';



export default function Form(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.content.backgroundColor,
      color: theme.palette.content.color,
    },
    row: {
      backgroundColor: theme.palette.content.table.body.backgroundColor,
      fontSize: 14,
      cursor: "pointer",
      "& .MuiTableCell-root": { 
        color: theme.palette.content.table.body.color,
        borderBottom: theme.palette.content.table.body.borderColor,
      }
    }
  }));

  const classes = useStyles();

  return (

    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow className={classes.row}>
            <TableCell component="th" scope="row">
              2
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Form.propTypes = {
  data: PropTypes.array.isRequired
}
