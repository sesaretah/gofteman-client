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
import MetaForm from "../../containers/metas/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class MetaCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      meta: {},
      metaSchema: null,
      title: null,
      label: null,
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit(){
    var data = {title: this.state.title, label: this.state.label,  meta_schema: this.state.metaSchema}
    MyActions.setInstance('metas', data, this.state.token);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/metas/');
  }



  render() {
    const {meta} = this.state;
    return (
      <Page>
        <Navbar title={dict.meta_form} backLink={dict.back} />
        <BlockTitle>{dict.meta_form}</BlockTitle>
        <MetaForm meta={meta} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
