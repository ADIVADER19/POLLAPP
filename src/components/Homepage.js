import React from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { v4 as uuidv4 } from 'uuid';
import {yellow,black} from '@material-ui/core/colors'
import { createTheme } from '@material-ui/core/styles'




function Homepage() {
    let navigate = useNavigate();
    function createpoll()
    {
        const id=uuidv4();
        navigate("/poll/"+id);

    }
    function viewpoll()
    {
        navigate("/vpoll");

    }
    const theme = createMuiTheme({
        palette:
        {
            primary:{
                main:'#000000',
            },
            secondary: yellow
        }
    })
    const  useStyles = makeStyles({
        container:{
            marginTop:100,
            alignItems: 'center',
            marginLeft:250,
            position:"relative"
        },
        cpoll:{
            marginRight:100,
            height:100,
            width:300,
            fontSize:30,
            marginLeft:200

        },
        vpoll: {
            height:100,
            width:300,
            fontSize:30,

        },
        title:{
            marginBottom:80
        },
        motto:
        {
            marginLeft:200,
            marginTop:60,
            marginBottom:50
        }

        
        
    })
    const classes=useStyles()
  
    return (
        
        <div className={classes.container}>
         
            
            <Typography className={classes.title} variant="h1">HELLO,{}</Typography>
            <Typography className={classes.motto} variant="h3">CREATE AND VIEW LIVE POLLS</Typography>
            <Button color="secondary" className={classes.cpoll} onClick={createpoll} size="large" variant="contained" endIcon={<AddIcon/>}>CREATE POLL</Button>
            <Button color="secondary" className={classes.vpoll} onClick={viewpoll}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW POLLS</Button>
      </div>
    )
}

export default Homepage;
