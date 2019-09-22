import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import AuxiliaryTableIndex from "../../containers/workflow_tables/index"
import * as MyActions from "../../actions/MyActions";
import { dict} from '../../Dict';
import Framework7 from 'framework7/framework7.esm.bundle';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.remove = this.remove.bind(this);
    this.deleteIntance = this.deleteIntance.bind(this);

    this.state = {
      workflowTables: null,
      workflows: null,
      auxiliaryTables: null,
      workflowTable: null,
      page: 1,
    }
  }
  componentWillMount() {
    ModelStore.on("got_list", this.getList);
    ModelStore.on("deleted_instance", this.deleteIntance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_list", this.getList);
      ModelStore.removeListener("deleted_instance", this.deleteIntance);
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    const f7: Framework7 = Framework7.instance;
    f7.toast.show({ text: dict.receiving, closeTimeout: 2000, position: 'top'});
    MyActions.getList('workflow_tables', this.state.page);
    MyActions.getList('workflows', this.state.page);
    MyActions.getList('auxiliary_tables', this.state.page);
  }

  remove(h){
    MyActions.removeInstance('workflow_tables', h);
  }

  deleteIntance() {
    MyActions.getList('workflow_tables', this.state.page);
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
        case 'WorkflowTable':
        this.setState({
          workflowTables: listnklass[0],
        });
        break;
      }
    }
  }

  getInstance(){

  }

  render() {
    const {workflows, workflowTables, auxiliaryTables} = this.state;
    return(<AuxiliaryTableIndex workflowTables={workflowTables} workflows={workflows} auxiliaryTables={auxiliaryTables} remove={this.remove}/>)
  }
}
