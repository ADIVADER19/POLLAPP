import React, { useEffect, useState } from 'react';
import'./Vpoll.css';
import {Typography,Button,makeStyles,IconButtons,Dialog,DialogTitle,DialogActions,TextField,DialogContent,DialogContentText}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { v4 as uuidv4 } from 'uuid';
import { CheckBox, Delete, DeleteOutlined, Visibility } from '@material-ui/icons';
import M from "materialize-css";
import CircularProgress from '@mui/material/CircularProgress';
import './Nav.css';
import Chip from '@mui/material/Chip';
import PollIcon from '@material-ui/icons/Poll';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Slide from '@mui/material/Slide';
import io from 'socket.io-client';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Modal from 'react-modal';
import LinearProgress from '@mui/material/LinearProgress';
import DownloadIcon from '@mui/icons-material/Download';
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
      zIndex:"10",
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
                      height:"200px",overflow:"auto",
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
              height:"200px",
              overflow:"auto",
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
  zIndex:"4",
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
  backgroundColor:"red",
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
    const str1 = window.location.href;
    const str2 = str1.slice(0,str1.indexOf('vpoll'));
    const close = true;
    const [userInfo, setUserInfo] = useState({});
    const [lobbies,setLobbies] = useState([]);
    let [clobbies,setClobbies] = useState([]);
    const [load, setLoad] = React.useState(false);
    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();
    const [endLobbyMessage, setendLobbyMessage] = useState(false);
    const [createLob, setcreateLob] = useState(false);
    const [loadss, setloadss] = useState(true);
    const[selectedSubject,setSelectedSubject]=useState('No subject selected');
    useEffect(() => () => {
      clearTimeout(timerRef.current);
    },
    [timerRef],
  );

  const handleClickLoading = () => {
    setLoad((prevLoading) => !prevLoading);
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

   
    setQuery('progress');
    timerRef.current = window.setTimeout(() => {
      setQuery('success');
      window.setTimeout(() => {
      setQuery('idle');
    }, 4000);
    }, 2000);
   
  };

    const[loading,setLoading]=useState(true);
    const [checked, setChecked] = useState(false);
    const[loads,setLoads]=useState(false);
    const[linktxt,setLinktxt]=useState("Share Link");
    const [op, setOp] = React.useState(false);
    const data = {name:'teacher'};
    const ENDPOINT = 'localhost:2000';
    const [modal, setmodal] = useState(false);
    const[deletelobid,setDeletelobid]=useState('');
    const[delMessage,setdelMessage]=useState(false);
    const [widthofy, setwidthofy] = useState("0%");
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
	
                setUserInfo(data);
                openlobbies(data._id,null);
                closelobbies(data._id,null);
        }
        else if (res.status === 422) {
        }
              else
              {
              }
      } catch (err) {
      }
    };
    
    useEffect(()=>{
      setLoading(false);
      userd();
    },[])

    useEffect(()=>{
      socket = io(ENDPOINT)
      return()=>{
        socket.off();
    }
  },[ENDPOINT, 'vpoll'])

    var usern = userInfo;
    var userIds = usern._id;
    const openlobbies = async (tata,sub)=> {
      setLoading(false);
        await fetch("/usrlobbies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({tata:tata,sub:sub}),
        }).then(res=>res.json()).then(data=>{
          console.log(data);
          setLobbies(data);
          setLoading(true);
          console.log(lobbies);})
    };

    const closelobbies = async(tata,sub)=> {
        fetch("/clsrlobbies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({tata:tata,sub:sub}),
        }).then(res=>res.json()).then(data=>{
          for(let i=0;i<data.length;i++){
            data[i].selected = false;
          }
          console.log(data);
          setClobbies(data);
          setLoading(true);
          setloadss(false);
          window.setTimeout(() => {
            setloadss(true);
            setdelMessage(false);
          }, 2000);
          window.setTimeout(() => {
            setloadss(true);
            setendLobbyMessage(false);
          }, 2000);
          })
    };
    const DeleteLobby = async()=>{
      console.log(deletelobid);
      const res = await fetch("/delete", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({deletelobid})
    }); 
    const data= await res.json();	
    if (res.status === 200 ) { 
      userd();
      setmodal(false);
      setdelMessage(true);
}
    }
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
        navigate("/LivepollT/"+stuid);
    }
    function func1(){
    }
    function func2(){
      setLoads(true);
      setLinktxt("Link Copied");
    }
    const subsSel=(e,value,index)=>{
      e.preventDefault();
      console.log(value);
      console.log(index);
      setSelectedSubject(value.SubjectValue);
      openlobbies(userInfo._id,value);
      closelobbies(userInfo._id,value);
    }
    const general=(e)=>{
      e.preventDefault();
      setSelectedSubject("No Subject Selected");
      openlobbies(userInfo._id,null);
      closelobbies(userInfo._id,null);
    }
    let finalizedArray = [];
    const BundleDownload =(id,no)=>{
      var lobs = [...clobbies];
      if(lobs[no].selected){
        lobs[no].selected=false;
      }
      else{
        lobs[no].selected=true;
      }
      Something(lobs);
    }
    const Something=(lobs)=>{
      setClobbies([...lobs]);
    }
    const SubmitDownload=async()=>{
      let clob = [...clobbies];
      let leng = clob.length;
      console.log(clob);
      console.log(leng);
      for(let i=0;i<leng;i++){
        if(clob[i].selected){
          finalizedArray.push(clob[i].lobbyId);
        }
      }
      console.log(finalizedArray);
      const res = await fetch("/downloadExcel", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({finalizedArray})
    });
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
              socket.emit('closepoll',{lobbyuuid:stuid},(error)=>{
                if(error){alert(error);}
              });
              M.toast({
                html: "Successfully Updated!",
                classes: "#2e7d32 green darken-3",
              });
            }
            setendLobbyMessage(true);
            userd();
          })
          .catch((err) => {
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
      setcreateLob(true);
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
                      <li><a>{selectedSubject}</a>
                        <ul>
                        {userInfo.Subject==undefined?
                        <li><a>No Subject Created</a></li>:
                        <>
                        {
                        userInfo.Subject.map((value, index) => 
                        <li value={value} key={index} ><a onClick={(e)=>{subsSel(e,value,index)}}>{value.SubjectValue}</a></li>
                        )}
                        <li><a onClick={(e)=>{general(e)}}>General</a></li>
                        </>}
                        </ul>
                      </li>
                      <li><a href="#">Active Lobby</a></li>
                      <li><a href="#closed">Closed Lobby</a></li>
                      <li><a href="#" onClick={(e)=>{handleClickOpen(e)}}>Create New Lobby</a></li>
                   </ul>
                </nav>
            </header>
            <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose}>
                  <DialogTitle>Create New LOBBY</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    <TextField sx={{width:"30em"}} name="lobbyName" value={Lobby.lobbyName} autoFocus margin="dense" id="name" label="Enter Lobby Name" type="text" fullWidth variant="standard" onChange={handleInputs} inputProps={{maxLength: 40}}/>
                    <TextField 	name="lobbyDescription"	value={Lobby.lobbyDescription}margin="dense" id="outlined-multiline-static" label="Lobby Description" type="text" fullWidth  multiline rows={2} onChange={handleInputs} inputProps={{maxLength: 100}}/>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button className={classes.cpoll} onClick={handleClose} >Cancel</Button>
                    <Button className={classes.cpoll} onClick={Lob}>Create</Button>
                  </DialogActions>
                  
                </Dialog>
      <div className='actoll' style={{top:"10vh"}}>
        <h1 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"30px"}}>Active Lobby</h1>
          {lobbies.length == 0 &&(
          <div style={{display:"flex",flexDirection:"column",marginLeft:"2%",marginTop:"2%",marginBottom:"2%"}}>
            <h2 style={{fontFamily: "Roboto,Arial,sans-serif",fontSize:"25px",color:"#333"}}>You haven't created lobby yet.</h2><br/><br/>
            <button className="button" onClick={handleClickOpen}><span>Create New Lobby </span></button>
          </div>
          )}
          <div className='pollstaAlign'>
          {lobbies.map((lob, x)=>(
            <div className='polsta'>
              <div className='poldet' key={lob._id} style={{fontFamily: "Roboto,Arial,sans-serif"}}>
                  <div className='polh2'>
                  <div className='pollsCreated'><div><Chip style={{backgroundColor:"#d1d1d1"}} icon={<PeopleAltIcon/>} label={lob.studentformId.length} /></div><div style={{borderLeft:"1px solid #f4511e",width:"50%",height:"80%"}}>Polls: {lob.pollId.length}</div></div>
                    <h2 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",fontSize: "25px",marginLeft:"1%"}}>{lob.lobbyName}</h2></div>
                  <div className='polp'>
                  <h3 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",marginLeft:"1%",color:"#333"}}>Description</h3>
                    <p style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",fontSize: "17px",margin:"1%",color:"#333"}}>{lob.lobbyDescription}</p></div>
                  <div style={{width:"100%",position:"absolute",bottom:"0",borderRadius:"0px 0px 15px 15px"}}>
                  <div className='tooltip' style={{borderRadius:"0px 0px 0px 15px",background: "#07c5ff"}} onClick={() => {navigator.clipboard.writeText(str2+'pollstu/'+lob.lobbyId);handleClickQuery()}}><ContentCopyIcon />

                  <span className='tooltiptext'>
                  <Box >
                    {query === 'success' ? (<Typography>Link Copied</Typography>) : (
                    <>
                    {query==='idle'? (<Typography>Copy Link</Typography>):""}
                    <Fade in={query === 'progress'} style={{ transitionDelay: query === 'progress' ? '200ms' : '0ms',}}unmountOnExit>
                      <LinearProgress style={{color:"white",marginTop:"10px"}}/>
                    </Fade>
                    </>)}
                  </Box>
                  </span>
                  </div>
                  <div className='tooltip' style={{background: "#ffb507"}} onClick={()=>Livelobby(lob.lobbyId)} ><VisibilityIcon/>
                  <span className='tooltiptext'>View Lobby</span>
                  </div>
                  <div className='tooltip' style={{borderRadius:"0px 0px 15px 0px",background: "#ff0739"}} onClick={()=>Closepoll(lob.lobbyId)}><DeleteOutlined/>
                  <span className='tooltiptext'>End Lobby</span>
                  </div>
                  </div>
                  {/* <div className={classes.futons}>
                  <Button className={classes.copys} size="large" variant="contained" endIcon={<ContentCopyIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>Copy Link</Button>
                  <Button className={classes.btns} onClick={()=>Livelobby(lob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>VIEW LOBBY</Button>
                  <Button className={classes.delBtn} onClick={()=>Closepoll(lob.lobbyId)} size="large" variant="contained" endIcon={<DeleteOutlined/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>END LOBBY</Button>
                  </div> */}
              </div>
            </div>
                ))}
              </div>
            </div>
            <div id='closed' className='clooll'>
               <div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
               <h1 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",color:"#f4511e",fontSize:"30px"}}>Closed Lobby</h1>
                {clobbies.length != 0 && (
                  <Button style={{marginRight:"2%",marginTop:"2%",marginBottom:"2%",}} variant="contained" startIcon={<DownloadIcon/>} onClick={SubmitDownload}>DOWNLOAD</Button>
                )}
               </div>
                {clobbies.length == 0 &&(
                <h2 style={{fontFamily: "Roboto,Arial,sans-serif",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",fontSize:"17px",color:"#333"}}>No closed lobbies are there.<br/></h2>
                )}
                <div className='collstaAlign'>
                {clobbies.map((Clob, x)=>(
                <div className='closta'>
                    <div className='poldet'key={Clob._id} onClick={()=>BundleDownload(Clob,x)} style={{fontFamily: "Roboto,Arial,sans-serif"}}>
                     {Clob.selected? <>
                      <CheckCircleRoundedIcon color='success' style={{position:"absolute",left:0,top:0}}/>
                    </>:""}
                    <div className='polh2'>
                    <div className='pollsCreated'><div><Chip style={{backgroundColor:"#d1d1d1"}} icon={<PeopleAltIcon/>} label={Clob.studentformId.length} /></div><div style={{borderLeft:"1px solid #f4511e",width:"50%",height:"80%"}}>Polls: {Clob.pollId.length}</div></div>
                      <h2 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",fontSize: "25px",marginLeft:"1%"}}>{Clob.lobbyName}</h2></div>
                    <div className='polp'>
                  <h3 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",marginLeft:"1%",color:"#333"}}>Description</h3>
                    <p style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",overflow:"hidden",fontSize: "17px",margin:"1%",color:"#333"}}>{Clob.lobbyDescription}</p></div>
                  <div style={{width:"100%",position:"absolute",bottom:"0",borderRadius:"0px 0px 15px 15px"}}>
                  <div className='tooltip1' style={{borderRadius:"0px 0px 0px 15px",background: "#6203fc"}} onClick={()=>Closelobby(Clob.lobbyId)}><VisibilityIcon/>
                  <span className='tooltiptext'>View Stats</span>
                  </div>
                  <div className='tooltip1' style={{borderRadius:"0px 0px 15px 0px",background: "#fc0303"}} onClick={()=>{setmodal(true);setDeletelobid(Clob.lobbyId)}}><Delete/>
                  <span className='tooltiptext'>Delete Lobby</span>
                 
                  </div>
                  </div>
                  {/* <div className={classes.futons}>
                  <Button className={classes.btns} onClick={()=>Closelobby(Clob.lobbyId)} size="large" variant="contained" endIcon={<VisibilityIcon/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>VIEW LOBBY</Button>
                  <Button className={classes.delBtn} onClick={()=>{if(window.confirm('Are you sure to delete this record?')){ DeleteLobby(Clob.lobbyId);}} } size="large" variant="contained" endIcon={<DeleteOutlined/>} style={{fontFamily: "Roboto,Arial,sans-serif"}}>DELETE LOBBY</Button>
                    </div> */}
                    </div>
                    <Modal style={{overlay: {zIndex:10,width:"100%",height:"100%",backgroundColor:'rgba(255, 255, 255, 0.1)'},content:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"50vw",height:"25vh",top:"25vh",left:"25vw"}}} isOpen={modal} onRequestClose={()=>setmodal(false)}>
                    <div className="modaltitle">
                      <h2>Are You Sure You Want to Delete The Lobby ?</h2>
                    </div>
                    <div className="modalfooter">
                      <button onClick={()=>setmodal(false)} id="modalcancelBtn">Cancel</button>
                      <button onClick={()=>{DeleteLobby()}}>Continue</button>
                    </div>
                    </Modal>
                    <Modal isOpen={delMessage} style={{overlay:{zIndex:11,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor: 'rgba(255, 255, 255, 0.05)'},content:{width:"fit-content",height:"fit-content",top:"10px",borderRadius:"50px",borderColor:"red",transition:"1000ms all"}}}>
                      <div style={{width:"100%",fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",color:"red",display:"flex",alignItems:"center",justifyContent:"center"}}>{loadss===false ?<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}><h2 style={{color:"green",fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal"}}>Lobby Deleted</h2><CheckCircleIcon style={{color:"green",fontSize:40}}/></div>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}><h2 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",}}>Deleting Lobby</h2><CircularProgress style={{color:"red"}}/></div>}</div>
                    </Modal>
                    <Modal isOpen={endLobbyMessage} style={{overlay:{zIndex:11,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor: 'rgba(255, 255, 255, 0.05)'},content:{width:"fit-content",height:"fit-content",top:"10px",borderRadius:"50px",borderColor:"red",transition:"1000ms all",}}}>
                      <div style={{width:"100%",color:"red",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {loadss===false ?<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}><CheckCircleIcon style={{color:"green",fontSize:40}}/><h2 style={{color:"green",fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal"}}>Response Stopped</h2></div>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"}}><CircularProgress style={{color:"red"}}/><h2 style={{fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",}}>Stopping Responses</h2></div>} 
                      </div>
                    </Modal>
                    <Modal isOpen={createLob} style={{overlay:{zIndex:11,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor: 'rgba(255, 255, 255, 0)'},content:{width:"fit-content",height:"fit-content",top:"10px",borderRadius:"50px",borderColor:"green",transition:"1000ms all"}}}>
                      <div style={{width:"100%",fontFamily: "Roboto,Arial,sans-serif",fontWeight:"normal",color:"green",display:"flex",alignItems:"center",justifyContent:"center"}}>Lobby Created Successfully</div>
                    </Modal>
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
