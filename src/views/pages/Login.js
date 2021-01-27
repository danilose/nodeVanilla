import baseURL from "../../service/baseURL.js";
import Auth from '../../service/Auth.js';
import Utils from '../../service/Utils.js'

let Login = {
  render: async () => {
    Auth.redirectToIfAuth('dash', true);
    let view = `
      <div class="row mt-5 mb-5">

        <div class="col-md-6 m-auto d-flex pb-3">
          <img src="img/login.png" class="img-fluid m-auto" width="80%" alt="Imagem resposiva">
        </div>

        <div class="col-md-6 m-auto">
          <div class="text-center mb-3">
            <h2>Bem-vindo de volta!</h2>
          </div>
          <form>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="Seu e-mail cadastrado">
              <div class="invalid-feedback">
                Por favor, digite o e-mail cadastrado
              </div>
            </div>
            <div class="mb-3">
              <label for="inputSenha" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputSenha" placeholder="Sua senha">
              <div class="invalid-feedback">
                Por favor, digite sua senha
              </div>
            </div>
            <button id="submitLogin" type="button" class="btn btn-primary">Entrar</button>
          </form>
        </div>

      </div>
    `;
    return view;
  },
  afterRender: async () => {

    function formValidation() {

      let email = document.querySelector('#inputEmail');
      let password = document.querySelector('#inputSenha');

      let validation = true;

      if (email.value === '') {
        Utils.inputInvalid(email);
        validation = false;
      } else {
        Utils.inputValid(email);
      }

      if (password.value === '') {
        Utils.inputInvalid(password);
        validation = false;
      } else {
        Utils.inputValid(password);
      }

      return validation;

    }

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', formValidation);
    });

    document.querySelector('#submitLogin').addEventListener('click', () => {

      if (formValidation()) {
        let email = document.querySelector('#inputEmail');
        let password = document.querySelector('#inputSenha');

        let loginUser = {
          // usuario: email.value,
          usuario: 'dmorais',
          // senha: password.value,
          senha: '123456',
        };

        axios.post(`${baseURL}/login`, loginUser).then( res => {

          if (res.status == 200) {

            let { token, usuario } = res.data;
            Auth.storeSession(token, JSON.stringify(usuario))
            window.location.replace('/#/dash')

          } else {
            // trocar por modal
            alert('Usuário ou senha inválidos')
          }
        });
      }
    });
  }

}

export default Login;