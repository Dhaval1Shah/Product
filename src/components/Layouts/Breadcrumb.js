import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Breadcrumb(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" onClick={(e) => { props.history.push('/dashboard') }}>
          CSPI-EMS
        </Link>
        <Link color="inherit" onClick={(e) => { props.history.push(props.primaryPageLink) }}>
          {props.primaryPageName}
        </Link>
        {(props.isSecondaryPage) ? <Typography color="textPrimary">{props.secondaryPageName}</Typography> : ""}
      </Breadcrumbs>
    </div>
  );
}
