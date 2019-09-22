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
  Icon, Fab
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import * as MyActions from "../../actions/MyActions";
import WorkflowForm from "../../containers/workflows/form"

export default class WorkflowShow extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.state = {
      workflow: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
      MyActions.getInstance('workflows', this.$f7route.params['workflowId']);
  }

  getInstance(){
    var workflow = ModelStore.getIntance()
    if (workflow){
      this.setState({
        workflow: workflow,
        title: workflow.workflow.title
      });
    }
  }

  fab(){
    if (this.state.workflow){
      return(
        <Fab href={"/workflows/"+this.state.workflow.workflow.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const {title, workflow} = this.state;
    return (
      <Page>
        <Navbar title={dict.workflows} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <WorkflowForm title={title} workflow={workflow} submit={this.submit} editing={false} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
