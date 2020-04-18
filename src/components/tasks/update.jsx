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
import TaskForm from "../../containers/tasks/form"
import Framework7 from 'framework7/framework7.esm.bundle';

export default class DocumentUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.pageAfterIn = this.pageAfterIn.bind(this);
    this.loadTags = this.loadTags.bind(this);
    this.removeTag = this.removeTag.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      task: {},
      id: null,
      title: null,
      details: null,
      privateTask: true,
      details: null,
      tags: [],
      isPublic: false,
      selectedMode: false,
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
    this.loadTags();
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



  submit() {
    var data = {
      id: this.state.id, title: this.state.title, public: this.state.isPublic,
      details: this.state.details, tags: this.state.tags
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.updateInstance('tasks', data, this.state.token);
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
    if (this.$f7route.params['taskId']) {
      MyActions.getInstance('tasks', this.$f7route.params['taskId'], this.state.token);
    }
  }


  getInstance() {
    var task = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (task && klass === 'Task') {
      this.setState({
        title: task.title,
        details: task.details,
        id: task.id,
        task: task,
        defaultTask: task.default_task,
        tags: task.the_tags,
        isPublic: task.is_public,
      }, () => this.loadTags());
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

  deleteTask(id) {
    var data = { id: id }
    MyActions.removeInstance('tasks', data, this.state.token, this.state.page);
  }

  deleteInstance() {

  }


  setInstance() {
    var task = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    if (task && klass === 'Task') {
      this.$f7router.navigate('/tasks/' + task.id);
    }
  }


  render() {
    const { task, defaultTask, title, details, isPublic, tags, selectedMode } = this.state;
    return (
      <Page onPageAfterIn={this.pageAfterIn.bind(this)} backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.task_form} backLink={dict.back} />
        <BlockTitle>{dict.task_form}</BlockTitle>
        <TaskForm
          task={task} title={title} isPublic={isPublic}
          tags={tags} removeTag={this.removeTag} selectedMode={selectedMode}
          details={details} defaultTask={defaultTask} submit={this.submit}
          editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
