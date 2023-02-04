import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './styles/styles.css';
import './styles/cards.css';
import './styles/members-organizations.css';
import {formatDate} from './helpers/FormatDate';
import ViewAdministratorOptions from './helpers/ViewAdministratorOptions';
import * as FaIcons from "react-icons/fa";

const MembersCard = ({ id, name, image, description, facebookUrl, instagramUrl, 
                     linkedinUrl, created, updated, remove}) =>{

  const [show, setShow]=useState(false);

  const seeMore = () => setShow(!show);

  return (
    <>
    <div className="card">
      <div className="card_publication">
        <img className="card_img_member" src={image} alt="colaborador"></img>        
        <span>
          <div className={ViewAdministratorOptions()}>  
            <div> 
              <Link to={`/members/update/${id}`}> 
                <FaIcons.FaPencilAlt className='iconPencil'/> 
              </Link>
              <div className="button" onClick={()=>{remove(id)}}> 
                <FaIcons.FaTrashAlt className='iconTrash'/>
              </div>                          
            </div>  
          </div>     
        </span>
      </div> 

      <div className="card_info">  
        <h2 className="card_title MQcardFontSize"><em>{name}</em></h2>
        <p className='m-1'><FaIcons.FaFacebook className='me-1'/>{facebookUrl}</p>
        <p className='m-1'> <FaIcons.FaInstagram className='me-1'/>{instagramUrl}</p>
        <p className='m-1'> <FaIcons.FaLinkedin className='me-1'/>{linkedinUrl}</p>
        
        {(show===false) ?
          <div className='d-flex'>        
            <button className='btn ms-auto MQseeMore mt-3' onClick={()=>{seeMore()}}>            
              Leer más 
              &rarr;        
            </button>
          </div>      
        :
          <div>
            <div className="card-info">
              <p className='fixedSizeMember m-auto mt-4 mb-2'>{description}</p> 
              <div>
                <div className={ViewAdministratorOptions()}>
                  <div className="flex-Center">
                    <p><b> Ingreso</b> {formatDate(new Date(created))}</p>
                    <p className='ms-3'><b> Actualizado </b>{formatDate(new Date(updated))}</p>
                  </div>
                </div> 
              </div>
              
              <div className='d-flex'>
                <button className='btn ms-auto MQseeMore' onClick={()=>{seeMore()}}>            
                  &larr;    
                </button>
              </div> 
            </div> 
          </div> 
          }
       </div>    
      
    </div> 
    </> 
  );
};
export default MembersCard;