import React,{useState} from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider,TextField} from '@material-ui/core'
import { useNavigate } from 'react-router';

function Login() {
    
    const navigate=useNavigate();
    
    
    const [user, setUser] = useState({
            mail: "",
            name: "",
        });
    let value,name;
    const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;
            setUser({ ...user, [name]: value });
        };
    function signuser()
        {
            navigate('/signin')
        }
    const loguser = async (e) => 
    {
        e.preventDefault();
        const {
			mail,
			name,
		} = user;
		console.log(user);
       
        if (
            !mail ||
            !name 
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
                }),
            });
            const data= await res.json();
            if (res.status === 400 || !data) {
                console.log("USER LOGIN FAILED");
            } else if (res.status === 200 || res.status === 201) {
                navigate('/home')
                console.log("ZA WARUDOO!!!!");
            } else {
                console.log("Incorrect email or name");
            }
        
    };
    
}

            
        

    
    return (
        <div>
            <Typography variant="h2">WELOCME TO POLLAP</Typography>
            <Typography variant="h4">LOG-IN</Typography>
            <TextField name="mail" value={user.mail} onChange={handleInputs}  required variant="outlined" label="ENTER YOUR EMAIL"/>
            <TextField name="name" value={user.name} onChange={handleInputs}  required variant="outlined" label="ENTER YOUR NAME"/>
            <Button  variant="contained" color="primary" onClick={loguser}>LOGIN</Button>
            <Button variant="contained" color="primary" onClick={signuser}>SIGN UP</Button>
            
        </div>
    )
}

export default Login
