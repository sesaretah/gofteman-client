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
    this.involvementCheck = this.involvementCheck.bind(this);
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      todo: {},
      title: null,
      involvements: [],
      workInvolvements: [],
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
        involvements: this.state.involvements
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
        workInvolvements: work.the_involvements
      });
    }
  }

  involvementCheck(id, e){
    if (e.target.checked) {
      this.setState({ involvements: this.state.involvements.concat({ id: id })})
    } else {
      this.setState({
        involvements: this.state.involvements.filter(function (involvement) {
          return involvement.id !== id
        })
      });
    }
  }



  render() {
    const { todo, involvements, workInvolvements } = this.state;
    return (
      <Page  backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <TodoForm 
        todo={todo} workInvolvements={workInvolvements}
         involvements={involvements} removeInvolvement={this.removeInvolvement}
        submit={this.submit} editing={true} involvementCheck={this.involvementCheck}
        handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
