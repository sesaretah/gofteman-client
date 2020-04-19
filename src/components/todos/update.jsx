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
import Framework7 from 'framework7/framework7.esm.bundle';

export default class TodoCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    this.removeParticipant = this.removeParticipant.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.participantCheck = this.participantCheck.bind(this);
    
    this.state = {
      token: window.localStorage.getItem('token'),
      todo: {},
      title: null,
      id: null, 
      participants: [],
      workParticipants: [],
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


  loadTags() {
    const self = this;
    const app = self.$f7;

    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#autocomplete-todos-participants', //link that opens autocomplete
      multiple: true, //allow multiple values
      valueProperty: 'id', //object's "value" property name
      textProperty: 'fullname', //object's "text" property name
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
          url: 'http://localhost:3001/v1/profiles/search',
          method: 'GET',
          dataType: 'json',
          //send "query" to server. Useful in case you generate response dynamically
          data: {
            q: query
          },
          success: function (item) {
            // Find matched items
            for (var i = 0; i < item.data.length; i++) {
              if (item.data[i].fullname.indexOf(query) >= 0) results.push(item.data[i]);
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
          if(value && value[value.length - 1]){
            self.setState({ participants: self.state.participants.concat({ fullname: value[value.length - 1].fullname, id: value[value.length - 1].id }) })
          }
        },
      },
    });
  }

  pageAfterIn() {
    this.loadTags();
  }


  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top' });
    if (this.$f7route.params['todoId']) {
      MyActions.getInstance('todos', this.$f7route.params['todoId'], this.state.token);
    }
  }


  submit() {
    var data = { 
        id: this.state.id,
        title: this.state.title,
        participants: this.state.participants
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.updateInstance('todos', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }

  removeParticipant(id) {
    this.setState({
      participants: this.state.participants.filter(function (participant) {
        return participant.id !== id
      })
    });
  }

  getInstance() {
    var todo = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (todo && klass === 'Todo') {
      this.setState({
        title: todo.title,
        id: todo.id,
        //participants: todo.participant_tags,
        workParticipants: todo.work_participants
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
    console.log(this.state)
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



  render() {
    const { todo, participants, title , workParticipants} = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)} backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <TodoForm 
        todo={todo} workParticipants={workParticipants}
         title={title} participants={participants} participantCheck={this.participantCheck}
        removeParticipant={this.removeParticipant} submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
