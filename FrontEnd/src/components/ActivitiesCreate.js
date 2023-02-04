import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormActivities from "./FormActivities";

function ActivitiesCreate(match) {

  const [ ,setActivities] = useState({
    name: "",
    content:"",
    image:""        
  });
  
  //SEND
  const handleSend = (body) => {
    const saveActivities = async () => {
      await axiosClient.post("/activities",body)     
        .then((response) => {
          if(response) {
            setActivities(response.data)
            Swal.fire({
              icon: "success",
              title: "Actividad Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./ActivitiesAll"
            }, 1000);
          }
        })
        .catch(function (error) {
          Swal.fire({
          icon:"error",
          title: "Error",
          text: error,
          });
        });
    };
    saveActivities();
  };

return(
      <>
        <FormActivities onAction={handleSend} paramsId={match}/>
      </>
       );
}
export default ActivitiesCreate;