import React, { useState, useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Chart from "react-google-charts";
import MenuContext from "../../../context/MenuContext";
import { PropertyMenu } from '../../../context/PropertyMenu';

export default function MemoryChart(props) {

  const { theme } = useContext(MenuContext);

  // eslint-disable-next-line
  const [memory, setMemory] = useState([["Time", "Percent"]]);

  const useStyles = makeStyles(theme => ({
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: theme.palette.dashboard.card.backgroundColor,
    },
    chart: {
      display: "flex",
      minHeight: "300px",
      marginTop: theme.spacing(1),
      color: theme.palette.dashboard.card.icon.color,
    },
    name: {
      color: theme.palette.dashboard.card.color,
      fontWeight: 700,
    },
  }));

  const classes = useStyles();

  memory.push([getTime(), props.percent])


  function getTime(){
    const createDate = new Date();

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


  let bgColor = theme === PropertyMenu.Light ? "#FFF" : "#BDBDBD";

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            Memory 사용량
          </Typography>
        </div>
        <div className={classes.chart} >
          <Chart
            width={'100%'}
            height={'300px'}
            chartType="AreaChart"
            data={memory}
            options={{
              legend: 'none',
              vAxis: { minValue: 0, maxValue: 100 },
              chartArea: { width: '85%', height: '95%' },
              backgroundColor: bgColor,
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
      </CardContent>
    </Card>
  );

}

MemoryChart.propTypes = {
  percent: PropTypes.number.isRequired
};