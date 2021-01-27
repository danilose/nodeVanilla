let Home = {
  render: async () => {
    let view = `
      <div class="row mt-5 mb-5">

        <div class="col-md-6 m-auto">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div class="col-md-6 m-auto text-center">
          <img src="../../img/home.png" class="img-fluid m-auto" width="80%" alt="Imagem resposiva">
        </div>

      </div>
    `;
    return view;
  },
  afterRender: async () => {

  }
}

export default Home;