import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormCategories from "./FormCategories";

function CategoriesCreate(match) {  
  const [,setCategories] = useState({
    name: "",
    description:"",
    image:""        
  });

  //SEND
  const handleSend = (body) => {
    const saveCategories = async () => {
      await axiosClient.post("/categories/",body)     
        .then((response) => {
          if(response.status===201) {
            setCategories(response.data)
            Swal.fire({
              icon: "success",
              title: "Categoría Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./CategoriesAll"
            }, 1000);
          }
        })
        .catch(function (error) {
          Swal.fire({
          icon:"error",
          title: "Error !"
          });
        });
    };
    saveCategories();
  };

  return(
         <>
          <FormCategories onAction={handleSend} paramsId={match}/>
         </>
        );
};
export default CategoriesCreate;