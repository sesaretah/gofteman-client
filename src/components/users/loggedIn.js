import Framework7 from 'framework7/framework7.esm.bundle';
const f7: Framework7 = Framework7.instance;
export function loggedIn() {
  console.log('>>>>>>>>>>>>>>>>>>>>>');
    var token = window.localStorage.getItem('token');
    if (token) {
      return true
    } else {
      f7.navigate('/login');
    }

}
