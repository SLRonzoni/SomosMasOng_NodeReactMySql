import React, { useState,useEffect } from "react";
import axiosClient from "../configuration/axiosClient";
import FormDonation from "./FormDonation";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Stripe = () => {

  sessionStorage.removeItem('paymentMethod');  

  let [,setUser] = useState("");
    
  //obtener datos del usuario en sesión
  useEffect(() => {
   const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
  }, [])
  
  //captura body de componente FormDonation y
  //envia formulario
  const handleSend = async (body,errorStripe,paymentMethodStripe) => { 
    if(!errorStripe){
      const {id}=paymentMethodStripe;
      body.id=id;
      try {
        const donation=await axiosClient.post("/donations/paymentsStripe",body) 
        if(donation){
          Swal.fire({
            icon: 'success', 
            title:"Gracias por tu ayuda !",
              text: donation.data.message ,
              timer:1500,
              showConfirmButton:false
          });
          setTimeout(() => {
            window.location.href="./About"
          }, 1500); 
        }       
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error', 
          title:"Error !",
           text: error.response,
          timer:1500,
          showConfirmButton: false
        })
      }
    }
  };
  
  return (
      <>
        <Elements stripe={stripePromise} >
          <FormDonation onAction={handleSend}/>
        </Elements> 
      </>  
         );  
};

export default Stripe;
