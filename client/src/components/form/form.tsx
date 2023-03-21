import { useState } from "react";
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form';
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import YupPassword from 'yup-password';
YupPassword(yup);

const schema = yup.object({
    userEmail: yup.string().email(""),
    userPassword: yup.string().password().max(15, "")
});

export default function Form(){

    const [userFirstName, updateUserFirstName] = useState<string>("");
    const [userSecondName, updateUserSecondName] =useState<string>("");
    const [userEmail, updateUserEmail] =useState<string>("");
    const [userPassword, updateUserPassword] =useState<string>("");
    const [secondUserPassword, updateSecondUserPassword] =useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur"
    })

    const submitForm = async () => {
        try {
            const body = {userEmail, userFirstName, userSecondName, userPassword};
            const signUpData = await fetch("http://localhost:5000/signup", {
                method:"post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(signUpData);
        } catch(err){
            console.log(err);
        }
    };

    return(
        <form onSubmit={handleSubmit(submitForm)} className="signUpForm">

            <input {...register('userEmail',{required:true})} value={userEmail} onChange={(e)=>updateUserEmail(e.target.value)} name="userEmail" placeholder="Mobile Number or Email" 
            ></input>

            <p className="message error" role="alert">{errors.userEmail?.message && <FaRegTimesCircle className="message error" />}</p>
            <p className="message success" role="alert"> {(errors.userEmail==undefined && userEmail.length>0 ) && <FaRegCheckCircle/>}</p>

            <input value={userFirstName} onChange={(e)=>updateUserFirstName(e.target.value)} name="FirstName" placeholder="First Name"></input>
            
            <input value={userSecondName} onChange={(e)=>updateUserSecondName(e.target.value)} name="userSecondName" placeholder="Second Name"></input>

            <input {...register('userPassword', {required:true})} value={userPassword} type="password" onChange={(e)=>updateUserPassword(e.target.value)} name="userPassword" placeholder="Password"></input>
            
            {errors.userPassword?.message && <p className="passwordError">Password must include 8 to 15 characters and at least 1 uppercase, lowercase, number and symbol characters</p>}
            
            <input value={secondUserPassword} type="password" onChange={(e)=>updateSecondUserPassword(e.target.value)} name="userSecondPassword" placeholder="Re-enter Password"></input>
            {(secondUserPassword==userPassword && secondUserPassword.length>0) && <p className="secondMessage success" role="alert"> <FaRegCheckCircle/></p>}

            <p id="topP">People who use our service may have uploaded your contact information to Instagram. Learn More</p>
            <p>By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Privacy Policy and how we use cookies and similar technology in our Cookies Policy.</p>

            {(userFirstName.length > 0 && userSecondName.length > 0 && userEmail.length > 0 && userPassword.length > 0 && secondUserPassword==userPassword)? 

            <Button id="formButton" type="submit" variant="primary" onClick={submitForm}><Link to="/userAccountPage" id="nextLink">Next</Link></Button>: 

            <Button id="formButton" type="submit" variant="primary" disabled>Next</Button>}
        </form>
    )       
}