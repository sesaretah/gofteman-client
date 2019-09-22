import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../stores/ModelStore";
import AuxiliaryTableIndex from "../containers/auxiliary_tables/index"
import * as MyActions from "../actions/MyActions";
import { dict} from '../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.state = {
      auxiliaryTables: [],
      auxiliaryTable: null,
      page: 1,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
  }

  componentDidMount(){
    this.loadData();
  }

  componentWillReceiveProps(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('auxiliary_tables', this.state.page);
  }

  getList(){
    var auxiliaryTables = ModelStore.getList()
    const self = this;
    self.$f7.preloader.hide();
    if (auxiliaryTables.length > 0){
      this.setState({
        auxiliaryTables: auxiliaryTables,
      });
    }
  }

  getInstance(){

  }

  render() {
    const {auxiliaryTable, auxiliaryTables} = this.state;

    return(<AuxiliaryTableIndex auxiliaryTables={auxiliaryTables}/>)
  }
}
