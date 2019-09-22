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
import Graph from "../Graph"
export default class WorkflowForm extends Component {
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
    this.$f7.dialog.preloader(dict.submitting);
    if (this.state.id){
      MyActions.updateInstance('workflows', data);
    } else {
      MyActions.setInstance('workflows', data);
    }
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
        id: workflow.workflow.id
      });
    }
  }

  setInstance(){
    const self = this;
    self.$f7.dialog.close();
    this.$f7router.navigate('/workflows/');
  }


  drawGraph(){
    if(this.state.workflow && this.$f7route.params['workflowId']){
      return(<Graph g={this.state.workflow} e={true}/>)
    } else {
      return(<Graph g={this.state.workflow} e={true}/>)
    }
  }

  render() {
    const {workflow} = this.state;
    return (
      <Page>
        <Navbar title="Form" backLink={dict.back} />
        <BlockTitle>{dict.workflow_form}</BlockTitle>
        <List>
          <ListInput
            label={dict.title}
            type="text"
            placeholder="..."
            value={this.state.title}
            onInput={(e) => {
              this.setState({ title: e.target.value});
            }}
            />
        </List>


        {this.drawGraph()}
        <Block strong>
          <Row tag="p">
            <Button className="col" fill onClick={this.submit.bind(this)}>{dict.submit}</Button>
          </Row>
        </Block>
      </Page>
    );
  }
}
