import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormRoles from "./FormRoles";

function RoleCreate(match) {
  const [setRoles] = useState({
    name: "",
    description:""        
  });

  //SEND
  const handleSend= (body) => {
    const saveRoles = async () => {
      await axiosClient.post("/roles",body)     
        .then((response) => {
          if(response.status===201) {
            setRoles(response.data)
            Swal.fire({
              icon: "success",
              title: "Role Agregado!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./RolesAll"
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
    saveRoles();
  };

  return (
      <>
        <FormRoles onAction={handleSend} paramsId={match}/>
      </>
  );

}
export default RoleCreate;