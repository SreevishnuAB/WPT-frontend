import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DayPicker from 'react-day-picker';
import Dialog from '@material-ui/core/Dialog'; 
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import 'react-day-picker/lib/style.css';
import ToastNotification from './toast';



const drawerWidth = 240;
const useStyles = makeStyles((theme)=>({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '25px',
  },
  toolbarPlaceholder: theme.mixins.toolbar,
  form: {
    marginTop: '30px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#23C94A',
    height: '100%',
    width: '50%',
    padding: '40px',
    backgroundColor: '#021D25',
    borderRadius: '5px',
    float: 'left',
    [theme.breakpoints.down('sm')]: {
      width:'350px',
    },
  },
  formRow: {
    display:'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems:'space-around',
      width:'350px',
    },
  },
  formRowBtn: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center'
  },
  formElement: {
    width: '250px',
    backgroundColor:'#001215',
    textAlign:'center',
    margin: '0px 10px 20px 10px',
  },
  createBtn:{
    color: '#23C94A',
    backgroundColor: '#001215',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#23C94A',
    padding: '5px 35px 5px 35px',
    width: '200px',
    margin: '0px 10px 20px 10px',
  },
  DialogTitle: {
    color: '#23C94A',
    backgroundColor:'#001215',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#23C94A'
  },
}));

export default function CreateWorkReport(props){

  const classes = useStyles();

  const deptLabel = React.useRef(null);
  const subDeptLabel = React.useRef(null);
  const semLabel = React.useRef(null);
  const yearLabel = React.useRef(null);
  const [deptLabelWidth, setDeptLabelWidth] = useState(0);
  const [subDeptLabelWidth, setSubDeptLabelWidth] = useState(0);
  const [semLabelWidth, setSemLabelWidth] = useState(0);
  const [yearLabelWidth, setYearLabelWidth] = useState(0);
  const [openDialog,setOpenDialog] = useState(false);
  const [openToast,setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({error:false,messageText:''});


  const [desc,setDesc] = useState('');
  const [department,setDept] = useState('');
  const [subDepartment,setSubDept] = useState('');
  const [semester,setSemester] = useState('');
  const [batch,setBatch] = useState('');
  const [date,setDate] = useState('');

  const handleDialog = ()=>{
    setOpenDialog(!openDialog);
  }

  const handleToast = (open)=>{
    setOpenToast(open);
  }

  const handleDate = (day)=>{
    let dd = String(day.getDate()).padStart(2,'0');
    let mm = String(day.getMonth() + 1).padStart(2,'0');
    let yyyy = day.getFullYear();
    setDate(`${dd}/${mm}/${yyyy}`);
    setOpenDialog(!openDialog);
  }

  const handleCreate = ()=>{
    /*TODO post work report to db*/
    if(!desc || !department || !subDepartment || !semester || !batch || !date)
      setToastMessage({error:true,messageText:"All fields must be filled"});
    else
      setToastMessage({error:false, messageText:`Description: ${desc}\nDept: ${department}\nSub-dept: ${subDepartment}\nSem: ${semester}\nYear: ${batch}\nDate: ${date}`});
    setOpenToast(!openToast);
  }
  React.useEffect(() => {
    setDeptLabelWidth(deptLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    setSubDeptLabelWidth(subDeptLabel.current.offsetWidth);
  }, []);
  
  React.useEffect(() => {
    setSemLabelWidth(semLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    setYearLabelWidth(yearLabel.current.offsetWidth);
  }, []);

  let dept = ['CIR']; //add other departments here, if any
  const optionsDept = dept.map((value,index) => (
    <MenuItem key={index} value={value}>{value}</MenuItem>
    ));

  let subDept = ["Training", "Placement", "Support"];
  const optionsSubDept = subDept.map((value,index) => (
    <MenuItem key={index} value={value}>{value}</MenuItem>
    ));

  let sem = ["S1", "S2"];
  const optionsSem = sem.map((value,index) => (
    <MenuItem key={index} value={value}>{value}</MenuItem>
    ));

  let curDate = new Date();
  let year = curDate.getFullYear();
  year = (curDate.getMonth() < 6 )? year-1:year;

  let years = (new Array(5)).fill(0);

  const optionsYear = years.map((value, index)=>(
    <MenuItem key={index} value={value + year}>{value + year--}</MenuItem>
  ));

  return(
    <div className={classes.root}>
      <div className={classes.toolbarPlaceholder}/>
      <div className={classes.form}>
        <div className={classes.formRow}>
          <TextField
            size="small"
            className={classes.formElement}
            id="outlined-work-description-input"
            label="Work Description"
            variant="outlined"
            value={desc}
            onChange={(e)=>{setDesc(e.target.value)}}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            size="small"
            className={classes.formElement}
            id="outlined-date-readonly"
            label="Date"
            variant="outlined"
            readOnly
            value={date}
            onClick={handleDialog}
          />
          <FormControl variant="outlined" className={classes.formElement}>
            <InputLabel ref={deptLabel} id="label-select-dept">
              Department
            </InputLabel>
            <Select
              labelId="label-select-dept"
              id="select-dept"
              labelWidth={deptLabelWidth}
              value={department}
              onChange={(e)=>{setDept(e.target.value)}}
            >
              {optionsDept}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formElement}>
            <InputLabel ref={subDeptLabel} id="label-select-sub-dept">
              Sub-department
            </InputLabel>
            <Select
              labelId="label-select-sub-dept"
              id="select-sub-dept"
              labelWidth={subDeptLabelWidth}
              value={subDepartment}
              onChange={(e)=>{setSubDept(e.target.value)}}
            >
              {optionsSubDept}
            </Select>
          </FormControl>
        </div>
        <div className={classes.formRow}>
          <FormControl variant="outlined" className={classes.formElement}>
            <InputLabel ref={semLabel} id="label-select-sem">
              Semester
            </InputLabel>
            <Select
              labelId="label-select-sem"
              id="select-sem"
              labelWidth={semLabelWidth}
              value={semester}
              onChange={(e)=>{setSemester(e.target.value)}}
            >
              {optionsSem}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formElement}>
            <InputLabel ref={yearLabel} id="label-select-year">
              Year
            </InputLabel>
            <Select
              labelId="label-select-year"
              id="select-year"
              labelWidth={yearLabelWidth}
              value={batch}
              onChange={(e)=>{setBatch(e.target.value)}}
            >
              {optionsYear}
            </Select>
          </FormControl>
        </div>
          <div className={classes.formRowBtn}>
            <Button className={`${classes.createBtn} btn-create`} onClick={handleCreate}>Create Report</Button>
          </div>
      </div>
      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle className={classes.DialogTitle} id="select-date">Select Date</DialogTitle>
        <DayPicker selectedDays={new Date(date)} onDayClick={handleDate} />
      </Dialog>
      <ToastNotification open={openToast} onClose={handleToast} message={toastMessage}/>
    </div>
  );
}