import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Warning(props) {
  const { open, onClose} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Alert 
        severity="error"
        action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
        }>
        <AlertTitle>{props.message}</AlertTitle>
      </Alert>
    </Dialog>
  );
}