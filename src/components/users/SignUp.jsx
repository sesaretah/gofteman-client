import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button, Icon, Fab, Searchbar, Subnavbar, LoginScreenTitle, ListInput, ListButton, BlockFooter
} from 'framework7-react';
import { dict } from '../../Dict';
import SignUpForm from "../../containers/users/SignUp"
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import Framework7 from 'framework7/framework7.esm.bundle';

export default class extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.setInstance = this.setInstance.bind(this);

    this.state = {
      email: '',
      name: '',
      surename: '',
      faculty: '',
      password: '',
      password_confirmation: ''
    };
  }

  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit() {

    var data = { email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation, name: this.state.name, surename: this.state.surename , faculty: this.state.faculty}
    if (
      (this.state.email && this.state.email.length > 0) &&
      (this.state.name && this.state.name.length > 0) &&
      (this.state.surename && this.state.surename.length > 0) 
      ) {
      MyActions.setInstance('users/sign_up', data);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }
  }

  setInstance() {
    var user = ModelStore.getIntance();
    if (user) {
      //window.localStorage.setItem('token', user.token);
    }
    const self = this;
    this.$f7router.navigate('/verification/');
    window.location.reload()
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  render() {
    const { username, password } = this.state;
    return (
      <SignUpForm submit={this.submit} handleChange={this.handleChangeValue} />
    )
  }

}
