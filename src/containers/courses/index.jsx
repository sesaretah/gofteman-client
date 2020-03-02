import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import CourseList from "./list"
import { dict} from '../../Dict';

const CourseIndex = (props) => {
  return(
    <Page>
      <Navbar title={dict.courses} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/courses/new" target="#main-view"  position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <CourseList courses={props.courses}/>
    </Page>
  )
}
export default CourseIndex;
