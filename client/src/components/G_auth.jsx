import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch} from 'react-redux';
import {signInSuccess} from '../reduxApp/User/userSlice';
import { useNavigate } from "react-router-dom";

function G_auth() {
    const auth = getAuth(app)   //so that firebase get to know on the basis of what auth should be done
    const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });   //so that when user do sign in again so don't be signed in with previos only 
    try {
      const resFromGoogle = await signInWithPopup(auth, provider);
const res = await axios.post('/api/auth/googleAuth',{
   name: resFromGoogle.user.displayName,
   email: resFromGoogle.user.email,
   googlePhotoUrl:resFromGoogle.user.photoURL
}, 
{
    headers: {"Content-Type":"application/json"}
})

if(res.statusText ==='OK'){
dispatch(signInSuccess(res));
navigate('/');
}
    } catch (error) {
      console.log("google Auth ERR", error);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default G_auth;
