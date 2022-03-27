import React from 'react';
import {makeStyles,Dialog,DialogTitle,DialogActions,TextField,DialogContent,DialogContentText,Button, Typography} from '@material-ui/core';
import {useState,useEffect} from 'react';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import './HomePage.css';
import { v4 as uuidv4 } from 'uuid';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderIcon from '@mui/icons-material/Folder';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green,red,amber } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';
import img from './img_05.svg';
import Popup from './Popup';
import { GoogleLogin } from 'react-google-login';
import PollIcon from '@material-ui/icons/Poll';
import CodeIcon from '@mui/icons-material/Code';
import Modal from 'react-modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Alert from '@mui/material/Alert';
import {styled} from "@mui/material";
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
/*Select component Styling*/
const blue = {
	100: '#DAECFF',
	200: '#99CCF3',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	900: '#003A75',
  };
  
  const grey = {
	100: '#E7EBF0',
	200: '#E0E3E7',
	300: '#CDD2D7',
	400: '#B2BAC2',
	500: '#A0AAB4',
	600: '#6F7E8C',
	700: '#3E5060',
	800: '#2D3843',
	900: '#1A2027',
  };
  
  const StyledButton = styled('button')(
	({ theme }) => `
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
	box-sizing: border-box;
	min-height: calc(1.5em + 22px);
	min-width: 70%;
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
	border-radius: 0.75em;
	margin: 0.5em;
	padding: 10px;
	text-align: left;
	line-height: 1.5;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  
	&:hover {
	  background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
	  border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
	}
  
	&.${selectUnstyledClasses.focusVisible} {
	  outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
	}
  
	&.${selectUnstyledClasses.expanded} {
	  &::after {
		content: '▴';
	  }
	}
  
	&::after {
	  content: '▾';
	  float: right;
	}
	`,
  );
  
  const StyledListbox = styled('ul')(
	({ theme }) => `
	font-family: IBM Plex Sans, sans-serif;
	font-size: 0.875rem;
	box-sizing: border-box;
	padding: 5px;
	margin: 10px 0;
	min-width: 70vw;
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
	border-radius: 0.75em;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	overflow: auto;
	outline: 0px;
	`,
  );
  
  const StyledOption = styled(OptionUnstyled)(
	({ theme }) => `
	list-style: none;
	padding: 8px;
	border-radius: 0.45em;
	cursor: default;
  
	&:last-of-type {
	  border-bottom: none;
	}
  
	&.${optionUnstyledClasses.selected} {
	  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
	  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
	}
  
	&.${optionUnstyledClasses.highlighted} {
	  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
	  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	}
  
	&.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
	  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
	  color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
	}
  
	&.${optionUnstyledClasses.disabled} {
	  color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
	}
  
	&:hover:not(.${optionUnstyledClasses.disabled}) {
	  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
	  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	}
	`,
  );
  
  const StyledPopper = styled(PopperUnstyled)`
	z-index: 1;
  `;
  
  const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
	const components = {
	  Root: StyledButton,
	  Listbox: StyledListbox,
	  Popper: StyledPopper,
	  ...props.components,
	};
  
	return <SelectUnstyled {...props} ref={ref} components={components} />;
  });
