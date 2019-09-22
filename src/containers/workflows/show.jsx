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
import Graph from "../Graph"

export default class WorkflowShow extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.drawGraph = this.drawGraph.bind(this);
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
    if (this.$f7route.params['workflowId']) {
      MyActions.getInstance('workflows', this.$f7route.params['workflowId']);
    }
    const self = this;
    self.$f7.preloader.hide();
  }

  getInstance(){
    var workflow = ModelStore.getIntance()
    if (workflow){
      this.setState({
        workflow: workflow,
      });
    }
  }

  drawGraph(){
    if(this.state.workflow){
      return(<Graph g={this.state.workflow} e={false}/>)
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
    return (
      <Page>
        <Navbar title={dict.workflows} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        {this.drawGraph()}
      </Page>
    );
  }
}
