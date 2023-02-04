import React, { useState,useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import Swal from "sweetalert2";
import FormNews from "./FormNews";

const NewsUpdate = ({match,history}) => {

  const id  = match.params.id;
  const isUpdate=true;

  const [, setNews] = useState({ 
          id:"", 
          name: "", 
          image:"",
          content:"" ,
          categoryId:"",
          type:""    
        });
    
  //DEFAULT VALUES
  useEffect(() => {
    const getNews = async () => {
      await axiosClient.get(`/news/${id}`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error=>{
        console.log(error);
      }));
    };
    getNews();
  },[id]);


  //SEND
  const handleSend = (body) => {   
    const updateNews = async () => {
      await axiosClient.put(`/news/${id}`,body)
        .then(response => {
          if (response.status===201) {
            setNews(response.data);
            Swal.fire({
              icon: "success",
              title: "Noticia actualizada !",
              timer:1000,
              showConfirmButton: false
            });
          history.push("/NewsAll");
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon:"error",
            title: "Error",
            text:error
            });
          });
    };
    updateNews();
  };
    
  return (
    <>
      <FormNews onAction={handleSend} paramsId={match} isUpdate={isUpdate}/>
    </>
  );
};

export default NewsUpdate;