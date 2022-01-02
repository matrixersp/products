import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    color: theme.palette.warning.main,
    '& div': {
      textAlign: 'center',
      marginTop: '24px'
    }
  },
  warningIcon: {
    fontSize: '4rem',
    margin: '0 auto',
    color: theme.palette.warning.main
  },
  dialogContent: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  actionButton: {
    minWidth: '140px',
    margin: '0 auto',
    marginBottom: 12 
  }
}));

export default function AlertDialog({ imageNames, open, onClose, onConfirm }) {
  const classes = useStyles();

  const renderImageNames = () => {
    return (
      <ol>
        {imageNames?.map((name, idx) => (
          <li key={idx}>
            <Typography>{name}</Typography>
          </li>
        ))}
      </ol>
    );
  }

  return (
      <Dialog onClose={onClose} aria-labelledby="alert-dialog" open={open} maxWidth="xs">
        <DialogTitle className={classes.dialogTitle}>
          <div>
            <WarningIcon className={classes.warningIcon} color="error"/> 
            <Typography variant="h4">Warning</Typography>
          </div>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography gutterBottom>
            The following images are not going to be uploaded because they already exit.
          </Typography>
          { renderImageNames()}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button autoFocus onClick={onConfirm} color="primary" variant="contained" className={classes.actionButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}
