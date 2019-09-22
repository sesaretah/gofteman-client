import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import WorkflowIndex from "../../containers/workflows/index"
import * as MyActions from "../../actions/MyActions";
import Framework7 from 'framework7/framework7.esm.bundle';
import { dict} from '../../Dict';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.state = {
      workflows: [],
      workflow: null,
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
    MyActions.getList('workflows', this.state.page);
  }

  getList(){
    var workflows = ModelStore.getList()
    if (workflows){
      this.setState({
        workflows: workflows,
      });
    }
  }

  render() {
    const {workflows} = this.state;

    return(<WorkflowIndex workflows={workflows}/>)
  }
}
