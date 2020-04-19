import React, { Component } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
} from 'framework7-react';
import { dict } from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import TaskForm from "../../containers/tasks/form"

export default class TaskCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.loadTags = this.loadTags.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    this.removeTag = this.removeTag.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      task: {},
      title: null,
      details: null,
      deadline: new Date(),
      start: new Date(),
      startTime: '0:00',
      deadlineTime: '0:00',
      privateTask: true,
      tags: [],
      isPublic: false,
    }
  }


  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  loadTags() {
    const self = this;
    const app = self.$f7;

    app.autocomplete.create({
      openIn: 'popup', //open in page
      openerEl: '#autocomplete-standalone-ajax', //link that opens autocomplete
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
          url: '/v1/tags/search',
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
            self.setState({ tags: self.state.tags.concat({ title: value[value.length - 1].title, id: value[value.length - 1].id }) })
          }
        },
      },
    });
  }

  pageAfterIn() {
    this.loadTags();
  }

  submit() {
    var data = {
      title: this.state.title, public: this.state.isPublic,
      details: this.state.details, tags: this.state.tags
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.setInstance('tasks', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }

  removeTag(id) {
    this.setState({
      tags: this.state.tags.filter(function (tag) {
        return tag.id !== id
      })
    });
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }

  setInstance() {
    const self = this;
    this.$f7router.navigate('/tasks/');
  }



  render() {
    const { task, tags, isPublic } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)} backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.task_form} backLink={dict.back} />
        <BlockTitle>{dict.task_form}</BlockTitle>
        <TaskForm
          task={task} removeTag={this.removeTag} tags={tags} isPublic={isPublic}
          submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
