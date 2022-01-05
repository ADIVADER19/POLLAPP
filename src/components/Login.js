import React,{useState} from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider,TextField} from '@material-ui/core'
import { useNavigate } from 'react-router';
import './Login.css'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'


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
            window.alert("Please fill all the credentials")
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
                window.alert('Something went wrong')
                console.log("USER LOGIN FAILED");

            } else if (res.status === 200 || res.status === 201) {
                window.alert("USER LOGIN SUCCESS")
                navigate('/home')
                console.log("ZA WARUDOO!!!!");
            } else {
                window.alert('Incorrect email or name')
                console.log("Incorrect email or name");
            }
        
    };
    
}

            
        

    
    return (
        <div>
                     
            <div className="parttwo">
                <div>
                    <h1 className="ltitle">WELCOME TO POLLAP</h1>
                    <h1 variant="h3" className="logt">LOG-IN:</h1>
                </div>
                <div className="ltext">
                    <h2>ENTER YOUR EMAIL:</h2>
                    <input name="mail" value={user.mail} onChange={handleInputs}  required variant="outlined" />
                </div>
                <div className="ltext">
                    <h2>ENTER YOUR NAME:</h2>
                    <input name="name"  value={user.name} onChange={handleInputs}  required variant="outlined" />
                </div>
                <div className="signup">
                    <Button   variant="contained" color="primary" onClick={loguser}>LOGIN</Button>
                </div>
                <div className="signup_two">
                    <h3>DONT HAVE AN ACCOUNT YET?</h3>
                    <Button endIcon={<AssignmentIndIcon />}   variant="contained" color="primary" onClick={signuser}>SIGN UP</Button>
                </div>
            </div>
            
           
            
           
            
        </div>
    )
}

export default Login
