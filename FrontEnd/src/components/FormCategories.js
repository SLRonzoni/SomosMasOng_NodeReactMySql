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

const FormCategories = ({onAction, paramsId, isUpdate}) => {  
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    
  let [,setUser] = useState("");
  
  const [duplicated,setDuplicated]=useState("");

  const [categories, setCategories] = useState({ 
    id:"", 
    name: "", 
    image:"",
    description:""          
  });

  let errors = {name:'', image:'',description:'',  
                icoNname:'', icoNimage:'', icoNdescription:'',formOk:''};  
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  //DEFAULT VALUES
  useEffect(() => {
    if(isUpdate){
      const id=paramsId.params.id
        const getCategory = async () => {
          await axiosClient.get(`/categories/${id}`)
          .then((response) => {
            setCategories(response.data);
          })
          .catch((error=>{
            console.log(error);
          }));
        };
        getCategory();
    }
  },[]);
 
  //DUPLICATED NAME
  const repeat= async (searchName)=>{                                 
    setDuplicated(await DuplicatedName(searchName,'categories'))
  };

   //enviar body a backend
   const makeBody = async (values) => {

    let body = new FormData()
      body.append("name",values.name);
      body.append("description",values.description);
      body.append("image",values.image);         
    return onAction(body)
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:categories.name, description:categories.description, image: categories.image }

  //FORMIK VALIDATIONS
  let validateInputs=(values) =>{   

    if (!values.name && categories.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };

    if (!values.name) {
      values.name=categories.name
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
    || (duplicated.respName===searchName && duplicated.respId!==categories.id && isUpdate)) {    
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X  
      return errors
    } else {
      errors.icoNname= V
    };

    if(!values.image && categories.image==="") {
      errors.image=msg.msgRequired
      errors.icoNimage= X
      return errors
    }

    if (!values.image) {
      values.image=categories.image;
    };
  
    if (!values.description && categories.description==="") {
      errors.description=msg.msgRequired
      errors.icoNdescription= X
      return errors
    };

    if (!values.description) {
      values.description=categories.description
      errors.icoNdescription= V
    }; 
  
    if (!regexCategoryDescription.test(values.description)) {
      errors.content=msg.msgValidationCategoryDescription
      errors.icoNdescription= X
      return errors
    } else {
      errors.icoNdescription= V
    }; 
  };

  if(errors.name || errors.description || errors.image){
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
                <h4 className="mb-3 flex-Center">Categoría 
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
                        {isUpdate && <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={categories.image}  alt="ImágenCategoria" />} </Defaultvalue>}
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
                          {isUpdate && <Defaultvalue> actual : {categories.name} </Defaultvalue>}
                        </InputGroup>
                    </div>
                    {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                  </div>
                  <div>
                    <div className="w-75 m-auto">          
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
                        {isUpdate && <Defaultvalue>actual : {categories.description} </Defaultvalue>}
                      </InputGroup>
                    </div>
                    {touched.description && errors.description  && <ErrorText className="errorTextUpdate"> {errors.description} </ErrorText>}
                  </div>  
                  <h5 className="h5Update mt-2">( todos los campos son obligatorios )</h5>
          
                  <div className="flex-Center m-1">
                    <DateStyle>                       
                      <span>Creada : 
                        {isUpdate ? formatDate(new Date(categories.createdAt)): now }
                      </span>
                                   
                      <span className="ms-5">Última modificación : 
                        {isUpdate ? formatDate(new Date(categories.updatedAt)) : now}                
                      </span>
                    </DateStyle>  
                  </div>
                  
                  {buttonsResponsive("/CategoriesAll","Guardar")}
                
                </form>
              )}
            </Formik>
          </div>
        </>
        );
};

export default FormCategories;