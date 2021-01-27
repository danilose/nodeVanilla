const Auth = {
  isAuthenticated: function () {
    if ( localStorage.getItem("@token") ) {
      return true;
    }
    return false;
  },
  clearSession: function () {
    localStorage.clear();
  },
  storeSession: function (token, usuario) {
    localStorage.setItem("@token", token);
    localStorage.setItem("@usuario", usuario);
  },
  redirectToIfAuth: function (redirectTo, desiredAuth) {
    if (this.isAuthenticated() == desiredAuth) {
      window.location.replace(`/#/${redirectTo}`)
    }
  }
}


export default Auth;