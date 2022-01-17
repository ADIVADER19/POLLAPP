import React from 'react'
import './LivepollT.css';
import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import {Typography,Button,makeStyles,IconButtons,Dialog}  from '@material-ui/core'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import './Nav.css';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import PollIcon from '@material-ui/icons/Poll';
import M from "materialize-css";
let socket;

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
                    },
                    '& button':{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"3vh",
                        fontSize:"1em",
                        border:"none",
                        color:"#333",
                        backgroundColor:"whitesmoke",
                        outline:"none",
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
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
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
    firstDialog:{
        display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #f4511e",fontFamily: "Roboto,Arial,sans-serif",flexWrap:"wrap",
        paddingBottom:"1%",paddingTop:"1%",
        '& h1':{
            fontSize:"3em",
            ['@media (max-width:752px)']: {
                fontSize:"2em",
              },
              ['@media (max-width:440px)']: {
                fontSize:"1.5em",
              }
        }
    },
    btns:{
        background:"#678e23",
        color:"white",
        border:"1px solid #51701a",
        width:"60%",
        '&:hover':{
          background:"#51701a",
          border:"1px solid #678e23",
          color:"white",
        },
        ['@media (max-width:752px)']: {
          width:"50%",
          fontSize:"2px",
        }
      },
      copys:{
        background:"#13708a",
        color:"white",
        fontFamily: "Roboto,Arial,sans-serif",
        marginRight:"1%",
        border:"1px solid #0c586e",
        "&:hover":{
          background:"#0c586e",
          border:"1px solid #13708a",
      },
      ['@media (max-width:400px)']: {
        fomtSize:"1em",
      }
    },
  })
