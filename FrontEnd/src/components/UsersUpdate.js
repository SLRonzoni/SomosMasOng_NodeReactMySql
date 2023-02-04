import React, {useState,useEffect} from 'react';
import axiosClient from '../configuration/axiosClient';
import './styles/users.css';
import { Formik } from 'formik';
import * as msg from './helpers/ValidationMessages';
import * as regex  from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";
import {formatDate} from './helpers/FormatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {ErrorText,IconUser,InputUser, InputGroup} from './elements/ElementsFormStyles';
import Swal from "sweetalert2";
import buttonsResponsive from './ButtonsResponsive';


const MyProfileUpdate = ({match, history}) =>{
  const id= match.params.id
  const dataUserLoginGoogle = sessionStorage.getItem('userInfo.id')
  let userId=""  
  id==="undefined" ? userId=dataUserLoginGoogle : userId=id

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;

  const [user, setUser] = useState({
      id:'',
      firstName:'',
      lastName:'',
      photo:"",
      email:'',
      roleId:'',
      password:'',
      createdAt:'',
      updatedAt:''
  });

  //SHOW PASSWORD
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

  //DEFAULT VALUES
  useEffect(() => {
    const getUser = async () => {
      await axiosClient.get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getUser();
  },[userId]); 

  //SEND
  const sendForm = (values) => {   
    //UPDATE     
    let body = new FormData()
    body.append("firstName",values.firstName);
    body.append("lastName",values.lastName);
    body.append("password",values.password);
    body.append("photo",values.photo);
    body.append("roleId",user.roleId);
    body.append("email",user.email);

    const updateUser = async () => {
      await axiosClient.put(`/users/${userId}`,body)
        .then(response => {
          if (response.status===201) {
            setUser(response.data)
            Swal.fire({
              icon: "success",
              title: "Actualización de perfil exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/");
          }
          else {             
            Swal.fire({
              icon: "error",
              title: "Error !",
              text: response.message,
              showConfirmButton:true
            })
          };  
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    }   
    updateUser();
  };

  //FORMIK INITIAL VALUES
  let initialValues={firstName:user.firstName, 
                    lastName:user.lastName,
                    photo:user.photo,
                    password:user.password}

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{   

    let errors = {firstName: '',lastName:'', photo:'', password:'', 
                  icoNfirstName:'',icoNlastName:'', icoNphoto:'', icoNpassword:'',formOk:''};  

    if (!values.firstName) {
      values.firstName=user.firstName
    };

    if (!regex.regexUserfirstName.test(values.firstName)) {
      errors.firstName=msg.msgValidationUserFirstName
      errors.icoNfirstName= X
      errors.formOk='f'
      return errors
    } else {
      errors.icoNfirstName= V
      errors.formOk='v'
    };

    if (!values.lastName) {
      values.lastName=user.lastName
    };

    if (!regex.regexUserLastName.test(values.lastName)) {
      errors.lastName=msg.msgValidationUserLastName
      errors.icoNlastName= X
      errors.formOk='f'
      return errors
    } else {
      errors.icoNlastName= V
      errors.formOk='v'
    };

    if (!values.password) {
      errors.password=msg.msgRequired
      errors.icoNpassword= X
      errors.formOk='f'
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

  //FORM
  return (
    <>
    <div className="containerFirst">
    
    <Formik  
         initialValues={initialValues}           
         validate={validateInputs}
         onSubmit={(values)=>{ sendForm(values)}}
    >
    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
        <form className="containerMyProfile" onSubmit={handleSubmit} > 
            <h5 className='ms-4'>Mi Perfil </h5> 
            <div className='userDiv'>
              <img className='imageMyProfile' src={user.photo}  alt="userPhoto"/>  
              <div>
                <div className='info mb-2'>
                  <h6 className='m-1'>( Para actualizar tus datos, debes loguearte con </h6>
                  <h6>  email: tu email y password:PASSWORD ) </h6>
                </div>
                <p className='ms-4'><u>Última actualización</u> : {formatDate(new Date(user.updatedAt))} </p>
                <p className='ms-4'><u>Email registrado</u> : {user.email}</p>  
              </div>
            </div>

            <div className='ms-4 '>
                <div>
                  <div className='mb-2'>
                      <InputGroup className='d-block' >
                        <label className='mt-2' htmlFor="photo" >Cambiar foto</label>
                        <InputUser className="form-control perfilInput p-1"
                              type="file" 
                              name="photo" 
                              id="photo"  
                              encType="multipart/form-data"
                              onChange={ (e)=>setFieldValue('photo',e.currentTarget.files[0]) } 
                              onBlur={handleBlur}
                        />
                      </InputGroup>  
                    {touched.photo && errors.icoNphoto && <IconUser>{errors.icoNphoto}</IconUser>}    
                    </div> 
                  {touched.photo && errors.photo && <ErrorText className='errorText-myProfile-update'>{errors.photo} </ErrorText> }
                </div>
                
                <div>
                  <div className='mb-2'>
                    <label className='mt-2' htmlFor="firstName" >Nombre ( actual : {user.firstName} )</label>
                    <InputGroup className='d-block'>
                      <InputUser className='form-control perfilInput'
                        type="text" 
                        name="firstName" 
                        id="firstName"
                        required  
                        placeholder='Ingrese su nombre'
                        value={values.firstName}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />              
                      {touched.firstName && errors.icoNfirstName && <IconUser>{errors.icoNfirstName}</IconUser>}
                    </InputGroup> 
                  </div>
                  {touched.firstName && errors.firstName && <ErrorText className='errorText-myProfile-update'>{errors.firstName} </ErrorText> }
                </div>

                <div>
                  <div className='mb-2'>
                    <label className='mt-2 w-100' htmlFor="lastName" >Apellido  ( actual : {user.lastName} )</label>
                    <InputGroup className='d-block'>
                      <InputUser className='form-control perfilInput'
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        required 
                        value={values.lastName}
                        placeholder='Ingrese su apellido'
                        onChange={handleChange} 
                        onBlur={handleBlur}
                      />
                      {touched.lastName && errors.icoNlastName && <IconUser>{errors.icoNlastName}</IconUser>}
                    </InputGroup>
                  </div> 
                  {touched.lastName && errors.lastName && <ErrorText className='errorText-myProfile-update'>{errors.lastName} </ErrorText> }
                </div>
                
                <div>
                  <div className="mb-2">
                    <div className='d-flex'>
                      <label className='mt-2' htmlFor="password" > Password</label> 
                        <button className="withoutBg iconShowPass" type="button" onClick={switchShown}> 
                          {shown ? <FontAwesomeIcon icon={faEye} /> 
                                 : <FontAwesomeIcon icon={faEyeSlash} />} 
                        </button> 
                      </div>
                    <InputGroup className="d-block">
                      <InputUser className='form-control perfilInput'
                        type={shown ? "text" : "password" }
                        name="password" 
                        id="password"  
                        placeholder="Ingrese su password" 
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.icoNpassword && <IconUser>{errors.icoNpassword}</IconUser>}   
                    </InputGroup>
                  </div> 
                  {touched.password && errors.password && <ErrorText className='errorText-myProfile-update'>{errors.password} </ErrorText> }
                </div>

                <div>                              
                  { (errors.formOk === "v" || !errors.formOk) && 
                  buttonsResponsive("/","Guardar")
                  }
                </div> 
            </div> 
        </form>
    )}
   </Formik>
   </div>
  </>
  );
};
export default MyProfileUpdate;