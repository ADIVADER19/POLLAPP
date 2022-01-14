import React, { useEffect, useState } from 'react';
import'./Vpoll.css';
import {Typography,Button,makeStyles,IconButtons,Dialog,DialogTitle,DialogActions,TextField,DialogContent,DialogContentText}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { v4 as uuidv4 } from 'uuid';
import { Delete, DeleteOutlined, Visibility } from '@material-ui/icons';
import M from "materialize-css";
import CircularProgress from '@mui/material/CircularProgress';
import './Nav.css';
import PollIcon from '@material-ui/icons/Poll';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const  useStyles = makeStyles({
  main:{
    boxSizing:"border-box",
    fontFamily: "Roboto,Arial,sans-serif",
    textTransform:"capitalize",
    position:"fixed",
    zIndex:"2",
    top:"0",
    left:"0",
    right:"0",
    backgroundColor:"whitesmoke",
    boxShadow:"0 5px 10px rgba(0,0,0,.1)",
    padding:"0px 2%",
    display:"flex",
    alignItems:"center",
    height:"10vh",
    width:"100vw",
    justifyContent:"space-between",
    '& a':{
        textDecoration:"none",
    },
    '& #toggle':{
        display:"none",
    },
    '& label':{
        display:"none",
    },
    '& nav':{
        '& ul':{
            listStyle:"none",
            '& li':{
                position:"relative",
                float:"left",
                
                '& ul':{
                    position:"absolute",
                    boxShadow:"0 5px 10px rgba(0,0,0,.1)",
                    left:"0",
                    width:"200px",
                    backgroundColor:"whitesmoke",
                    display:"none",
                    '& li':{
                        width:"100%",
                        borderTop: "1px solid rgba(0,0,0,.1)",
                    },
                    
                },
                '&:hover':{
                    '& ul':{
                        display:"initial",
                    }
                },
                '&:focus-within':{
                    '& ul':{
                        display:"initial",
                    }
                },
                '& a':{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    padding:"3vh",
                    color:"#333",
                    '&:hover':{
                        color:"#f4511e",
                    }
                }
            }
        }
    },
    ["@media(max-width: 650px)"]: {
        '& label':{
            display:"initial",
            zIndex:"100",
        },
        
        '& nav':{
            position:"absolute",
            top:"100%",
            left:"0",
            right:"0",
            backgroundColor:"whitesmoke",
            borderTop:"1px solid rgba(0,0,0,.1)",
            display:"none",
            '& ul':{
                '& li':{
                    width:"100%",
                    borderBottom:"1px solid rgba(0,0,0,.1)",
                    '& ul':{
                        position:"relative !important",
                        width:"100vw !important",
                    },
                    
                },
                '&.div':{
                    height:"2px",
                    color:"green",
                },
            }
        },
         
},
},
  loader:{
  position:"absolute",
  zIndex:"3",
  top:"0",
  width:"100vw",
  height:"100vh",
  backgroundColor:"whitesmoke",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
},
futons:{
  display:"flex",
  width:"100%",
  alignItems:"center",
  justifyContent:"space-evenly",
  ['@media (max-width:1180px)']: {
    justifyContent:"space-between",
  },
  ['@media (max-width:1104px)']: {
    flexDirection:"column",
    alignItems:"flex-start",
  }
},
futonTt:{
  display:"flex",
  width:"70%",
  alignItems:"center",
  justifyContent:"space-evenly",
  ['@media (max-width:1180px)']: {
    width:"65%",
    justifyContent:"space-between",
  },
  ['@media (max-width:1180px)']: {
    width:"68%",
    justifyContent:"space-between",
  },
  ['@media (max-width:1104px)']: {
    marginTop:"1%",
    width:"100%",
  },
  ['@media (max-width:752px)']: {
    flexDirection:"column",
  }
},
btns:{
  background:"#678e23",
  color:"white",
  border:"1px solid #51701a",
  '&:hover':{
    background:"#51701a",
    border:"1px solid #678e23",
    color:"white",
  },
  ['@media (max-width:752px)']: {
    width:"100%",
  }
},
  copys:{
    background:"#13708a",
    color:"white",
    border:"1px solid #0c586e",
    "&:hover":{
      background:"#0c586e",
      border:"1px solid #13708a",
  },
  ['@media (max-width:752px)']: {
    width:"100%",
  }
},
  delBtn:{
    background:"#992525",
    color:"white",
    border:"1px solid #701a1a",
    "&:hover":{
      background:"#701a1a",
      border:"1px solid #992525",
  },
  ['@media (max-width:752px)']: {
    width:"100%",
    marginTop:"1%",
  }
  }
})
function Vpoll() {
  const classes=useStyles();
    let navigate = useNavigate();
    const createid=uuidv4();
    const close = true;
    const [userInfo, setUserInfo] = useState({});
    const [lobbies,setLobbies] = useState([]);
    const [clobbies,setClobbies] = useState([])
    const[loading,setLoading]=useState(true);
    const [checked, setChecked] = useState(false);
    const[loads,setLoads]=useState(false);
    const[linktxt,setLinktxt]=useState("Share Link");
    const [op, setOp] = React.useState(false);

  const handleClickOp = () => {
    setOp(true);
  };

  const handleCl = () => {
    setOp(false);
  };
    function toggle(value){
        return !value;
      }
    const userd = async () => {
      try {
			const res = await fetch("/userdata", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();      
			if (res.status === 200 || res.status===201) {
				console.log("DATA retrieved from token")
                console.log(data._id);
                setUserInfo(data);
                openlobbies(data._id);
                closelobbies(data._id);
        }
        else if (res.status === 422) {
          console.log("res 442 status");
        }
              else
              {
                 console.log("something went wrong");
              }
      } catch (err) {
        console.log(err);
      }
    };
    
    useEffect(()=>{
      setLoading(false);
      userd();
    },[])

    var usern = userInfo;
	console.log('variable',usern);
    console.log('data',usern._id);
    var userIds = usern._id;
    const openlobbies = async (tata)=> {await fetch("/usrlobbies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({tata:tata}),
    }).then(res=>res.json()).then(data=>{setLobbies(data);console.log(data); setLoading(true);})
    };

    const closelobbies = async(tata)=> {fetch("/clsrlobbies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({tata:tata}),
    }).then(res=>res.json()).then(data=>{setClobbies(data);setLoading(true);})
    };
    const DeleteLobby = async(delid)=>{
      console.log("hello",delid);
      const res = await fetch("/delete", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({delid})
    }); 
    const data= await res.json();	
    if (res.status === 200 ) {
      window.alert("Lobby Deleted Successfully");
      window.location.reload();
}
    }
    //console.log('variable',usern);
    //console.log('data',userInfo._id);
    function navicon() {
      navigate('/')
  }
    function createpoll()
    {
        const id=uuidv4();
        navigate("/poll/"+id);
    }

    function Closelobby(stuid)
    {
        navigate("/closepoll/"+stuid);
    }

    function Livelobby(stuid){
        console.log(stuid);
        navigate("/LivepollT/"+stuid);
    }
    function func1(){
      console.log("1");
    }
    function func2(){
      console.log("2");
      setLoads(true);
      setLinktxt("Link Copied");
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
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
      });
    };
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => {
      e.preventDefault();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [Lobby, setLobby] = useState({
        lobbyId:createid,
        lobbyName:"",
        lobbyDescription:"",
        studentformId:[],
        pollId:[],
        userId:"",
    });
    let name, value;
    const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLobby({ ...Lobby, [name]: value });
	};
    const Lob = async(e)=>{
        var lobs = {...Lobby};
        lobs.userId = userIds;
        setLobby(lobs);
        Lobby.userId = userIds;
        if(Lobby.lobbyName=="" || Lobby.lobbyDescription==""){
            window.alert("Please enter all the details");
        }
        else{
            console.log("UserData",Lobby);
            const{lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId} = Lobby;
            const res = await fetch("/createnewlobby", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId})
            })
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert("Lobby Creation Failed");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("Lobby Created Successfully");
			} 
            navigate("/poll/"+Lobby.lobbyId);
        }
    } 
    return (
    <>
      {loading?<div className='coomtainer'>
      <header className={classes.main}>
               <a href="#" style={{display:"flex",color:"#f4511e"}}><PollIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>POLLAPP</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#">Active Polls</a></li>
                       <li><a href="#closed">Closed Polls</a></li>
                       <li><a href="#" onClick={(e)=>{handleClickOpen(e)}}>Create New Lobby</a></li>
                   </ul>
                </nav>
            </header>
            <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}>
                  <DialogTitle>Create New LOBBY</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    <TextField sx={{width:"30em"}} name="lobbyName" value={Lobby.lobbyName} autoFocus margin="dense" id="name" label="Enter Lobby Name" type="text" fullWidth variant="standard" onChange={handleInputs}/>
                    <TextField 	name="lobbyDescription"	value={Lobby.lobbyDescription}margin="dense" id="outlined-multiline-static" label="Lobby Description" type="text" fullWidth  multiline rows={2} onChange={handleInputs}/>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button className={classes.cpoll} onClick={handleClose} >Cancel</Button>
                    <Button className={classes.cpoll} onClick={Lob}>Create</Button>
                  </DialogActions>
                </Dialog>
      <div className='actoll' style={{top:"10vh"}}>
        <h1 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"5vw"}}>Active Lobby</h1>
          {lobbies.length == 0 &&(
          <h2 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"5vw"}}>No Active Lobby</h2>)}
          <div className='pollstaAlign'>
          {lobbies.map(lob=>(
            <div className='polsta'>
              <div className='poldet' key={lob._id} style={{fontFamily: "Roboto,Arial,sans-serif"}}>
                  <p className='polh3' style={{fontFamily: "Roboto,Arial,sans-serif"}}><h1 className='polu'>Lobby title:</h1><h2>{lob.lobbyName}</h2></p>
                  <br/>
                  <p className='polh3' style={{fontFamily: "Roboto,Arial,sans-serif"}}><h1 className='polu'>Lobby description:</h1><h2>{lob.lobbyDescription}</h2></p>
                  <br/>
                  <div className={classes.futons}>
                  <Button className={classes.copys} onClick={() => {navigator.clipboard.writeText('http://localhost:3000/pollStu/'+lob.lobbyId)}}size="large" variant="contained" endIcon={<ContentCopyIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>Copy Link</Button>
                  <div className={classes.futonTt}>
                  <Button className={classes.btns} onClick={()=>Livelobby(lob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>VIEW LOBBY</Button>
                  <Button className={classes.delBtn} onClick={()=>Closepoll(lob.lobbyId)} size="large" variant="contained" endIcon={<DeleteOutlined/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>END LOBBY</Button>
                  </div>
                  </div>
              </div>
            </div>
                ))}
              </div>
            </div>
            <div id='closed' className='clooll'>
                <h1 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"5vw"}}>Closed Lobby</h1>
                {clobbies.length == 0 &&(
                <h2 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"5vw"}}>No Closed Lobby</h2>
                )}
                <div className='collstaAlign'>
                {clobbies.map(Clob=>(
                <div className='closta'>
                    <div className='poldet'key={Clob._id} style={{fontFamily: "Roboto,Arial,sans-serif"}}>
                    <p className='polh3' style={{fontFamily: "Roboto,Arial,sans-serif"}}><h1 className='polu'>Lobby title:</h1><h2>{Clob.lobbyName}</h2></p>
                  <br/>
                  <p className='polh3' style={{fontFamily: "Roboto,Arial,sans-serif"}}><h1 className='polu'>Lobby description:</h1><h2>{Clob.lobbyDescription}</h2></p>
                  <br/>
                  <div className={classes.futons}>
                  <Button className={classes.btns} onClick={()=>Livelobby(Clob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>VIEW LOBBY</Button>
                  <Button className={classes.delBtn} onClick={()=>{if(window.confirm('Are you sure to delete this record?')){ DeleteLobby(Clob.lobbyId);}} } size="large" variant="contained" endIcon={<DeleteOutlined/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>DELETE LOBBY</Button>
                  <Dialog
        open={op}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCl}>Disagree</Button>
          <Button onClick={()=>DeleteLobby(Clob.lobbyId)}>Agree</Button>
        </DialogActions>
      </Dialog>
                    </div>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </div>
        :<div className={classes.loader}>
        <CircularProgress style={{color:"#f4511e"}} size={100} />
        <Typography variant="h3" style={{color:"#f4511e"}}>Loading...</Typography>
        </div>}
        </>
    )
}

export default Vpoll
