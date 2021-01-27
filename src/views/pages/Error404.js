let Error404 = {
  render: async () => {
    let view = `
      <div class="text-center">
        <img src="img/error.png" alt="Ooops, houve um erro." style="width: 40%;">
        <h1 class="mt-2">Ooops, houve um erro.</h1>
      </div>
    `;
    return view;
  },
  afterRender: async () => {

  }
}

export default Error404;