import Auth from '../../service/Auth.js';
import logoImg from '../../img/logo.png';

let Header = {
  render: async () => {
    let header = `
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container m-auto" width="100%">
          <a class="navbar-brand" href="#">
            <img src=${logoImg} class="img-fluid" width="200px" alt="">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Home</a>
              </li>
              ${
                (!Auth.isAuthenticated()) ?
                `
                <li class="nav-item">
                  <a class="nav-link" href="#/login">Entrar</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#/signup">Cadastrar</a>
                </li>
                ` : ``
              }
              ${
                (Auth.isAuthenticated()) ?
                `
                <li class="nav-item">
                  <a class="nav-link" href="#/dash">Dashboard</a>
                </li>
                <li class="nav-item">
                  <button id="btnLogout" class="nav-link btn btn-link">Logout</button>
                </li>
                ` : ``
              }
              <li class="nav-item">
                <a class="nav-link" href="#/404">404</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
    return header;
  },
  afterRender: async () => {
    const btnLogout = null || document.querySelector('#btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        Auth.clearSession();
        window.location.replace('/#/login');
      });
    }
  }

}

export default Header;