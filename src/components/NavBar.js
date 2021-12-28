import React from 'react'
import {Typography,AppBar,Toolbar,Button,makeStyles,createMuiTheme,ThemeProvider,IconButton} from '@material-ui/core';
import {red} from '@material-ui/core/colors'
import PollIcon from '@material-ui/icons/Poll';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate } from 'react-router';
import { createTheme } from '@material-ui/core/styles'
import './Navbar.css';

const theme = createMuiTheme({
    palette:
    {
        primary:{
            main:'#000000',
        },
        secondary: red
    }
})
const  useStyles = makeStyles({
    navicon:{
        marginLeft:100,
        marginRight:50

    },
    navitems: {
        marginLeft:100,
        marginRight:100
    
    },
    navtitle:
    {
        marginLeft:100,
        marginRight:100,
        fontSize:40,
    },
    hamburger:
    {
        display:'none'
        
    }
    
    
})
function NavBar() {
    let navigate = useNavigate();
    function navicon() {
        navigate('/')
    }
    const classes=useStyles()
    return (
        <div>
           
                <ThemeProvider theme={theme}>
                        <AppBar   classNaposition="fixed">
                            <Toolbar>
                                <IconButton  onClick={navicon} className={classes.navicon}>
                                    <PollIcon color="secondary"/>
                                </IconButton>
                                <Typography  className={classes.navtitle} variant="h5">POLLAPP</Typography>
                                <Button    color="secondary" variant="outlined"className={classes.navitems}>LOGIN</Button>
                                <Button   color="secondary" variant="outlined" className={classes.navitems}>SIGNUP</Button>
                                <Button   color="secondary" variant="outlined" className={classes.navitems}>CREATE POLL</Button>
                                <IconButton  className={classes.hamburger} color="secondary">
                                    <MenuIcon/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                </ThemeProvider>
           
        </div>
    )
}

export default (NavBar)


