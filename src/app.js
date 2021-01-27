import Footer from './views/components/Footer.js';
import Header from './views/components/Header.js';

import Home from './views/pages/Home.js'
import Dash from './views/pages/Dash.js'
import Login from './views/pages/Login.js'
import SignUp from './views/pages/SignUp.js'
import Error404 from './views/pages/Error404.js'

import Utils from './service/Utils.js'

let routes = {
  '/': Home,
  '/dash': Dash,
  '/login': Login,
  '/signup': SignUp,
}

// roteador, seleciona a página a ser exibida de acordo com a url
const router = async () => {
  let request = Utils.parseRequestURL();
  let parseURL = ( request.resource ? '/' + request.resource : '/' ) + ( request.verb ? '/' + request.verb : '');

  let page = routes[parseURL] ? routes[parseURL] : Error404;

  // monta e carrega o header da página
  const header = null || document.querySelector('#header');
  header.setAttribute('class', 'align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm');
  header.innerHTML = await Header.render();
  await Header.afterRender();

  // monta e carrega a página
  const container = null || document.querySelector('#container');
  let loadingPage = `
    <div class="d-flex justify-content-center full">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  container.innerHTML = loadingPage;
  container.setAttribute('class', 'container mb-5');
  container.innerHTML = await page.render();
  // debugger;
  await page.afterRender();

  // monta e carrega o footer da página
  const footer = null || document.querySelector('#footer');
  footer.setAttribute('class', 'd-flex justify-content-center fixed-bottom align-middle bg-light');
  footer.innerHTML = await Footer.render();
  await Footer.afterRender();

}

// observar as mudanças na url
window.addEventListener('hashchange', router);

// observa carregamento da página
window.addEventListener('load', router);

