import React, { useState,useEffect} from "react";
import "./styles/formDonation.css";
import { Link} from "react-router-dom";
import { Formik } from "formik";
import { ViewStripeOptions, ViewMercadopagoTicketOptions, ViewMercadopagoTotalOptions} from './helpers/ViewPaymentOptions';
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { ErrorText } from "./elements/ElementsFormStyles";
import { msgRequired,msgValidationAmount } from "./helpers/ValidationMessages";
import { regexAmount } from "./helpers/RegExp";
import * as FaIcons from "react-icons/fa";

const FormDonation = ({onAction}) => {
  
  let [user, setUser] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [selectRadio, setSelectRadio] = useState("");
  let initialValues = {amount:"", message: ""};
  let photo, body; 
  const stripe = useStripe();
  const elements = useElements();
 
  if (user && user.image!==""? photo=user.image : photo=<FaIcons.FaUser/>);
  if (!user ? user="": user);
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])
 
  //select radio input
  const changeSelectRadio= (e) =>{
    setSelectRadio(e.target.value)
  };
 
  //enviar body a componente de pago
  const makeBody = async (values) => {
    let errorStripe="";
    let paymentMethodStripe="";
   
    const payForm=sessionStorage.getItem("payMethod");
    if(payForm==="stripe"){
      const{error,paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card:elements.getElement(CardElement)
        
      });
      errorStripe=error;
      paymentMethodStripe=paymentMethod
    } 
    
    body = {               
      "amount":values.amount,
      "quantity":1,
      "payment_method_id":selectRadio,
      "title":`donacion a Somos Mas ong`,
      "userId": user.id,
      "userName": user.firstName,
      "userLastName": user.lastName,
      "userPhone": user.phone || "",
      "userEmail":user.email,
      "payForm":`merc_pag AR$ ${sessionStorage.getItem("payMethod")}`,
      "statusPay":"Pend",
      "message": values.message,
      stripe:{
        "amount":(values.amount*100),
        "payForm":`${sessionStorage.getItem("payMethod")} U$S`,
        "statusPay":"Conf"
      }          
    };         
    setIsLoading(true);
    return onAction(body,errorStripe,paymentMethodStripe)
  };
  
  //FORMIK VALIDATIONS
  let validateInputs = (values) => {
    let errors = {
      amount:"",
      formOk: "",
    };

    if (!values.amount) {
      errors.amount = msgRequired;
      errors.formOk = "f";
      return errors;
    }

    if (!regexAmount.test(values.amount)) {
      errors.amount = msgValidationAmount;
      errors.formOk = "f";
      return errors;
    } else {
      errors.formOk = "v";
    }
  }

  return ( 
  <>
    <div className="containerStripe ">
      {!user && <h3 className="centerText">"Para hacer una donación, tenés que estar registrado"</h3>}
      { user &&
        <Formik
              initialValues={initialValues}
              validate={validateInputs}
              onSubmit={(values) => { makeBody(values) }}
        > 
        {
          ({ values,handleSubmit, handleChange, handleBlur, touched, errors}) => (
        
        <form onSubmit={handleSubmit} className="formStripe">
                <div className="formUserData">
                  <div className="formStripeUser">
                    <img className="imgStripe" src={photo} alt="user"></img>                 
                    <p className="ms-3"> Nombre   : {user.firstName}</p>
                    <p className="ms-5"> Apellido : {user.lastName} </p>
                  </div>
                  <div className="formStripeUser  ms-5">
                    <p > Email: {user.email}</p>
                    <p > Teléfono : {user.phone}</p>
                  </div>
                </div> 

                <div className="formUserData"> 
                  <div>
                    <label> Mensaje </label>
                    <textarea className="form-control"
                      type='text'
                      rows='1'
                      cols='52'
                      name='message'
                      placeholder="Tu mensaje..."
                      value={values.message}        
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>  

                <div className="formUserData">  
                  <div className="form-group">
                    
                    <div> 
                      <span className="methodText">{sessionStorage.getItem('payMethod')} </span>   
                      <div className={ViewMercadopagoTicketOptions()}> 
                        <div className="d-flex">
                          ( moneda AR$ )
                          <input className="me-3 ms-3"
                            type="radio"
                            value='rapipago'
                            checked={selectRadio==="rapipago"?true:false}
                            onChange={changeSelectRadio}
                          /> Rapipago 
                          <input className="ms-4 me-3"
                            type="radio"
                            value='pagofacil'
                            checked={selectRadio==="pagofacil"?true:false}
                            onChange={changeSelectRadio}
                          /> Pagofácil
                        </div>
                      </div>
                      <input className="form-control"
                        name="amount"
                        type="number"
                        placeholder="ingrese importe"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      /> 
                    </div>
                    {touched.amount && errors.amount && (<ErrorText>{errors.amount} </ErrorText>)}
                  </div>
                </div> 

                <div className={ViewStripeOptions()}> 
                  <div className="formUserData">  
                    <div className="form-group">
                      <label> Tarjeta de Crédito - moneda U$S</label>                      
                      <CardElement className="form-control cardElement"/>
                      <span className="flex-Center">👉tarjeta: 16 dígitos/👉mm y aa: 2 dígitos/👉cvc: 3 dígitos/👉c.p.: 5 dígitos</span>
                    </div>
                  </div>
                </div>

                <div className={ViewMercadopagoTotalOptions()}> 
                    <span className="flex-Center">Te vamos a re-dirigir a   
                      <img className="logoMP flex-Center"src="https://www.boutiqueautomovil.com.ar/wp-content/uploads/2019/05/logo-mercadopago.png" alt="mercadoPago"></img>  
                    </span>
                    <span className="flex-Center">para efectuar el pago</span>
                </div>

                <div className={ViewMercadopagoTicketOptions()}> 
                    <span className="flex-Center">Te vamos a re-dirigir a   
                      <img className="logoMP flex-Center"src="https://www.boutiqueautomovil.com.ar/wp-content/uploads/2019/05/logo-mercadopago.png" alt="mercadoPago"></img>  
                    </span>
                    <span className="flex-Center">Descargá el ticket y efectuá el pago en las sucursales habilitadas</span>
                </div>
                
                <div className="buttonsResponsive">
                  <Link to={"/PaymentMethod"}  className='btn buttonBlue' role='button' > Volver </Link>   
                  <button disabled={isLoading} id="submit" type="submit" className="btn buttonBlue buttonGreen">        
                    <span id="button-text">
                      {isLoading ? <div className="spinner" id="spinner"></div> : "Continuar"}
                    </span>
                  </button>
                </div>  
      </form> 
      )}
      </Formik>
      }
    </div>
  </>
  );
}

export default FormDonation;