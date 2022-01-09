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
        navigate('/')
    }
    const logout = async () => {
        await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        }).then((res)=>{

            if (res.status === 200) {
                window.alert("LOGGED OUT SUCCESSFULLY")
                console.log("LOGGED OUT")
            }
            else
            {
                window.alert("SOMETHING WENT WRONG")
            }

        })
     

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


