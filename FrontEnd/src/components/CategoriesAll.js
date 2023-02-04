import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import CategoriesAllLine from './CategoriesAllLine';
import Swal from "sweetalert2";
import { Link, Redirect} from "react-router-dom";
import LoadingBox from "./LoadingBox";
import { OrderNameAsc } from "./helpers/Order";
import * as FaIcons from 'react-icons/fa';

const CategoriesAll = (props) => { 

  const [categories, setCategories] = useState([]); 
  
  const getCategories = async () => {     
     await axiosClient.get(`/categories`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
        props.history.push('/');
        } 
        setCategories(response.data.categories);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar esta categoría ? ",
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
    await axiosClient
      .delete(`/categories/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Categoría Eliminada !",
          timer:1000,
          showConfirmButton: false
        });
        getCategories();
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error : No se puede eliminar",
          text: error
        });
     });
  };

  useEffect(() => {
    getCategories()
  },[]);


   //FILTER BY ID
    let filterBy;
    const getFilterCategoryByName = async () => {
        await axiosClient
        .get(`/categories/byName/`+filterBy)
        .then((response) => {
          setCategories([response.data])
        })
        .catch(function (error) {
          console.log(error)
        });
    };
  
    const changesId=(e)=>{
        filterBy=e.target.value;
        if(filterBy === 'todas'){
          getCategories() 
        } else {
          getFilterCategoryByName()   
    };
  };

 
  const showCategories = () => {
    return (
      <tbody >
        {categories.map((oneCategory) => (
          <CategoriesAllLine 
            key={oneCategory.id}
            id={oneCategory.id}
            name={oneCategory.name}
            image={oneCategory.image}
            description={oneCategory.description}
            create={oneCategory.createdAt}
            update={oneCategory.updatedAt}
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
      {/* para proteger ruta , si no hay token, redirige a login*/}
      {!token && <Redirect to="/Login" />} 

      {/* si aun está cargando categorias*/}
      {!categories &&  <LoadingBox/> }

       {/* solo renderiza si hay categorias*/}
      {categories && 
      <>
      <div className="m-5">
        <div className="headsPage">
          <h3>Listado de Categorías</h3>    
          <div className="flex-Center">
            <div>
                <select
                  type="text"
                  name="categoryId"
                  onChange={changesId}
                  className="m-3 selectBtnDesplegable form-select"
                >  
                  {categories.map(oneCategory => (
                    <option className="colorBlack" key={oneCategory.id} value={oneCategory.name}>
                      {oneCategory.name}
                    </option>
                  )).sort(OrderNameAsc(categories))}
                  <option className="colorBlack"value={"todas"}>Mostrar categorías (por nombre)</option>
                </select>
            </div> 
          </div> 
        </div>
        <div>
          <table className="table table-responsive table-bordered">
            <thead className="table-head table-bordered">
              <tr>
                <th> Id </th>
                <th className="MQimageChar"> Imágen </th>
                <th> Categoría </th>
                <th className="MQcontent"> Descripción </th>
                <th className="MQcreated"> Creado</th>
                <th className="MQupdated"> Actualizado </th>

                <th className="centerText" >
                  <Link to={'/CategoriesCreate'} className="m-1">
                    <FaIcons.FaPlusSquare className="iconBlue"/> 
                  </Link> 
                </th>
              </tr>
            </thead>
            {showCategories()}
          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default CategoriesAll;
