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
  Button, Icon, Fab,Searchbar, Subnavbar, LoginScreenTitle, ListInput, ListButton, BlockFooter
} from 'framework7-react';
import { dict} from '../../Dict';
import LoginForm from "../../containers/users/Login"
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
      password: '',
    };
  }

  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }
  componentDidMount(){
    const self = this;
    self.$$('input').focusin()
  }

  submit(){
    var data = {email: this.state.email, password: this.state.password}
    MyActions.setInstance('users/login', data);
  }

  setInstance(){
    var klass = ModelStore.getKlass()
    if (klass === 'Login') {
      this.$f7router.navigate('/verification/'+this.state.email);
    }
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  render() {
    const {username, password} = this.state;
    return (
      <LoginForm submit={this.submit} handleChange={this.handleChangeValue}/>
    )
  }

}
