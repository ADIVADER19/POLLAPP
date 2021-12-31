import React from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';



toast.configure()

function Signup() {
    
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
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
			    navigate('/')
				console.log("ZA WARUDOO!!!!");
			} else {
				console.log("Invalid User Creation");
			}
		}
	};

        
        
      
    const useStyles=makeStyles({
        sign:{
            height:100,
            width:200,
        
        },
        log:{
            height:100,
            width:200,
        }

      })
    const classes =useStyles();
    const navigate=useNavigate();
    return (
        <div>
                <Typography className="" variant="h2">WELCOME TO POLL-APP</Typography>
                <GoogleLogin className={classes.sign}  
                    clientId="399611436919-fo4n24pr7bpmslat5vamj5u8rc5q0v6f.apps.googleusercontent.com"
                    buttonText="SIGN UP"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    color="primary"
                />
        </div>
    )
}

export default Signup

