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
import { regexCategoryName, regexCategoryDescription, regexCategoryId} from "./helpers/RegExp";

const FormNews = ({onAction, paramsId, isUpdate}) => {  
  
  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    
  let [,setUser] = useState("");
  
  const [duplicated,setDuplicated]=useState("");

  const [news, setNews] = useState({ 
    id:"", 
    name: "", 
    image:"",
    categoryId:"" ,
    content:"" ,
    type:""     
  });

  let errors = {name:'', image:'',content:'', categoryId:"" ,type:"" , 
              icoNname:'', icoNimage:'', icoNcontent:'',icoNcategoryId:"",
              formOk:''};  
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])

  //DEFAULT VALUES
  useEffect(() => {
  if(isUpdate){
    const id=paramsId.params.id
      const getNews = async () => {
        await axiosClient.get(`/news/${id}`)
        .then((response) => {
          setNews(response.data);
        })
        .catch((error=>{
          console.log(error);
        }));
      };
      getNews();
  }
  },[]);
 
  //DUPLICATED NAME
  const repeat= async (searchName)=>{                                 
    setDuplicated(await DuplicatedName(searchName,'news'))
  };

   //enviar body a backend
   const makeBody = async (values) => {
    let body = new FormData()
      body.append("name",values.name);
      body.append("content",values.content);
      body.append("image",values.image);
      body.append("categoryId",values.categoryId);
      body.append("type",values.type);
    return onAction(body)
  };

  //FORMIK INITIAL VALUES
  let initialValues={name:news.name, content:news.content, image: news.image, categoryId: news.categoryId, type:news.type}

  //FORMIK VALIDATIONS
  let validateInputs=(values) =>{   

    if(!values.image && news.image==="") {
      errors.image=msg.msgRequired
      errors.icoNimage= X
      return errors
    };

    if (!values.image) {
      values.image=news.image;
    };

    if (!values.name && news.name==="") {
      errors.name=msg.msgRequired
      errors.icoNname= X
      return errors
    };

    if (!values.name) {
      values.name=news.name
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
    || (duplicated.respName===searchName && duplicated.respId!==news.id && isUpdate)) {    
      errors.name=msg.msgValidationDuplicated
      errors.icoNname= X 
      return errors
    } else {
      errors.icoNname= V
    };   
  
    if (!values.content && news.content==="") {
      errors.content=msg.msgRequired
      errors.icoNcontent= X
      return errors
    };

    if (!values.content) {
      values.content=news.content
      errors.icoNcontent= V
    }; 
  
    if (!regexCategoryDescription.test(values.content)) {
      errors.content=msg.msgValidationCategoryDescription
      errors.icoNcontent= X
      return errors
    } else {
      errors.icoNcontent= V
    }; 

    if (!values.categoryId && news.categoryId==="") {
      errors.categoryId=msg.msgRequired
      errors.icoNcategoryId= X
      return errors
    };

    if (!values.categoryId) {
      values.categoryId=news.categoryId
      errors.icoNcategoryId= V
    };

    if(!regexCategoryId.test(values.categoryId)){
      errors.categoryId=msg.msgValidationIsNumber
      errors.icoNcategoryId= X
      return errors
    };
  };

  if(errors.name || errors.image || errors.content || errors.categoryId || errors.type){
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
                <h4 className="mt-1 flex-Center">Noticia
                    {isUpdate && <span>&nbsp;a actualizar</span>}
                    {!isUpdate && <span>&nbsp;nueva</span>}
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
                          {isUpdate && <Defaultvalue>  actual : {<img className="imageSmallUpdateForm" src={news.image}  alt="fotoNoticia" />} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.image && errors.image   && <ErrorText className="errorTextUpdate"> {errors.image} </ErrorText>}
                    </div>
                    <div>
                      <div className="m-auto">           
                        <InputGroup className="d-block mb-2">
                          <label htmlFor='name'>Titulo</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="name"
                            placeholder='Ingrese un título'
                            required
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            />
                            {touched.name && errors.icoNname && <IconUser className="mt-4">{errors.icoNname}</IconUser>}
                            {isUpdate && <Defaultvalue> actual : {news.name} </Defaultvalue>}
                          </InputGroup>
                      </div>
                      {touched.name && errors.name && <ErrorText className="errorTextUpdate">{errors.name} </ErrorText> }
                    </div>
                    <div>
                      <div className="m-auto mb-2">          
                        <InputGroup className="d-block">
                          <label  htmlFor='content'>Detalle</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="content"
                            required
                            placeholder="Ingrese detalle"
                            value={values.content}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.content && errors.icoNcontent && <IconUser className="mt-4">{errors.icoNcontent}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {news.content} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.content && errors.content  && <ErrorText className="errorTextUpdate"> {errors.content} </ErrorText>}
                    </div> 
                  </div> 
                  <div className="divColumnUpdateOrganiz">
                    <div>
                      <div className="m-auto mb-2">          
                        <InputGroup className="d-block">
                          <label  htmlFor='categoryId'>Categoría</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="categoryId"
                            required
                            placeholder="Ingrese categoría"
                            value={values.categoryId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.categoryId && errors.icoNcategoryId && <IconUser className="mt-4">{errors.icoNcategoryId}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {news.categoryId} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.categoryId && errors.categoryId  && <ErrorText className="errorTextUpdate"> {errors.categoryId} </ErrorText>}
                    </div>
                    <div>
                      <div className="m-auto mb-2">          
                        <InputGroup className="d-block">
                          <label  htmlFor='type'>Tipo</label>
                          <InputUser className="form-control pt-1 w-100"
                            type="text"
                            name="type"
                            placeholder="Ingrese tipo"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.type && errors.icoNtype && <IconUser className="mt-4">{errors.icoNtype}</IconUser>}
                          {isUpdate && <Defaultvalue>actual : {news.type} </Defaultvalue>}
                        </InputGroup>
                      </div>
                      {touched.type && errors.type  && <ErrorText className="errorTextUpdate"> {errors.type} </ErrorText>}
                    </div>
                  </div>
                </div>
                <div className="flex-Center m-2">
                  <DateStyle>                       
                    <span>Creada : 
                      {isUpdate ? formatDate(new Date(news.createdAt)): now }
                    </span>
                                  
                    <span className="ms-5">Última modificación : 
                      {isUpdate ? formatDate(new Date(news.updatedAt)) : now}                
                    </span>
                  </DateStyle>  
                </div>
                  
                {buttonsResponsive("/NewsAll","Guardar")}
                
              </form>
              )}
            </Formik>
          </div>
        </>
        );
};

export default FormNews;