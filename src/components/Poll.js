import React from 'react'
import {Typography,TextField,Button,RadioButton,makeStyles} from '@material-ui/core'

const useStyles= makeStyles({
    queslabel:
    {
        marginRight:100,
        marginLeft:400,
        marginBottom:50,
        marginTop:30,
        

    },
    quesitem:
    {
        marginRight:100,
        marginLeft:400,
        marginBottom:70,
        marginTop:100,
        

    },
    pollcontainer:
    {
        marginRight:500
    }

    
})
function Poll() {
    const classes=useStyles()
    return (
        <div className={classes.pollcontainer}>
             <Typography  className={classes.queslabel}  variant="h2">Poll Creation</Typography>
             <Typography className={classes.quesitem} variant="h4">ENTER TITLE OF POLL</Typography>
             <TextField required className={classes.quesitem}  variant="outlined" ></TextField>
             <Typography className={classes.queslabel} variant="h4">ENTER NUMBER OF QUESTIONS</Typography>
             <TextField   required className={classes.quesitem} variant="outlined" ></TextField>
             <Typography></Typography>
        </div>
    )
}

export default Poll;
