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
import WorkflowForm from "../../containers/workflows/form"
//import Graph from "../../Graph"
export default class WorkflowCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = {
      workflow: {id: null, title: '', details: '', graph: {nodes: [], edges:[]}},
      title: '',
    }
  }

  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  submit(){
    var data = {title: this.state.title, graph: {nodes: window.nodes, edges: window.edges}}
    MyActions.setInstance('workflows', data);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }



  setInstance(){
    const self = this;
    this.$f7router.navigate('/workflows/');
  }


  render() {
    const {title, workflow} = this.state;
    return (
      <Page>
        <Navbar title="Form" backLink={dict.back} />
        <BlockTitle>{dict.workflow_form}</BlockTitle>
        <WorkflowForm title={title} workflow={workflow} submit={this.submit} editing={true} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
