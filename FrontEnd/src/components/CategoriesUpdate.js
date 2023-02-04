import React, { useState} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormCategories from "./FormCategories";

const CategoriesUpdate = ({match,history}) => {

  const id  = match.params.id;
  const isUpdate=true;
 
  const [, setCategories] = useState({ 
          id:"", 
          name: "", 
          image:"",
          description:""        
  });
    
  //SEND
  const handleSend = (body) => {     
    const updateCategory = async () => {
      await axiosClient.put(`/categories/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setCategories(response.data);
            Swal.fire({
              icon: "success",
              title: "Actualización de categoría exitosa !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/CategoriesAll");
          } 
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error"
            });
          });
    };
    updateCategory();
  };
  
  return (
    <>
     <FormCategories onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
    </>
  );
};

export default CategoriesUpdate;
