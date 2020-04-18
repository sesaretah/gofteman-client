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
import WorkForm from "../../containers/todos/form"
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


    this.state = {
      token: window.localStorage.getItem('token'),
      todo: {},
      id: null,
      title: null,
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

  componentDidMount() {
    this.loadData();
  }

  submit() {
    var data = { id: this.state.id, title: this.state.title, details: this.state.details, start: this.state.start, start_time: this.state.startTime, deadline: this.state.deadline, deadline_time: this.state.deadlineTime }// start: new Date(this.state.start.setHours(startTime[0], startTime[1], 0, 0)).toISOString(), deadline:  new Date(this.state.deadline.setHours(deadlineTime[0], deadlineTime[1], 0, 0)).toISOString() }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.updateInstance('todos', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }

  loadData() {
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top' });
    if (this.$f7route.params['workId']) {
      MyActions.getInstance('todos', this.$f7route.params['workId'], this.state.token);
    }
  }


  getInstance() {
    var todo = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (todo && klass === 'Todo') {
      this.setState({
        title: todo.title,
        id: todo.id,
        todo: todo,
      }, () => this.loadCalender());
    }
  }

  handleChangeValue(obj) {
    this.setState(obj);
  }


  setInstance() {
    const self = this;
    this.$f7router.navigate('/todos/');
  }


  render() {
    const { todo, defaultWork, title, content, startTime, deadlineTime } = this.state;
    return (
      <Page >
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <WorkForm todo={todo} title={title} startTime={startTime} deadlineTime={deadlineTime} content={content} defaultWork={defaultWork} submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
