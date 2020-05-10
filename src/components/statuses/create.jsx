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
import StatusForm from "../../containers/statuses/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class StatusCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      status: {},
      title: '',
      color: '',
      isConfirmed: false,
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }


  pageAfterIn() {
    this.loadPalette();
  }

  loadPalette() {
    const self = this;
    const app = self.$f7;
    app.colorPicker.create({
      inputEl: '#demo-color-picker-spectrum',
      targetEl: '#demo-color-picker-spectrum-value',
      targetElSetBackgroundColor: true,
      modules: ['sb-spectrum', 'hue-slider'],
      openIn: 'popover',
      value: {
        hex: '#ff0000',
      },
      on: {
        closed: function (c) {
          self.setState({ color: c.value.hex });
        }
      }
    });
  }

  submit(){
    var data = {title: this.state.title, color: this.state.color, confirmed: this.state.isConfirmed}
    MyActions.setInstance('statuses', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/statuses/');
  }



  render() {
    const {status, isConfirmed} = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.status_form} backLink={dict.back} />
        <BlockTitle>{dict.status_form}</BlockTitle>
        <StatusForm 
        status={status} submit={this.submit} isConfirmed={isConfirmed}
        editing={true} handleChange={this.handleChangeValue}
        />
      </Page>
    );
  }
}
