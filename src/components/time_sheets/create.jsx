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

export default class TimeSheetCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadCalender = this.loadCalender.bind(this);

    
    this.state = {
      token: window.localStorage.getItem('token'),
      timeSheet: [],
      timeSheetDate:  new Date(),
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit(){
    var data = {title: this.state.title, default_time_sheet: this.state.defaultTimeSheet}
    MyActions.setInstance('time_sheets', data, this.state.token);
  }

  pageAfterIn() {
    this.loadTime();
  }



  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance(){
    const self = this;
    this.$f7router.navigate('/time_sheets/');
  }

  pageAfterIn() {
    this.loadCalender();
  }


  loadCalender() {
    const self = this;
    const app = self.$f7;

    app.calendar.create({
      inputEl: '#sheet-date-calendar',
      value: [new Date()],
      closeOnSelect: true,
      firstDay: 6,
      weekendDays: [4, 5],
      monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه'],
      on: {
        closed: function (c) {
          self.setState({ timeSheetDate: c.value[0].a });
        }
      }
    });
  }




  render() {
    const {time_sheet} = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.time_sheet_form} backLink={dict.back} />
        <BlockTitle>{dict.time_sheet_form}</BlockTitle>
        <TimeSheetForm time_sheet={time_sheet} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
