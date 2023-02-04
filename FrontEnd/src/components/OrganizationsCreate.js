import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormOrganizations from "./FormOrganizations";

function OrganizationsCreate(match) {

  const [, setOrganizations] = useState({ 
    id:"", 
    name: "", 
    image:"",
    address:"",
    phone:"",
    email:"",
    welcomeText:"",
    aboutUsText:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""
  });
  
  //SEND
  const handleSend = (body) => {
    const saveOrganizations = async () => {
      await axiosClient.post("/organization",body)     
        .then((response) => {
          if(response.status===201) {
            setOrganizations(response.data)
            Swal.fire({
              icon: "success",
              title: "Organization Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./OrganizationsAll"
            }, 1000);
          }
        })
        .catch(function (error) {
          Swal.fire({
          icon:"error",
          title: "Error"
          });
        });
    };
    saveOrganizations();
  };
 
  return (
        <>
          <FormOrganizations onAction={handleSend} paramsId={match}/>
        </>
  );

}
export default OrganizationsCreate;