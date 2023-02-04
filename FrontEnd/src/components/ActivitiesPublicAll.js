import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import './styles/styles.css';
import "./styles/activity.css";
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { Card, Carousel } from "react-bootstrap";

const ActivitiesPublicAll = (props) => { 

  const [activities, setActivities] = useState([]); 
  
  const getActivities = async () => {     
     await axiosClient.get(`/activities/public`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setActivities(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };
 
  useEffect(() => {
    getActivities()
  },[]);


  return (
    <>
      <div className="containerActivities">
        <div className="containerSlideSize" >
          {!activities &&  <LoadingBox/> }
          {activities && 
            <>
              <div className="carrousel">
                <br/>
                <Carousel>
                  {activities.map((oneActivity) => ( 
                  <Carousel.Item key={oneActivity.id}>
                    <img className=" imageActivity" src={oneActivity.image} alt="Slide" />
                    <Card.Title>
                      <h4 className="centerText m-2">{oneActivity.name}</h4>
                    </Card.Title>
                    <div> 
                      <h6 className="h6SlideActivity" >{oneActivity.content}</h6>
                    </div>
                    <br/>
                  </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default ActivitiesPublicAll;