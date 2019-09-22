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

export default class WorkflowUpdate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.setInstance = this.setInstance.bind(this);

    this.state = {
      workflow: null,
      title: '',
      id: null
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

  submit(){
    var data = {id: this.state.id, title: this.state.title, graph: {nodes: window.nodes, edges: window.edges}}
      MyActions.updateInstance('workflows', data);
  }

  componentDidMount(){
    if (this.$f7route.params['workflowId']) {
      MyActions.getInstance('workflows', this.$f7route.params['workflowId']);
    }
  }

  getInstance(){
    var workflow = ModelStore.getIntance()
    if (workflow){
      this.setState({
        workflow: workflow,
        title: workflow.workflow.title,
        id: workflow.workflow.id
      });
    }
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
