    import './app/firebase.js';
    import './app/register.js';
// import './addEventListener.js';
    import './app/facebookrg.js';
// import './js/router.js';
// import './js/routes.js';

// // Este es el punto de entrada de tu aplicacion
// import { loadHome } from './lib/index.js';

// loadHome();
// main.js debe ser el punto de salida de nuestra aplicación, acá conectamos la lógica con lo que se imprime en pantalla. se invoca o manda a ejecutar
 // construimos una variable routes que contiene un objeto el cuál contiene las rutas que debe renderizar, vamos a buscar que renderice nuestras variables con un template string
 //importamos las funciones que estamos creando en cada carpeta de los componentes para que se encuentren disponibles y se puedan renderizar
 import { Home } from './components/Home.js';
 import { Register } from './components/registerRouter.js';
 import { Login } from './components/Login.js';

 
 const rootDiv = document.getElementById('root');

 const routes = {
    '/': Home,
    '/register': Register,
    '/login': Login
 };

 const component = routes[window.location.pathname];
 // Crear una función para que recargue y le diga al navedador de dónde partir
 //debemos resetear el contenido del router.
 rootDiv.innerHTML = " "
 rootDiv.appendChild(component());

//  //creamos una función que espera una ruta que consume el objeto window.history.pushState
//   const onNavigate = (pathname)=>{
//     window.history.pushState(
//         {},
//         pathname,
//         window.location.origin+pathname,
//     );
//     root.appendChild(routes[pathname]());
//   };

  
 