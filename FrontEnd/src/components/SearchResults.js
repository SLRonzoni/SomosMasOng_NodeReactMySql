import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";
import './styles/searcher.css';
import './styles/news-comments.css';

function WordSearchResults() {

  const [news, setNews] = useState([]);
  const [users,setUsers]=useState([]);
  
  let query = new URLSearchParams(window.location.search);

  let keyword = query.get("keyword");

  //SEARCH WORD
  const findKeyword = async () => {
    await axiosClient
      .get(`/news/byName/${keyword}`)
      .then((findKeyword) => {
        setNews(findKeyword.data);                                       
      })
      .catch((error) => console.log(error));
  };

  
  //FIND CATEGORY NAME ( added name to news state)
  const findCategoryName = async () => {
    for (let i = 0; i < news.length; i++) {
      let idCategory = news[i].categoryId;
      await axiosClient
        .get(`/categories/public/${idCategory}`)
        .then((response) => {       
          news[i].categoryName = response.data.name || "";
        })
        .catch((error) => console.log(error));
    }
  };
  findCategoryName();

  //FIND DATA USERS 
  const getUser=async () => {  
    const response= await axiosClient.get('/users/selectData')
    setUsers(response.data)
  };

  useEffect(() => {
      getUser()
  },[]);

  // FIND DATA USERS  ( added data users to comments)
  let people=[];
  for (let i = 0; i < news.length; i++) {
    for (let m = 0; m< news[i].comments.length; m++) {
      for (let j = 0; j < users.length; j++) {
        const people=users.find(function(oneUser){
          if(users[j].id=== news[i].comments[m].user_id){
            news[i].comments[m].firstName=users[j].firstName
            news[i].comments[m].lastName=users[j].lastName
            news[i].comments[m].photo=users[j].photo
            return true;
          }
        })
      };
    }
    console.log('nicm',news[i])
    people.push({...news[i]})
  };
   
  useEffect(() => { 
    findKeyword();
  }, [keyword]);

  return (
    <>   
      <div className='containerFirst'>
        <div className="searcherMsg"> 
          <h4 className="h4Searcher"><em>Palabra buscada</em> : {keyword}</h4>       
            {people.length===0 && <h5 className="mt-4">☹️ No se hallaron resultados  </h5>}
        </div>

        <div className="mt-5">         
          {people.map((oneResult) => {
            return (
              <div className="containerBasic"key={oneResult.id}>
                <div className='containerSearchNews mt-4'> 
                  <div>
                    <br></br>
                    <div className='d-flex'>
                      <div className='col-6 marginLeft40px'>
                        <img className='imgSearchNews'src={oneResult.image} alt='Imagen'></img>
                      </div>

                      <div className='col-6 marginRigth-80px '>
                        <div>
                          <h2> {oneResult.name} </h2>
                          <h5 className='searchAlign '>( {oneResult.categoryName} )</h5>
                          <br></br>
                          <h4 className='searchAlign '> {oneResult.content}</h4>
                        </div>

                        <br/>
                        <div>
                          {oneResult.comments.length===0 && 
                              <div className="userComments" >
                                <span>sin comentarios</span>
                              </div>
                          }
                           
                          {oneResult.comments.map((oneComment) => {
                            return (
                              <>
                              <div className="userComments" key={oneComment.id}>
                                <div>
                                  <img className='imageComment' src={oneComment.photo} alt="user"></img>
                                  <span className=''> {oneComment.firstName} {oneComment.lastName}</span>
                                </div>
                                <div>                              
                                  <br></br>
                                  <span >{oneComment.body}</span>
                                  <span className='dateComment'> {formatDate(new Date(oneComment.createdAt))}</span>
                                </div>
                              </div>
                              <br/>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div> 
      </div>
    </>
  );
}

export default WordSearchResults;
