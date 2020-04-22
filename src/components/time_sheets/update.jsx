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
import TimeSheetForm from "../../containers/time_sheets/form"
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
      time_sheet : {},
      defaultTimeSheet: null,
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
    var data = {id:this.state.id, title: this.state.title, default_time_sheet: this.state.defaultTimeSheet}
    MyActions.updateInstance('time_sheets', data,  this.state.token);
  }
  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    if (this.$f7route.params['time_sheetId']) {
      MyActions.getInstance('time_sheets', this.$f7route.params['time_sheetId'],  this.state.token);
    }
  }


  getInstance(){
    var time_sheet = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (time_sheet && klass === 'TimeSheet'){
      this.setState({
        title: time_sheet.title,
        id: time_sheet.id,
        time_sheet: time_sheet,
        defaultTimeSheet: time_sheet.default_time_sheet
      });
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance(){
    const self = this;
    this.$f7router.navigate('/time_sheets/');
  }


  render() {
        const {time_sheet, defaultTimeSheet} = this.state;
    return (
      <Page>
        <Navbar title={dict.time_sheet_form} backLink={dict.back} />
        <BlockTitle>{dict.time_sheet_form}</BlockTitle>
        <TimeSheetForm time_sheet={time_sheet} defaultTimeSheet={defaultTimeSheet} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
