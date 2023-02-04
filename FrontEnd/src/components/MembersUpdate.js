import React, { useState} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormMembers from "./FormMembers";

const MembersUpdate = ({match, history}) => {

  const id = match.params.id;
  const isUpdate=true

  const [,setMembers] = useState({
    id: "",
    name: "",
    image:"",
    description:"",
    facebookUrl:"",
    instagramUrl:"",
    linkedinUrl:""
  });

  //SEND
  const handleSend = (body) => {   
    const updateMember = async () => {
      await axiosClient
        .put(`/members/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setMembers(response.data);
            Swal.fire({
              icon: "success",
              title: "Colaborador actualizado !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/MembersAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateMember();
  };
   
  return (
      <>
        <FormMembers onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
      </>
  );
};

export default MembersUpdate;