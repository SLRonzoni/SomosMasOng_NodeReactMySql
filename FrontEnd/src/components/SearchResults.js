import React, { useEffect, useState } from "react";
import axiosClient from "../configuration/axiosClient";
import { formatDate } from "./helpers/FormatDate";
import './styles/searcher.css';
import './styles/news-comments.css';

function WordSearchResults({sidebar, setSidebar}) {

  const [news, setNews] = useState([]);
  const [users,setUsers]=useState([]);
  const [category,setCategory]=useState([]);
  
  let query = new URLSearchParams(window.location.search);

  let keyword = query.get("keyword");

  //SEARCH WORD
  const findKeyword = async () => {
    await axiosClient.get(`/news/byName/${keyword}`)
      .then((findKeyword) => {
        setNews(findKeyword.data);                                       
      })
      .catch((error) => console.log(error));
  };

  //FIND DATA USERS 
  const getUser=async () => {  
    const response= await axiosClient.get('/users/selectData')
    setUsers(response.data)
  };

  //FIND CATEGORY NAME
  const getCategory=async () => {  
    const response= await axiosClient.get('/categories')
    setCategory(response.data.categories)
  };

  useEffect(() => {
    getUser()
    getCategory()
  },[]);

// FIND DATA USERS AND CATEGORY NAME ( added data users to comments)
let people=[];
  for (let i = 0; i < news.length; i++) {
    for (let j = 0; j < category.length; j++) {
      category.find(function(oneCateg){
        if(category[j].id=== news[i].categoryId){
          news[i].categoryName=category[j].name
          return true;
        }
      })  
    }
  };

  for (let f = 0; f < news.length; f++) {
    for (let m = 0; m< news[f].comments.length; m++) {
      for (let g = 0; g < users.length; g++) {
        users.find(function(oneUser){
          if(users[g].id=== news[f].comments[m].user_id){
            news[f].comments[m].firstName=users[g].firstName
            news[f].comments[m].lastName=users[g].lastName
            news[f].comments[m].photo=users[g].photo
            return true;
          }
        })
      };
    } 
    people.push(news[f])
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
              <div className="containerBasic" key={oneResult.id}>
                <div className='containerSearchNews mt-4'> 
                  <div>
                    <br/>
                    <div className='d-flex MQnews'>
                      <div className='col-6 marginLeft40px'>
                        <img className='imgSearchNews'src={oneResult.image} alt='Imagen'></img>
                      </div>
                      <div className='marginRigth-80px'>
                        <div>
                          <h2> {oneResult.name} </h2>
                          <h6 className='searchAlign '>{oneResult.categoryName}</h6>
                          <br/>
                          <h4 className='searchAlign'> {oneResult.content}</h4>
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
                                  <br/>
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
