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
import ShortnerForm from "../../containers/shortners/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class ShortnerCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      shortner: {},
      url: null,
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit(){
    var data = {url: this.state.url}
    MyActions.setInstance('shortners', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/shortners/');
  }



  render() {
    const {shortner, url} = this.state;
    return (
      <Page>
        <Navbar title={dict.shortner_form} backLink={dict.back} />
        <BlockTitle>{dict.shortner_form}</BlockTitle>
        <ShortnerForm 
          shortner={shortner} submit={this.submit} editing={true}
          handleChange={this.handleChangeValue}
          />
      </Page>
    );
  }
}
