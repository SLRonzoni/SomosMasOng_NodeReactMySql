import React from "react";
import "./styles/styles.css";
import "./styles/testimonial.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as FaIcons from "react-icons/fa";
import * as msg from './helpers/ValidationMessages';
import { regexCategoryDescription, regexCategoryName } from "./helpers/RegExp";
import { ErrorText,IconUser, Label, InputUser, InputGroup} from './elements/ElementsFormStyles';
import buttonsResponsive from "./ButtonsResponsive";

const TestimonialsCreate=(props)=> {

    const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
    const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
    

    let user  = JSON.parse(sessionStorage.getItem('userInfo'));

    //SEND
    const sendForm = (values) => {
        //CREATE    
        let body = new FormData()
        body.append("name",values.name);
        body.append("content",values.content);
        body.append("image",values.image);  
        body.append("userId",user.id); 

        const createTestimonial = async () => {
            await axiosClient
            .post('/testimonials',body)
            .then(response=>{
                if(response.status===201 ){     
                    Swal.fire({
                        icon: "success",
                        title: `Registramos tu testimonio correctamente !`,
                        timer:1000,
                        showConfirmButton:false
                    });
                props.history.push("/TestimonialsPublic");
                } else {             
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    showConfirmButton:true
                    })
                };          
            })     
            .catch(error=>{
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error"
                });
            });
        }
        createTestimonial();
    };

    //FORMIK INITIAL VALUES
    let initialValues={name:'', 
        content:'',
        image:'',
       }

    //FORMIK VALIDATIONS 
    let validateInputs=(values) =>{ 

        let errors = {name: '',content:'', image:'',
                     icoNname:'', icoNcontent:'', icoNimage:'',formOk:''};
        
        if (!values.image) {
            errors.image=msg.msgRequired
            errors.icoNimage= X
            return errors
        };

        if (!values.name) {
            errors.name=msg.msgRequired
            errors.icoNname= X
            return errors
        };

        if (!regexCategoryName.test(values.name)) {
            errors.name=msg.msgValidationCategoryName
            errors.icoNname= X
            return errors
        } else {
            errors.icoNname= V
        };

        if (!values.content) {
            errors.content=msg.msgRequired
            errors.icoNcontent= X
            return errors
        };

        if (!regexCategoryDescription.test(values.content)) {
            errors.content=msg.msgValidationCategoryDescription
            errors.icoNcontent= X
            return errors
        } else {
            errors.icoNcontent= V
        };

        if(errors.name || errors.image || errors.content ){
           errors.formOk='f'
         } else {
           errors.formOk='v'
         };

    };

    //FORM
    return (
        <>
            <div className="containerFirst">
                { !user && <h3 className="h3CreateTestimonials">"Para dar testimonio, tenés que estar logueado"</h3>}
                { !user && setTimeout( function() { window.location.href = "/TestimonialsPublic" }, 1500 )}
                { user && 
                    <Formik  
                            initialValues={initialValues}           
                            validate={validateInputs}
                            onSubmit={(values)=>{ sendForm(values)}}
                    > 
                    { ({values,handleBlur,handleSubmit,handleChange,touched,errors,setFieldValue}) => (
            
                    <form className="containerTestimonialCreate" onSubmit={handleSubmit}>
                        <h5 className="centerText marginBottom05rem">Mi testimonio</h5>
                        <div>
                            <div className="ms-3">
                                <div className="d-flex">   
                                    <img  className="imageUserTestimonials m-1" src={user.image} alt="usuario"></img>
                                    <span className="ms-2 mt-2">{user.firstName}, {user.lastName} </span>                                                 
                                </div>
                            </div>
                            <div className="ms-3">
                                <div>   
                                    <Label htmlFor="image">Agregá una imágen para tu testimonio </Label>
                                    <InputGroup >
                                        <InputUser className="form-control m-1 p-1"
                                            type="file" 
                                            name="image" 
                                            id="image"  
                                            encType="multipart/form-data"
                                            onChange={ (e)=>setFieldValue('image',e.currentTarget.files[0]) } 
                                            onBlur={handleBlur}
                                        />
                                        {touched.image && errors.icoNimage && <IconUser>{errors.icoNimage}</IconUser>}    
                                    </InputGroup> 
                                </div> 
                                {touched.image && errors.image && <ErrorText className="errors">{errors.image} </ErrorText> }
                            </div>
                            <div className="ms-3">
                                <div>   
                                    <Label  htmlFor="name">Título</Label>
                                    <InputGroup>
                                        <InputUser className="form-control"
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            placeholder="Ingresá un título para tu testimonio"
                                            value={values.name}
                                            onChange={handleChange} 
                                            onBlur={handleBlur}
                                        />
                                        {touched.name && errors.icoNname && <IconUser>{errors.icoNname}</IconUser>}
                                    </InputGroup>
                                </div> 
                                {touched.name && errors.name && <ErrorText className="errors">{errors.name} </ErrorText> }
                            </div>
                            <div className="ms-3 mb-4">
                                <div>   
                                    <Label htmlFor="content">Detalle</Label>
                                    <InputGroup >
                                        <textarea className="textArea form-control borderRounded"
                                            type='text'
                                            rows='5'
                                            cols='40'
                                            name='content'
                                            placeholder="  Tu testimonio..."
                                            value={values.content}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />              
                                        {touched.content && errors.icoNcontent && <IconUser>{errors.icoNcontent}</IconUser>}
                                    </InputGroup> 
                                </div>
                                {touched.content && errors.content && <ErrorText className="errors">{errors.content} </ErrorText> }
                            </div>
                            {buttonsResponsive("/TestimonialsPublic","Guardar")}
                        </div>
                    </form>
                )}
            </Formik>
            }
        </div>
    </>
  );
};
export default TestimonialsCreate;
