import React, { useState} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormOrganizations from "./FormOrganizations";

const OrganizationsUpdate = ({match,history}) => {

  const id  = match.params.id;
  const isUpdate=true;

  const [, setOrganizations] = useState({ 
          id:"", 
          name: "", 
          image:"",
          address:"",
          phone:"",
          email:"",
          welcomeText:"",
          aboutUsText:"" ,
          facebookUrl:"",
          linkedinUrl:"",
          instagramUrl:""         
        });
    
  //SEND
  const handleSend = (body) => {         
    const updateOrganizations = async () => {
      await axiosClient.put(`/organization/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setOrganizations(response.data.organization);
            Swal.fire({
              icon: "success",
              title: "Actualización de organización exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/OrganizationsAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateOrganizations();
  };
    
//FORM
return (
    <>
      <FormOrganizations onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
    </>
  );
};

export default OrganizationsUpdate;
