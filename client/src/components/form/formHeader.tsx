import {Fragment} from "react";
import Button from 'react-bootstrap/Button';
import { BsFacebook } from "react-icons/bs";

export default function FormHeader(){
    return(
        <header className="header">
            <h2>Instagram</h2>
            <h6 id="subHeader">Sign up to see photos and videos from your friends.</h6>
            <Button variant="primary"><h6><BsFacebook/></h6><h6>Login in with Facebook</h6></Button>{' '}
            <Fragment><hr className="headerHR"/><h6>OR</h6><hr className="headerHR"/></Fragment>
        </header>
    )
}