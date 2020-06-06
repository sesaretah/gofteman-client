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


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);


    this.state = {
      token: window.localStorage.getItem('token'),
      shortner : {},
      isConfirmed: false,
      confirmable: false,
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
    var data = {
      id:this.state.id, title: this.state.title, 
      confirmed: this.state.isConfirmed}
    MyActions.updateInstance('shortners', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['shortnerId']) {
      MyActions.getInstance('shortners', this.$f7route.params['shortnerId'],  this.state.token);
    }
  }


  getInstance(){
    var shortner = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (shortner && klass === 'Shortner'){
      this.setState({
        title: shortner.title,
        id: shortner.id,
        shortner: shortner,
        isConfirmed: shortner.confirmed,
        confirmable: shortner.confirmable
      });
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/shortners/');
  }


  render() {
        const {shortner, isConfirmed, confirmable} = this.state;
    return (
      <Page>
        <Navbar title={dict.shortner_form} backLink={dict.back} />
        <BlockTitle>{dict.shortner_form}</BlockTitle>
        <ShortnerForm 
          shortner={shortner} isConfirmed={isConfirmed} submit={this.submit} confirmable={confirmable}
          editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
