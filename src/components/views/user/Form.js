import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Form(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.content.table.body.backgroundColor,
      color: theme.palette.content.table.body.color,
    },
    typography: {
      backgroundColor: theme.palette.content.table.body.backgroundColor,
      color: theme.palette.content.table.body.color,
      display: "inline-block",
      lineHeight: "normal",
      verticalAlign: "middle",
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    input: {
      border: "none",
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
    },
    select: {
      color: theme.palette.content.item.color,
      "&:before": {
        borderBottom: "none",
      },
      "&:after": {
        borderBottom: "none",
      }
    },    
    icon: {
      color: theme.palette.content.item.icon.color,
    },

    inputAuto: {
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none",
      },
    }
  }));

  const classes = useStyles();
  const [activate, setActivate] = React.useState(true);

  let selected = [];
  let holder = "";

  if(props.selected !== undefined && props.selected !== ""){
    selected = props.selected.split(",");
  }else{
    holder = "권한을 선택하세요.";
  }

  const [no, setNo] = React.useState(selected);
  const [placeholder, setPlaceholder] = React.useState(holder);

  const handleChange = (event) => {
    setActivate(event.target.value);
  };


  const change = (value) => {
    const idx = value.length - 1

    if(idx < 0){
      setPlaceholder("권한을 선택하세요.");
      setNo([]);
      return
    }

    const isContains = no.some(val => val === value[idx].no);

    if(isContains){
      setNo((chips) => chips.filter((chip) => chip !== value[idx].no));
    }else{
      setNo((chips) => chips.concat(value[idx].no));
    }

    setPlaceholder("");
  }

  let res = [];

  const initRules = (data) =>{
    
    if(data === null){
      res.push({"no": "1", "title": "rule.title"});

      return data;
    }

    data.map((rule) => {
      res.push({"no": rule.no, "title": rule.title});
      return null;
    });

    return res;
  }

  const rules = initRules(props.data);
  return (

    <Card component={Paper} elevation={0} className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.typography}>사용자 정보</Typography>

        <Divider className={classes.divider}/>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.typography}>아이디</Typography>
          </Grid>
          <Grid item xs={9}>
            <InputBase 
              className={classes.input}
              fullWidth 
              placeholder="아이디"
              variant="filled"
              name="id"/>
          </Grid>
        </Grid>

        <Divider className={classes.divider}/>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.typography}>이름</Typography>
          </Grid>
          <Grid item xs={9}>
            <InputBase 
              className={classes.input}
              fullWidth 
              placeholder="이름"
              variant="filled"
              name="name"/>
          </Grid>
        </Grid>

        <Divider className={classes.divider}/>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.typography}>비밀번호</Typography>
          </Grid>
          <Grid item xs={9}>
            <InputBase 
              className={classes.input}
              fullWidth 
              placeholder="비밀번호"
              type="password"
              variant="filled"
              name="pwd"/>
          </Grid>
        </Grid>

        <Divider className={classes.divider}/>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.typography}>상태</Typography>
          </Grid>
          <Grid item xs={9}>
            <Select
              fullWidth
              value={activate}
              onChange={handleChange}
              className={classes.select}>
              <MenuItem value={true}>활성</MenuItem>
              <MenuItem value={false}>비활성</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Divider className={classes.divider}/>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.typography}>권한</Typography>
          </Grid>
          <Grid item xs={9}>
            <Autocomplete
              multiple
              className={classes.auto}
              id="rules"
              size="small"
              limitTags={3}
              options={rules}
              getOptionSelected={(option, value) => {
                return option.no === value.no;
              }}
              disableCloseOnSelect
              defaultValue={() => {
                return no.map((val) => {
                  return rules.filter(rule => rule.no === parseInt(val))[0];
                })
              }}
              onChange={(event, value) => change(value)}
              getOptionLabel={(option) => option.title}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    color="default"
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  className={classes.inputAuto} 
                  placeholder={placeholder} />
              }
            />
          </Grid>
        </Grid>


      </CardContent>
    </Card>

  )
}

Form.propTypes = {
  data: PropTypes.array.isRequired
}
