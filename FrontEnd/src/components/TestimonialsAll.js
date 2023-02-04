import React, { useState, useEffect} from "react";
import axiosClient from "../configuration/axiosClient";
import "./styles/styles.css";
import "./styles/table.css";
import TestimonialsAllLine from "./TestimonialsAllLine";
import Swal from "sweetalert2";
import LoadingBox from "./LoadingBox";
import { Redirect} from "react-router-dom";
import { formatDate } from "./helpers/FormatDate";
import { OrderNameAsc } from "./helpers/Order";


const TestimonialsAll = (props) => { 

  const [testimonials, setTestimonials] = useState([]); 
  
  const getTestimonials = async () => {     
     await axiosClient.get(`/testimonials/public`)
      .then( response => {
        if(response.status!==200){
          Swal.fire({
            icon: 'error', 
            title:"Error !",
              text: response.message || response.error.message
          });
          
        props.history.push('/');
        }
        setTestimonials(response.data.data);   
      }) 
      .catch(function (error) {
        console.log(error)
      });
  };

  //DELETE
  const confirmRemove = (id) => {
    Swal.fire({
      title: "Está seguro de eliminar este testimonio ? ",
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
    await axiosClient.delete(`/testimonials/${id}`)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Testimonio eliminado !",
          timer:1000,
          showConfirmButton: false
        });
        getTestimonials();
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
    getTestimonials()
  },[]);


  //FILTER BY NAME AND CREATED DATE
  let filterBy;
  let route;
  const getFilterTestimonials = async () => {
    if(filterBy.includes(':')===true){
      route='/testimonials/public/byDate/'
    } else {
      route='/testimonials/public/byName/'
    };
    await axiosClient.get(route+filterBy)
    .then((response) => {
      setTestimonials(response.data)
    })
    .catch(function (error) {
      console.log(error)
    });
  };
  
    const changesId=(e)=>{
      filterBy=e.target.value;
      if(filterBy === 'todos'){
        getTestimonials() 
      } else {
        getFilterTestimonials()   
    };
  } 

 
  const showTestimonials = () => {
    return (
      <tbody >
        {testimonials.map((oneTestimonial) => (
          <TestimonialsAllLine 
            key={oneTestimonial.id}
            id={oneTestimonial.id}
            name={oneTestimonial.name}
            image={oneTestimonial.image}
            content={oneTestimonial.content}
            userId={oneTestimonial.userId}
            create={oneTestimonial.createdAt}
            update={oneTestimonial.updatedAt}
            remove={confirmRemove}
            />
        ))}
      </tbody>
    );
  };

  const token=JSON.parse(sessionStorage.getItem('token'))//para proteger ruta

  return (
    <>
     <div className="containerFirst"> 
      {!token && <Redirect to="/Login" />}  
      {!testimonials &&  <LoadingBox/> }
      {testimonials && 
      <>
      <div className="m-5">
        <div className="headsPage">
        <h3>Listado de Testimonios</h3>  
        <div className="flex-Center MQselectButtons">
          <div>
              <select 
                className="m-3 selectBtnDesplegable form-select "
                type="text"
                name="name"
                onChange={changesId}
              > 
                {testimonials.map(oneTestimonial => (
                  <option className="colorBlack" key={oneTestimonial.id} value={oneTestimonial.name}>
                    {oneTestimonial.name}
                  </option>
                )).sort(OrderNameAsc(testimonials))}
                <option className="colorBlack" value={"todos"}>Mostrar testimonios (por nombre)</option>
              </select>
          </div> 
          
          <div>
              <select
                type="text"
                name="name"
                onChange={changesId}
                className="m-3 selectBtnDesplegable form-select "
              >  
                {testimonials.map(oneTestimonial => (
                  <option className="colorBlack" key={oneTestimonial.id} value={oneTestimonial.createdAt}>
                    {formatDate(new Date(oneTestimonial.createdAt))}
                  </option>
                ))}
                <option className="colorBlack" value={"todos"}>Mostrar testimonios (por creación)</option>
              </select>
          </div>
        </div> 
        </div> 
        <div>
          <table className="table table-responsive table-bordered" >
          <thead className="table-head table-bordered">
              <tr>
                <th> Id </th>
                <th className="centerText MQimageCharTestim"> Imágen </th>
                <th className="MQtestim"> Testimonio </th>
                <th> Contenido </th>
                <th> userId </th>
                <th className="MQcreatedTestim"> Creado</th>
                <th className="MQupdatedTestim"> Actualizado</th>
                <th></th>
              </tr>
            </thead>

            {showTestimonials()}

          </table>
        </div>
      </div>
      </>
      } 
      </div>
    </>
  );
};

export default TestimonialsAll;
