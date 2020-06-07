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
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';

export default function Content(props) {

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
    input: {
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
    }
  }));


  const classes = useStyles();

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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

  const [isPublic, setPublic] = React.useState(false);

  return (

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell style={{width: '5%'}}>
              <Checkbox/>
            </HeaderCell>
            <HeaderCell style={{width: '60%'}}>제목</HeaderCell>
            <HeaderCell style={{width: '10%'}}>작성일</HeaderCell>
            <HeaderCell style={{width: '10%'}}>작성자</HeaderCell>
            <HeaderCell style={{width: '15%'}}></HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <BodyCell component="th" scope="row">
                <Checkbox/>
              </BodyCell>
              <BodyCell>제목</BodyCell>
              <BodyCell>작성일</BodyCell>
              <BodyCell>작성자</BodyCell>
              <BodyCell>
                <Grid container spacing={0} >
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <IconButton className={classes.button}>
                      <SettingsIcon className={classes.icon}/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <IconButton className={classes.button}>
                      <DeleteIcon className={classes.icon}/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    {
                      isPublic? 
                        <IconButton className={classes.button}>
                          <LockOpenIcon className={classes.icon}/>
                        </IconButton>
                        :
                        <IconButton className={classes.button}>
                          <LockIcon className={classes.icon}/>
                        </IconButton>
                    }
                  
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

Content.propTypes = {
  title: PropTypes.string
}
