import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Category(props) {

  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.color,
      padding: `${theme.spacing(1)}px`,
      display: "flex"
    },
    icon: {
      color: theme.palette.content.item.icon.color,
    },
    auto: {
      width: "100%",
      display: 'flex',
      alignItems: "center",
    },
    input: {
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
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
    }

  }));

  let selected = [];
  let holder = "";

  if(props.selected !== undefined && props.selected !== ""){
    selected = props.selected.split(",");
  }else{
    holder = "카테고리를 선택하세요.";
  }

  const [no, setNo] = React.useState(selected);
  const [placeholder, setPlaceholder] = React.useState(holder);

  const classes = useStyles();

  const change = (value) => {
    const idx = value.length - 1

    if(idx < 0){
      setPlaceholder("카테고리를 선택하세요.");
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

    <Paper elevation={1} className={classes.paper}>
      <Autocomplete
        multiple
        className={classes.auto}
        id="category"
        size="small"
        limitTags={3}
        options={category}
        getOptionSelected={(option, value) => {
          return option.no === value.no;
        }}
        disableCloseOnSelect
        defaultValue={() => {
          return no.map((val) => {
            return category.filter(cate => cate.no === parseInt(val))[0];
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
            className={classes.input} 
            placeholder={placeholder} />
        }
      />
      <IconButton className={classes.icon} type="submit">
        <SearchIcon/>
      </IconButton>
      <input
        type="hidden" 
        value={no}
        name="category" />
    </Paper>
  )
}

Category.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  selected: PropTypes.string
}