/*Manual Stylingsss*/
const  useStyles = makeStyles({
    pops:{
        backgroundColor:"whitesmoke"
    },
    log:{
        width:"auto !important",
        borderRadius:"42px !important",
        fontSize:"1.5vh !important",
        paddingLeft:"3px !important",
        paddingRight:"3px !important",
        border:"1px solid",
        borderColor:"#ea4335 #fbbc05 #34a853 #4285f4 !important",
    },
    sign:{
      width:"auto !important",
      borderRadius:"42px !important",
      fontSize:"1.5vh !important",
      paddingLeft:"3px !important",
      paddingRight:"3px !important",
      border:"1px solid",
      borderColor:"#ea4335 #fbbc05 #34a853 #4285f4 !important",
        
    },
    homeMain:{
        display:"flex",
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        ["@media(max-width: 650px)"]:
        {flexDirection:"column-reverse",height:"70vh",marginTop:"13%",}
    },
    mainImg:{
        width:"50vw",
        height:"100%",
        ["@media(max-width: 650px)"]:{width:"100vw",height:"50vh"}
    },
    mainText:{
        width:"50vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
        '& h1':{
            fontSize:"6em",
            ["@media(max-width: 850px)"]:{
              fontSize:"5em"
            },
            ["@media(max-width: 750px)"]:{
              fontSize:"4.5em"
            }
        },
        '& p':{
            fontSize:"1.5em",
            color:"#333",
        },
        ["@media(max-width: 650px)"]:
        {
            width:"100vw",
            alignItems:"center",
            '& h1':{
                fontSize:"3em",
                textAlign:"center",
                ["@media(max-width: 330px)"]:{
                  fontSize:"2em"
                },
                ["@media(max-width: 215px)"]:{
                  fontSize:"1.5em"
                }
            },
        }
    },
    lobbyBtn:{
        border:"3px solid #f44336",
        borderRadius:"1em",
        marginTop:"2%",
        marginBottom:"2%",
        fontSize:"1em",
        color:"#f44336",
        padding:"1% 2%",
        backgroundColor:"white",
        zIndex:"1",
        '&:hover':{
            backgroundColor:"red !important",
        },      
        
    },
    featureBox:{
        backgroundColor: "white",
        width:"100%",
        marginTop:"2%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        '& h1':{
            fontSize:"3em",
            color:"#333",
        }
      },
      featureContainer:{
          backgroundColor:"red",
      },
      loader:{
          position:"absolute",
          zIndex:"20",
          top:"0",
          width:"100vw",
          height:"100vh",
          backgroundColor:"whitesmoke",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
      },
      clpoll:{backgroundColor:"red !important",color:"#FFFAFA !important"},
      crpoll:{backgroundColor:"green !important",color:"#FFFAFA !important"}
})
function HomePage() {
    const [timedPopup, setTimedPopup] = useState(false);
    const [data, setData] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const[loading,setLoading]=useState(true);
    const[newid,setRid]=useState();
    const [subjectArray, setSubjectArray] = useState([]);
    const[loggedIn,setloggedIn]=useState(false);
    const[signedIn,setsignedIn]=useState(false);
    const[existance,setexistance]=useState(false);
    const[logexist,setlogexist]=useState(false);
    const[cretPoll,setcretPoll]=useState(false);
    const[cretPollErr,setcretPollErr]=useState(false);
    const [loadUS, setLoadUS] = React.useState(false);
    const [sucUS, setSucUS] = React.useState(false);
    const [loadAK, setLoadAK] = React.useState(false);
    const [loadF, setLoadF] = React.useState(false);
    const tumer = React.useRef();
    const buttonSx = {
        ...(sucUS && {
          bgcolor: green[500],
          '&:hover': {
            bgcolor: green[700],
          },
        }),
      };
      const [loadUK, setLoadUK] = React.useState(false);
      const [sucUK, setSucUK] = React.useState(false);
      const tukmer = React.useRef();
      const buttonSxuk = {
          ...(sucUK && {
            bgcolor: blue[400],
            '&:hover': {
              bgcolor: blue[600],
            },
          }),
        };
        const buttonAk = {
            ...(loadAK && {
              bgcolor: red[500],
              '&:hover': {
                bgcolor: red[700],
              },
            }),
          };
          const buttonF = {
            ...(loadF && {
              bgcolor: amber[500],
              '&:hover': {
                bgcolor: amber[700],
              },
            }),
          };
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
                if(data.Subject){
                    setSubjectArray(data.Subject);
                }
                setLoading(true);
			}
            else if (res.status === 422) {
                setTimeout(()=>{
                    setLoading(true);
                    setTimedPopup(true);
                },1000);
            }
            else
            {
                setTimeout(()=>{
                    setLoading(true);
                    setTimedPopup(true);
                },1000);
            
            }
		} catch (err) {
		}
	};
    const responseGoogle = async (response) => {
        
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
   
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch("/login", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                setloggedIn(true);
                //props.setTrigger(false)
                window.setTimeout(() => {
                    setloggedIn(false);
                  }, 5000);
                window.location.reload();
                setTimedPopup(false);
                userd()
			} 
            else if(res.status === 422)
                {
                    setlogexist(true);
                    window.setTimeout(() => {
                        setlogexist(false);
                      }, 5000);
			}
            else
            {
                window.alert("INVALID USER")
            }
		}
	};
    const responseeGoogle = async (response) => {
        
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch("/u", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
                    mail,
                    name,
                    givenName,
				}),
			});
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                setsignedIn(true);
                window.setTimeout(() => {
                    setsignedIn(false);
                  }, 5000);
                document.getElementByClassName("sign").style.visibility="hidden";
			} 
            else if(res.status === 422)
            {
                setexistance(true);
                window.setTimeout(() => {
                    setexistance(false);
                  }, 5000);
            }
            else {
			}
		}
	};
	const [progress1, setProgress1] = React.useState(0);
    const [progress2, setProgress2] = React.useState(30);
    const [progress3, setProgress3] = React.useState(50);
    const [progress4, setProgress4] = React.useState(20);
    const [buffer1, setBuffer1] = React.useState(0);
    const [buffer2, setBuffer2] = React.useState(30);
    const [buffer3, setBuffer3] = React.useState(50);
    const [buffer4, setBuffer4] = React.useState(20);
  React.useEffect(() => {
    setSucUS(false);
    setLoadUS(true);
    
    tumer.current = window.setTimeout(() => {
      setSucUS(true);
      setLoadUS(false);
    }, 11000);
    setSucUK(false);
    setLoadUK(true);
    tukmer.current = window.setTimeout(() => {
      setSucUK(true);
      setLoadUK(false);
    }, 17000);
    const tfmer = setInterval(() => {
        setLoadF((oldProgress) => {
          if (oldProgress === true) {
            return false;
          }
          return true;
        });
      }, 50);
    const takmer = setInterval(() => {
        setLoadAK((oldProgress) => {
          if (oldProgress === true) {
            return false;
          }
          return true;
        });
      }, 50);
    const timer = setInterval(() => {
      setProgress1((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
      setBuffer1((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 50);
    const timer2 = setInterval(() => {
        setProgress2((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
        setBuffer2((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
      }, 50);
      const timer3 = setInterval(() => {
        setProgress3((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
        setBuffer3((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
      }, 50);
      const timer4 = setInterval(() => {
        setProgress4((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
        setBuffer4((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
      }, 50);
    return () => {
      clearInterval(tfmer);
      clearInterval(takmer);
      clearInterval(timer);
      clearInterval(timer2);
      clearInterval(timer3);
      clearInterval(timer4);
    };
  }, []);
	var usern = userInfo;
    var userIds = usern._id;
    useEffect(() => {
        setLoading(false);
        userd();
        }, [])
    // useEffect(() => {
    //     setTimeout(()=>{
    //         setTimedPopup(true);
    //     },1000);

    // },[])
    
    let SubVal = [];
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        if(subjectArray.length!=0||subjectArray.length!=undefined||subjectArray.length!=null){
            for(let i=0;i<subjectArray.length;i++){
                SubVal.push(subjectArray[i].SubjectValue);
            }
            console.log(SubVal);
        }
    };
    const [selectedSubject, setselectedSubject] = useState(1000);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOption = () =>{
        console.log(selectedSubject);
    }
    const [Lobby, setLobby] = useState({
        lobbyId:'',
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
    let navigate = useNavigate();
    const Lob = async(e)=>{
        var lobs = {...Lobby};
        lobs.userId = userIds;
        setLobby(lobs);
        Lobby.userId = userIds;
        const d = new Date();
        let timex = d.toLocaleString();
        console.log(timex);
        var xemit="";
			for(var a=0;a<timex.length;a++){
				if(timex[a]==':'||timex[a]==','||timex[a]=='/'){
                    if(timex[a]==','){
                        xemit=xemit+'t';    
                    }
                    else{
                        xemit=xemit+'-';
                    }
                }
				else{
                    if(timex[a]==" "||timex[a]=="P"||timex[a]=="A"||timex[a]=="M"){
                        xemit=xemit+'';
                    }
                    else{
					xemit=xemit+timex[a];
					console.log(xemit);
                    }
                }
			}
        if(Lobby.lobbyName=="" || Lobby.lobbyDescription==""){
          setcretPollErr(true);
          window.setTimeout(() => {
            setcretPollErr(false);
            }, 5000);
        }
        else if(selectedSubject!=1000){
            let subject = selectedSubject.SubjectValue;
            console.log(subject);
            let subs = subject.trim();
            var finalid=xemit+'s'+subs;
            Lobby.lobbyId=finalid
            console.log(finalid);   
            const{lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId} = Lobby;
            const res = await fetch("/createnewlobby", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId,subject})
            })
            const data= await res.json();
			if (res.status === 400 || !data) {
                window.alert("Lobby Creation Failed");
			} else if (res.status === 200 || res.status === 201) {
        setcretPoll(true);
        window.setTimeout(() => {
          setcretPoll(false);
          navigate("/poll/"+Lobby.lobbyId);
          }, 5000);
          
			} 
        }
        else{
            var finalid=xemit;
            Lobby.lobbyId=finalid
            console.log(finalid);   
            const{lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId} = Lobby;
            const res = await fetch("/createnewlobby", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({lobbyId,lobbyName,lobbyDescription,studentformId,pollId,userId})
            })
            const dat= await res.json();
			if (res.status === 400 || !dat) {
                window.alert("Lobby Creation Failed");
			} else if (res.status === 200 || res.status === 201) {
        setcretPoll(true);
        window.setTimeout(() => {
          setcretPoll(false);
          navigate("/poll/"+Lobby.lobbyId);
          }, 5000);
			} 
        }
    } 
    function viewpoll()
    {
        navigate("/vpoll/");

    }
    const classes=useStyles();
    return (
        <>
        {loading?
        
            <div style={{position: "relative",top:"15vh", width:"100%", height:"100%",fontFamily: "Roboto,Arial,sans-serif",display:"flex",flexDirection:"column"}}>
            <div className={classes.homeMain}>
           
                <img className={classes.mainImg} src={img}/>
                <div className={classes.mainText}>
                    <h1 textAlign="center">POLLAPP</h1>
                    <div className="textAnimation">
                        <div className="staticTxt">is&nbsp;</div>
                        <ul className="typingTxt">
                            <li><span>Convenient,</span></li>
                            <li><span>Easy to use</span></li>
                            <li><span>And Secured</span></li>
                        </ul>
                    </div>
                    <p>Way to Create Poll</p>
                    <button className="button" onClick={handleClickOpen}><span>Create Lobby </span></button>
                    <Dialog open={open} onClose={handleClose}>
                  <DialogTitle style={{backgroundColor:"#FFFAFA"}}>Create New <span style={{color:"#f4511e"}}>LOBBY</span></DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                    <TextField sx={{width:"30em"}} name="lobbyName" value={Lobby.lobbyName} autoFocus margin="dense" id="name" label="Enter Lobby Name" type="text" fullWidth variant="standard" onChange={handleInputs} inputProps={{maxLength: 40}}/>
                    <TextField 	name="lobbyDescription"	value={Lobby.lobbyDescription}margin="dense" id="outlined-multiline-static" label="Lobby Description" type="text" fullWidth  multiline rows={2} onChange={handleInputs} inputProps={{maxLength: 100}}/>
                    <CustomSelect value={selectedSubject} onChange={setselectedSubject}>
                    
				{userInfo.Subject==undefined?
					<>---No Subject Created---</>:<>
                    <StyledOption value={1000}>No Subject Selected</StyledOption>
				{
                    
					userInfo.Subject.map((value, index) => 
					<StyledOption value={value} key={index} >{value.SubjectValue}</StyledOption>
					)
				}
				</>}			
				
				<StyledOption >Add Subject</StyledOption>
			</CustomSelect>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions  style={{backgroundColor:"#FFFAFA"}}>
                    <Button className={classes.clpoll} endIcon={<CloseOutlinedIcon/>} onClick={handleClose} >Cancel</Button>
                    <Button className={classes.crpoll} endIcon={<AddOutlinedIcon/>} onClick={Lob}>Create</Button>
                  </DialogActions>
                  <Modal isOpen={cretPoll} style={{height:300,width:300,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA',opacity:'0.9'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="success">Lobby Created Successfully<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
                    <Modal isOpen={cretPollErr} style={{height:300,width:900,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="error">Please Enter All The Details<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
                </Dialog>
                </div>
            </div>
            <div id="feature" className={classes.featureBox} >
            <h1>Features</h1>
            <div className="featureContainer">
                <div className="featBox">
                    <div className="featIcon"><i class="far fa-folder-open"></i></div>
                    <div className="featContent">
                        <h3>
                            Lobby
                        </h3>
                        <p>Lobby keep your polls organized by grouping similar polls.</p>
                    </div>
                </div>
                <div className="featBox">
                    <div className="featIcon"><i class="far fa-times-circle"></i></div>
                    <div className="featContent">
                        <h3>
                        Close Polls
                        </h3>
                        <p>Stop the reponses by closing the polls at any time.</p>
                    </div>
                </div>
                <div className="featBox">
                    <div className="featIcon"><i class="fas fa-redo-alt"></i></div>
                    <div className="featContent">
                        <h3>
                        Live Polls
                        </h3>
                        <p>Real time poll updates when user gives the response.</p>
                    </div>
                </div>
                <div className="featBox">
                    <div className="featIcon"><i class="far fa-file-excel"></i></div>
                    <div className="featContent">
                        <h3>
                            Sheets
                        </h3>
                        <p>Store the results in Excel Sheets on your machine.</p>
                    </div>
                </div>
                <div className="featBox">
                    <div className="featIcon"><i class="far fa-check-circle"></i></div>
                    <div className="featContent">
                        <h3>
                        Secured
                        </h3>
                        <p>Authenticated with google which makes POLLAPP more secured.</p>
                    </div>
                </div>
                <div className='footers'>
                    <CodeIcon fontSize='large'style={{color:"whitesmoke"}}/><h1 align="center" style={{fontSize:"1.5em",color:"whitesmoke",fontWeight:"normal"}}>  by  Advait,Soham and Hridayesh</h1>
                </div>
            </div>
            </div>
            <Popup className={classes.pops} id="popup" trigger={timedPopup} setTrigger={setTimedPopup}>
                <div style={{width:"auto",margin:0,display:"flex",color:"#f4511e",fontSize:"1.5vh",fontFamily: "Roboto,Arial,sans-serif"}}><PollIcon style={{cursor:"pointer",margin:0}} fontSize='medium'/><h2 style={{margin:0}}>POLLAPP</h2></div>
                <div style={{overflow:"hidden",height:"20vh",width:"100%"}}>
                <div className='ani'>
                    <br/>
                    <br/>
                <h2 style={{fontWeight:"normal",fontSize:"2vh", fontFamily: "Roboto,Arial,sans-serif"}} align="justify">A polling web app used for <b>creating</b> and <b>voting</b> in live polls.<br/>Various features of this app include- 
                 <br/>
                 <br/>
                 <Box sx={{position: 'relative' }}>
                <Fab size="small" color="warning" sx={buttonF} aria-label="add">
                        {loadF ? <FolderIcon style={{ fontSize: 23 }}/> : <FolderOpenIcon style={{ fontSize: 23 }}/>}
                </Fab>
                    &nbsp;&nbsp;
                    Systematic Arrangement Of Polls In Lobbies
                </Box>
                 <br/>
                 <Box sx={{position: 'relative' }}>
                <Fab size="small" color="none" aria-label="add">
                <Stack sx={{ width: '80%'}}  >
                    <LinearProgress variant="buffer" color="primary" value={progress1} valueBuffer={buffer1}/>
                     <LinearProgress variant="buffer" color="secondary" value={progress2} valueBuffer={buffer2}/>
                     <LinearProgress variant="buffer" color="success" value={progress3} valueBuffer={buffer3}/>
                     <LinearProgress variant="buffer" color="inherit" value={progress4} valueBuffer={buffer4}/>
                </Stack>
                 </Fab>   
                 &nbsp;&nbsp;&nbsp;Live Polling 
                </Box><br/>
                <Box sx={{position: 'relative' }}>
                <Fab size="small" color="primary" sx={buttonSx} aria-label="add">
                        {sucUS ? <CheckIcon style={{ fontSize: 23 }}/> : <FactCheckIcon style={{ fontSize: 23 }}/>}
                </Fab>
                    {loadUS && (<CircularProgress size={45} sx={{ color: green[500], position: 'absolute',left: -3,top:-2, zIndex: 1,}}/>)}
                    &nbsp;&nbsp;
                Tracking Voters Response.
                </Box>
                <br/>
                <Box sx={{position: 'relative' }}>
                <Fab size="small" color="error" sx={buttonAk} aria-label="add">
                        {loadAK ? <AnalyticsIcon style={{ fontSize: 23 }}/> : <AssessmentIcon style={{ fontSize: 23 }}/>}
                </Fab>
                    &nbsp;&nbsp;
                    Analyis The Vote Of Every Participant.
                </Box>
                <br/>
                <Box sx={{position: 'relative' }}>
                <Fab size="small" color="secondary" sx={buttonSxuk} aria-label="add">
                        {sucUK ? <DownloadDoneIcon style={{ fontSize: 23 }}/> : <DownloadIcon style={{ fontSize: 23 }}/>}
                </Fab>
                    {loadUK && (<CircularProgress size={45} sx={{ color: blue[400], position: 'absolute',left: -3,top:-2, zIndex: 1,}}/>)}
                    &nbsp;&nbsp;
                    Download Response In Excel Sheet.
                </Box>
                 </h2>
                 <div className='anni'>
                <h3 style={{color:"#f4511e",fontSize:"2vh",fontFamily: "Roboto,Arial,sans-serif"}} align="center" className={classes.poptit}>SIGN UP OR LOGIN TO CONTINUE</h3>
                <br/>
                <div className='gButtons'>
                <GoogleLogin id="log" className={classes.log}  
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="LOGIN IN"
                            style={{borderRadius:"30px"}}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />&nbsp;&nbsp;
                   <GoogleLogin id="sign" className={classes.sign} 
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="SIGN UP"
                            onSuccess={responseeGoogle}
                            onFailure={responseeGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                </div>
                </div>
                </div>
                </div>
                
            </Popup>
            <Modal isOpen={loggedIn} style={{height:300,width:300,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA',opacity:'0.9'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="success">Login Successfull<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
                    <Modal isOpen={signedIn} style={{height:300,width:300,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA',opacity:'0.9'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="success">Successfully Signed In<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
                    <Modal isOpen={existance} style={{height:300,width:300,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA',opacity:'0.9'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="error">LogIn to Continue<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
                    <Modal isOpen={logexist} style={{height:300,width:300,margin:0,overlay:{zIndex:55,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",backgroundColor:'#FFFAFA',opacity:'0.9'},content:{width:"300px",overflow:"hidden",backgroundColor: 'rgba(255, 255, 255, 0.1)',height:"fit-content",margin:0,top:"10px",left:"0",transition:"1000ms all",border:"none"}}}>
            <Alert className='popAni' variant="filled" severity="error">SignUP to Continue<br/><LinearProgress color="inherit"/></Alert>
                    </Modal>
            </div>
        :<div className={classes.loader}>
            <div class="middle">
                <div class="bar bar1"></div>&nbsp;
                <div class="bar bar2"></div>&nbsp;
                <div class="bar bar3"></div>&nbsp;
                <div class="bar bar4"></div>&nbsp;
                <div class="bar bar5"></div>&nbsp;
                <div class="bar bar6"></div>&nbsp;
                <div class="bar bar7"></div>&nbsp;
                <div class="bar bar8"></div>
            </div>
        </div>}
        </>
    )
}

export default HomePage
