import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Paper from '@material-ui/core/Paper';

export default function PostPagination(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.color,
      padding: `${theme.spacing(1)}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    paging: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    pagination: {
      "& ul li a": {
        backgroundColor: theme.palette.content.paging.backgroundColor,
        color: theme.palette.content.paging.color,
      },
      "& ul li button span": {
        backgroundColor: theme.palette.content.paging.backgroundColor,
        color: theme.palette.content.paging.color,
      },
      "& .Mui-selected": {
        backgroundColor: theme.palette.content.paging.selected.backgroundColor,
        color: theme.palette.content.paging.selected.color,
        fontWeight: theme.palette.content.paging.selected.fontWeight,
      }
    }
  }));

  const classes = useStyles();
  const pageable = props.pageable? props.pageable : {};
  const path = props.path? props.path : "";
  const label = props.label? props.label : "page";
  const currentPage = pageable.pageNumber? (pageable.pageNumber + 1) : 1;
  const search = props.search;

  let searchStr = "";

  if( typeof(search) == "object"){
    for(var key in search) {
      searchStr += "&" + key + "=" + search[key];
    }
  }

  return (
    <Paper elevation={1} className={classes.paper}>
      <Pagination
        className={classes.pagination} 
        count={pageable.totalPages} 
        page={currentPage}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={{ pathname: `/${path}`, query: { page: item.page } , search: `?${label}=${item.page}${searchStr}`}} 
            {...item}
          />
        )}
      />
    </Paper>
  );
}