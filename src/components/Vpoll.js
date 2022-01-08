import React, { useEffect, useState } from 'react';
import'./Vpoll.css';
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider,IconButton}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { v4 as uuidv4 } from 'uuid';
import { Delete } from '@material-ui/icons';
import M from "materialize-css";


function Vpoll() {
    let navigate = useNavigate();
    const close = true;

    const [lobbies,setLobbies] = useState([]);
    const [clobbies,setClobbies] = useState([])
    useEffect(()=> {fetch("/usrlobbies").then(res=>res.json()).then(data=>setLobbies(data))
    },[]);

    useEffect(()=> {fetch("/clsrlobbies").then(res=>res.json()).then(data=>setClobbies(data))
    },[]);
    
    function createpoll()
    {
        const id=uuidv4();
        navigate("/poll/"+id);
    }

    function livepoll()
    {
        const id=uuidv4();
        navigate("/livepollT");
    }

    function Closelobby(stuid)
    {
        const id=uuidv4();
        navigate("/closepoll/"+stuid);
    }

    function Livelobby(stuid){
        console.log(stuid);
        navigate("/LivepollT/"+stuid);
    }

    const Closepoll = (stuid) => {
        fetch("/close", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            close,
            stuid
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error });
            } else {
              console.log(close)
              M.toast({
                html: "Successfully Updated!",
                classes: "#2e7d32 green darken-3",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div className='coomtainer'>
            <div className='actoll'>
                <h1>Active Polls</h1>
                
                <h2>No Active Polls</h2>
                {lobbies.map(lob=>(
                <div className='polsta'>
                    <div className='poldet' key={lob._id}>Poll Details:
                        <h3 className='pollin'>poll title:{lob.lobbyName}</h3>
                        <h3 className='poltim'>poll description: {lob.lobbyDescription}</h3>
                        <h3 className='polly'>link: pollStu/{lob.lobbyId}</h3>
                    </div>
                    <div className='sta'>stats:</div>
                    <div className='futons'>
                        {/* <Link to={{pathname:"/LivepollT"+lob.lobbyId}}> */}
                        <Button className="viewpoll" onClick={()=>Livelobby(lob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW LOBBY</Button>
                        
                        <Button className="deletepoll" onClick={()=>Closepoll(lob.lobbyId)} size="large" variant="contained" endIcon={<Delete/>}>END POLLS</Button>
                    </div>
                </div>
                ))}
            </div>
            <div className='clooll'>
                <h1>Closed Polls</h1>
                <h2>No Closed Polls</h2>
                {clobbies.map(Clob=>(
                <div className='closta'>
                    <div className='poldet'key={Clob._id}>Poll Details:
                        <h3 className='pollin'>poll title:{Clob.lobbyName}</h3>
                        <h3 className='poltim'>poll description: {Clob.lobbyDescription}</h3>
                        <h3 className='polly'>link: pollStu/{Clob.lobbyId}</h3>
                    </div>
                    <div className='sta'>stats:</div>
                    <div className='futons'>    
                        <Button className="viewpoller" onClick={()=>Closelobby(Clob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW POLL</Button>
                    </div>
                </div>
                ))}
            </div>
            <div className='crells'>
            <Button className="cpoll" onClick={createpoll} size="large" variant="contained" endIcon={<AddIcon/>}>CREATE POLL</Button>
            </div>
        </div>
    )
}

export default Vpoll
