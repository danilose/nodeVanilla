import baseURL from "../../service/baseURL.js";
import Utils from '../../service/Utils.js'

let SignUp = {
  render: async () => {
    let view = `
      <div class="row mt-5 mb-5">

        <div class="col-md-6 m-auto d-flex flex-column">
          <div class="text-center mb-3">
            <h2>Junte-se a nós!</h2>
          </div>
          <img src="img/signup.png" class="img-fluid m-auto" width="80%" alt="Imagem resposiva">
        </div>

        <div class="col-md-6 m-auto">
          <form>
            <div class="mb-3">
              <label for="inputNome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="inputNome" placeholder="Seu nome">
              <div class="invalid-feedback">
                Por favor, digite seu nome.
              </div>
            </div>
            <div class="mb-3">
              <label for="inputCPF" class="form-label">CPF</label>
              <input type="text" class="form-control" id="inputCPF" placeholder="Seu CPF. Ex.: 000.000.000-00" maxlength="14">
              <div class="invalid-feedback">
                Por favor, digite um CPF válido
              </div>
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="Seu e-mail">
              <div class="invalid-feedback">
                Por favor, digite um e-mail válido
              </div>
            </div>
            <div class="mb-3">
              <label for="inputSenha" class="form-label">Senha</label>
              <input type="password" class="form-control" id="inputSenha" placeholder="Uma senha forte">
              <div class="invalid-feedback">
                Por favor, digite uma senha
              </div>
            </div>
            <div class="mb-3">
              <label for="inputSenhaVerificar" class="form-label">Confirmar Senha</label>
              <input type="password" class="form-control" id="inputSenhaVerificar" placeholder="Repita sua senha">
              <div class="invalid-feedback">
                Por favor, repita a senha
              </div>
            </div>
            <button id="submitNovoCadastro" type="button" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>

      </div>
    `;
    return view;
  },
  afterRender: async () => {

    function formValidation() {
      // RegEx CPF com pontos e hífen
      let validCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

      let validEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      let name = document.querySelector('#inputNome');
      let cpf = document.querySelector('#inputCPF');
      let email = document.querySelector('#inputEmail');
      let password = document.querySelector('#inputSenha');
      let passwordVerify = document.querySelector('#inputSenhaVerificar');

      let validation = true;

      if (name.value === '') {
        Utils.inputInvalid(name);
        validation = false;
      } else {
        Utils.inputValid(name);
      }

      if (cpf.value === '') {
        Utils.inputInvalid(cpf);
        validation = false;
      } else {
        if (validCPF.test(cpf.value) === false) {
          Utils.inputInvalid(cpf);
          validation = false;
        } else {
          Utils.inputValid(cpf);
        }
      }

      if (email.value === '') {
        Utils.inputInvalid(email);
        validation = false;
      } else {
        if (validEmail.test(email.value) === false) {
          Utils.inputInvalid(email);
          validation = false;
        } else {
          Utils.inputValid(email);
        }
      }

      if (password.value === '') {
        Utils.inputInvalid(password);
        validation = false;
      } else {
        Utils.inputValid(password);
      }

      if (passwordVerify.value === '') {
        Utils.inputInvalid(passwordVerify);
        validation = false;
      } else {
        if (password.value !== passwordVerify.value) {
          Utils.inputInvalid(passwordVerify);
          validation = false;
        } else {
          Utils.inputValid(passwordVerify);
        }
      }

      return validation;

    }

    // adiciona a máscara do CPF
    VMasker(document.querySelector("#inputCPF")).maskPattern("999.999.999-99");

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', formValidation);
    });

    // adiciona o click do botão Cadastrar
    document.querySelector('#submitNovoCadastro').addEventListener('click', () => {

      if (formValidation()) {
        let newUser = {
          cpf: cpf.value.replace(/\D/g, ''), // deixa só números
          login: email.value,
          nome: name.value,
          senha: password.value,
        };

          axios.post(`${baseURL}/usuarios`, newUser).then( res => {

            localStorage.setItem('@token', res.data.token);
            sessionStorage.setItem('@token', res.data.token);
            Cookies.set('@token', res.data.token, {
              expires: 1
            });

          });

        // axios.post(loginURL,{
        //     usuario: userLogin,
        //     senha: passwordVal
        // }).then( res => {
        //     if (res.status == 200 ){
        //         window.location.replace('#/dashboard')
        //         localStorage.setItem('@token', res.data.token)
        //         localStorage.setItem('userDataAccount', JSON.stringify(res.data))
        //     }


        // }).catch( function(err){
        //     let res = err.response
        //     let message = res.data.error
        //     console.log('Erro: ', err)
        //     console.log('Response: ', res)
        //     console.log('Response.data: ', res.data)
        //     alert(`
        //             Não foi possível realizar o login:
        //             -> ${message}

        //             Verifique os dados e tente novamente.`)
        // })



      }
    });
  }
}

export default SignUp;