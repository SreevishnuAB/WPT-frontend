import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const drawerWidth = 240;
const useStyles = makeStyles((theme)=>({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    padding: '25px',
  },
  toolbarPlaceholder: theme.mixins.toolbar,
  form: {
    marginTop: '20px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#23C94A',
    height: '100%',
    width: '100%',
    padding: '50px',
    backgroundColor: '#021D25',
    borderRadius: '5px',
    float: 'left'
  },
  formElement: {
    width: '250px',
    backgroundColor:'#001215',
    marginRight: '20px',

  },
  submitBtn:{
    color: '#23C94A',
    backgroundColor: '#001215',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#23C94A',
    width: '50px',
    padding: '5px 35px 5px 35px',
    marginLeft: '90px'
  },
}));

export default function CreateWorkReport(props){

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return(
    <div className={classes.root}>
      <div className={classes.toolbarPlaceholder}/>
      <div className={classes.form}>
        <TextField
          className={`${classes.formElement} form-element`}
          id="outlined-work-description-input"
          label="Work Description"
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
          className={classes.formElement}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          className={classes.formElement}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
        <br/>
      </div>
    </div>
  );
}