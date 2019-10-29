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
import AuxiliaryTableShow from "../../containers/auxiliaryTables/show"

export default class AuxiliaryTableShowComponent extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.removeRecord = this.removeRecord.bind(this);
    this.state = {
      auxiliaryTable: null,
      token: window.localStorage.getItem('token'),
      auxiliary_table_id: null,
      records: [],
      fields: [],
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
      MyActions.getInstance('auxiliary_tables', this.$f7route.params['auxiliaryTableId'], this.state.token);
  }

  getInstance(){
    var auxiliaryTable = ModelStore.getIntance()
    if (auxiliaryTable){
      this.setState({
        auxiliaryTable: auxiliaryTable,
        auxiliary_table_id: auxiliaryTable.id,
        records: auxiliaryTable.auxiliary_records
      });
    }
    console.log(auxiliaryTable);
    }

    removeRecord(uuid){
      MyActions.removeInstance('auxiliary_records', {uuid: uuid});
    }

  fab(){
    if (this.state.auxiliary_table){
      return(
        <Fab href={"/auxiliary_tables/"+this.state.auxiliary_table.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  submit(){
    var data = {auxiliary_table_id: this.state.auxiliary_table_id, data_record: this.state.fields}
    MyActions.setInstance('auxiliary_records', data, this.state.token);
  }

  handleChangeValue(key, value, auxiliaryTable) {
    console.log(key, value, auxiliaryTable);
    var fields = this.state.fields
    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].field_id && fields[i].field_id === key){
          let newState = Object.assign({}, this.state);
          newState.fields[i]= {field_id: key, value: value}
          this.setState(newState);
        } else {
          this.setState({fields: this.state.fields.concat({field_id: key, value: value})});
        }
      }
    } else {
      this.setState({fields: this.state.fields.concat({field_id: key, value: value})});
    }
    console.log(this.state);
  }

  render() {
    const {auxiliaryTable, records} = this.state;
    return (
      <Page>
        <Navbar title={dict.auxiliary_tables} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <AuxiliaryTableShow auxiliaryTable={auxiliaryTable} records={records} handleChangeValue={this.handleChangeValue} submit={this.submit}/>
      </Page>
    );
  }
}
