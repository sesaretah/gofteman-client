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
  Icon, Fab
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import RoleShow from "../../containers/roles/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.state = {
      role: null,
      id: null,
      users: null,
      user_id: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
      MyActions.getInstance('roles', this.$f7route.params['roleId']);
      MyActions.getList('users', this.state.page);
  }

  getInstance(){
    var role = ModelStore.getIntance()
    if (role){
      this.setState({
        role: role,
        id: role.id
      });
    }
    console.log(role);
    }

    getList() {
      var users = ModelStore.getList()
      if (users){
        this.setState({
          users: users,
        });
      }
    }

    submit(){
      var data = {role_id: this.state.id, user_id: this.state.user_id}
      MyActions.setInstance('assignments', data);
    }

    handleChangeValue(obj) {
      this.setState(obj);
    }

  fab(){
    if (this.state.role){
      return(
        <Fab href={"/roles/"+this.state.role.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const {role, users} = this.state;
    return (
      <Page>
        <Navbar title={dict.roles} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <RoleShow role={role} users={users} submit={this.submit} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
