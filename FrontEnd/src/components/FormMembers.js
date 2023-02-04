import React, { useState,useEffect} from "react";
import "./styles/styles.css";
import axiosClient from "../configuration/axiosClient";
import { formatDate} from './helpers/FormatDate';
import buttonsResponsive from "./ButtonsResponsive";
import { Formik } from "formik";
import DuplicatedName from "./helpers/DuplicatedName";
import * as FaIcons from "react-icons/fa";
import { ErrorText, Defaultvalue, InputGroup, IconUser, InputUser, DateStyle} from './elements/ElementsFormStyles';
import * as msg  from './helpers/ValidationMessages';
import { regexCategoryName, regexCategoryDescription, regexUrl } from "./helpers/RegExp";

const FormMembers = ({onAction, paramsId, isUpdate}) => {  
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    
  let [, setUser] = useState("");
  
  const [duplicated,setDuplicated]=useState("");

  const [members, setMembers] = useState({ 
    id:"", 
    name: "", 
    image:"",
    description:"" ,
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""         
  });

  let errors = {name:'', image:'',description:'', facebookUrl:"", instagramUrl:"", linkedinUrl:"" , 
              icoNname:'', icoNimage:'', icoNdescription:'',icoNfacebookUrl:'', icoNinstagramUrl:'',
              icoNlinkedinUrl:'',formOk:''};  
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  //DEFAULT VALUES
  useEffect(() => {
  if(isUpdate){
    const id=paramsId.params.id
      const getMembers = async () => {
        await axiosClient.get(`/members/${id}`)
        .then((response) => {
          setMembers(response.data);
        })
        .catch((error=>{
          console.log(error);
        }));
      };
      getMembers();
  }
  },[]);
 
  //DUPLICATED NAME
  const repeat= async (searchName)=>{                                 
    setDuplicated(await DuplicatedName(searchName,'members'))
  };

   //enviar body a backend
   const makeBody = async (values) => {

    let body = new FormData()
      body.append("name",values.name);
      body.append("description",values.description);
      body.append("image",values.image);
      body.append("facebookUrl",values.facebookUrl);
      body.append("instagramUrl",values.instagramUrl);
      body.append("linkedinUrl",values.linkedinUrl);
    return onAction(body)
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:members.name, description:members.description, image: members.image,
    facebookUrl:members.facebookUrl, instagramUrl:members.instagramUrl, linkedinUrl:members.linkedinUrl }

  //FORMIK VALIDATIONS
  let validateInputs=(values) =>{   

    if(!values.image && members.image==="") {
      errors.image=msg.msgRequired
      errors.icoNimage= X
      return errors
    };

    if (!values.image) {
      values.image=members.image;
    };

    if (!values.name && members.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };

    if (!values.name) {
      values.name=members.name
    };
  
    if (!regexCategoryName.test(values.name)) {
      errors.name=msg.msgValidationCategoryName
      errors.icoNname= X
      return errors
    } else {
      errors.icoNname= V
    };
  
    let searchName=values.name
    repeat(searchName)
    if( (duplicated.respName===searchName && duplicated.respId && !isUpdate)
    || (duplicated.respName===searchName && duplicated.respId!==members.id && isUpdate)) {    
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X  
      return errors
    } else {
      errors.icoNname= V
    };   
  
    if (!values.description && members.description==="") {
      errors.description=msg.msgRequired
      errors.icoNdescription= X
      return errors
    };

    if (!values.description) {
      values.description=members.description
      errors.icoNdescription= V
    }; 
  
    if (!regexCategoryDescription.test(values.description)) {
      errors.content=msg.msgValidationCategoryDescription
      errors.icoNdescription= X
      return errors
    } else {
      errors.icoNdescription= V
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
      values.facebookUrl=members.facebookUrl
      errors.icoNfacebookUrl=V
      return errors
    }; 
  
    if(values.instagramUrl) {
      if(!regexUrl.test(values.instagramUrl)){
        errors.instagramUrl=msg.msgValidationUrl
        errors.icoNinstagramUrl=X
        return errors
      } else{
        errors.icoNinstagramUrl=V
      }
    } else {
        values.instagramUrl=members.instagramUrl
        errors.icoNinstagramUrl=V
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
      values.linkedinUrl=members.linkedinUrl
      errors.icoNlinkedinUrl=V
    };
  };

  if(errors.name || errors.image || errors.description || 
       errors.facebookUrl || errors.instagramUrl|| errors.linkedinUrl){
    errors.formOk='f'
  } else {
    errors.formOk='v'
  };

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
              <form  className="containerFormUpdateOrganiz" onSubmit={handleSubmit}>
                <h4 className="mt-1 flex-Center">Miembro 
                    {isUpdate && <span>&nbsp;a actualizar</span>}
                    {!isUpdate && <span>&nbsp;nuevo</span>}
                </h4>
                <div className="flex-Center"> 
                  <div className="divColumnUpdateOrganiz"> 
                    <div>
                      <div className="m-auto mb-2">  
                        <InputGroup className="d-block">
                          <label htmlFor='image'>Foto</label>
                          <input className="d-block form-control w-100"
                            type="file"
                            name="image"
                            encType="multipart/form-data"
                            onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                            onBlur={handleBlur}
                          />
                          {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                          {isUpdate && <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={members.image}  alt="fotoPersonal" />} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                    </div>
                    <div>
                      <div className="m-auto">           
                        <InputGroup className="d-block mb-2">
                          <label htmlFor='name'>Nombre</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="name"
                            placeholder='Ingrese nuevo nombre'
                            required
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                            {isUpdate && <Defaultvalue> actual : {members.name} </Defaultvalue>}
                          </InputGroup>
                      </div>
                      {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                    </div>
                    <div>
                      <div className="m-auto">          
                        <InputGroup className="d-block">
                          <label  htmlFor='description'>Detalle</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="description"
                            required
                            placeholder="Ingrese nueva descripción"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {members.description} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
                    </div>
                  </div> 
                  <div className="divColumnUpdateOrganiz">
                    <div>
                      <div className="m-auto mb-2 mt-3">          
                        <InputGroup className="d-block">
                          <label  htmlFor='facebookUrl'>Facebook</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="facebookUrl"
                            placeholder="Ingrese nuevo facebbok"
                            value={values.facebookUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.facebookUrl && errors.icoNfacebookUrl && <IconUser className="mt-4">{errors.icoNfacebookUrl}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {members.facebookUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.facebookUrl && errors.facebookUrl  && <ErrorText className="errorTextUpdate"> {errors.facebookUrl} </ErrorText>}
                    </div>
                    <div>
                      <div className=" m-auto mb-2">          
                        <InputGroup className="d-block">
                          <label  htmlFor='instagramUrl'>Instagram</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="instagramUrl"
                            placeholder="Ingrese nuevo instagram"
                            value={values.instagramUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.instagramUrl && errors.icoNinstagramUrl && <IconUser className="mt-4">{errors.icoNinstagramUrl}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {members.instagramUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.instagramUrl && errors.instagramUrl  && <ErrorText className="errorTextUpdate"> {errors.instagramUrl} </ErrorText>}
                    </div>
                    <div>
                      <div className=" m-auto">          
                        <InputGroup className="d-block">
                          <label  htmlFor='linkedinUrl'>LinkedIn</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="linkedinUrl"
                            placeholder="Ingrese nuevo linkedIn"
                            value={values.linkedinUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.linkedinUrl && errors.icoNlinkedinUrl && <IconUser className="mt-4">{errors.icoNlinkedinUrl}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {members.linkedinUrl} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.linkedinUrl && errors.linkedinUrl  && <ErrorText className="errorTextUpdate"> {errors.linkedinUrl} </ErrorText>}
                    </div>    
                  </div> 
                </div>
                <div className="flex-Center m-2">
                  <DateStyle>                       
                    <span>Creado : 
                      {isUpdate ? formatDate(new Date(members.createdAt)): now }
                    </span>         
                    <span className="ms-5">Última modificación : 
                      {isUpdate ? formatDate(new Date(members.updatedAt)) : now}                
                    </span>
                  </DateStyle>  
                </div>
                  
                {buttonsResponsive("/MembersAll","Guardar")}
                
              </form>
            )}
            </Formik>
          </div>
        </>
        );
};

export default FormMembers;