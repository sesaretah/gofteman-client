import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.token = '';
    this.reason = '';
  }

  logged_in(token){
    this.token = token
    this.emit("logged_in");
  }

  not_signed_up(error){
    this.reason = error
    this.emit("sign_up_fail");
  }

  not_logged_in(error){
    console.log(error);
    this.reason = error
    this.emit("not_logged_in");
  }

  getToken() {
    return this.token
  }

  getReason() {
    return this.reason
  }


  handleActions(action) {
    switch(action.type) {
      case "SIGNUP_SUCCESS": {
        this.logged_in(action.token);
        break;
      }
      case "SIGNUP_FAIL": {
        console.log('FAIL');
        this.not_signed_up(action.error);
        break;
      }
      case "LOGIN_SUCCESS": {
        this.logged_in(action.token);
        break;
      }
      case "LOGIN_FAIL": {
        this.not_logged_in(action.error);
        break;
      }
    }
  }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
