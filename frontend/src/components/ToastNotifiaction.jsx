import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ToastNotification = ({ open, message, severity, handleClose }) => {
  const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
  ));

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
