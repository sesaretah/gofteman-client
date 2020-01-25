import React, { Component } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Icon
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import RoleForm from "../../containers/roles/form"
import Framework7 from 'framework7/framework7.esm.bundle';


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      role : {},
      defaultRole: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);

  }


  submit(){
    var data = {id:this.state.id, title: this.state.title, default_role: this.state.defaultRole}
    MyActions.updateInstance('roles', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['roleId']) {
      MyActions.getInstance('roles', this.$f7route.params['roleId'],  this.state.token);
    }
  }


  getInstance(){
    var role = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (role && klass === 'Role'){
      this.setState({
        title: role.title,
        id: role.id,
        role: role,
        defaultRole: role.default_role
      });
    }
    console.log(role)
  }

  handleChangeValue(obj) {
console.log(obj)
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/roles/');
  }


  render() {
        const {role, defaultRole} = this.state;
    return (
      <Page>
        <Navbar title={dict.role_form} backLink={dict.back} />
        <BlockTitle>{dict.role_form}</BlockTitle>
        <RoleForm role={role} defaultRole={defaultRole} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
