import React, { useState } from 'react';
import './App.css';
import NavBar from  './components/navbar';
import Login from './components/login';
import CreateWorkReport from './components/createworkreport';
import ViewWorkReport from './components/viewworkreport';
import ViewWorkRepByDate from './components/viewworkrepbydate';
import ViewWorkRepByUser from './components/viewworkrepbyuser';
export default function App(props) {

  const [auth,setAuth] = useState({state: false, user:{name: "", designation: ""}});
  const [currentTab, setCurrentTab] = useState("db-btn0");

  const handleAccess = (newAuthObj)=>{
    setAuth(newAuthObj);
  }
  
  const handleTab = (selectedTab)=>{
    setCurrentTab(selectedTab);
  }

//  if(!auth.state) setAuth({state:true,user: {name: "User", designation: "Group Head"}}); //for testing
  
  const items = ( auth.state && auth.user.designation.toLowerCase() === "group head")?
                  ["Work Reports By Date","Work Reports By User"]:
                  ["Create Work Report", "View Work Reports"];
//                  console.log(contents);
  return(
    <React.Fragment>
      <NavBar tablabels={items} login={!auth.state} user={auth.user} onTabSwitch={handleTab} onLogout={handleAccess}/>
      {!auth.state && <Login login={!auth.state} onLogin={handleAccess}/>}
      {(auth.user.designation.toLowerCase() === "faculty" && currentTab === "db-btn0")?<CreateWorkReport/>:
       (auth.user.designation.toLowerCase() === "faculty" && currentTab === "db-btn1")?<ViewWorkReport/>:
       (auth.user.designation.toLowerCase() === "group head" && currentTab === "db-btn0")?<ViewWorkRepByDate/>:
       (auth.user.designation.toLowerCase() === "group head" && currentTab === "db-btn1")?<ViewWorkRepByUser/>:''
       /*TODO error component*/}
    </React.Fragment>
  );
}
