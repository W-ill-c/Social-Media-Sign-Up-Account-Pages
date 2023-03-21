import { ReactElement, useEffect, useState} from "react";
import { FaUserCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import {json, Link} from 'react-router-dom';

type UserInfoType = {
    user_id: string,
    user_name: string,
    user_second_name: string,
    user_email: string
}

type FormStageType = {
    email?: number,
    password?: number
}

export default function AccountPage(){

    const [formStage, updateFormStage] = useState<FormStageType[]>([{email:0}, {password:0}]);
    
    function nextSlide(specifiedIndex:number):void{ 
        updateFormStage(formStage.map(
            (item, index) =>{
                if (specifiedIndex ==1 && index == 1){
                    return {password:1}
                } else if (specifiedIndex ==0 && index == 0){
                    return {email:1}
                }else{
                    return item;
                }
            }
        ));
    }
        
    function prevSlide(specifiedIndex:number):void{ 
        updateFormStage(formStage.map(
            (item, index) =>{
                if (specifiedIndex ==1 && index == 1){
                    return {password:0}
                } else if (specifiedIndex ==0 && index == 0){
                    return {email:0}
                }else{
                    return item;
                }
            }
        ));
    }   

    const[userInfo, setUserInfo] = useState<UserInfoType>({user_id:"", user_name:"", user_second_name:"", user_email:""});

    const deleteAccount = function(id:string){
        try{
            const deleteEntry = fetch(`http://localhost:5000/deleteresource/${id}`,
            {method:"DELETE"});
            console.log(id);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>
        {const userDataFetch = async ()=>{
            try{
                const userData = await fetch("http://localhost:5000/userPage")
                const JsonUserData = await userData.json();
                setUserInfo(JsonUserData);
                // console.log(userInfo);
            } catch (err){
                console.log(err);
            }
        };
        userDataFetch()}
    )

    return(
        <>
            <section className="accountInformation">
                <FaUserCircle id="accountIcon"/>
                <h4>Your Account Information</h4>
                <h6>User Name: {userInfo.user_name} {userInfo.user_second_name}</h6>
                <h6>User Email or Phone: {userInfo.user_email}</h6>
                <Button id="deleteAccount" onClick={()=>deleteAccount(userInfo.user_id)} variant="danger"><Link to="/" id="deleteAccountLink">Delete Account</Link></Button>{' '}
            </section>
            
            
            <div className={`updateEmailSection ${(formStage[0].email==1 && formStage[1].password==0)? "visible" : "notVisible"}`}>
                <h5>Update Email</h5>
                <input placeholder="New Email"></input>
                <div>
                    <Button variant="danger" className="updatingButton" onClick={()=>{
                        prevSlide(0)}}>Cancel</Button>
                    <Button variant="primary" className="updatingButton">Confirm Update</Button>
                </div>
            </div>
            
      
            <div className={`updatePasswordSection ${(formStage[0].email==0 && formStage[1].password==1)? "visible" : "notVisible"}`}>
                <h5>Update Password</h5>
                <input placeholder="New Password"></input>
                <input placeholder="Enter Current Password for Confirmation"></input>
                <div>
                    <Button variant="danger" className="updatingButton" onClick={()=>{prevSlide(1)}}>Cancel</Button>
                    <Button variant="primary" className="updatingButton">Confirm Password</Button>
                </div>
            </div>
        
            
            <div className={`updateInfoSection ${(formStage[0].email==0 && formStage[1].password==0)? "visible" : "notVisible"}`}>
                <Button variant="primary" className="updateButton" onClick={()=>{nextSlide(0)}}>Update Email</Button>
                <Button variant="primary" className="updateButton" onClick={()=>{nextSlide(1)}}>Update Password</Button>
            </div>
        </>
    )
}