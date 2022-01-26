import React from 'react';
import {makeStyles,Dialog,DialogTitle,DialogActions,TextField,DialogContent,DialogContentText,Button, Typography} from '@material-ui/core';
import {useState,useEffect} from 'react';
import './HomePage.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';
import img from './img_05.svg';
import Popup from './Popup';
import { GoogleLogin } from 'react-google-login';
import CircularProgress from '@mui/material/CircularProgress';
import CodeIcon from '@mui/icons-material/Code';
const  useStyles = makeStyles({
    pops:{
        backgroundColor:"whitesmoke"
    },
    log:{
        width:"30%",
        marginLeft:"2%",
    },
    sign:{
        width:"30%",
        marginLeft:"2%",
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
          zIndex:"3",
          top:"0",
          width:"100vw",
          height:"100vh",
          backgroundColor:"whitesmoke",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
      }
})
function HomePage() {
    const [timedPopup, setTimedPopup] = useState(false);
    const [data, setData] = useState("");
	const [userInfo, setUserInfo] = useState({});
    const[loading,setLoading]=useState(true);
    const[newid,setRid]=useState();
    const link="https://pollapp281907.herokuapp.com/"
    const userd = async () => {
		try {
			const res = await fetch(`${link}userdata`, {
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
        console.log(mail)
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch(`${link}login`, {
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
            const tok=data.message;
            console.log(data);
            console.log(tok);
			if (res.status === 400 || !data) {
                window.alert('Something went wrong')
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY LOGGED IN")
                document.cookie=`jwt=${tok};max-age=60000;path=/;secure;httpOnly=true`
                setTimedPopup(false);
                userd()
                
                
			} 
            else if(res.status === 422)
                {
                window.alert("USER DOES NOT EXSIST")
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
        console.log(mail)
        if (
			!mail ||
			!name ||
			!givenName 
		) {
		} else {
			const res = await fetch(`${link}u`, {
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
                window.alert("SUCCESSFULLY SIGNED UP")
                document.getElementByClassName("sign").style.visibility="hidden";
			} 
            else if(res.status === 422)
            {
                window.alert("USER ALREADY EXISTS");
            }
            else {
			}
		}
	};
	
	var usern = userInfo;
    var userIds = usern._id;
    useEffect(() => {
        setLoading(false);
        userd();
        }, [])
    const createid=uuidv4();
    useEffect(()=>{
        
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
        var finalid=createid+xemit;
        // var lobster = {...Lobby};
        // lobster.lobbyId = finalid;
        // setLobby(lobster)
        Lobby.lobbyId=finalid
        console.log(finalid);    
    },[])

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
            const res = await fetch(`${link}createnewlobby`, {
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
    let navigate = useNavigate();
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
                <h3 align="center" className={classes.poptit}>SIGN UP OR LOGIN TO CONTINUE</h3>
                <div style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
                <GoogleLogin id="log" className={classes.log}  
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="LOGIN IN"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                   <GoogleLogin id="sign" className={classes.sign} 
                            clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                            buttonText="SIGN UP"
                            onSuccess={responseeGoogle}
                            onFailure={responseeGoogle}
                            cookiePolicy={'single_host_origin'}
                            color="primary"
                        />
                </div>
            </Popup>
            
            </div>
        :<div className={classes.loader}>
        <CircularProgress style={{color:"#f4511e"}} size={100} />
        <Typography variant="h3" style={{color:"#f4511e"}}>Loading...</Typography>
        </div>}
        </>
    )
}

export default HomePage
