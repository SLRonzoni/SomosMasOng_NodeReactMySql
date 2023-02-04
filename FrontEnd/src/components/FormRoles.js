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
import { regexCategoryName, regexCategoryDescription } from "./helpers/RegExp";

const FormRoles = ({onAction, paramsId, isUpdate}) => {  
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    
  let [, setUser] = useState("");
  
  const [duplicated,setDuplicated]=useState("");

  const [roles, setRoles] = useState({ 
    id:"", 
    name: "", 
    description:""          
  });

  let errors = {name:'', description:'',  icoNname:'', icoNdescription:'',formOk:''};  
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  //DEFAULT VALUES
  useEffect(() => {
  if(isUpdate){
    const id=paramsId.params.id
      const getRol = async () => {
        await axiosClient.get(`/roles/${id}`)
        .then((response) => {
          setRoles(response.data);
        })
        .catch((error=>{
          console.log(error);
        }));
      };
      getRol();
  }
  },[]);
 
  //DUPLICATED NAME
  const repeat= async (searchName)=>{                                 
    setDuplicated(await DuplicatedName(searchName,'roles'))
  };

   //enviar body a backend
   const makeBody = async (values) => {
    let body = {"name":values.name,
                "description":values.description};        
    return onAction(body)
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:roles.name, description:roles.description }

  //FORMIK VALIDATIONS
  let validateInputs=(values) =>{   

    if (!values.name && roles.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };

    if (!values.name) {
      values.name=roles.name
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
    || (duplicated.respName===searchName && duplicated.respId!==roles.id && isUpdate)) {    
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X  
      return errors
    } else {
      errors.icoNname= V
    };
  
    if (!values.description && roles.description==="") {
      errors.description=msg.msgRequired
      errors.icoNdescription= X
      return errors
    };

    if (!values.description) {
      values.description=roles.description
      errors.icoNdescription= V
    }; 
  
    if (!regexCategoryDescription.test(values.description)) {
      errors.description=msg.msgValidationCategoryDescription
      errors.icoNdescription= X
      return errors
    } else {
      errors.icoNdescription= V
    }; 
  };

  if(errors.name || errors.description){
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
            { ({values,handleBlur,handleSubmit,handleChange,touched,errors}) => (
              <form  className="containerFormUpdateOrganiz" onSubmit={handleSubmit}>
                <h4 className="mb-5 flex-Center">Role 
                    {isUpdate && <span>&nbsp;a actualizar</span>}
                    {!isUpdate && <span>&nbsp;nuevo</span>}
                </h4>
                  <div>
                    <div className="w-50 m-auto">           
                      <InputGroup className="d-block mb-3">
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
                          {isUpdate && <Defaultvalue> actual : {roles.name} </Defaultvalue>}
                        </InputGroup>
                    </div>
                    {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                  </div>
                  <div>
                    <div className="w-50 m-auto">          
                      <InputGroup className="d-block">
                        <label  htmlFor='description'>Descripción</label>
                        <InputUser className="form-control pt-1"
                          type="text"
                          name="description"
                          required
                          placeholder="Ingrese nueva descripción"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.description && errors.icoNdescription && <IconUser className="mt-4">{errors.icoNdescription}</IconUser>}
                        {isUpdate && <Defaultvalue>actual : {roles.description} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
                  </div>  
                  <h5 className="h5Update mt-4">( todos los campos son obligatorios )</h5>
          
                  <div className="flex-Center m-3">
                    <DateStyle>                       
                      <span>Creada : 
                        {isUpdate ? formatDate(new Date(roles.createdAt)): now }
                      </span>
                                   
                      <span className="ms-5">Última modificación : 
                        {isUpdate ? formatDate(new Date(roles.updatedAt)) : now}                
                      </span>
                    </DateStyle>  
                  </div>
                  
                  {buttonsResponsive("/RolesAll","Guardar")}
                
                </form>
              )}
            </Formik>
          </div>
        </>
        );
};

export default FormRoles;