import React from 'react'
import {Typography,Tabs,Tab} from '@material-ui/core'

function Vpoll() {
    return (
        <div>
            <Tabs
              centered
              textColor="secondary"
              indicatorColor="secondary"
            >
                <Tab label="ACTIVE POLLS"></Tab>
                <Tab label="VIEW POLLS"></Tab>
            </Tabs>
        </div>
    )
}

export default Vpoll