function LivepollT() {
    const classes=useStyles();
    const currentPathName = window.location.pathname;
    const lobbyuuid = currentPathName.slice(11);
    const [checked, setChecked] = useState(false);
    const [polldes, setItems] = useState([]);
    const [lobbydes, setTritems] = useState([]);
    const [users, setUsers] = useState([]);
    const [polls, setPolls] = useState([]);
    const [pain, setpain] = useState(0)
    const [spain, setspain] = useState(0)
    const data = {name:'teacher'};
    const ENDPOINT = 'localhost:5000';
    const [open, setOpen] = useState(false);
    const[op,setOp]=useState(false);
    const close = true;
    let navigate = useNavigate();
    function navicon() {
        navigate('/')
    }
    function toggle(value){
        return !value;
      }
    function addpoll(e){
        e.preventDefault();
        navigate("/poll/"+lobbyuuid);
    }
    const handleClickOp = () => {
        setOp(true);
      };
    
      const handleCl = () => {
        setOp(false);
      };
      const handleClickOpen = (e) => {
          e.preventDefault();
          setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const CloseLobby=()=>{
            const stuid = lobbyuuid;
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
                  socket.emit('closepoll',{lobbyuuid:stuid},(error)=>{
                    if(error){alert(error);}
                  });
                  M.toast({
                    html: "Successfully Updated!",
                    classes: "#2e7d32 green darken-3",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
          });
          navigate("/vpoll/");
        };
         
    

    useEffect(()=>{
        socket = io(ENDPOINT)
        socket.emit('join',{data,lobbyuuid},(error)=>{
            if(error){alert(error);}
        });    
        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
        
    },[ENDPOINT, lobbyuuid])
    
    useEffect(() => {
        socket.on("LobbyData", ({ users }) => {
          console.log(users)  
          setUsers(users);
          
        });
        socket.on("PollData", ({ poll }) => {
            console.log(poll[0].option[0].votes)
            setPolls(poll);
            
          });
    }, []);



    useEffect(() => {
        fetch("/bobs", {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
          console.log(ret);
          socket.emit('polls',{ret,lobbyuuid},(error)=>{
            if(error){alert(error);}
          });
          setItems(ret.myitem);
          console.log(polldes);
        })
    }, []);

    useEffect(()=>{
        fetch("/ross",{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rte)=>{
            console.log(rte);
           setTritems(rte.myitem[0]);

          console.log(lobbydes);
        })
    },[]);

    console.log(pain);
    return (
        <div className='actuallythepagel'>
            <header className={classes.main}>
               <a href="#" style={{display:"flex",color:"#f4511e"}}><PollIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>POLLAPP</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#" onClick={(e)=>{addpoll(e)}}>Add Poll</a></li>
                       <li ><button onClick={()=>CloseLobby()}>Stop Responses</button></li>
                       <li ><a href="#" onClick={(e)=>{handleClickOpen(e)}}>See Voters</a></li>
                   </ul>
                </nav>
            </header> 
            <div className='icel'>
                <div className='poltlel'>
                    <div style={{width:"100%",marginLeft:"2%"}}>
                    <h1 style={{fontSize:"4em",marginBottom:"1%"}}>{lobbydes.lobbyName}</h1>
                    <h2 style={{fontSize:"3em",marginBottom:"1%"}}>{lobbydes.lobbyDescription}</h2>
                    </div>
                    {users?(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"50%"}}>
                        <div className="activeContainerl">
                        <div>
                            {users.map((usa) => (
                                    <div className="activeIteml">
                                            {usa.name=='teacher'?<div></div>:
                                            <div>
                                                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}><AppBar style={{backgroundColor:"whitesmoke"}} sx={{ position: 'relative' }}><Toolbar><IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"><CloseIcon style={{color:"#f4511e"}}/></IconButton> 
                                                        </Toolbar>
                                                        </AppBar>
                                                <div className={classes.firstDialog}>
                                                <h1 style={{fontWeight:"normal",marginLeft:"1%",fontFamily: "Roboto,Arial,sans-serif"}}>{usa.name}</h1>
                                                <Button className={classes.copys} size="large" variant="contained" onClick={handleClickOp}>View Details</Button> 
                                                </div>
                                                </Dialog>
                                                <Dialog fullScreen open={op} onClose={handleCl} TransitionComponent={Transition}><AppBar sx={{ position: 'relative' }} style={{backgroundColor:"whitesmoke"}}><Toolbar><IconButton edge="start" color="inherit" onClick={handleCl} aria-label="close"><CloseIcon style={{color:"#f4511e"}}/></IconButton> 
                                                        </Toolbar>
                                                        </AppBar>
                                             
                                                {usa.poll.map((texas,y)=>(
                                                    <div style={{display:"flex",width:"100%",
                                                    flexDirection:"column",paddingBottom:"1%",paddingTop:"1%",alignItems:"flex-start",justifyContent:"space-evenly",borderBottom:"1px solid #f4511e",fontFamily: "Roboto,Arial,sans-serif"}} key={texas}>
                                                        <h1 style={{fontWeight:"normal",marginLeft:"1%"}}>{y+1}. {texas.question}</h1>
                                                        <h2 style={{fontWeight:"normal",marginLeft:"1%"}}>Option Selected: {texas.option}</h2>
                                                    </div>
                                                ))}
                                                </Dialog>
                                            </div>}
                                    </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    )
                    : null
                }
                </div>
                <div style={{display:"flex",width:"100%",flexWrap:"wrap",alignItems:"center",justifyContent:"space-around"}}>
                {polls.map((lob, x)=>(
                <div className='questsl' key={lob}>
                    <div className='question1l'>
                        <h1>{x+1}. {lob.question}</h1>
                    </div>
                    {lob.option.map((oop, y)=>(
                    <>{oop.value == "" &&(
                        <></>
                      )}
                      {!oop.value == "" &&(
                      <>
                      <div className='optl'>
                          <h2>{y+1}. {oop.value}</h2>
                          <h3>{oop.votes} votes</h3>
                      </div>                          
                      </>
                    )}
                    </>    
                    ))}
                    
                </div>))}
                </div>
            </div>
        </div>
    )
}

export default LivepollT
