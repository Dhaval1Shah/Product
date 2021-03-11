import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function PageLoader() {
  const classes = useStyles();

  return (
    <div style={{ display: 'grid', height: '100vh' }}><div style={{ margin: 'auto', verticalAlign: 'middle' }}> <CircularProgress /></div></div>
  );
}
