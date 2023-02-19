import React,{useState} from "react";
import "./styles/styles.css";
import "./styles/login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import { Link,Redirect } from "react-router-dom"; 
import Swal from "sweetalert2";
import LoginGoogle from './LoginGoogle';
import { Formik } from "formik";
import * as msg  from './helpers/ValidationMessages';
import * as regex from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import imagen from "./images/manos_fondo-sinFondo.png";
import {ErrorText,IconUser, Input, InputGroup} from './elements/ElementsFormStyles';
import buttonsResponsive from "./ButtonsResponsive";

const Login =()=>{   
 
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const [password] = useState("")

  //SHOW PASSWORD
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  
  if(sessionStorage.getItem('loginDataGoogle')==='true') {
    return( <Redirect to="/"/>)
  } else {
    const loginOK = (usuario)=>{
      Swal.fire({
          icon: "success",
          title: `Bienvenid@ ${usuario} !`,
          showConfirmButton:false,
          timer:1000
      })    
    };

    const loginError = (response)=>{
      Swal.fire({
         icon: "error",
         title: "Error !",
         text: response,
         showConfirmButton:false,
         timer:1000
       })
    };
    
    //INICIO DE SESION
    const beginSession = async (values) => {    
      await axiosClient.post('/auth/login',{"email":values.email,"password":values.password},{withCredentials:true})
      .then(response=>{
        if(response.status===204 ||response.status===200 ){
          let name=response.data.user.firstName;
          sessionStorage.setItem('userInfo',JSON.stringify(response.data.user))
          sessionStorage.setItem('token',JSON.stringify(response.data.token))
          sessionStorage.setItem('loginDataApi',true)
          loginOK(name);
          setTimeout( function() { window.location.href = "/About" }, 1000 );
        } else {
          loginError(response);          
        }
      }) 
      .catch(error=>{
        console.log(error)
        Swal.fire({
         icon: 'error',
         title: 'Error',
         text: ' Usuario o contraseña incorrectos'
       });
      });
    };  

     //FORMIK INITIAL VALUES
    let initialValues={ email:'', password }

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{   
        let errors = {email:'',password:'',iconNemail:'', icoNpassword:'',formOk:''};  
        if (!values.email) {
            errors.email=msg.msgRequired
            errors.icoNemail= X
            return errors
        };

        if (!regex.regexUserEmail.test(values.email)) {
            errors.email=msg.msgValidationUserEmail
            errors.icoNemail= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNemail=V
            errors.formOk='v'
        };

        if (!values.password) {
            errors.password=msg.msgRequired
            errors.icoNpassword= X
            return errors
        };

        if (!regex.regexUserPassword.test(values.password)) {
            errors.password=msg.msgValidationUserPassword
            errors.icoNpassword= X
            errors.formOk='f'
            return errors
        } else {
            errors.icoNpassword= V
            errors.formOk='v'
        };
    }   
     
    
    return (
      <>
      <div className="containerFirst">
          <div className="containerImgHalfScreen "> 
            <img className="imgHalfScreen" src={imagen} alt="ManitosPintatdas"></img>
          </div>

           <div className="heart">
            <p>Logueate y hacé una donación</p>
          </div> 
        
        <div className="containerLogin">
          <div className="buttonLoginGoogle">  
            <LoginGoogle> </LoginGoogle>        
          </div>

          <Formik  
            initialValues={initialValues}           
            validate={validateInputs}
            onSubmit={(values)=>{ beginSession(values)}}
          > 
          { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (    // props con destrunturing {} 
      
              <form className="containerFormLogin" onSubmit={handleSubmit}>
                  <h5 className="h5Form">Inicio de sesión</h5>
                  <div>
                    <div>   
                      <label className="d-block" htmlFor="email">Email</label>
                      <InputGroup className="iconInsideInputDiv">
                        <FaIcons.FaMailBulk className="iconInsideInputIcon"></FaIcons.FaMailBulk>
                        <Input className="ps-5 form-control"
                          type="email" 
                          name="email" 
                          id="email"  
                          value={values.email}
                          placeholder="correo@correo.xxx.xx" 
                          required
                          uppercase="true"
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          />
                        {touched.email && errors.icoNemail && <IconUser>{errors.icoNemail}</IconUser>}
                      </InputGroup>
                    </div> 
                    {touched.email && errors.email && <ErrorText className="ms-2">{errors.email} </ErrorText> }
                  </div>
                  
                  <div className="mb-5 mt-5">
                    <div> 
                      <label className="d-block" htmlFor="password">Password</label>
                      <InputGroup className="iconInsideInputDiv">
                        <FaIcons.FaKey className="iconInsideInputIcon"></FaIcons.FaKey>
                        <Input className="ps-5 form-control"
                          type={shown ? "text" : "password" }
                          name="password" 
                          id="password"  
                          value={values.password}
                          placeholder="password" 
                          required
                          onChange={handleChange} 
                          onBlur={handleBlur}
                         /> 
                        {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}
                        <button className="withoutBorder withoutBg" type="button" onClick={switchShown}> 
                            {shown ? <FontAwesomeIcon className="iconShowPassInput" icon={faEye} /> 
                            : <FontAwesomeIcon className="iconShowPassInput" icon={faEyeSlash} />} 
                        </button>
                      </InputGroup>
                    </div> 
                    {touched.password && errors.password && <ErrorText className="ms-2">{errors.password} </ErrorText> }
                  </div>

                  <div>                              
                    { (errors.formOk === "v" || !errors.formOk) && 
                     buttonsResponsive("/", "Login", "begginSession")
                    }
                  </div> 
                  <div className="buttonsResponsive">
                    <span className="MQnoTenesCuenta">No tenés cuenta ? 
                      <Link to={"/auth/register"} className="p-1 ">registrate</Link>
                    </span>
                  </div>
                </form>
                )}
            </Formik>
        </div>
      </div>
      </>
    );
  };
};

export default Login;