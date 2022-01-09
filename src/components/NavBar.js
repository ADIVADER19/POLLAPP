import React from 'react'
import {makeStyles,Button} from '@material-ui/core';
import PollIcon from '@material-ui/icons/Poll';
import { useNavigate } from 'react-router';
import {useState,useEffect} from 'react';
import './Navbar.css';

const  useStyles = makeStyles({
    navbar:{
        width: "100%",
        display:"flex",
        backgroundColor: "rgb(233,245,251)",
    }  
    ,navbarTitle:{
        display: "flex",
        width: "85%",
        height: "10%",
        color: "rgb(0,86,146)",
        margin: "1%",
        '& h1':{
            display: "inline",
            marginLeft: "2%",
            fontFamily: "Roboto,Arial,sans-serif",
        },
        '& PollIcon':{
            marginTop:"1%",
        }
    },
})
function NavBar() {
    const [userInfo, setUserInfo] = useState({});
    let navigate = useNavigate();
    function navicon() {
        navigate('/home')
    }
    const logout = async (req, res) => {
        const rest = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await rest.json();
        console.log(data);
        if (rest.status === 200 || rest.status===201) {
            window.alert("LOGGED OUT SUCCESSFULLY")
            console.log("DATA retrieved from token")
        }
        else
        {
            window.alert("SOMETHING WENT WRONG")
        }

    };
    function profile(){
        navigate("/profile")

    }
    const classes=useStyles()
    return (
        <div className={classes.navbar}>
           <div className={classes.navbarTitle}>
               <PollIcon style={{cursor:"pointer"}} fontSize='large' className={classes.navBarIcon} onClick={navicon}/>
               <h1 style={{cursor:"pointer"}} onClick={navicon}>PollApp</h1>
           </div>
           <div class="dropdown">
               <button class="dropbtn">Profile</button>
               <div class="dropdown-content">
                   <Button onClick={profile}>View Profile</Button>
                   <Button onClick={logout}>Logout</Button>
                </div>
            </div>        
        </div>
    )
}

export default (NavBar)


