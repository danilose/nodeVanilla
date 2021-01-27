import Auth from '../../service/Auth.js';
import baseURL from '../../service/baseURL.js';

let requestDashboard = () => {
  let { login } = JSON.parse(localStorage.getItem('@usuario'));
  axios.get(`${baseURL}/lancamentos/planos-conta?login=${login}`, {
    headers: {
      Authorization: localStorage.getItem('@token')
    }
  }).then(res => {

    let returnData = res.data;

    returnData.map( item => {
      let { descricao } = item;
      console.log(descricao);
    });

  });
}

let Dash = {
  render: async () => {
    Auth.redirectToIfAuth('login', false);

    let { nome, login } = JSON.parse(localStorage.getItem('@usuario'));

    let dataDash = await axios.get(`${baseURL}/lancamentos/planos-conta?login=${login}`, {
      headers: {
        Authorization: localStorage.getItem('@token')
      }
    }).then( res => res.data );

    let view = `
      <div class="row mb-2">
        <div class="col">
          <h2>Olá, ${nome}. Bem-vindo de volta!</h2>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src="img/bootstrap-icons.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${dataDash[0].descricao}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="img/bootstrap-icons.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${dataDash[1].descricao}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="img/bootstrap-icons.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row row-cols-1 g-4 mt-2">
        <div class="col">
          <div class="card">
            <div class="card-header">
              Featured
            </div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    return view;
  },
  afterRender: async () => {

  }
}

export default Dash;