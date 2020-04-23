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
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import StatusShow from "../../containers/statuses/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.getList = this.getList.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.removeStatus = this.removeStatus.bind(this);
    this.addAbility = this.addAbility.bind(this);
    this.removeAbility = this.removeAbility.bind(this);

    

    this.state = {
      token: window.localStorage.getItem('token'),
      status: null,
      id: null,
      users: null,
      assignedUsers: null,
      user_id: null,
      abilityTitle: '',
      abilityValue: true,
      ability: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("got_list", this.getList);
    ModelStore.on("deleted_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('statuses', this.$f7route.params['statusId'], this.state.token);
  }

  getInstance() {
    var status = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (status && klass === 'Status') {
      this.setState({
        status: status,
        id: status.id,
        assignedUsers: status.users,
        ability: status.ability
      });
    }
  }

  getList() {
    var users = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (users && klass === 'User') {
      this.setState({
        users: users,
      });
    }
  }

  submit() {
    var data = { status_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }

  addAbility() {
    var data = { id: this.state.id, ability_title: this.state.abilityTitle, ability_value: this.state.abilityValue}
    MyActions.setInstance('statuses/abilities', data, this.state.token);
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.status) {
      return (
        <Fab href={"/statuses/" + this.state.status.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  removeStatus(user_id) {
    MyActions.removeInstance('users/assignments', { user_id: user_id, status_id: this.state.id }, this.state.token);
  }

  removeAbility(title){
    MyActions.removeInstance('statuses/abilities', { id: this.state.id, title: title }, this.state.token);
  }

  render() {
    const { status, users, assignedUsers, ability } = this.state;
    return (
      <Page>
        <Navbar title={dict.statuses} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <StatusShow status={status} users={users} ability={ability} removeAbility={this.removeAbility} assignedUsers={assignedUsers} addAbility={this.addAbility} removeStatus={this.removeStatus} submit={this.submit} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
