💻 Proyecto personal 💻
Deploy realizado en forma personal

Se trata de una web para Somos Más Ong, una organización sin fines de lucro, que solicitó una web donde se pueda presentar la organización, aceptar donaciones, mostrar actividades, miembros que la componen y establecer contacto con usuarios registrados y público en general.

🏷️ Frontend

🌐 Deploy https://somos-mas-deploy-frontend.vercel.app

          Usuarios de prueba : usuario regular ..........test_user_1296093997@testuser.com      
                               usuario administrador.....test_admin@gmail.com
                               
                               password para ambos 1234test


Interfaz desarrollada en forma personal. La diseñé con una vista sencilla, desestructurada, con imágen y color, que recuerdan a los dibujos animados. Tiene diseño responsive.

Desarrollada con : con React JS, Html, Css y Bootstrap

Validaciones : los formularios están validados con Formik

Integraciones : Plataforma de pagos STRIPE con pago en U$S por tarjeta de crédito, Plataforma de pagos MERCADO PAGO con pagos en AR$ en distintos medios de pago,                    Login con GOOGLE

Funcionalidades : 

* Se contemplaron diferentes funcionalidades para usuarios administrador y usuarios regulares. Segun el role, se 
  muestran distintas opciones de vista y funciones.
* La pantalla de inicio, tiene links al mapa de ubicación de la ong, Facebook e Instagram, e email de contacto.
* Se puede hacer el login desde la plataforma o mediante Google.
* La barra de navegación es vertical, se puede ocultar y muestra solo lo permitido para el role logueado, y si es     
  público en general ( sin logueo ) tiene una opción de vista con items especiales.
* En el caso de los administradores, las vistas son tipo listado, con botones para agregar, modificar, eliminar y 
  con botones desplegables para usar filtros de búsqueda. 
* El el caso de los demás roles, son vistas tipo card, de solo lectura, con botones desplegables para usar filtros de 
  búsqueda. 
* Los usuarios logueados tienen opción de modificar su perfil, hacer donaciones con distintas plataformas de pago, 
  enviar emails de contacto, dar testimonios, etc.

🏷️ Backend

🌐 Deploy https://somos-mas-deploy-backend.vercel.app

          rutas de ejemplo : https://somos-mas-deploy-backend.vercel.app/categories
                             https://somos-mas-deploy-backend.vercel.app/testimonials/public
                                     
                  
Api base desarrollada grupalmente en mi grupo de aceleración de Alkemy Node JS. 

Realicé varias modificaciones, agregué funcionalidades, rutas, etc, a fin de adaptarla al proyecto final

Desarrollada con : Node JS, Express y Sequeliz

Base de datos : MySql

Envío de emails con : Sengrid y Ejs como motor de plantillas

Manejo de imágenes con : Aws S3

Documentación : Swagger 

Tests : MOCHA Y CHAI - 234 tests aprobados en una base de datos paralela para no afectar la base original , POSTMAN - 94 tests aprobados, con manejo de entorno y variables globales
