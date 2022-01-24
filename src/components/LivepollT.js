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
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import M from "materialize-css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StopIcon from '@mui/icons-material/Stop';
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
        zIndex:"5",
        top:"0",
        left:"0",
        right:"0",
        backgroundColor:"whitesmoke",
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
                        transition:"0.2s",
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
                            color:"red",
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
        ['@media (max-width:400px)']: {
            flexDirection:"column",
            alignItems:"flex-start"
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
    const data = {name:'teacher'};
    const ENDPOINT = 'localhost:2000';
    const [sum,setSum] = useState([]);
    const [open, setOpen] = useState(false);
    const[op,setOp]=useState(false);
    const close = true;
    const link="https://pollapp281907.herokuapp.com/"
    let navigate = useNavigate();
    const str1 = window.location.href;
    const str2 = str1.slice(0,str1.indexOf('LivepollT'));
    function copy(e){
        e.preventDefault();
        navigator.clipboard.writeText(str2+'pollstu/'+lobbyuuid);
      }
    function navicon() {
        navigate('/vpoll/');
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
            fetch(`${link}close`, {
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
            socket.close();
        }
        
    },[ENDPOINT, lobbyuuid])
    
    useEffect(() => {
        socket.on("LobbyData", ({ users }) => {
          console.log("Hello",users);  
          setUsers(users);
          
        });
        socket.on("PollData", ({ poll }) => {
            console.log("Ok",poll);
            setPolls(poll);
            let vederichi=[] 
            for(var r=0;r<poll.length;r++){
                let arri=0
                for(var s=0;s<poll[r].option.length;s++){
                   if(poll[r].option[s].value!==""){
                    arri+=poll[r].option[s].votes;
                    }
                }
                vederichi.push(arri);
            }
        console.log("arri",vederichi);
        setSum(vederichi);
          });
    }, []);



    useEffect(() => {
        fetch(`${link}bobs`, {method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res) => res.json())
        .then((ret) => {
          socket.emit('polls',{ret,lobbyuuid},(error)=>{
            if(error){alert(error);}
          });
          setItems(ret.myitem);
          
        })
    }, []);

    useEffect(()=>{
        fetch(`${link}ross`,{method:"POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({data:lobbyuuid})
    }).then((res)=>res.json())
        .then((rte)=>{
           setTritems(rte.myitem[0]);

        })
    },[]);

    return (
        <div className='actuallythepagel'>
            <header className={classes.main}>
               <a href="#" style={{display:"flex",color:"#f4511e"}}><ArrowBackIosIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>BACK</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#" onClick={(e)=>{addpoll(e)}}>Add Poll <AddIcon/></a></li>
                       <li><a href="#" onClick={(e)=>{copy(e)}}>Copy Link <LinkIcon/></a></li>
                       <li ><button onClick={()=>{if(window.confirm('Are you sure you want to stop the responses?')){ CloseLobby();}}}>Stop Responses <StopIcon/></button></li>
                       <li ><a href="#" onClick={(e)=>{handleClickOpen(e)}}>See Voters <VisibilityIcon/></a></li>
                   </ul>
                </nav>
            </header> 
            <div className='icel'>
                <div className='poltlel'>
                    <div className='header' >
                    <h1 className='lobby'>Lobby Title: {lobbydes.lobbyName}
                    <span>Lobby Description: {lobbydes.lobbyDescription}</span></h1>
                    </div>
                    </div>
                    <div className='styles'></div>
                    <div class="triangle-right"></div>
                    <div className="triangle-left"></div>
                    {users?(
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"50%"}}>
                        <div className="activeContainerl">
                        <div>
                                            <div>
                                                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}><AppBar style={{backgroundColor:"whitesmoke"}} sx={{ position: 'relative' }}><Toolbar><IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"><CloseIcon style={{color:"#f4511e"}}/></IconButton> 
                                                        </Toolbar>
                                                        </AppBar>
                                                
                                                {users.map((usa,x) => (
                                                <div className="activeIteml" >
                                                    
                                                   <div className={classes.firstDialog}>
                                                <h2 style={{fontWeight:"normal",marginLeft:"1%",fontFamily: "Roboto,Arial,sans-serif"}}> {x+1}. {usa.name}</h2>
                                                <h2 style={{fontWeight:"normal",marginLeft:"1%",fontFamily: "Roboto,Arial,sans-serif"}}>Polls Attempted: {usa.poll.length}/{polls.length}</h2>
                                               
                                                <div className="dropdown">
                                                    
                                                    <button className="dropbtn"><span>See Details </span></button>
                                                    <div className="dropdown-content">
                                                       
                                                    {usa.poll.map((texas,y)=>(
                                                    <a href="#">
                                                        <h2 style={{fontWeight:"normal",marginLeft:"1%"}}>{y+1}. {texas.question}</h2>
                                                        <h3 style={{fontWeight:"normal",marginLeft:"1%"}}>Option Selected: {texas.option}</h3>
                                                        </a>
                                                ))}
                                                    </div>
                                                </div>
                                                
                                                </div>
                                                </div>
                                                ))}
                                                </Dialog>
                                                
                                            </div>
                        </div>
                        </div>
                    </div>
                    )
                    : null
                }
                <div className='polldiv'>
                {polls.map((lob, x)=>(
                <div className='questsl' key={lob}>
                <div className='shapes'></div>
                <h2 className='sequence'>{x+1}</h2>
                <h2 className='question1l'>{lob.question}</h2>
                    {lob.option.map((oop, y)=>(
                    <>{oop.value == "" &&(
                        <></>
                      )}
                      {!oop.value == "" &&(
                      <>
                      <div className='optl'>
                          <div>
                          <h3>{y+1}. {oop.value}</h3>
                          <div className='progressBar'>
                          <h4>{oop.votes} votes</h4>
                          {/* fakt width ghaal ithee */}
                          <div className='actualshifting' style={{width:`calc(${oop.votes}*100%/${sum[x]})`,left:"-0.3%",zIndex:"-1",position: "absolute", maxWidth:"98.35%",borderRadius: "15px", minWidth:"8.5%",transition:"500ms ease-in-out",height:"62.5%",top:"-1%"}}></div>
                          </div>
                          </div> 
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
