import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import AuxiliaryTableIndex from "../../containers/auxiliaryTables/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';
import {loggedIn} from "../../components/users/loggedIn.js"


export default class AuxiliaryTable extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.loggedIn = loggedIn.bind(this);
    this.interaction = this.interaction.bind(this);
    this.setInstance = this.setInstance.bind(this);

    this.state = {
      token: window.localStorage.getItem('token'),
      auxiliaryTables: [],
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("set_instance", this.setInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
    ModelStore.removeListener("set_instance", this.setInstance);
  }

  componentDidMount(){
    this.loggedIn();
    this.loadData();
  }




  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 1000, position: 'top'});
    MyActions.getList('auxiliary_tables', this.state.page, {} ,this.state.token);
  }

  setInstance(){
    var auxiliaryTable = ModelStore.getIntance()
    if(auxiliaryTable){
      this.setState({auxiliaryTables: this.state.auxiliaryTables.map(el => (el.id === auxiliaryTable.id ? Object.assign({}, el, auxiliaryTable) : el))});
    }
  }

  getList() {
    var auxiliaryTables = ModelStore.getList()
    var klass = ModelStore.getKlass()
    if (auxiliaryTables && klass === 'AuxiliaryTable'){
      this.setState({
        auxiliaryTables: auxiliaryTables,
      });
    }
  }

  interaction(interaction_type, interactionable_id, interactionable_type, source_type=null, source_id=null){
    var data = {interaction_type: interaction_type, interactionable_id: interactionable_id, interactionable_type: interactionable_type, source_type: source_type, source_id: source_id}
    MyActions.setInstance('interactions', data, this.state.token);
  }

  render() {
    const {auxiliaryTables} = this.state;
    return(<AuxiliaryTableIndex interaction={this.interaction} auxiliaryTables={auxiliaryTables}/>)
  }
}
