import React, { useEffect } from "react";
import "./styles/styles.css";
import "./styles/login-register-home.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";

function RespuestaGoogle() {

 //Migracion que exige google  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
        scope: "email"
      });
    }
    gapi.load("client:auth2", start);
  }, [])

  //Buscar email en la base de datos y obtener id y roleId
  const getUserData = async (googleData) => {
    const userExists=await axiosClient.get(`/users/byEmail/${googleData.profileObj.email}`,
      { withCredentials: true } )
      .then(response=>{
        if(response.status===200){  
          sessionStorage.setItem('userInfo.id',JSON.stringify({id:response.data.id}))
          sessionStorage.setItem('userInfo.roleId',JSON.stringify({roleId:response.data.roleId}))
        } 
      })
      .catch(error=>{
        console.log(error)
      })
 
    if(userExists==="undefined"){
      createNewUser(googleData)
    } else{
      window.location.href = "/About"
    }
  }

  //crear usuario en BD con los datos de Google
  const createNewUser= async (googleData)=>{
      let body = {
        "firstName":googleData.profileObj.givenName,
        "lastName":googleData.profileObj.familyName,
        "email":googleData.profileObj.email,
        "roleId":process.env.REACT_APP_ROLE_REGULAR_USER,
        "password":'PASSWORD',
        "photo":googleData.profileObj.imageUrl  
      }

      await axiosClient.post('/auth/register',body, 
      { withCredentials: true } )
      .then(response=>{
        if(response.status===200 ){ 
          sessionStorage.setItem('userInfo.id',JSON.stringify(response.data.newUser.id))
          sessionStorage.setItem('userInfo.roleId',JSON.stringify(parseInt(response.data.newUser.roleId)))
          Swal.fire({
            icon: "success",
            title: `Tu password provisoria es : PASSWORD`,
            text:'Cuando te loguees con tu email, cambiá la password en la sección "Mi perfil"',
            confirmButtonText:"Continuar"
          }).then(function(){ window.location.href = "/About"});
        }
      })
      .catch(error=>{
        console.log(error)
      })  
  }

  if(localStorage.getItem('loginData')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras logueado !",
      showConfirmButton: false,
      timer: 5000,
    })  
  } else {
    //RESPUESTA OK GOOGLE
    const onSuccess = (googleData) => { 
      sessionStorage.setItem('userInfo',JSON.stringify(googleData.profileObj))
      sessionStorage.setItem('token',JSON.stringify(googleData.tokenObj.id_token))
      sessionStorage.setItem('loginData',true)
      getUserData(googleData);      
      //MENSAJE DE BIENVENIDA
      Swal.fire({
        icon: "success",
        title: `Bienvenid@ ${googleData.profileObj.givenName}  !`,
        timer:5000
      });
    }  
  
    //RESPUESTA MAL GOOGLE
    const onFailure = (response) => {
      Swal.fire({
        icon: "error",
        title: "Error !",
        text: response,
        showConfirmButton:false,
        timer:1000
      })
    };
    
  return (
    <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText='Iniciar sesion con Google'
          cookiePolicy={'single_host_origin'}
        />
    </div>
  );
 } 
};

export default RespuestaGoogle;
