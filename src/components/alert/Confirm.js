import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Confirm(props) {

  const { open, onClose, onSuccess, onFail, onApi, onCallBack } = props;

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = async () => {
    const pwd = document.getElementById('confirmPassword').value;
    const response = await onApi(pwd);

    if(response === undefined){
      return;
    }
    
    if(response.status === 200){
      if(response.data === undefined || response.data === ""){
        onFail();
      }else{
        onSuccess(response.data);
        onCallBack();
      }
    }else{
      onFail();
    }
  }

  const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: theme.palette.confirm.button.bgColor,
      border: theme.palette.confirm.button.border,
      color: theme.palette.confirm.button.color,
      textTransform: "none"
    },
  }));

  const classes = useStyles();

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
         비밀번호를 입력하세요
        </DialogContentText>
        
        <Paper variant="outlined" className={classes.paper}>
          <InputBase 
            className={classes.input}
            id="confirmPassword" 
            type="password"
            fullWidth 
            variant="filled"
            />
        </Paper>
        
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

