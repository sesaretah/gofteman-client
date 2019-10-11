import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import DocumentList from "./list"
import { dict} from '../../Dict';

const DocumentIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.documents} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/documents/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <DocumentList documents={props.documents}/>
    </Page>
  )
}
export default DocumentIndex;
