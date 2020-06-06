import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Link,
  Icon, Fab
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import ShortnerShow from "../../containers/shortners/show"
import crypto from 'crypto-js';

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.deleteItemConfirm = this.deleteItemConfirm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      shortner: null,
      id: null,
      title: null,
      description: null,
      href: null,
      items: null,
      editable: false,
      rnd: crypto.lib.WordArray.random(32),
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
    MyActions.getInstance('shortners', this.$f7route.params['shortnerId'], this.state.token);
  }

  getInstance() {
    var shortner = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (shortner && klass === 'Shortner') {
      this.setState({
        shortner: shortner,
        id: shortner.id,
        items: shortner.the_items,
        editable: shortner.editable
      });
    }
    this.$$('#title-' + this.state.rnd).val('');
    this.$$('#description-' + this.state.rnd).val('');
    this.$$('#href-' + this.state.rnd).val('');
  }


  submitItem() {
    const { id, title, description, href } = this.state;
    var data = { shortner_id: id, title: title, description: description, href: href }
    MyActions.setInstance('items', data, this.state.token);
  }


  deleteItemConfirm(id) {
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, () => self.deleteItem(id))
  }

  deleteItem(id) {
    var data = { id: id }
    MyActions.removeInstance('items', data, this.state.token, this.state.page);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  fab() {
    if (this.state.shortner && this.state.editable) {
      return (
        <Fab href={"/shortners/" + this.state.shortner.id + "/edit"} target="#main-view" position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }


  render() {
    const { shortner, items, editable, rnd } = this.state;
    return (
      <Page>
        <Navbar title={dict.shortners}  >
          <Link panelOpen="right">
            <Icon f7="bars"></Icon>
          </Link>
        </Navbar>
        <ShortnerShow
          shortner={shortner} editable={editable}
          submit={this.submit} handleChange={this.handleChangeValue}
          submitItem={this.submitItem} deleteItemConfirm={this.deleteItemConfirm}
          items={items} rnd={rnd}
        />
        {this.fab()}
      </Page>
    );
  }
}
