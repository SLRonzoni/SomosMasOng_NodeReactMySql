import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormMembers from "./FormMembers";

function MembersCreate(match) {
  const [,setMembers] = useState({
    name:"",
    description:"",
    image:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""
  }); 

  //SEND
  const handleSend = (body) => {
    const saveMembers = async () => {
      await axiosClient.post("/members",body)     
        .then((response) => {
          if(response) {
            setMembers(response)
            console.log(response)
            Swal.fire({
              icon: "success",
              title: "Colaborador Agregado!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./MembersAll"
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
    saveMembers();
  };

  return (
    <>
      <FormMembers onAction={handleSend} paramsId={match}/>
    </>
  );
}
export default MembersCreate;
