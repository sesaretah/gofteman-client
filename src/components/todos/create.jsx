import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import TodoForm from "../../containers/todos/form"

export default class TodoCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.participantCheck = this.participantCheck.bind(this);
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      todo: {},
      title: null,
      participants: [],
      workParticipants: [],
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount() {
    MyActions.getInstance('works', this.$f7route.params['workId'], this.state.token);
  }


  submit() {
    var data = { 
        title: this.state.title, work_id: this.$f7route.params['workId'],
        participants: this.state.participants
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.setInstance('todos', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }



  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance() {
    var todo = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (todo && klass === 'Todo') {
      this.$f7router.navigate('/works/'+todo.work_id);
    } 
  }

  getInstance() {
    var work = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (work && klass === 'Work') {
      this.setState({
        workParticipants: work.participants
      });
    }
  }

  participantCheck(id, e){
    if (e.target.checked) {
      this.setState({ participants: this.state.participants.concat({ id: id })})
    } else {
      this.setState({
        participants: this.state.participants.filter(function (participant) {
          return participant.id !== id
        })
      });
    }
  }



  render() {
    const { todo, participants, workParticipants } = this.state;
    return (
      <Page  backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <TodoForm 
        todo={todo} workParticipants={workParticipants}
         participants={participants} removeParticipant={this.removeParticipant}
        submit={this.submit} editing={true} participantCheck={this.participantCheck}
        handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
