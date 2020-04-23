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
    this.loadAssociation = this.loadAssociation.bind(this);
    this.removeAssociation = this.removeAssociation.bind(this);
    
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      morningReport: null,
      afternoonReport: null,
      extraReport: null,
      associations: [],
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
    var data = {
      associations: this.state.associations,
      morning_report: this.state.morningReport, afternoon_report: this.state.afternoonReport,
      extra_report: this.state.extraReport, sheet_date: this.state.timeSheetDate
    }
    MyActions.setInstance('time_sheets', data, this.state.token);
  }

  loadAssociation() {
    const self = this;
    const app = self.$f7;

    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#morning-association', //link that opens autocomplete
      multiple: true, //allow multiple values
      valueProperty: 'id', //object's "value" property name
      textProperty: 'title', //object's "text" property name
      searchbarDisableText: dict.cancel,
      popupCloseLinkText: dict.close,
      notFoundText: dict.not_found,
      limit: 50,
      searchbarPlaceholder: dict.search,
      preloader: true, //enable preloader
      source: function (query, render) {
        var autocomplete = this;
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Show Preloader
        autocomplete.preloaderShow();
        // Do Ajax request to Autocomplete data
        app.request({
          url:  'http://localhost:3001/v1/time_sheets/search_ass',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
            q: query
          },
          success: function (item) {
            // Find matched items
            for (var i = 0; i < item.data.length; i++) {
              if (item.data[i].title.indexOf(query) >= 0) results.push(item.data[i]);
            }
            // Hide Preoloader
            autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          }
        });
      },
      on: {
        change: function (value) {
          if (value && value[value.length - 1]) {
            self.setState({ associations: self.state.associations.concat({ title: value[value.length - 1].title, id: value[value.length - 1].id , type: 'Morning'}) })
          }
        },
      },
    });

    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#afternoon-association', //link that opens autocomplete
      multiple: true, //allow multiple values
      valueProperty: 'id', //object's "value" property name
      textProperty: 'title', //object's "text" property name
      searchbarDisableText: dict.cancel,
      popupCloseLinkText: dict.close,
      notFoundText: dict.not_found,
      limit: 50,
      searchbarPlaceholder: dict.search,
      //preloader: true, //enable preloader
      source: function (query, render) {
        var autocomplete = this;
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Show Preloader
       // autocomplete.preloaderShow();
        // Do Ajax request to Autocomplete data
        app.request({
          url: 'http://localhost:3001/v1/time_sheets/search_ass',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
            q: query
          },
          success: function (item) {
            // Find matched items
            for (var i = 0; i < item.data.length; i++) {
              if (item.data[i].title.indexOf(query) >= 0) results.push(item.data[i]);
            }
            // Hide Preoloader
            //autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          }
        });
      },
      on: {
        change: function (value) {
          if (value && value[value.length - 1]) {
            self.setState({ associations: self.state.associations.concat({ title: value[value.length - 1].title, id: value[value.length - 1].id , type: 'Afternoon'}) })
          }
        },
      },
    });
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
    this.loadAssociation();
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

  removeAssociation(id, type){
    this.setState({
      associations: this.state.associations.filter(function (association) {
        return (association.id !== id || association.type !== type)
      })
    });
  }




  render() {
    const {time_sheet, associations} = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.time_sheet_form} backLink={dict.back} />
        <BlockTitle>{dict.time_sheet_form}</BlockTitle>
        <TimeSheetForm 
          time_sheet={time_sheet} submit={this.submit}
           editing={true} handleChange={this.handleChangeValue}
           associations={associations} removeAssociation={this.removeAssociation}
           />
      </Page>
    );
  }
}
