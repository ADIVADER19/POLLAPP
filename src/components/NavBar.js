import React from 'react'
import {makeStyles} from '@material-ui/core';
import PollIcon from '@material-ui/icons/Poll';
import { useNavigate } from 'react-router';
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
    let navigate = useNavigate();
    function navicon() {
        navigate('/home')
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
                   <a href="#">Settings</a>
                   <a href="#">Logout</a>
                </div>
            </div>        
        </div>
    )
}

export default (NavBar)


