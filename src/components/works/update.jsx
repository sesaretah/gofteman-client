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
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import WorkForm from "../../containers/works/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadTime = this.loadTime.bind(this);
    this.loadCalender = this.loadCalender.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    this.deleteWorkConfirm = this.deleteWorkConfirm.bind(this);
    this.deleteWork = this.deleteWork.bind(this);
    this.deleteInstance = this.deleteInstance.bind(this);

    

    this.state = {
      token: window.localStorage.getItem('token'),
      work: {},
      id: null,
      title: null,
      details: null,
      deadline: new Date(),
      start: new Date(),
      startTime: '0 00',
      deadlineTime: '0 00',
      privateWork: true,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("deleted_instance", this.deleteInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("deleted_instance", this.deleteInstance);

  }

  pageAfterIn() {
    this.loadTime();
  }

  loadTime() {
    var today = new Date();
    const self = this;
    const app = self.$f7;

    app.picker.create({
      inputEl: '#start-time-picker',
      rotateEffect: true,
      on: {
        closed: function (picker) {
          self.setState({ startTime: picker.value[1] + ':' + picker.value[0] });
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
      rotateEffect: true, on: {
        closed: function (picker) {
          self.setState({ deadlineTime: picker.value[1] + ':' + picker.value[0] });
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

  loadCalender() {
    const self = this;
    const app = self.$f7;

    app.calendar.create({
      inputEl: '#start-calendar',
      value: [this.state.start],
      closeOnSelect: true,
      firstDay: 6,
      weekendDays: [4, 5],
      monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه'],
      on: {
        closed: function (c) {
          self.setState({ start: c.value[0].a });
        }
      }
    });

    app.calendar.create({
      inputEl: '#deadline-calendar',
      closeOnSelect: true,
      value: [this.state.deadline],
      firstDay: 6,
      weekendDays: [4, 5],
      monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه ', 'چهار', 'پنج‌', 'جمعه', 'شنبه'],
      on: {
        closed: function (c) {
          //console.log(c.value[0].a)
          self.setState({ deadline: c.value[0].a });
        }
      }

    });
  }



  submit() {
    var data = { id: this.state.id, title: this.state.title, details: this.state.details, start: this.state.start, start_time: this.state.startTime, deadline: this.state.deadline, deadline_time: this.state.deadlineTime }// start: new Date(this.state.start.setHours(startTime[0], startTime[1], 0, 0)).toISOString(), deadline:  new Date(this.state.deadline.setHours(deadlineTime[0], deadlineTime[1], 0, 0)).toISOString() }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.updateInstance('works', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top' });
    if (this.$f7route.params['workId']) {
      MyActions.getInstance('works', this.$f7route.params['workId'], this.state.token);
    }
  }


  getInstance() {
    var work = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (work && klass === 'Work') {
      this.setState({
        title: work.title,
        content: work.details,
        id: work.id,
        work: work,
        start: new window.ODate(work.start_date),
        deadline: new window.ODate(work.deadline_date),
        startTime: work.start_time,
        deadlineTime: work.deadline_time,
        defaultWork: work.default_work,
      }, () => this.loadCalender());
    }
  }

  deleteWorkConfirm(){
    const self = this;
    const app = self.$f7;
    app.dialog.confirm(dict.are_you_sure, dict.alert, self.deleteWork)
  }

  deleteWork(){
    var data = { id: this.state.id}
    MyActions.removeInstance('works', data, this.state.token);
  }

  deleteInstance() {
    this.$f7router.navigate('/tasks/');
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance() {
    const self = this;
    this.$f7router.navigate('/works/'+this.state.id);
  }


  render() {
    const { work, defaultWork, title, content, startTime, deadlineTime } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <WorkForm 
        work={work} title={title} startTime={startTime} 
        deadlineTime={deadlineTime} content={content} 
        defaultWork={defaultWork} submit={this.submit} 
        editing={true} handleChange={this.handleChangeValue} 
        deleteWorkConfirm={this.deleteWorkConfirm}
        />
      </Page>
    );
  }
}
