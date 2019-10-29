import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import AuxiliaryTableIndex from "../../containers/auxiliaryTables/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import crypto from 'crypto-js';

//export default class AuxiliaryTableIndexComponent extends React.Component {
export default class AuxiliaryTableIndexComponent extends React.Component {
  constructor() {
  super();
this.state = {
      auxiliaryTables: null,
      token: window.localStorage.getItem('token'),
      page: 1,
    }
  }
  constructor() {
    super();
    this.getList = this.getList.bind(this);

  }

  componentWillMount() {
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    console.log('XXXXXXXXXXXXXXXXXX');
    MyActions.getList('auxiliary_tables', this.state.page, {rand: crypto.lib.WordArray.random(12)},this.state.token);
  }

  getList(){
    var auxiliaryTables = ModelStore.getList()
    if (auxiliaryTables){
      this.setState({
        auxiliaryTables: auxiliaryTables,
      });
    }
  }


  render() {
    const {auxiliaryTables} = this.state;

    return(<AuxiliaryTableIndex auxiliaryTables={auxiliaryTables}/>)
  }
}
