import React, { useState} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormRoles from "./FormRoles";

const RolesUpdate = ({match,history}) => {

  const id  = match.params.id;
  const isUpdate=true;

  const [,setRoles] = useState({ 
          id:"", 
          name: "", 
          description:""          
  });
 
  //SEND
  const handleSend = (body) => {    
    const updateRole = async () => {
      await axiosClient.put(`/roles/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setRoles(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de role exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/RolesAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateRole();
  };
  
  return (
  <>
    <FormRoles onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
  </>
  );
};

export default RolesUpdate;
