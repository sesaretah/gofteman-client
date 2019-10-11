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
import DocumentShow from "../../containers/documents/show"

export default class Layout extends Component {
  constructor() {
    super();
    this.getInstance = this.getInstance.bind(this);
    this.state = {
      document: null,
    }
  }

  componentWillMount() {
    ModelStore.on("got_instance", this.getInstance);
  }

  componentWillUnmount() {
    ModelStore.removeListener("got_instance", this.getInstance);
  }

  componentDidMount(){
      MyActions.getInstance('documents', this.$f7route.params['documentId']);
  }

  getInstance(){
    var document = ModelStore.getIntance()
    if (document){
      this.setState({
        document: document,
      });
    }
    }

  fab(){
    if (this.state.document){
      return(
        <Fab href={"/documents/"+this.state.document.id+"/edit"} target="#main-view"  position="left-bottom" slot="fixed" color="lime">
          <Icon ios="f7:edit" aurora="f7:edit" md="material:edit"></Icon>
          <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
        </Fab>
      )
    }
  }

  render() {
    const {document} = this.state;
    return (
      <Page>
        <Navbar title={dict.documents} backLink={dict.back} />
        <BlockTitle></BlockTitle>
        {this.fab()}
        <DocumentShow document={document}/>
      </Page>
    );
  }
}
