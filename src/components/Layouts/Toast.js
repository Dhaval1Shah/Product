import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ToastAlerts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.isOpen);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
            </IconButton>
          }
        >
          Close me!Close me!Close me!Close me!Close me!Close me!Close me!Close me!Close me!
        </Alert>
      </Collapse>
    </div>
  );
}
