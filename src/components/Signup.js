import React from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core'

import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import './Signup.css'



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
                window.alert('Something went wrong')
				console.log("USER REGISTRATION FAILED");
			} else if (res.status === 200 || res.status === 201) {
                window.alert("ACCOUNT CREATED SUCCESSFULLY")
			    navigate('/')
				console.log("ZA WARUDOO!!!!");
			} else {
				console.log("Invalid User Creation");
			}
		}
	};

    function linkto()
    {
        navigate('/home');
    }
        
      
    const navigate=useNavigate();
    return (
        <div>
                <Typography className="title" variant="h2">WELCOME TO POLL-APP</Typography>
                
                <Button  className="log" variant="outlined" onClick={linkto}>Login</Button>
        </div>
    )
}

export default Signup

