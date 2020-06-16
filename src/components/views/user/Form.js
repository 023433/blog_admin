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

import Grid from '@material-ui/core/Grid';

export default function Form(props) {

  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.color,
      padding: `${theme.spacing(1)}px`,
      display: "flex"
    },
    button: {
      width: "auto",
      height: "100%",
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.icon.color,
    },
    icon: {
      color: theme.palette.content.item.icon.color,
    },
    checkbox: {
      color: theme.palette.content.item.backgroundColor,
    },
    input: {
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
    }
  }));


  const classes = useStyles();

  function createData(no, subject) {
    return { no, subject };
  }
  
  const rows = [];

  props.data.map((val, idx) => {
    rows.push(createData(val.no, val.title));

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

  const BodyCell = withStyles((theme) => ({
    body: {
      backgroundColor: theme.palette.content.table.body.backgroundColor,
      color: theme.palette.content.table.body.color,
      fontSize: 14,
      borderBottom: theme.palette.content.table.body.borderColor,
    },
  }))(TableCell);

  return (

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell style={{width: '5%'}}>
            </HeaderCell>
            <HeaderCell style={{width: '80%'}}>제목</HeaderCell>
            <HeaderCell style={{width: '15%'}}></HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no}>
              <BodyCell component="th" scope="row">
              </BodyCell>
              <BodyCell>
                {row.subject}
              </BodyCell>
              <BodyCell>
                <Grid container spacing={0} >
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                
                  </Grid>
                </Grid>
              </BodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Form.propTypes = {
  data: PropTypes.array.isRequired
}
