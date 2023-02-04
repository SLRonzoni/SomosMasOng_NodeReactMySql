import React, { useState } from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormNews from "./FormNews";

function NewsCreate(match) {
  const [,setNews] = useState({
    name: "",
    content:"",
    image:"" ,
    categoryId:"",
    type:""    
  });

  //SEND
  const handleSend = (body) => {
    const saveNews = async () => {
      await axiosClient.post("/news",body)     
        .then((response) => {
          if(response.status===201) {
            setNews(response.data)
            Swal.fire({
              icon: "success",
              title: "Noticia Agregada!",
              timer:1000,
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.href="./NewsAll"
            }, 1000);
          }
        })
        .catch(function (error) {
          Swal.fire({
          icon:"error",
          title: "Error",
          });
        });
    };
    saveNews();
  };

  return (
    <>
    <FormNews onAction={handleSend} paramsId={match}/>
    </>
  );

}
export default NewsCreate;