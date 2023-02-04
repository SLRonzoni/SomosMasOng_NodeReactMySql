import React, { useState,useEffect} from "react";
import './styles/members-organizations.css';
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import { formatDate} from './helpers/FormatDate';
import buttonsResponsive from "./ButtonsResponsive";
import { Formik } from "formik";
import DuplicatedName from "./helpers/DuplicatedName";
import * as FaIcons from "react-icons/fa";
import { ErrorText, Defaultvalue, InputGroup, IconUser, InputUser, DateStyle} from './elements/ElementsFormStyles';
import * as msg  from './helpers/ValidationMessages';
import { regexActivitiesName, regexWelcomeAbout, regexUrl, regexUserEmail, regexUserPhone } from "./helpers/RegExp";

const FormOrganizations = ({onAction, paramsId, isUpdate}) => {
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
  
  let [,setUser] = useState("");

  const [duplicated,setDuplicated]=useState("");
 
  const [organizations, setOrganizations] = useState({ 
    id:"", 
    name: "", 
    image:"",
    address:"",
    phone:"",
    email:"",
    welcomeText:"",
    aboutUsText:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""
  });

  let errors = {name: "", image:"", address:"", phone:"", email:"",
                welcomeText:"", aboutUsText:"", facebookUrl:"",
                instagramUrl:"", linkedinUrl:"", icoNname: "", icoNimage:"",
                icoNaddress:"", icoNphone:"", icoNemail:"", icoNwelcomeText:"",
                icoNaboutUsText:"", icoNfacebookUrl:"", icoNinstagramUrl:"",
                icoNlinkedinUrl:"" , formOk:""};  
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])
 
   //DEFAULT VALUES
   useEffect(() => {
    if(isUpdate){
      const id=paramsId.params.id
        const getOrganization = async () => {
          await axiosClient.get(`/organization/public/${id}`)
          .then((response) => {
            setOrganizations(response.data.organization);
          })
          .catch((error=>{
            console.log(error);
          }));
        };
        getOrganization();
    }
  },[]);

  //DUPLICATED NAME
  const repeat= async (searchName)=>{                                 
    setDuplicated(await DuplicatedName(searchName,'organization'))
  };
 
  //enviar body a componente de pago
  const makeBody = async (values) => { 
    let body = new FormData()               
      body.append("name",values.name);
      body.append("image",values.image);
      body.append("address",values.address);
      body.append("phone",values.phone);
      body.append("email",values.email);
      body.append("facebookUrl",values.facebookUrl);
      body.append("instagramUrl",values.instagramUrl);
      body.append("linkedinUrl",values.linkedinUrl);
      body.append("welcomeText",values.welcomeText);
      body.append("aboutUsText",values.aboutUsText);                
    return onAction(body)
  }

  //FORMIK INITIAL VALUES
  let initialValues={ name:organizations.name,
                    address:organizations.address,
                    phone:organizations.phone,
                    email:organizations.email,
                    facebookUrl:organizations.facebookUrl,
                    instagramUrl:organizations.instagramUrl,
                    linkedinUrl:organizations.linkedinUrl,
                    welcomeText:organizations.welcomeText,
                    aboutUsText:organizations.aboutUsText }

  //FORMIK VALIDATIONS 
  let validateInputs=(values) =>{ 
    if (!values.image) {
      values.image=organizations.image;
    };
    
    if(!values.image && organizations.image==="") {
      errors.image=msg.msgRequired
      errors.icoNimage= X
      return errors
    }else{
      errors.icoNimage= V
    };
    
    if (!values.name) {
      values.name=organizations.name
    };
    
    if (!values.name && organizations.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };  

    if (!regexActivitiesName.test(values.name)) {
      errors.name=msg.msgValidationActivitiesName
      errors.icoNname= X
      return errors
    } else {
      errors.icoNname= V
    };

    let searchName=values.name
    repeat(searchName)
    if( (duplicated.respName===searchName && duplicated.respId && !isUpdate)
    || (duplicated.respName===searchName && duplicated.respId!==organizations.id && isUpdate)) {    
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X 
      return errors
    } else {
      errors.icoNname= V
    };

    if (!values.address) {
      values.address=organizations.address
    }; 

    if (!values.address && organizations.address==="") {
      errors.address=msg.msgRequired
      errors.icoNaddress= X
      return errors
    } else {
      errors.icoNaddress= V
    };

    if (!values.phone) {
      values.phone=organizations.phone
    }; 

    if (!values.phone && organizations.phone==="") {
      errors.phone=msg.msgRequired
      errors.icoNphone= X
      return errors
    };

    if(values.phone) {
      if(!regexUserPhone.test(values.phone)){
        errors.phone=msg.msgValidationUserPhone
        errors.icoNphone=X
        return errors
      } else{
        errors.icoNphone=V
      }
    } else {
      values.phone=organizations.phone
      errors.icoNphone=V
      return errors
    };

    if (!values.email) {
      values.email=organizations.email
    };

    if (!values.email && organizations.email==="") {
      errors.email=msg.msgRequired
      errors.icoNemail= X
      return errors
    };

    if(values.email) {
      if(!regexUserEmail.test(values.email)){
        errors.email=msg.msgValidationUserEmail
        errors.icoNemail=X
        return errors
      } else{
        errors.icoNemail=V
      }
    } else {
      values.email=organizations.email
      errors.icoNemail=V
      return errors
    };

     if (!values.facebookUrl) {
      values.facebookUrl=organizations.facebookUrl
    };

    if (!values.facebookUrl && organizations.facebookUrl==="") {
      errors.facebookUrl=msg.msgRequired
      errors.icoNfacebookUrl= X
      return errors
    };

    if(values.facebookUrl) {
      if(!regexUrl.test(values.facebookUrl)){
        errors.facebookUrl=msg.msgValidationUrl
        errors.icoNfacebookUrl=X
        return errors
      } else{
        errors.icoNfacebookUrl=V
      }
    }else {
      values.facebookUrl=organizations.facebookUrl
      errors.icoNfacebookUrl=V
      return errors
    };

    if (!values.instagramUrl) {
      values.instagramUrl=organizations.instagramUrl
    };

    if (!values.instagramUrl && organizations.instagramUrl==="") {
      errors.instagramUrl=msg.msgRequired
      errors.icoNinstagramUrl= X
      return errors
    }

    if(values.instagramUrl) {
      if(!regexUrl.test(values.instagramUrl)){
        errors.instagramUrl=msg.msgValidationUrl
        errors.icoNinstagramUrl=X
        return errors
      } else{
        errors.icoNinstagramUrl=V
      }
    } else {
        values.instagramUrl=organizations.instagramUrl
        errors.icoNinstagramUrl=V
    };
    
    if (!values.linkedin) {
      values.linkedin=organizations.linkedin
    };
    
    if (!values.linkedin && organizations.linkedin==="") {
      errors.linkedin=msg.msgRequired
      errors.icoNlinkedinUrl= X
      return errors
    };

    if(values.linkedinUrl) {
      if(!regexUrl.test(values.linkedinUrl)){
        errors.linkedinUrl=msg.msgValidationUrl
        errors.icoNlinkedinUrl=X
       return errors
      } else{
        errors.icoNlinkedinUrl=V 
      }
    }else {
      values.linkedinUrl=organizations.linkedinUrl
      errors.icoNlinkedinUrl=V
    };

    if (!values.aboutUsText) {
      values.aboutUsText=organizations.aboutUsText
    };

    if (!values.aboutUsText && organizations.aboutUsText==="") {
      errors.aboutUsText=msg.msgRequired
      errors.icoNaboutUsText= X
      return errors
    };

    if(values.aboutUsText) {
      if(!regexWelcomeAbout.test(values.aboutUsText)){
        errors.aboutUsText=msg.msgValidationWelcomAbout
        errors.icoNaboutUsText=X
       return errors
      } else{
        errors.icoNaboutUsText=V 
      }
    }else {
      values.aboutUsText=organizations.aboutUsText
      errors.icoNaboutUsText=V
    }; 

    if (!values.welcomeText) {
      values.welcomeText=organizations.welcomeText
    }; 

    if (!values.welcomeText && organizations.welcomeText==="") {
      errors.welcomeText=msg.msgRequired
      errors.icoNwelcomeText= X
      return errors
    };

    if(values.welcomeText) {
      if(!regexWelcomeAbout.test(values.welcomeText)){
        errors.welcomeText=msg.msgValidationWelcomAbout
        errors.icoNwelcomeText=X
       return errors
      } else{
        errors.icoNwelcomeText=V 
      }
    }else {
      values.welcomeText=organizations.welcomeText
      errors.icoNwelcomeText=V
    };

    if(errors.name || errors.image || errors.address || errors.email || errors.phone
       || errors.facebookUrl || errors.instagramUrl || errors.linkedinUrl || errors.aboutUsText
       || errors.welcomeText
       ){
      errors.formOk='f'
    } else {
      errors.formOk='v'
    };
  } 

  //fecha actual
  let now = new Date().toLocaleDateString('en-DE');

  return ( 
    <>
      <div className="containerFirst">
        <Formik
            initialValues={initialValues}           
            validate={validateInputs}
            onSubmit={(values)=>{ makeBody(values)}}
        >
        { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
          <form className="containerFormUpdateOrganiz" onSubmit={handleSubmit}>
            <h4 className="mt-1 flex-Center">Organización
                {isUpdate && <span>&nbsp;a actualizar</span>}
                {!isUpdate && <span>&nbsp;nueva</span>}
            </h4> 
            <div className="flex-Center"> 
              <div className="divColumnUpdateOrganiz"> 
                  <div>
                    <div>             
                      <InputGroup className="d-block mb-1">
                        <label htmlFor='image'>Imágen actual</label>
                          <input className="d-block form-control"
                            type="file"
                            name="image"
                            encType="multipart/form-data"
                            onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                            onBlur={handleBlur}
                          />
                          {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                          {isUpdate && <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={organizations.image}  alt="ImágenCategoria" />} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                  </div>  
              
                  <div>
                    <div>         
                      <InputGroup className="d-block mb-1 bg">
                        <label htmlFor='name'>Nombre </label>
                        <InputUser className="form-control"
                          type="text"
                          name="name"
                          required
                          placeholder="Ingrese nuevo nombre"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                       {isUpdate && <Defaultvalue> actual : {organizations.name} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText>}
                  </div>
              
                  <div>
                    <div>             
                      <InputGroup className="d-block mb-1 bg">
                        <label  htmlFor='address'>Calle, número, localidad</label>
                        <InputUser className="form-control"
                          type="text"
                          name="address"
                          placeholder="Ingrese nueva dirección"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.address && errors.icoNaddress && <IconUser className="mt-4">{errors.icoNaddress}</IconUser>}
                        {isUpdate && <Defaultvalue> actual : {organizations.address} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.address && errors.address  && <ErrorText className="errorTextUpdate"> {errors.address} </ErrorText>}
                  </div>

                  <div>
                    <div>             
                      <InputGroup className="d-block mb-1 bg">
                        <label  htmlFor='phone'>Teléfono</label>
                        <InputUser className="form-control"
                          type="text"
                          name="phone"
                          placeholder="Ingrese nuevo teléfono"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.phone && errors.icoNphone && <IconUser className="mt-4">{errors.icoNphone}</IconUser>}
                        {isUpdate && <Defaultvalue> actual : {organizations.phone} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.phone && errors.phone  && <ErrorText className="errorTextUpdate"> {errors.phone} </ErrorText>}
                  </div>

                  <div>
                    <div>            
                      <InputGroup className="d-block mb-1 bg">
                        <label   htmlFor='email'>Email</label>
                        <InputUser className="form-control"
                          type="text"
                          name="email"
                          placeholder="Ingrese nuevo email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.icoNemail && <IconUser className="mt-4">{errors.icoNemail}</IconUser>}
                        {isUpdate && <Defaultvalue> actual : {organizations.email} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.email && errors.email  && <ErrorText className="errorTextUpdate"> {errors.email} </ErrorText>}
                  </div>
                </div>
                <div className="divColumnUpdateOrganiz">
                  <div>
                    <div>
                      <div>       
                        <InputGroup className="d-block mb-1">
                          <label htmlFor='facebookUrl'>Facebook</label>
                          <InputUser className="form-control"
                            type="text"
                            name="facebookUrl"
                            placeholder="Ingrese nuevo facebook"
                            value={values.facebookUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.facebookUrl && errors.icoNfacebookUrl && <IconUser className="mt-4">{errors.icoNfacebookUrl}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {organizations.facebookUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.facebookUrl && errors.facebookUrl  && <ErrorText className="errorTextUpdate"> {errors.facebookUrl} </ErrorText>}
                    </div>
              
                    <div>
                      <div>           
                        <InputGroup className="d-block mb-1">
                          <label htmlFor='instagramUrl'>Instagram</label>
                          <InputUser className="form-control"
                            type="text"
                            name="instagramUrl"
                            placeholder="Ingrese nuevo instagram"
                            value={values.instagramUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.instagramUrl && errors.icoNinstagramUrl && <IconUser className="mt-4">{errors.icoNinstagramUrl}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {organizations.instagramUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.instagramUrl && errors.instagramUrl  && <ErrorText className="errorTextUpdate"> {errors.instagramUrl} </ErrorText>}
                    </div>   

                    <div>
                      <div>             
                        <InputGroup className="d-block mb-1">
                          <label htmlFor='linkedinUrl'>LinkedIn</label>
                          <InputUser className="form-control"
                            type="text"
                            name="linkedinUrl"
                            placeholder="Ingrese nuevo linkedin"
                            value={values.linkedinUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.linkedinUrl && errors.icoNlinkedinUrl && <IconUser className="mt-4">{errors.icoNlinkedinUrl}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {organizations.linkedinUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText className="errorTextUpdate"> {errors.linkedinUrl} </ErrorText>}
                    </div>
                
                    <div>
                      <div>             
                        <InputGroup className="d-block mb-1">
                          <label htmlFor='aboutUsText'>Sobre nosotros</label>
                          <textarea className="updateTextArea pt-1 form-control mb-3"
                            type="text"
                            name="aboutUsText"
                            placeholder="Ingrese nuevo texto sobre nosotros"
                            value={values.aboutUsText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.aboutUsText && errors.icoNaboutUsText && <IconUser className="mt-4">{errors.icoNaboutUsText}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {organizations.aboutUsText} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.aboutUsText && errors.aboutUsText  && <ErrorText className="errorTextUpdate"> {errors.aboutUsText} </ErrorText>}
                    </div>

                    <div>
                      <div>               
                        <InputGroup className="d-block">
                          <label htmlFor='welcomeText'>Mensaje de bienvenida</label>
                          <textarea className="updateTextArea pt-1 form-control mb-3"
                            type="text"
                            name="welcomeText"
                            placeholder="Ingrese nuevo mensaje de bienvenida"
                            value={values.welcomeText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.welcomeText && errors.icoNwelcomeText && <IconUser className="mt-4">{errors.icoNwelcomeText}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {organizations.welcomeText} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.welcomeText && errors.welcomeText  && <ErrorText className="errorTextUpdate"> {errors.welcomeText} </ErrorText>}
                    </div>
                  </div>    
                </div> 
            </div> 

            <div className="flex-Center">
              <DateStyle>                       
                <span>Creada : 
                  {isUpdate ? formatDate(new Date(organizations.createdAt)): now }
                </span>
                              
                <span className="ms-5">Última modificación : 
                  {isUpdate ? formatDate(new Date(organizations.updatedAt)) : now}                
                </span>
              </DateStyle>  
            </div>

            {buttonsResponsive("/OrganizationsAll","Guardar")}
          </form>
        )}
        </Formik>
      </div>
    </>
  );
}

export default FormOrganizations;