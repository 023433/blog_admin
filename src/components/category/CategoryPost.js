import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Category(props) {

  const useStyles = makeStyles(theme => ({
    paper: {
      padding: `${theme.spacing(1)}px`,
    },
    input: {
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
    }

  }));

  const [no, setNo] = React.useState([]);

  const classes = useStyles();

  const change = (value) => {
    const idx = value.length - 1

    if(idx < 0){
      setNo([]);
      return
    }

    const isContains = no.some(val => val === value[idx].no);

    if(isContains){
      setNo((chips) => chips.filter((chip) => chip !== value[idx].no));
    }else{
      setNo((chips) => chips.concat(value[idx].no));
    }
  }

    
  let res = [];

  const initCategory = (data) =>{
    
    if(data === null){
      return data;
    }

    data.map((category) => {
      res.push({"no": category.no, "title": category.title});

      if(category.children !== null){
        initCategory(category.children);
      }
      return null;
    });

    return res;
  }

  const category = initCategory(props.data);

  return (
    <React.Fragment>

      <Paper elevation={1} className={classes.paper}>
        <Autocomplete
          multiple
          id="category"
          size="small"
          limitTags={3}
          options={category}
          disableCloseOnSelect
          onChange={(event, value) => change(value)}
          getOptionLabel={(option) => option.title}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
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
              className={classes.input} 
              placeholder="카테고리를 선택하세요." />
          }
        />
      </Paper>
      <input
        type="hidden" 
        value={no}
        name="category" />
    </React.Fragment>
  )
}

Category.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
}
