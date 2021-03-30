import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


export default function LoadderButton(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    if (props && typeof props.onClickFn === 'function') {
      await props.onClickFn();
    }
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          type={(props && props.btnType) ? props.btnType : 'button'}
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleButtonClick}
        >
          {props.btnText}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: '10% auto',
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
