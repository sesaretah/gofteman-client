import React from "react"
import { Page,Fab, Icon } from 'framework7-react';
import ModelStore from "../stores/ModelStore";
import DocumentIndex from "../containers/documents/index"
import * as MyActions from "../actions/MyActions";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.state = {
      documents: [],
      document: null,
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
    const self = this;
    self.$f7.preloader.show();
    MyActions.getList('documents', this.state.page);
  }

  getList(){
    var documents = ModelStore.getList()
    const self = this;
    self.$f7.preloader.hide();
    if (documents){
      this.setState({
        documents: documents,
      });
  }
}

  render() {
    const {documents} = this.state;

    return(<DocumentIndex documents={documents}/>)
  }
}
