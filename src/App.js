import React, { useState } from 'react';
import './App.css';
import NavBar from  './components/navbar';
import Login from './components/login';

export default function App(props) {

  const [auth,setAuth] = useState({state: false, user:{name: "", designation: ""}});
  const handleAccess = (newAuthObj) =>{
    setAuth(newAuthObj);
  }  

//  if(!auth.state) setAuth({state:true,user: {name: "User", designation: "Group Head"}}); //for testing
  
  const [items, contents] = ( auth.state && auth.user.designation.toLowerCase() === "group head")?
                  [["Work Reports By Date","Work Reports By User"], ["Tab 1", "Tab 2"] ]:
                  [["Create Work Report", "View Work Reports"],["Tab 3","Tab 4"]];
//                  console.log(contents);
  return(
    <React.Fragment>
      <NavBar header={'Work Progress Tracker'} tablabels={items} contents={contents} login={!auth.state} user={auth.user} onLogout={handleAccess}/>
      {!auth.state && <Login login={!auth.state} onLogin={handleAccess}/>}
    </React.Fragment>
  );
}
