/* eslint-disable no-unused-vars */
class Router {
  /**
     * Metodo inicial.
     *
     * @return {void}.
     */
  constructor(paths) {
    // console.log(`entro a constructor con ${paths}`);
    this.paths = paths;
    // console.log(`ahora va con ${this.paths}`);
    this.initRouter();
  }

  /**
     * Permite inicializar el router
     *
     * @return {void}.
     */
  initRouter() {
    const {
      location: {
        pathname = '/',
      },
    } = window;
    console.log({pathname})
    const URI = pathname === '/' ? 'home' : pathname.replace('/', '');
    console.log({URI})
    this.load(URI);
  }

  /**
     * Permite iniciar la carga de paginas.
     *
     * @return {void}.
     */
  load(page = 'home') {
    const { paths } = this;
    const helper = paths.find(page) ? page : 'home'
    const { path, template } = paths[helper] || paths.error;
    const $CONTAINER = document.querySelector('#content');
    $CONTAINER.innerHTML = template;
    window.history.pushState({}, 'Genial', path);
  }
}
