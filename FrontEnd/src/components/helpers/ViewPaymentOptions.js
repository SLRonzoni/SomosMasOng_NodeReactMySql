//hacer visibles opciones en FormDonation segun la forma de pago
const ViewStripeOptions = () => { 
    let payType=sessionStorage.getItem('payMethod')
    if(payType === "stripe") { 
      return 'visible'
    } else {
      return 'hidden'
    };
};
    
const ViewMercadopagoTicketOptions = () => { 
    let payType=sessionStorage.getItem('payMethod')
    if(payType === "mercadoPagoTicket") { 
        return 'visible'
    } else {
        return 'hidden'
    };
};

const ViewMercadopagoTotalOptions = () => { 
    let payType=sessionStorage.getItem('payMethod')
    if(payType === "mercadoPagoTotal" ) { 
        return 'visible'
    } else {
        return 'hidden'
    };
};

  export { ViewStripeOptions, 
           ViewMercadopagoTicketOptions,
           ViewMercadopagoTotalOptions};