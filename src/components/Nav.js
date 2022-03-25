import React from 'react'
import {makeStyles,Button} from '@material-ui/core';
import PollIcon from '@material-ui/icons/Poll';
import { useNavigate } from 'react-router';
import {useState,useEffect} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Nav.css';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'universal-cookie';
const  useStyles = makeStyles({
    main:{
        boxSizing:"border-box",
        fontFamily: "Roboto,Arial,sans-serif",
        textTransform:"capitalize",
        position:"fixed",
        zIndex:"2",
        top:"0",
        left:"0",
        right:"0",
        backgroundColor:"whitesmoke",
        boxShadow:"0 5px 10px rgba(0,0,0,.1)",
        padding:"0px 2%",
        display:"flex",
        alignItems:"center",
        height:"10vh",
        width:"100vw",
        justifyContent:"space-between",
        '& a':{
            textDecoration:"none",
        },
        '& #toggle':{
            display:"none",
        },
        '& label':{
            display:"none",
        },
        '& nav':{
            '& ul':{
                listStyle:"none",
                '& li':{
                    position:"relative",
                    float:"left",
                    
                    '& ul':{
                        position:"absolute",
                        boxShadow:"0 5px 10px rgba(0,0,0,.1)",
                        left:"0",
                        width:"200px",
                        backgroundColor:"whitesmoke",
                        display:"none",
                        '& li':{
                            width:"100%",
                            borderTop: "1px solid rgba(0,0,0,.1)",
                        },
                        
                    },
                    '&:hover':{
                        '& ul':{
                            display:"initial",
                        }
                    },
                    '&:focus-within':{
                        '& ul':{
                            display:"initial",
                        }
                    },
                    '& a':{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        padding:"3vh",
                        color:"#333",
                        '&:hover':{
                            color:"#f4511e",
                        }
                    }
                }
            }
        },
        ["@media(max-width: 650px)"]: {
            '& label':{
                display:"initial",
                zIndex:"100",
            },
            
            '& nav':{
                position:"absolute",
                top:"100%",
                left:"0",
                right:"0",
                backgroundColor:"whitesmoke",
                borderTop:"1px solid rgba(0,0,0,.1)",
                display:"none",
                '& ul':{
                    '& li':{
                        width:"100%",
                        borderBottom:"1px solid rgba(0,0,0,.1)",
                        '& ul':{
                            position:"relative !important",
                            width:"100vw !important",
                        },
                        
                    },
                    '&.div':{
                        height:"2px",
                        color:"green",
                    },
                }
            },
           	
		},
    }
})
function Nav() {
    const classes=useStyles();
    const [checked, setChecked] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const link="https://pollapp281907.herokuapp.com/"
    const cookies = new Cookies();
      let navigate = useNavigate();
    function toggle(value){
        return !value;
      }
      function navicon() {
          navigate('/')
      }
      function logout(e){
          e.preventDefault();
          }
       
      function profile(e){
        e.preventDefault();
          navigate("/profile");
      };
    function viewpoll(e){
        e.preventDefault();
        navigate("/vpoll/");
    }
    useEffect(async() => {
        const res = await fetch(`${link}userdata`, {
				method: "GET",
                headers: {
                    Accept: "application/json",
					"Content-Type": "application/json"
                  },
				credentials: "include",
			});
			const data =await res.json();
            setUserInfo(data);
        }, [])
    return (
        <>
           <header className={classes.main}>
               <a href="#" style={{display:"flex",color:"#f4511e"}}><PollIcon style={{cursor:"pointer"}} fontSize='medium' onClick={navicon}/><h2 onClick={navicon}>POLLAPP</h2></a>
               <input type="checkbox" name="toggle" id="toggle" checked={checked}onChange={e => setChecked(toggle)}/>
               <label for="toggle">{!checked?<MenuIcon/>:<CloseIcon/>}</label>
               <nav className="checks">
                   <ul>
                       <li><a href="#" onClick={(e)=>{viewpoll(e)}}>Dashboard</a></li>
                       <li ><a href="#">Welcome,{userInfo.name}</a>
                       <ul>
                       <li><a href="#" onClick={(e)=>{profile(e)}}>View Profile</a></li>
                       <li><a href="#" onClick={(e)=>logout(e)}>Logout</a></li>
                       </ul>
                       </li>
                   </ul>
                </nav>
            </header> 
        </>
    )
}

export default Nav