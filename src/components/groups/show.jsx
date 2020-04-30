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
import GroupShow from "../../containers/groups/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    

    this.state = {
      token: window.localStorage.getItem('token'),
      group: null,
      id: null,
      user_id: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
    ModelStore.on("deleted_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
    ModelStore.removeListener("deleted_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('groups', this.$f7route.params['groupId'], this.state.token);
  }

  getInstance() {
    var group = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (group && klass === 'Group') {
      this.setState({
        group: group,
        id: group.id,
      });
    }
  }


  submit() {
    var data = { group_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.group) {
      return (
        <Fab href={"/groups/" + this.state.group.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }


  render() {
    const { group } = this.state;
    return (
      <Page>
        <Navbar title={dict.groups} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <GroupShow 
          group={group}  submit={this.submit} 
          handleChange={this.handleChangeValue}
        />
      </Page>
    );
  }
}
