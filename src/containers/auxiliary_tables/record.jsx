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
  Icon, Fab, FabButton, FabButtons
} from 'framework7-react';
import { dict} from '../../Dict';
import ModelStore from "../../stores/ModelStore";
import RecordList from "../auxiliary_records/list";
import RecordForm from "../auxiliary_records/form";
import * as MyActions from "../../actions/MyActions";
export default class AuxiliaryRecord extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.setInstance = this.setInstance.bind(this);
    this.deleteIntance = this.deleteIntance.bind(this);
    this.getList = this.getList.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.submit = this.submit.bind(this);
    this.removeRecord = this.removeRecord.bind(this)
    this.state = {
      auxiliary_table: null,
      fields: {},
      records: [],
      id: null,
      page: 1
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
    ModelStore.on("set_instance", this.setInstance);
    ModelStore.on("deleted_instance", this.deleteIntance);
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
    ModelStore.removeListener("set_instance", this.setInstance);
    ModelStore.removeListener("deleted_instance", this.deleteIntance);
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    if (this.$f7route.params['auxiliaryTableId']) {
      MyActions.getInstance('auxiliary_tables', this.$f7route.params['auxiliaryTableId']);
    }
  }

  getList(){
    var list = ModelStore.getList()
    if (list){
      this.setState({
        records: list,
      });
    }

  }

  deleteIntance(){
    var model = ModelStore.getIntance()
    if (model){
      this.setState({
        records: this.state.records.filter(function(item) {
          return item.uuid !== model.uuid;
        })
      });
    }
  }

  getInstance(){
    var instance = ModelStore.getIntance()
    var klass = ModelStore.getKlass()
    switch (klass) {
      case 'AuxiliaryTable':
      this.setState({
        auxiliary_table: instance,
        id: instance.id
      });
      MyActions.getList('auxiliary_records', this.page, {auxiliary_table_id : this.$f7route.params['auxiliaryTableId']});
      break;
    }
  }

  setInstance(){
    var instance = ModelStore.getIntance()

    if (instance){
      this.setState({
        records: this.state.records.concat(instance)
      });
    }
    console.log(this.state.records);
  }

  fab(){
    if(this.state.auxiliary_table){
      return(
        <div className="fab fab-left-bottom color-lime">
          <a><i className="icon f7-icons">edit</i><i className="icon f7-icons">close</i></a>
          <div className="fab-buttons fab-buttons-top">
            <a href={'/auxiliary_tables/'+this.state.auxiliary_table.id+'/edit'} className="fab-label-button">
              <i className="icon f7-icons">edit</i>
              <span className="fab-label">{dict.edit}</span>
            </a>
            <a className="fab-label-button">
              <i className="icon f7-icons">trash</i>
              <span className="fab-label">{dict.delete}</span>
            </a>
          </div>
        </div>
      )
    }
  }

  handleChangeValue(key,value) {
    let newState = Object.assign({}, this.state);
    newState.fields[key]= value
    this.setState(newState);
  }

  removeRecord(uuid){
    MyActions.removeInstance('auxiliary_records', {uuid: uuid});
  }

  submit(){
    var data = {auxiliary_table_id: this.state.id, data_record: this.state.fields}
    MyActions.setInstance('auxiliary_records', data);
  }

  showTable(){
    if (this.state.auxiliary_table && this.state.auxiliary_table.table_type == 'Basic'){
      return(
        <React.Fragment>
          <RecordList auxiliaryTable={this.state.auxiliary_table} records={this.state.records} removeRecord={this.removeRecord}/>
          <RecordForm auxiliaryTable={this.state.auxiliary_table} onChangeValue={this.handleChangeValue} submit={this.submit}/>
        </React.Fragment>
    )
    }

  }

  render() {
    return (
      <Page>
        <Navbar title="Form" backLink={dict.back} backLinkForce='true'/>
        <BlockTitle></BlockTitle>
        {this.fab()}
        {this.showTable()}
        </Page>
    );
  }
}
