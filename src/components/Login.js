import React from 'react'
import {Typography,Button,makeStyles,createMuiTheme,ThemeProvider,TextField} from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';

function Login() {
    return (
        <div>
            <Typography variant="h2">WELOCME TO POLLAP</Typography>
            <Typography variant="h4">LOG-IN</Typography>
            <TextField required variant="outlined" placeholder="ENTER YOUR EMAIL ADDRESS"></TextField>
            
            
        </div>
    )
}

export default Login
