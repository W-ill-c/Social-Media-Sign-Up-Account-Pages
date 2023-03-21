import React from "react";
import { BsGooglePlay, BsMicrosoft } from "react-icons/bs";
import Button from 'react-bootstrap/Button';


export default function Footer(){
    return(
        <footer className="footer">
            <h5>Get the app.</h5>
            <Button className="pageFooterButton left" variant="dark" size="sm">
                <BsGooglePlay className="footerButtonIcon" />
                <p>
                    <span className="smallButtonText">Get it on</span><br/>
                    Google Play
                </p>
            </Button>
            <Button className="pageFooterButton right" variant="dark" size="sm">
                <BsMicrosoft className="footerButtonIcon" />
                <p>
                    <span className="smallButtonText">Get it from</span> <br/>
                    Microsoft
                </p>
            </Button>
        </footer>
    )
}