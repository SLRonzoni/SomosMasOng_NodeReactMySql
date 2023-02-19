import React, { useEffect } from "react";
import "./styles/styles.css";
import "./styles/login-register-home.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Swal from "sweetalert2";
import axiosClient from "../configuration/axiosClient";

function RespuestaGoogle() {
  const user={};
 
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

  // CREAR TOKEN PARA API
  const makeTokenApi=async (googleData) =>{
    let email=googleData.profileObj.email
    await axiosClient.post('/auth/login',{"email":email,"password":"PASSWORD"},{withCredentials:true})
    .then(response=>{
      if(response.status===204 ||response.status===200 ){
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
      }
    }) 
  }; 

  //Buscar email en la base de datos y obtener id y roleId
  const getUserData = async (googleData) => {
    const userExists=await axiosClient.get(`/users/byEmail/${googleData.profileObj.email}`,{ withCredentials: true } )
      .then(response=>{ 
        if(response.status===200){  
          user.id=response.data.id
          user.roleId=response.data.roleId
          user.googleData=googleData.profileObj
          sessionStorage.setItem('userInfo',JSON.stringify(user))
          makeTokenApi(googleData);
        };        
      })
      .catch(error=>{
        console.log(error)
      });
      
      if(!userExists || userExists==="undefined"){  
        //crear usuario en BD con los datos de Google
          let body = {
            "firstName":googleData.profileObj.givenName,
            "lastName":googleData.profileObj.familyName,
            "email":googleData.profileObj.email,
            "roleId":process.env.REACT_APP_ROLE_REGULAR_USER,
            "password":'PASSWORD',
            "photo":googleData.profileObj.imageUrl  
          }

          await axiosClient.post('/auth/register',body, { withCredentials: true } )
          .then(response=>{                                 
            if(response.status===200 ){                    
              user.id=parseInt(response.data.newUser.id)
              user.roleId=parseInt(response.data.newUser.roleId)
              user.googleData=googleData.profileObj
              sessionStorage.setItem('userInfo',JSON.stringify(user))
              sessionStorage.setItem('token',JSON.stringify(response.data.token))
              Swal.fire({
                icon: "success",
                title: `Tu password provisoria es : PASSWORD`,
                text:'Cuando te loguees desde nuestra Aplicación, cambiá tu password en la sección "Mi perfil"',
              }).then(()=>{
                  window.location.href = "/About" 
                });
            } else {
              window.location.href = "/About"  
            }
          })
          .catch(error=>{
            console.log(error)
          })  
        };
      };  

  if(localStorage.getItem('loginDataApi')==='true') {
    Swal.fire({
      icon: "info",
      title: "Ya te encuentras loguead@ !",
      showConfirmButton: false,
      timer: 2000,
    })  
  } else {
    //RESPUESTA OK GOOGLE
    const onSuccess = async (googleData) => { 
      sessionStorage.setItem('tokenGoogle',JSON.stringify(googleData.tokenObj.id_token))
      sessionStorage.setItem('loginDataGoogle',true)
      getUserData(googleData);
      //MENSAJE DE BIENVENIDA
      Swal.fire({
        icon: "success",
        title: `Bienvenid@ ${googleData.profileObj.givenName}  !`,
        showConfirmButton: false,
        timer:1000
      }).then(()=>{
        window.location.href = "/About" 
      })
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
