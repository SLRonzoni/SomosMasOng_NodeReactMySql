import React,{useEffect,useState} from 'react';
import axiosClient from '../configuration/axiosClient';
import {formatDate} from './helpers/FormatDate';
import { Link } from 'react-router-dom';
import "./styles/styles.css";
import "./styles/testimonial.css";
import LoadingBox from './LoadingBox';

const TestimonialsPublic =() =>{

    const [testimonials,setTestimonials]=useState([]);
    const [users,setUsers]=useState([]);
    
    //FIND TESTIMONIALS
    const getTestimonials=async () => {
        await axiosClient.get('/testimonials/public')
            .then( response =>{  
               setTestimonials(response.data.data)                           
             }) 
            .catch (error => {
                console.log(error)
            })             
    }; 

    useEffect(() => {
        getTestimonials()
    },[]);

    //FIND DATA USERS 
    const getUser=async () => {  
        const response= await axiosClient.get('/users/selectData')
        setUsers(response.data)
    };

    useEffect(() => {
        getUser()
    },[]);

    //ADDE FIRSTNAME, LASTNAME, PHOTO TO TESTIMONIALS
    let people=[];
    for (let i = 0; i <testimonials.length; i++) {
        for (let j = 0; j <users.length; j++) {
            const people=users.find(function(oneUser){
                if(users[j].id=== testimonials[i].userId){
                  testimonials[i].firstName=users[j].firstName
                  testimonials[i].lastName=users[j].lastName
                  testimonials[i].photo=users[j].photo
                  return true;
                }
            })
        };
        people.push({...testimonials[i]})
    };

    return(
        <>
            <div className='containerFirst'>
            {!people &&  <LoadingBox/> }
            {people && 
             <>
                <div className='buttonTestimonials mb-5'>
                    <Link to={'/TestimonialsCreate'} className=" btn buttonGreen" role="button" > Dar mi testimonio </Link> 
                </div>

                <div className="containerTestimonials">
                    {people.map((oneResult) => {
                        return (
                            <div key={oneResult.id}>
                               
                                <div className='cardTestimonialsAndComments '>
                                   
                                    <img className="imgTestimonialsAndComments" src={oneResult.image}alt="ImagenTestimonio"></img> 
                                    
                                    <div className='widthTestimonialsAndComments '>
                                        <h3 className='pTestimonialsPublic'>{oneResult.name} </h3>
                                        <div>
                                            <p className='pTestimonialsPublic mb-5'> {oneResult.content}</p>  
                                           
                                            <div className='userTestimonials'>
                                                <div className='d-flex'>
                                                    <img className="imageUserTestimonials" src={oneResult.photo} alt="user"></img> 
                                                    <p>{oneResult.firstName +"  " + oneResult.lastName}</p>
                                                </div>   
                                                <p className='dateTestimonials'>Fecha : {formatDate(new Date(oneResult.createdAt))}</p>   
                                            </div>                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
               
                </div>
                </> 
                }
                
            </div>
       </>
    )
 };

export default TestimonialsPublic;