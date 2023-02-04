import React, { useState} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormActivities from "./FormActivities";

const FormActivity = ({match,history}) => {

  const id  = match.params.id;
  const isUpdate=true
  
  const [, setActivities] = useState({ 
          id:"", 
          name: "", 
          image:"",
          content:""          
        });
     
  //SEND
  const handleSend = (body) => {    
    const updateActivity = async () => {
      await axiosClient.put(`/activities/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setActivities(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de actividad exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/ActivitiesAll");
          }
        })
        .catch((error=>{
          console.log(error);
        }));
    };
    updateActivity();
  };
    
  return (
    <>
     <FormActivities onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
    </>
  );
};

export default FormActivity;
