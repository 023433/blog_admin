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

  function createData(no, subject, createDate, wirter) {
    return { no, subject, createDate, wirter };
  }
  
  const rows = [
    createData(1, "subject1", "createDate1", "wirter1"),
    createData(2, "subject2", "createDate2", "wirter2"),
    createData(3, "subject3", "createDate3", "wirter3"),
    createData(4, "subject4", "createDate4", "wirter4"),
    createData(5, "subject5", "createDate5", "wirter5"),
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

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }
  // eslint-disable-next-line
  const [isPublic, setPublic] = React.useState(true);
  const [checked, setChecked] = React.useState([]);
  const no = rows.map(value => {return value.no});

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  return (

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <HeaderCell style={{width: '5%'}}>
              <Checkbox 
                className={classes.checkbox}
                color="default" 
                onClick={handleToggleAll(no)}
                checked={numberOfChecked(no) === no.length && no.length !== 0}
                indeterminate={numberOfChecked(no) !== no.length && numberOfChecked(no) !== 0}/>
            </HeaderCell>
            <HeaderCell style={{width: '60%'}}>제목</HeaderCell>
            <HeaderCell style={{width: '10%'}}>작성일</HeaderCell>
            <HeaderCell style={{width: '10%'}}>작성자</HeaderCell>
            <HeaderCell style={{width: '15%'}}></HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no}>
              <BodyCell component="th" scope="row">
                <Checkbox 
                  onClick={handleToggle(row.no)}
                  checked={checked.indexOf(row.no) !== -1} 
                  color="default"/>
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
