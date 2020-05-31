import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Timestamp(props) {

  const date = props.dateTime;
  let createDate = new Date(date);

  if(navigator.platform.indexOf('Mac') > -1){
    createDate = new Date(date + "+09:00");
  }

  if(navigator.platform.indexOf('iPhone') > -1){
    createDate = new Date(date + "+09:00");
  }

  function getResultDate(createDate){

    const year = createDate.getFullYear()
    let month = createDate.getMonth()+1;
    let day = createDate.getDate();

    if(month < 10){
      month = `0${month}`;
    }

    if(day < 10){
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`
  }

  function getResultTime(createDate){

    let hours = createDate.getHours();
    let minutes = createDate.getMinutes();
    let seconds = createDate.getSeconds();

    if(hours < 10){
      hours = `0${hours}`;
    }

    if(minutes < 10){
      minutes = `0${minutes}`;
    }

    if(seconds < 10){
      seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`
  }

  function getResultDateTime(createDate){
    return `${getResultDate(createDate)} ${getResultTime(createDate)}`;
  }

  function getShowDateTime(createDate){
    const now = new Date();
  
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();
  
    const createYear = createDate.getFullYear()
    const createMonth = createDate.getMonth();
    const createDay = createDate.getDate();

    if(nowYear !== createYear || nowMonth !== createMonth || nowDay !== createDay){
      return getResultDate(createDate);
    }

    return getResultTime(createDate);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Typography
      className={props.className}
      variant={props.variant}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      {
      open? 
          getResultDateTime(createDate)
        :getShowDateTime(createDate)
      }
    </Typography>
  );
}
