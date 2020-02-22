
export function loggedIn() {
  console.log('>>>>>>>>>>>>>>>>>>>>>');
    var token = window.localStorage.getItem('token');
    if (token) {
      return true
    } else {
      this.$f7router.navigate('/login/');
    }

}
