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
import WorkflowTableForm from "../../containers/workflow_tables/form"
//import Graph from "../../Graph"
export default class WorkflowCreate extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getList = this.getList.bind(this);

    this.state = {
      workflows: [],
      auxiliaryTables: [],
      auxiliaryTableId: null,
      workflowId: null,
      title: '',
      page: 0
    }
  }

  componentWillMount() {
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("got_list", this.getList);
  }

  submit(){
    var data = {workflow_id: this.state.workflowId, auxiliary_table_id: this.state.auxiliaryTableId}
    MyActions.setInstance('workflow_tables', data);
  }

  componentDidMount(){
    MyActions.getList('workflows', this.state.page);
    MyActions.getList('auxiliary_tables', this.state.page);
  }


  handleChangeValue(obj) {
    this.setState(obj);
  }



  setInstance(){
    const self = this;
    this.$f7router.navigate('/workflow_tables/');
  }

  getList() {
    var listnklass = ModelStore.getListnKlass()
    if (listnklass){
      switch (listnklass[1]) {
        case 'Workflow':
        this.setState({
          workflows: listnklass[0],
        });
        break;
        case 'AuxiliaryTable':
        this.setState({
          auxiliaryTables: listnklass[0],
        });
        break;
      }
    }
  }


  render() {
    const {auxiliaryTables, workflows} = this.state;
    return (
      <Page>
        <Navbar title="Form" backLink={dict.back} />
        <BlockTitle>{dict.workflow_form}</BlockTitle>
        <WorkflowTableForm workflows={workflows} submit={this.submit} auxiliaryTables={auxiliaryTables} handleChange={this.handleChangeValue}/>
      </Page>
    );
  }
}
