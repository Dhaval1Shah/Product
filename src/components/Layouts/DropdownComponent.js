import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropdownComponent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState((props.inputValue && Object.keys(props.inputValue).length > 0) ? props.inputValue : []);
  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange(event.target.value)
  };

  let dropdownOptions = [];
  if (Object.keys(props.inputOptions).length > 0) {
    dropdownOptions.push(<MenuItem key={Math.random()} value=""><em>Select {props.inputName}</em></MenuItem>);
    Object.keys(props.inputOptions).forEach((key) => {
      dropdownOptions.push(<MenuItem key={key} value={props.inputOptions[key].name}>{props.inputOptions[key].name}</MenuItem>)
    })
  }
  else {
    dropdownOptions.push(<MenuItem key={Math.random()} value=""><em>Select {props.inputName}</em></MenuItem>);
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.inputName}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={(e) => { handleChange(e, props.inputTypeMultiple) }}
          multiple={props.inputTypeMultiple}
          label={props.inputName}
        >
          {dropdownOptions}
        </Select>
      </FormControl>
    </div>
  );
}



