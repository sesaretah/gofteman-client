import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../../stores/ModelStore";
import DocumentIndex from "../../containers/documents/index"
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
      documents: null,
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
    MyActions.getList('documents', this.state.page);
  }

  remove(h){
    MyActions.removeInstance('documents', h);
  }

  deleteIntance() {
    MyActions.getList('documents', this.state.page);
  }


  getList() {

  }

  getInstance(){

  }

  render() {
    const {documents} = this.state;
    return(<DocumentIndex documents={documents}/>)
  }
}
