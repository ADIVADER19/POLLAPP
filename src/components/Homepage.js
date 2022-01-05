import React from 'react'
import {Typography,Button,makeStyles}  from '@material-ui/core'
import { useNavigate } from 'react-router';
import VisibilityIcon from '@material-ui/icons/Visibility';
const  useStyles = makeStyles({
    homepagecontainer:{
        backgroundColor: "#F0F0F0",
        margin:0,
        padding:0,
    },
    motto:{
        marginTop:"0.5%",
        fontFamily: "Roboto,Arial,sans-serif",
    },
    vac:{
        marginTop:"2%",
        marginLeft:"47%",
        fontFamily: "Roboto,Arial,sans-serif",
        width:"10%",
    },
    house:{
        display: "flex",
        flexDirection:"row",
        marginTop:"2%"
    },
    home:{
        display: "inline-block",
        margin: "10px",
        border: "1px solid rgb(223, 223, 223)",
        padding:"1%",
        '& h2':{
            fontWeight: "normal",
            marginLeft: "10px",
        },
        '& h4':{
            marginLeft: "10px",
            marginBottom: "2px",
            fontWeight: "normal",
            color: "rgb(109, 109, 109)",
        },
        "&:hover":{
            boxShadow: "2px 2px 5px #999",
        }
    },        
})
function Homepage() {
    let navigate = useNavigate();
    function viewpoll()
    {
        navigate("/view_poll/");

    }
    function viewlobby(){
        navigate("/view_lobby/");
    }
    const classes=useStyles()
    return (
        <div className={classes.homepagecontainer}>
            <div style={{backgroundImage:`url(${"https://pcdn.sharethis.com/wp-content/uploads/2021/05/Blog_Survey_051821-min.png"})` ,backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', width:"100vw", height:"80vh",display:"flex",
        flexDirection:"column",alignItems:"center",justifyContent:"space-between"}}>
                <Typography className={classes.motto} variant="h5"><u style={{color:"rgb(119,194,108)"}}>CREATE</u> <u style={{color:"rgb(255,198,59)"}}>AND</u> <u style={{color:"rgb(234,57,73)"}}>VIEW</u> <u style={{color: "rgb(0,86,146)",}}>LIVE POLLS</u></Typography>
                <div>
                <Button color="secondary" className={classes.vpoll} onClick={viewlobby}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW Created Lobby</Button>
                <Button color="secondary" className={classes.vpoll} onClick={viewpoll}  size="large" variant="contained" endIcon={<VisibilityIcon/>}>VIEW DASHBOARD</Button>
                </div>
            </div>
            
            <h1 class={classes.vac}>Features</h1>
        <div class={classes.house}>
            <div class={classes.home}>
                <h2><u>Feature 1</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 2</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 3</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
            <div class={classes.home}>
                <h2><u>Feature 4</u></h2>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, cupiditate commodi nihil ab maxime quasi eum consectetur quas delectus.</h4>
            </div>
        </div>
        </div>
    )
}
export default Homepage;
