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
    this.removeInvolvement = this.removeInvolvement.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.involvementCheck = this.involvementCheck.bind(this);
    this.setInvolvements = this.setInvolvements.bind(this);
    
    
    this.state = {
      token: window.localStorage.getItem('token'),
      todo: {},
      title: null,
      id: null, 
      involvements: [],
      workInvolvements: [],
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
        involvements: this.state.involvements
    }
    if (this.state.title && this.state.title.length > 0) {
      MyActions.updateInstance('todos', data, this.state.token);
    } else {
      const self = this;
      self.$f7.dialog.alert(dict.incomplete_data, dict.alert);
    }

  }

  removeInvolvement(id) {
    this.setState({
      involvements: this.state.involvements.filter(function (involvement) {
        return involvement.id !== id
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
        //involvements: todo.involvement_tags,
        workInvolvements: todo.work_involvements
      }, () =>  this.setInvolvements());
    }
  }

  setInvolvements(){
    this.setState({ involvements: [] });
    var arr = []
    this.state.workInvolvements.map((workInvolvement) => {
      if(workInvolvement.check){
        arr.push({ id: workInvolvement.profile.id })
      }
    })
    this.setState({ involvements: arr})
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
    const { todo, involvements, title , workInvolvements} = this.state;
    return (
      <Page  backLink={dict.back} backLinkForce={true}>
        <Navbar title={dict.work_form} backLink={dict.back} />
        <BlockTitle>{dict.work_form}</BlockTitle>
        <TodoForm 
        todo={todo} workInvolvements={workInvolvements}
         title={title} involvements={involvements} involvementCheck={this.involvementCheck}
        removeInvolvement={this.removeInvolvement} submit={this.submit} editing={true} handleChange={this.handleChangeValue} />
      </Page>
    );
  }
}
