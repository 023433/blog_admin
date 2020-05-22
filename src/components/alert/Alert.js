import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Alert(props) {

  const { open, onClose, onSuccess, message } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    onSuccess();
  }

  const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: theme.palette.confirm.button.bgColor,
      border: theme.palette.confirm.button.border,
      color: theme.palette.confirm.button.color,
      textTransform: "none"
    },
    title: {
      color: theme.palette.confirm.button.color,
    }
  }));

  const classes = useStyles();

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText className={classes.title}>
         {message}
        </DialogContentText>      
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          className={classes.button}
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          size="small"
          className={classes.button}
          onClick={handleConfirm}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

