const ModelDonations= require('../models').Donations;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller");
const {Op}=require('sequelize');

const Stripe=require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//deben ir credenciales del vendedor ( SomosMas ) 
//MOMENTANEAMENTE simulado con user de prueba nickname: "test_user_1293356429@testuser.com"
const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN_vendedorPrueba)


const getAllDonations= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelDonations)
     const {page}=req.query
     const pageLimit=100
     //const attributes=['name']

     const donationsPaginated= await paginated.findAndPaginate(page,pageLimit)
     
     res.status(200).json({previousPage:donationsPaginated.previousPage,
                           nextPage:donationsPaginated.nextPage,
                           donations:donationsPaginated.data})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getDonationId= async (req, res) => {                          
  return baseController.getModelById(req, res, ModelDonations)
};

const getAllDonationsByPayForm= async (req, res) => {    
  const paramsName = req.params.payForm;
  try{
    const donations= await ModelDonations.findAll({where:{payForm:paramsName}})
    if(!donations){
      return res.status(404).json('pay form not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getAllDonationsByStatusPay= async (req, res) => {   
  const paramsName = req.params.statusPay;
  try{
    const donations= await ModelDonations.findAll({where:{statusPay:paramsName}})
    if(!donations){
      return res.status(404).json('statusPay not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getAllDonationsByEmail= async (req, res) => {    
  const paramsName = req.params.userEmail;
  try{
    const donations= await ModelDonations.findAll({where:{userEmail:paramsName}})
    if(!donations){
      return res.status(404).json('email not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const getAllDonationsByCreate= async (req, res) => {  
  const paramsDate = req.params.create.slice(0,10);
  const start=paramsDate+'T00:00:00.000Z';
	const end=paramsDate+'T24:00:00.000Z';
  try{
    const donations= await ModelDonations.findAll({where:{[Op.or]: [{ createdAt:{[Op.between]:[start, end]} }]}})
    if(!donations){
      return res.status(404).json('date not found')
    } else{
      res.status(200).json(donations)
    }
  } catch(error) {
    res.status(500).json(error)
  }     
};

const createDonation= async (req,res)=> { 
  const {userId,userName,userLastName,userEmail,userPhone,amount,payForm,statusPay,message,stripe }=req.body
  const inputVars = {userId,userName,userLastName,userEmail,userPhone,amount,payForm,statusPay,message}
  if(stripe){
    inputVars.amount=stripe.amount/100
    inputVars.statusPay=stripe.statusPay
    inputVars.payForm=stripe.payForm
  };
  try{
    const donation=await ModelDonations.create(inputVars) 
    return (donation)       
  } catch (error) {        
    console.log(error);
  }
};

const deleteDonation=async (req,res)=>{
  try{
    const donation= await ModelDonations.findByPk(req.params.id) 
    
    if(!donation){
      return res.status(404).json('id not found')
    } else{
      const delDonation=await ModelDonations.destroy({where: {id: req.params.id}})
      return res.status(200).json({msg:`donation ${req.params.id} deleted`})
    }  
  } catch(error) {
    res.status(500).json(error)
  }
};
   
// Stripe - en U$S, con tarjeta de credito
const paymentsStripe=async (req, res) => {
  try{      
    //Create a PaymentIntent with the order amount and currency
    const payment = await stripe.paymentIntents.create({
      amount:req.body.stripe.amount,
      currency: "usd",
      description:"donation Stripe",
      payment_method:req.body.id,
      confirm:true
    });
    res.status(201).json({message: "Pago exitoso", 
                          clientSecret: payment });     
    
    createDonation(req)
  } catch(error) {
      console.log(error)
      res.status(500).json(error)
  }
};

// Mercado Pago - Lista de metodos de pago
const listPaymentMethodsMercadoPago= async (req,res)=> {
  try {
    let response=await mercadopago.payment_methods.listAll();
    let payment_methods=response.body;
    res.status(200).json(payment_methods)
  } catch(error) {
    res.status(500).json(error)
  }
}

// Mercado Pago - en AR$,con pagofacil o rapipago
const payWithTicketMercadoPago=async (req, res) => {
  try{      
    const data= await mercadopago.payment.create({
      transaction_amount: req.body.amount,
      description: 'donation mercadopago',
      payment_method_id:req.body.payment_method_id,
      payer: {
        email:req.body.userEmail
      }
    })
    
    //responde url para redirigir al sitio de mercadopago en frontend
    let url=data.body.transaction_details.external_resource_url
    res.send(url)
  } catch(error) {
    res.status(500).json(error)
  }
  createDonation(req)
};

// Mercado Pago - en AR$, con tarjetas, tickets o cuenta mercadopago
const payWithTotalMercadoPago=async (req, res) => {
  //crear preferencia
  let preference ={
    items:[
      {
        title: req.body.title,
        unit_price:parseInt(req.body.amount),
        quantity:req.body.quantity
      }
    ]
  };
 
  mercadopago.preferences.create(preference)
    .then(function(response){
      //responde url para redirigir al sitio de mercadopago en frontend
      let url=response.body.init_point
      res.send(url)
    }).catch(function(error){
      console.log(error);
    })
    createDonation(req)
};
  

module.exports = {getAllDonations,
                  getAllDonationsByPayForm,
                  getAllDonationsByStatusPay,
                  getAllDonationsByEmail,
                  getAllDonationsByCreate,
                  getDonationId,
                  createDonation,
                  paymentsStripe,
                  payWithTicketMercadoPago,
                  payWithTotalMercadoPago,
                  listPaymentMethodsMercadoPago,
                  deleteDonation};