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
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);    

    this.state = {
      token: window.localStorage.getItem('token'),
      status: null,
      id: null,
      editable: false,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.getInstance);
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
        editable: status.editable,
      });
    }
  }


  submit() {
    var data = { status_id: this.state.id, user_id: this.state.user_id }
    MyActions.setInstance('users/assignments', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.status && this.state.editable) {
      return (
        <Fab href={"/statuses/" + this.state.status.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const { status, editable } = this.state;
    return (
      <Page>
        <Navbar title={dict.statuses} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <StatusShow status={status} editable={editable} 
          submit={this.submit} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
