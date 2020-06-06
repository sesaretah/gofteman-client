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
import VerificationForm from "../../containers/users/Verification"
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
      verificationCode: '',
      email: '',
    };
  }

  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  componentDidMount(){
    this.setState({email: this.$f7route.params['email']})
  }

  submit(){
    var data = {verification_code: this.state.verificationCode}
    MyActions.setInstance('users/verify', data);
  }

  setInstance(){
    var user = ModelStore.getIntance();
    var klass = ModelStore.getKlass()
    if (user && klass == 'Verify'){
      window.localStorage.setItem('token', user.token);
      this.$f7router.navigate('/shortners/');
      window.location.reload()
    }
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  render() {
    const {username, email} = this.state;
    return (
      <VerificationForm submit={this.submit} email={email} handleChange={this.handleChangeValue}/>
    )
  }

}
