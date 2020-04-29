import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import WorkForm from "../../containers/works/form"

export default class WorkCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadCalender = this.loadCalender.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      work: {},
      title: null,
      details: null,
      deadline: new Date(),
      start: new Date(),
      startTime:  '0:00',
      deadlineTime: '0:00',
      privateWork: true,
      priority: 'normal',
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  componentDidMount() {

  }

  pageAfterIn() {
    this.loadCalender();
    this.loadTime();
  }

  loadTime(){
    var today = new Date();
    const self = this;
    const app = self.$f7;
    
    app.picker.create({
      inputEl: '#start-time-picker',
        rotateEffect: true,
        on: {
          closed: function (picker) {
            self.setState({ startTime: picker.value[1]+':'+picker.value[0]});
          }
        },
        cols: [
          {
            values: ('00 15 30 45').split(' ')
          },
          {
            textAlign: 'left',
            values: ('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23').split(' ')
          },

        ]
    });
    app.picker.create({
      inputEl: '#deadline-time-picker',
        rotateEffect: true,        on: {
          closed: function (picker) {
            self.setState({ deadlineTime: picker.value[1]+':'+picker.value[0]});
          }
        },
        cols: [
          {
            values: ('00 15 30 45').split(' ')
          },
          {
            textAlign: 'left',
            values: ('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23').split(' ')
          },

        ]
    });
  }

  loadCalender(){
    const self = this;
    const app = self.$f7;

    app.calendar.create({
      inputEl: '#start-calendar',
      value: [new Date()],
      closeOnSelect: true,
      firstDay: 6,
      weekendDays: [4, 5],
      monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه'],
      on: {
        closed: function (c) {
          console.log(c.value[0].a)
          self.setState({ start: c.value[0].a });
        }
      }
    });

    app.calendar.create({
      inputEl: '#deadline-calendar',
      closeOnSelect: true,
      value: [new Date()],
      firstDay: 6,
      weekendDays: [4, 5],
      monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه'],
      on: {
        closed: function (c) {
          self.setState({ deadline: c.value[0].a });
        }
      }

    });
  }

  submit() {
    var data = { 
      title: this.state.title, details: this.state.details, 
      start: this.state.start, start_time: this.state.startTime, 
      deadline: this.state.deadline, deadline_time: this.state.deadlineTime,
      task_id: this.$f7route.params['taskId'], priority: this.state.priority
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.setInstance('works', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance() {
    var work = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (work && klass === 'Work') {
      this.$f7router.navigate('/works/'+work.id);
    } else {
      this.$f7router.navigate('/tasks/');
    }
    
  }



  render() {
    const { work } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <WorkForm work={work} submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
