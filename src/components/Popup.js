import React from 'react'
import "./Popup.css"

function Popup(props) {
    return (props.trigger)?(
        <>
        <div id="popup" className='popup'>
        </div>
        <div className='popup-inner'>
                { props.children}
            </div>
        </>
    ) : "";
}

export default Popup
