import React from "react";
import "./styles/styles.css";
import "./styles/contactForm.css";
import "./styles/login-register-home.css";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as msg from "./helpers/ValidationMessages";
import * as regex from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";
import {ErrorText,IconUser,InputGroup,} from "./elements/ElementsFormStyles";
import imagen from "./images/manos_fondo-sinFondo.png";
import buttonsResponsive from "./ButtonsResponsive";

const ContactForm = (props) => {

  const X=<FaIcons.FaTimes className="iconTimes"></FaIcons.FaTimes>;
  const V=<FaIcons.FaCheck className="iconCheck"></FaIcons.FaCheck>;
 
  const sendForm =  (values) => {
   
    let body = {"name": values.name,
                "phone": values.phone,
                "email": values.email,
                "message": values.message};

    const sendMessage = async () => {
      await axiosClient.post("/messages", body)
        .then((resp) => {
          if (resp.status !== 201) {
           console.log('error al crear mensaje')
          }        
        })
        .catch((error) => {
          console.log(error);
        });


      await axiosClient.post("/contacts", body)
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              title: `Tu mensaje fue enviado correctamente !`,
              timer: 1000,
              showConfirmButton: false,
            });
            props.history.push("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text:response.data.error.errors,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:error
          });
        });
    };
    sendMessage();
  };

  //FORMIK INITIAL VALUES
  let initialValues = { name: "", phone: "", message: "", email: "" };

  //FORMIK VALIDATIONS
  let validateInputs = (values) => {
    let errors = {
      name: "",
      phone: "",
      email: "",
      message: "",
      icoNname: "",
      icoNphone: "",
      icoNemail: "",
      iconNmessage: "",
      formOk: "",
    };

    if (!values.name) {
      errors.name = msg.msgRequired;
      errors.icoNname = X;
      return errors;
    }
    

    if (!regex.regexUserfirstName.test(values.name)) {
      errors.name = msg.msgValidationUserFirstName;
      errors.icoNname = X;
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNname = V;
      errors.formOk = "v";
    }

    if (!regex.regexUserPhone.test(values.phone)) {
      errors.phone = msg.msgValidationUserPhone;
      errors.icoNphone = X;
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNphone = V;
      errors.formOk = "v";
    }

    if (!values.email) {
      errors.email = msg.msgRequired;
      errors.icoNemail = X;
      return errors;
    }

    if (!regex.regexUserEmail.test(values.email)) {
      errors.email = msg.msgValidationUserEmail;
      errors.icoNemail = X;
      errors.formOk = "f";
      return errors;
    } else {
      errors.icoNemail = V;
      errors.formOk = "v";
    }

    if (!values.message) {
      errors.message = msg.msgRequired;
      errors.icoNmessage = X;
      return errors;
    }

    if (errors.name || errors.phone || errors.email || errors.message) {
      errors.formOk = "f";
    } else {
      errors.formOk = "v";
    }
  };

  
  return (
    <>
      <div className="containerFirst">
        <div className="containerImgHalfScreen"> 
          <img className="imgHalfScreen" src={imagen} alt="ManitosPintatdas"></img>
        </div>

        <div className="containerContactForm">
          <Formik
            initialValues={initialValues}
            validate={validateInputs}
            onSubmit={(values) => { sendForm(values) }}
          >
            {(
              { values, handleBlur, handleSubmit, handleChange, touched, errors }) => ( 
              
              <form className='containerFormContact' onSubmit={handleSubmit}>
                <h5 className="centerText mb-4">Formulario de Contacto</h5>              
                <div className="divGroupContactForm ">                  
                  <div>
                    <label className="labelContactForm" htmlFor='name'>Nombre y Apellido</label>
                    <InputGroup>
                      <input  className="form-control inputContactForm"
                        type='text'
                        name='name'
                        placeholder="Tu nombre y apellido"
                        required
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.icoNname && (<IconUser>{errors.icoNname}</IconUser>)}
                    </InputGroup>
                  </div>
                  {touched.name && errors.name && (<ErrorText>{errors.name} </ErrorText>)}
                </div>

                <div className="divGroupContactForm">  
                  <div>
                    <label className="labelContactForm"htmlFor='phone'>Teléfono </label>
                    <InputGroup >
                    <input  className="form-control inputContactForm"
                        type='text'
                        name='phone'
                        placeholder="Tu número de teléfono"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.phone && errors.icoNphone && (
                        <IconUser>{errors.icoNphone}</IconUser>
                      )}
                    </InputGroup>
                  </div>
                  {touched.phone && errors.phone && (
                    <ErrorText>{errors.phone} </ErrorText>
                  )}
                </div>
              
                <div className="divGroupContactForm">  
                  <div>
                    <label className="labelContactForm"htmlFor='email'>E-mail  </label>
                    <InputGroup >
                    <input  className="form-control inputContactForm"
                        type='text'
                        name='email'
                        placeholder="Tu e-mail"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.icoNemail && (
                        <IconUser>{errors.icoNemail}</IconUser>
                      )}
                    </InputGroup>
                  </div>
                  {touched.email && errors.email && (
                    <ErrorText>{errors.email} </ErrorText>
                  )}
                </div>
            
                <div className="divGroupContactForm">  
                  <div> 
                    <label className="labelContactForm" htmlFor='message'>Mensaje </label>
                    <InputGroup >
                      <textarea className="tArea form-control"
                        type="text"
                        name='message'
                        placeholder=" Tu mensaje..."
                        required
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.message && errors.icoNmessage && (
                        <IconUser>{errors.icoNmessage}</IconUser>
                      )}
                    </InputGroup>
                  </div>
                  {touched.message && errors.message && (
                    <ErrorText>{errors.message} </ErrorText>
                  )}
                </div>
                {buttonsResponsive("/","Enviar")}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
