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
import MetaShow from "../../containers/metas/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submit = this.submit.bind(this);
    this.removeActual = this.removeActual.bind(this);

    
    this.state = {
      meta: null,
      metaId: null,
      token: window.localStorage.getItem('token'),
      fields: [],
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
    MyActions.getInstance('metas', this.$f7route.params['metaId']);
  }

  getInstance() {
    var meta = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (meta && klass === 'Meta') {
      this.setState({
        meta: meta,
        metaId: meta.id 
      });
    }
  }

  handleChangeValue(key, value) {
    var fields = this.state.fields
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].fid && fields[i].fid === key) {
          let newState = Object.assign({}, this.state);
          newState.fields[i] = { fid: key, value: value }
          this.setState(newState);
        } else {
          this.setState({ fields: this.state.fields.concat({ fid: key, value: value }) });
        }
      }
    } else {
      this.setState({ fields: this.state.fields.concat({ fid: key, value: value }) });
    }
  }

  removeActual(uuid){
    MyActions.removeInstance('actuals', {uuid: uuid});
  }

  submit(){
    var data = {meta_id: this.state.metaId, content: this.state.fields}
    MyActions.setInstance('actuals', data, this.state.token);
  }

  fab() {
    if (this.state.meta) {
      return (
        <Fab href={"/metas/" + this.state.meta.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const { meta } = this.state;
    return (
      <Page>
        <Navbar title={dict.metas} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <MetaShow meta={meta} removeActual={this.removeActual} handleChangeValue={this.handleChangeValue} submit={this.submit}/>
      </Page>
    );
  }
}
