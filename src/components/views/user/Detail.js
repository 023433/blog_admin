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

import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import ClearIcon from '@material-ui/icons/Clear';

import Avatar from '@material-ui/core/Avatar';

export default function Detail(props) {

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

  function createData(userId, userName, activate) {
    return { userId, userName, activate };
  }
  
  const rows = [];

  props.data.map((val, idx) => {
    console.log(val);
    rows.push(createData(val.userId, val.userName, val.activate));

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
            <HeaderCell style={{width: '10%', textAlign: "center"}}>#</HeaderCell>
            <HeaderCell style={{width: '30%'}}>이름</HeaderCell>
            <HeaderCell style={{width: '45%'}}>아이디</HeaderCell>
            <HeaderCell style={{width: '15%'}}>상태</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.userId} hover className={classes.row}>
              <TableCell>
                <Avatar
                  alt="Person"
                  className={classes.avatar}
                />
              </TableCell>
              <TableCell>
                {row.userName}
              </TableCell>
              <TableCell>
                {row.userId}
              </TableCell>
              <TableCell>
                {
                  row.activate? <PanoramaFishEyeIcon/>: <ClearIcon/>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Detail.propTypes = {
  data: PropTypes.array.isRequired
}
