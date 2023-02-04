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
import { regexActivitiesName, regexCategoryDescription } from "./helpers/RegExp";

const FormActivities = ({onAction, paramsId, isUpdate}) => {  
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    
  let [, setUser] = useState("");
  
  const [duplicated,setDuplicated]=useState('')

  const [activities, setActivities] = useState({ 
    id:"", 
    name: "", 
    image:"",
    content:""          
  });

  let errors = {name:'', image:'',content:'',  
                icoNname:'', icoNimage:'', icoNcontent:'',formOk:''};  
  
     
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  
  //DEFAULT VALUES
  useEffect(() => {
  if(isUpdate){
    const id=paramsId.params.id
      const getActivity = async () => {
        await axiosClient.get(`/activities/${id}`)
        .then((response) => {
          setActivities(response.data);
        })
        .catch((error=>{
          console.log(error);
        }));
      };
      getActivity();
  }
  },[]);
 
  //DUPLICATED NAME
  const repeat= async (searchName)=>{
    console.log(searchName)
    console.log(duplicated)
    setDuplicated(await DuplicatedName(searchName,'activities/public'))
  };

  //enviar body a backend
  const makeBody = async (values) => {

    let body = new FormData()
      body.append("name",values.name);
      body.append("content",values.content);
      body.append("image",values.image);         
    return onAction(body)
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:activities.name, content:activities.content, image: activities.image }

  //FORMIK VALIDATIONS
  let validateInputs=(values) =>{   

    if (!values.name && activities.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };

    if (!values.name) {
      values.name=activities.name;
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
      || (duplicated.respName===searchName && duplicated.respId!==activities.id && isUpdate)) {  
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X        
      return errors
    } else {
      errors.icoNname=V
    };

    if(!values.image && activities.image==="") {
      errors.image=msg.msgRequired
      errors.icoNimage= X
      return errors
    }

    if (!values.image) {
      values.image=activities.image;
    };
  
    if (!values.content && activities.content==="") {
      errors.content=msg.msgRequired
      errors.icoNcontent= X
      return errors
    };

    if (!values.content) {
      values.content=activities.content
      errors.icoNcontent= V
    };
  
    if (!regexCategoryDescription.test(values.content)) {
      errors.content=msg.msgValidationCategoryDescription
      errors.icoNcontent= X
      return errors
    } else {
      errors.icoNcontent= V
    };
  };

  if(errors.name || errors.content || errors.image){
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
              <form  className="containerFormUpdate" onSubmit={handleSubmit}>
                <h4 className="mb-3 flex-Center">Actividad 
                    {isUpdate && <span>&nbsp;a actualizar</span>}
                    {!isUpdate && <span>&nbsp;nueva</span>}
                </h4>
                  <div>
                    <div className="w-75 m-auto mb-2">  
                      <InputGroup className="d-block">
                        <label htmlFor='image'>Imágen</label>
                        <input className="d-block form-control"
                          type="file"
                          name="image"
                          encType="multipart/form-data"
                          onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) }
                          onBlur={handleBlur}
                        />
                        {touched.image && errors.icoNimage && <IconUser className="mt-4">{errors.icoNimage}</IconUser>}
                        {isUpdate && <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={activities.image}  alt="ImágenActividad" />} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                  </div>
                  <div>
                    <div className="w-75 m-auto">           
                      <InputGroup className="d-block mb-2">
                        <label htmlFor='name'>Nombre</label>
                        <InputUser className="form-control pt-1"
                          type="text"
                          name="name"
                          placeholder='Ingrese nuevo nombre'
                          required
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          />
                          {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                          {isUpdate && <Defaultvalue> actual : {activities.name} </Defaultvalue>}
                        </InputGroup>
                    </div>
                    {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                  </div>
                  <div>
                    <div className="w-75 m-auto">          
                      <InputGroup className="d-block">
                        <label  htmlFor='content'>Descripción</label>
                        <InputUser className="form-control pt-1"
                          type="text"
                          name="content"
                          required
                          placeholder="Ingrese nueva descripción"
                          value={values.content}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                        {isUpdate && <Defaultvalue>actual : {activities.content} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
                  </div>  
                  <h5 className="h5Update mt-3">( todos los campos son obligatorios )</h5>
          
                  <div className="flex-Center m-2">
                    <DateStyle>                       
                      <span>Creada : 
                        {isUpdate ? formatDate(new Date(activities.createdAt)): now }
                      </span>
                                   
                      <span className="ms-5">Última modificación : 
                        {isUpdate ? formatDate(new Date(activities.updatedAt)) : now}                
                      </span>
                    </DateStyle>  
                  </div>
                  
                  {buttonsResponsive("/ActivitiesAll","Guardar")}
                
                </form>
              )}
            </Formik>
          </div>
        </>
        );
}

export default FormActivities;