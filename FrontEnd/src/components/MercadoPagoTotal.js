import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import FormDonation from "./FormDonation";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const MercadoPagoTotal = () => {
  let [,setUser] = useState("");
    
  //datos del usuario en sesión
  useEffect(() => {
    const userData=sessionStorage.getItem("userInfo")
    setUser(JSON.parse(userData));
   }, [])
 
  //captura body de componente FormDonation y
  //envia formulario
  const handleSend = async (body) => {   
    try {
      const donation=await axiosClient.post("/donations/payWithTotalMercadoPago",body) 
      if(donation.status===200){
        Swal.fire({
          icon: 'success', 
          title:"Gracias por tu ayuda !",
          timer:1500,
          showConfirmButton:false
        })
        window.open(donation.data)
        window.focus()
        window.location.href="./About"
      }       
    } catch (error) {
      Swal.fire({
        icon: 'error', 
        title:"Error ! No se realizó el pago",
          text: error.response,
        timer:1500,
        showConfirmButton: false
      })
    }
  };
  
  return ( 
          <Elements stripe={stripePromise} >
            <FormDonation onAction={handleSend}/>
          </Elements> 
         );
}

export default MercadoPagoTotal;