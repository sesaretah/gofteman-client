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
    MyActions.setInstance('users/validate_token', {}, this.$f7route.params['token']);
  }

  setInstance() {
    var user = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (klass === 'Validate') {
      window.localStorage.setItem('token', user.token);
      this.$f7router.navigate('/tasks/');
      window.location.reload()
    } else {
      this.$f7router.navigate('/login_error/');
      window.location.reload()
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
