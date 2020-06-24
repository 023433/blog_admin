import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Post(props) {

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

  function createData(no, subject) {
    return { no, subject };
  }
  
  const rows = [];

  props.data.map((val, idx) => {
    rows.push(createData(val.no, val.subject));

    return null;
  });

  const HeaderCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.content.table.header.backgroundColor,
      color: theme.palette.content.table.header.color,
      borderBottom: theme.palette.content.table.body.borderColor,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  return (

    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell style={{width: '10%', textAlign: "center"}}>No</HeaderCell>
            <HeaderCell style={{width: '90%'}}>제목</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no} hover className={classes.row}>
              <TableCell>
                {row.no}
              </TableCell>
              <TableCell>
                {row.subject}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Post.propTypes = {
  data: PropTypes.array.isRequired
}
