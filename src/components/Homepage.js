import React from 'react'
import {Typography,Button,makeStyles,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Popup from './Popup';
import {useState, useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import livepoll from './livepoll.png';
import googleauthenticate from './googleauthenticate.png';
import organization from './organization.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const  useStyles = makeStyles({
    homepagecontainer:{
        backgroundColor: "whitesmoke",
        margin:0,
        padding:0,
    },
    motto:{
        fontFamily: "Roboto,Arial,sans-serif",
    },
    vac:{
        marginTop:"10%",
        fontFamily: "Roboto,Arial,sans-serif",
    },
    cpoll:{
        backgroundColor:"black",
        color:"whitesmoke",
        '&:hover':{
            color:"#F5F5DC",
            backgroundColor:"#A1509B"
        }
    },
    house:{
        marginTop:"10%",
        width:"100%",
    },
    home:{
        fontFamily: "Roboto,Arial,sans-serif",
        border: "1px solid rgb(223, 223, 223)",
        padding:"3%",
        width:"20%",
        minHeight:"150px",
        margin:"1%",
        backgroundColor:"#F5F5DC",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        '& h2':{
            fontWeight: "normal",
            textAlign:"center",
            marginBottom:"1%",
        },
        '& p':{
            fontWeight: "normal",
            textAlign:"center",
            fontSize:"20px",
            color:"#313738"
        },
        "&:hover":{
            boxShadow: "2px 2px 5px #999",
        }
    },
    log:
    {
        marginLeft:100,
        margrinRight:150,
        width:150,
        height:50

    },
    sign:{
        marginLeft:150,
        margrinRight:150,
        width:150,
        height:50
    },
    poptit:{
        fontSize:25,
        marginLeft:130,
        fontWeight:20
    }      
})
function Homepage() {
    const [timedPopup, setTimedPopup] = useState(false);
    const [data, setData] = useState("");
	const [userInfo, setUserInfo] = useState({});
    
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
                console.log(data);
                setUserInfo(data);
			}
            else if (res.status === 422) {
                setTimeout(()=>{
                    setTimedPopup(true);
                },1000);
            }
            else
            {
                setTimeout(()=>{
                    setTimedPopup(true);
                },1000);
            
            }
		} catch (err) {
			console.log(err);
		}
	};
    const responseGoogle = async (response) => {
        
        console.log(response);
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        console.log(mail);
        console.log(name);
        console.log(givenName);
        if (
			!mail ||
			!name ||
			!givenName 
		) {
			console.log("Please fill all the credentials");
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
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY LOGGED IN")
                //props.setTrigger(false)
                setTimedPopup(false);
                userd()
				console.log("ZA WARUDOO!!!!");
			} 
            else if(res.status === 422)
                {
                window.alert("USER DOES NOT EXSIST")
				console.log("Invalid User Creation");
			}
            else
            {
                window.alert("INVALID USER")
            }
		}
	};
    const responseeGoogle = async (response) => {
        
        console.log(response);
        const mail=response.profileObj.email
        const name=response.profileObj.name
        const givenName=response.profileObj.givenName
        console.log(mail);
        console.log(name);
        console.log(givenName);
        if (
			!mail ||
			!name ||
			!givenName 
		) {
			console.log("Please fill all the credentials");
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
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("SUCCESSFULLY SIGNED UP")
                document.getElementByClassName("sign").style.visibility="hidden";
				console.log("ZA WARUDOO!!!!");
                
			} 
            else if(res.status === 422)
            {
                window.alert("USER ALREADY EXISTS");
            }
            else {
				console.log("Invalid User Creation");
			}
		}
	};
	
	var usern = userInfo;
	console.log('variable',usern);
    console.log('data',usern._id);
    var userIds = usern._id;
    console.log('user',userIds);
    console.log("Type",typeof(userIds));
    useEffect(() => {
        userd();
        }, [])
    // useEffect(() => {
    //     setTimeout(()=>{
    //         setTimedPopup(true);
    //     },1000);

    // },[])
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
            toast.error("Please enter all the details", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
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
                toast.error("Lobby Creation Failed");
			} else if (res.status === 200 || res.status === 201) {
                toast.success("Lobby Created Successfully");
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
    const classes=useStyles()
    return (
        <div className={classes.homepagecontainer}>
            <div style={{paddingTop:"8%", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <Typography className={classes.motto} variant="h2" align="center" style={{color:"#A1509B"}}>POLLAPP</Typography>
            <hr style={{width:"50%", border:"2px solid #A1509B"}}/>
                <Typography className={classes.motto} variant="h4" align="center" style={{color:"#A1509B"}}>CREATE AND VIEW LIVE POLLS</Typography>
                <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center", marginTop:"2%"}}>
                <Button className={classes.cpoll} onClick={handleClickOpen} size="large" variant="contained" endIcon={<AddIcon/>}>CREATE NEW LOBBY</Button>
                &nbsp;&nbsp;
                <Dialog open={open} onClose={handleClose}>
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
                <Button color="secondary" className={classes.cpoll} onClick={viewpoll}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW DASHBOARD</Button>
                </div>
            </div>
        <div class={classes.house}>
        <Typography variant="h2" align="center">Features</Typography>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div class={classes.home}>
                <img src={livepoll} style={{width:"40%", margin:"3%"}}/>
                <h2>Live Polls</h2>
                <p>Real time poll updates when user gives the response.</p>
            </div>
            <div class={classes.home}>
            <img src={googleauthenticate} style={{width:"30%", margin:"3%"}}/>
                <h2>Secured</h2>
                <p>Authenticated with google which makes POLLAPP more secured.</p>
            </div>
            <div class={classes.home}>
            <img src={organization} style={{width:"30%", margin:"3%"}}/>
                <h2>Lobby</h2>
                <p>Lobby keep your polls organized by grouping similar polls.</p>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 4</u></h2>
                <p></p>
            </div>
            </div>
        </div>
        <Popup id="popup" trigger={timedPopup} setTrigger={setTimedPopup}>
            <h3 className={classes.poptit}>SIGN UP OR LOGIN TO CONTINUE</h3>
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
        </Popup>
        <ToastContainer></ToastContainer>
        </div>
    )
}
export default Homepage;
