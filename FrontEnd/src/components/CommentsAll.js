import React, {useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/news-comments.css";
import "./styles/table.css";
import CommentsAllLine from './CommentsAllLine';
import {Redirect} from "react-router-dom";
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { OrderNameAsc } from "./helpers/Order";

const CommentsAll = (props) => { 

  const [commentsWithNames, setCommentsWitNames] = useState(""); 
  const [commentComplete, setCommentComplete] = useState(""); 

  // FIND USER NAME ( added name to comments state)
  const getCommentsWithNames=async () => {   
    for(let j=0;j<commentComplete.length;j++) {
      let idUser=commentComplete[j].user_id
      let resp=await axiosClient.get(`/users/${idUser}`)
        if(resp.data.id===idUser){
          commentComplete[j].firstName=resp.data.firstName
          commentComplete[j].lastName=resp.data.lastName 
        }      
    }
  };

  const getCommentsOnly = async () => {     
    await axiosClient.get('/comments')
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setCommentsWitNames(response.data.data)  
        setCommentComplete(response.data.data)  
        getCommentsWithNames()     
      })
      .catch(function (error) {
        console.log(error)
      }); 
  };
 
  useEffect(() => {
    getCommentsOnly()   
  },[]);

console.log('complete',commentComplete)
console.log('with',commentsWithNames)
  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este comentario ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar !",
    })
    .then((result) => {
      if (result.value) {
        removing(id);
      }
    });
  };

  const removing = async (id) => {
    await axiosClient.delete(`/comments/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Comentario eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getCommentsOnly();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };
 
  //FILTER BY ID
  let filterBy;
  const getFilterCommentsUser = async () => {
      await axiosClient.get(`/comments/byUser/`+filterBy)
      .then((response) => {
        setCommentsWitNames(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  };

  const changesId = (e) => {
    filterBy = e.target.value;
    if (filterBy === "todos") {
      getCommentsOnly();
    } else {
      getFilterCommentsUser();
    }
  };
  

  const showComments = () => {
    return (
      <tbody> 
        {commentsWithNames.map((oneComment) => (
          <CommentsAllLine 
            key={oneComment.id}
            id={oneComment.id}
            body={oneComment.body}
            user_id={oneComment.user_id}
            firstName={oneComment.firstName}
            lastName={oneComment.lastName}
            news_id={oneComment.news_id}
            create={oneComment.createdAt}
            update={oneComment.updatedAt}
            remove={confirmRemove}
            />
        ))}       
      </tbody>      
    );
  };

  let token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <>
    <div className="containerFirst">  
      {!token && <Redirect to="/Login" />} 
      {!commentsWithNames &&  <LoadingBox/> }
      {commentsWithNames &&
      <>
      <div className="m-5">
        <div className="headsPage">
        <h3>Listado de Comentarios</h3>  
        <div className="flex-Center" >
          <div>
              <select
                type="text"
                name="user_id"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {commentsWithNames.map(oneComment => (
                  <option className="colorBlack" key={oneComment.user_id} value={oneComment.user_id}>
                   {oneComment.user_id} {oneComment.firstName} {oneComment.lastName}
                  </option>
                )).sort(OrderNameAsc(commentsWithNames))}
                <option className="colorBlack" value={"todos"}>Mostrar comentarios (por usuario)</option>
              </select>
          </div> 
        </div> 
        </div>
 
        <div>
          <table className="table table-responsive table-bordered">
            <thead className="table-head table-bordered">
              <tr>
                <th> Id </th>
                <th> Comentario </th>
                <th className="MQnews"> Noticia </th>
                <th className="MQuser"> Usuario </th>
                <th className="MQcreated"> Creado</th>
                <th className="MQupdated"> Actualizado </th>
                <th> </th>
              </tr>
            </thead>

            {showComments()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default CommentsAll;