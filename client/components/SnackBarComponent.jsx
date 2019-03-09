import React from 'react';

import { Snackbar, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: "green"
  },
});

function SnackBarComponent({ open, message, handleClose }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={message ? <span id="message-id">{message}</span> : null}
      />
    </div>
  )
}

export default withStyles(styles)(SnackBarComponent);
