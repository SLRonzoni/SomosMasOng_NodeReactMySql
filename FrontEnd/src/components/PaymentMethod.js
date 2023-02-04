import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./styles/payments.css";
import "./styles/styles.css";
import * as FaIcons from "react-icons/fa";

function PaymentMethod() {
   
  const [selectRadio, setSelectRadio] = useState("");
  let link="";
  let user  = JSON.parse(sessionStorage.getItem('userInfo'));

  const changeSelectRadio= (e) =>{
    setSelectRadio(e.target.value)
  };
 
  const paymentOption=()=>{
     switch (selectRadio) {
      case "mercadoPagoTotal":  
        link="/MercadoPagoTotal"
        break;
      case "mercadoPagoTicket":  
        link="/MercadoPagoTicket"
        break;
      default:
        link="/Stripe"
        break;   
    }
    sessionStorage.setItem('payMethod',selectRadio)
}
paymentOption()

return (
  <div className="containerFirst">
    { !user && <h3 className="h3CreateTestimonials">"Para hacer una donación, tenés que estar logueado"</h3>}
    { !user && setTimeout( function() { window.location.href = "/auth/login" }, 1500 )}
    { user && 
    <div className="containerPayment">      
      <h1 className="centerText">Métodos de Donación</h1>
    
      <form className="formPaymentMethod">
        <div className="formPaymentType">
        <h5>Stripe ( U$S )</h5>
          <div className='mb-1 mt-1 MQpaymentInputs'>
            <input 
              type="radio"
              id='stripe'
              value='stripe'
              checked={selectRadio==="stripe"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label className="w-auto">
              <FaIcons.FaCcStripe className="icons MQpaymentIcons"/>Tarjetas de Crédito Visa, American Express, MasterCard, etc
            </label>
          </div>
        </div>

        <div className="formPaymentType">
        <h5>Mercado Pago ( AR$ )</h5>
          <div className='mt-3 MQpaymentInputs'>
            <input 
              type="radio"
              id='mercadoPagoTotal'
              value='mercadoPagoTotal'
              checked={selectRadio==="mercadoPagoTotal"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label className="w-auto">
              <FaIcons.FaRegCreditCard className="icons MQpaymentIcons"/>Tarjetas de Crédito ó débito, y dinero en cuenta Mercado Pago
            </label>
          </div>

          <div className='mb-3 MQpaymentInputs'>
            <input 
              type="radio"
              id='mercadoPagoTicket'
              value='mercadoPagoTicket'
              checked={selectRadio==="mercadoPagoTicket"?true:false}
              onChange={changeSelectRadio}
            /> 
            <label>
              <FaIcons.FaMoneyCheckAlt className="icons MQpaymentIcons"/>Pagofácil ó Rapipago
            </label>
          </div>
        </div>

        <div className='buttonsResponsive '>
          <Link to={"/"} className=' btn buttonBlue' role='button' aria-pressed='true'> Volver </Link>
          <Link to={link} className='btn buttonBlue buttonGreen' role='button'aria-pressed='true'> Continuar</Link>
        </div>
      </form>
    </div>
    }
  </div>
);
}

export default PaymentMethod;
