import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import {Button}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const  useStyles = makeStyles({
    lobbyDiv:{
        width:"80vw",
        display:"flex",
        flexDirection:"column",
        backgroundColor: "#323232",
    },
    lobbyDataDiv:{
        display:"flex",
        flexDirection:"row",
        marginTop:"5%",
        minHeight:"20vh",
        width:"100%",
        borderTop: "6px solid rgb(103, 58, 183)",
        borderLeft:"6px solid rgb(103, 58, 183)",
        padding:"1%",
        color:"white",
        backgroundColor: "#121212",
        borderRadius:"10px 0px 0px 0px",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
    },
    lobbyNameDesc:{
        width:"50%",
        borderRight:"3px solid rgb(103, 58, 183)",
    },
    lobbyPoll:{
        width:"25%",
        borderRight:"3px solid rgb(103, 58, 183)",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        '& h3':{
            marginTop:"3%",
            fontSize:"50px",
        },
    },
    lobbyBtn:{
        width:"25%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        '& button':{
            backgroundColor:"rgb(103, 58, 183)",
            color:"white",
            border:"none",
            outline:"none",
            width:"50%",
            padding:"1%",
            fontSize:"25px",
            opacity:"0.6",
            transition:"0.5s",
            '&:hover':{
                boxShadow: "0 0 5px 2px #999",
                opacity:"1",
            }
        },
    },
});
function ViewLobby() {
    const classes = useStyles();
    let navigate = useNavigate();
    const createid=uuidv4();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [Lobby, setLobby] = useState({
        lobbyId:createid,
        lobbyName:"",
        lobbyDescription:"",
        studentformId:"",
        pollId:[],
        userId:""
    });
    let name, value;
    const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLobby({ ...Lobby, [name]: value });
	};
    const Lob = async(e)=>{
        if(Lobby.lobbyName=="" || Lobby.lobbyDescription==""){
            console.log("Please fill all the fields");
        }
        else{
            const{lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId} = Lobby;
            const res = await fetch("/createnewlobby", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId})
            })
            navigate("/poll/"+Lobby.lobbyId);
        }
    }
    const [lobbies,setLobbies] = useState([]);
    useEffect(()=> {fetch("/usrlobbies").then(res=>res.json()).then(data=>setLobbies(data))
    },[]);
    function viewcurrentPoll(i){
        navigate("/view_lobby_poll/"+i);
    }
    
    return (
        <div>
        <div style={{minHeight:"100vh",width:"100%",display:"flex",justifyContent:"center",backgroundColor: "#323232"}}>
            <div className={classes.lobbyDiv}>
            {lobbies.map(lob=>(
             <div className={classes.lobbyDataDiv} key={lob._id}>
             <div className={classes.lobbyNameDesc}>
                 <h1><u>{lob.lobbyName}</u></h1>
                 <br/>
                 <p>{lob.lobbyDescription}</p>
             </div>
             <div className={classes.lobbyPoll}>
                 <h1>Polls Created</h1>
                 <h3>{lob.pollId.length}</h3>
             </div>
              <div className={classes.lobbyBtn}>
                  <button>View</button>
              </div>
          </div>
      ))}
            </div>
            
        </div>
        <Button color="secondary" className={classes.cpoll} onClick={handleClickOpen} size="large" variant="contained" endIcon={<AddIcon/>}>CREATE NEW LOBBY</Button>
                &nbsp;&nbsp;
                <Dialog open={open} onClose={handleClose}>
              <DialogTitle>LOBBY</DialogTitle>
              <DialogContent>
                <DialogContentText>
                <TextField sx={{width:"30em"}} name="lobbyName" value={Lobby.lobbyName} autoFocus margin="dense" id="name" label="Enter Lobby Name" type="text" fullWidth variant="standard" onChange={handleInputs}/>
                <TextField 	name="lobbyDescription"	value={Lobby.lobbyDescription}margin="dense" id="outlined-multiline-static" label="Lobby Description" type="text" fullWidth  multiline rows={2} onChange={handleInputs}/>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} >Cancel</Button>
                <Button onClick={Lob}>Create</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default ViewLobby