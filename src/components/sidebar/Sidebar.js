import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { Divider, Drawer } from '@material-ui/core';

export default function Sidebar(props) {

  const useStyles = makeStyles(theme => ({

  }));

  const { open, onClose } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
    >
      <Divider className={classes.divider} />
    </Drawer>
  );
}


Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};