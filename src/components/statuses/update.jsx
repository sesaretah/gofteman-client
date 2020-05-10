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


export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadPalette = this.loadPalette.bind(this);

    

    this.state = {
      token: window.localStorage.getItem('token'),
      status : {},
      title: null,
      id: '',
      color: '#fff',
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

  componentDidMount(){
    this.loadData();
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
        hex: this.state.color,
      },
      on: {
        closed: function (c) {
          self.setState({ color: c.value.hex });
        }
      }
    });
  }


  submit(){
    var data = {id:this.state.id, title: this.state.title, color: this.state.color, confirmed: this.state.isConfirmed}
    MyActions.updateInstance('statuses', data,  this.state.token);
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['statusId']) {
      MyActions.getInstance('statuses', this.$f7route.params['statusId'],  this.state.token);
    }
  }


  getInstance(){
    var status = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (status && klass === 'Status'){
      this.setState({
        title: status.title,
        id: status.id,
        color: status.the_color,
        status: status,
        isConfirmed: status.confiremd,
        confirmable: status.confirmable,
      }, () => this.loadPalette());
    } 
    console.log(status)
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/statuses/');
  }


  render() {
        const {status, title, color, isConfirmed, confirmable} = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.status_form} backLink={dict.back} />
        <BlockTitle>{dict.status_form}</BlockTitle>
        <StatusForm 
        status={status} title={title} color={color} isConfirmed={isConfirmed}
        submit={this.submit} editing={true} handleChange={this.handleChangeValue}
        confirmable={confirmable}
        />
      </Page>
    );
  }
}
