import React from 'react'
import {Typography,Button,makeStyles}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Popup from './Popup';
import {useState, useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';

const  useStyles = makeStyles({
    homepagecontainer:{
        backgroundColor: "#F0F0F0",
        margin:0,
        padding:0,
    },
    motto:{
        marginTop:"0.5%",
        fontFamily: "Roboto,Arial,sans-serif",
    },
    vac:{
        marginTop:"2%",
        marginLeft:"47%",
        fontFamily: "Roboto,Arial,sans-serif",
        width:"10%",
    },
    house:{
        display: "flex",
        flexDirection:"row",
        marginTop:"2%"
    },
    home:{
        display: "inline-block",
        margin: "10px",
        border: "1px solid rgb(223, 223, 223)",
        padding:"1%",
        '& h2':{
            fontWeight: "normal",
            marginLeft: "10px",
        },
        '& h4':{
            marginLeft: "10px",
            marginBottom: "2px",
            fontWeight: "normal",
            color: "rgb(109, 109, 109)",
        },
        "&:hover":{
            boxShadow: "2px 2px 5px #999",
        }
    },        
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
                document.getElementByclassName("sign").style.display="none";
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
	
	var usern = userInfo.mail;
	console.log('variable',usern);
    console.log('data',userInfo.name);
    useEffect(() => {
        userd();
        }, [])
    // useEffect(() => {
    //     setTimeout(()=>{
    //         setTimedPopup(true);
    //     },1000);

    // },[])
       
    let navigate = useNavigate();
    function viewpoll()
    {
        navigate("/vpoll/");

    }
    function viewlobby(){
        navigate("/view_lobby/");
    }
    const classes=useStyles()
    return (
        <div className={classes.homepagecontainer}>
            <div style={{backgroundImage:`url(${"https://pcdn.sharethis.com/wp-content/uploads/2021/05/Blog_Survey_051821-min.png"})` ,backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', width:"100vw", height:"80vh",display:"flex",
        flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
                <Typography className={classes.motto} variant="h5"><u style={{color:"rgb(119,194,108)"}}>CREATE</u> <u style={{color:"rgb(255,198,59)"}}>AND</u> <u style={{color:"rgb(234,57,73)"}}>VIEW</u> <u style={{color: "rgb(0,86,146)",}}>LIVE POLLS</u></Typography>
                <div>
                <Button color="secondary" className={classes.vpoll} onClick={viewlobby}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW Created Lobby</Button>
                <Button color="secondary" className={classes.vpoll} onClick={viewpoll}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW DASHBOARD</Button>
                </div>
            </div>
            
            <h1 class={classes.vac}>Features</h1>
        <div class={classes.house}>
            <div class={classes.home}>
                <h2><u>Live POLLS</u></h2>
                <h4>Conduct live polls</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Google authentication</u></h2>
                <h4>login in through google</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 3</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 4</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
        </div>
        <Popup id="popup" trigger={timedPopup} setTrigger={setTimedPopup}>
            <h3>SIGN UP OR LOGIN TO CONTINUE</h3>
            <GoogleLogin id="log" className="log"  
                        clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                        buttonText="LOGIN IN"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        color="primary"
                    />
               <GoogleLogin id="sign" className="sign"  
                        clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                        buttonText="SIGN UP"
                        onSuccess={responseeGoogle}
                        onFailure={responseeGoogle}
                        cookiePolicy={'single_host_origin'}
                        color="primary"
                    />
        </Popup>
        </div>
    )
}
export default Homepage;
