import React from "react";
import { Page, Navbar, Row, BlockTitle, Col, Fab, Icon, Preloader, Block, Card, CardFooter, CardContent, CardHeader } from 'framework7-react';
import TimeSheetList from "./list"
import { dict } from '../../Dict';

const TimeSheetIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.time_sheets} backLink={dict.back} >
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/time_sheets/new" target="#main-view" position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <Row>
        <Col width='100' tabletWidth='50'>
          <TimeSheetList
            time_sheets={props.related_time_sheets} header={dict.sent_to_me}
            page='page_related' loadMore={props.loadMore}
          />
        </Col>
        <Col width='100' tabletWidth='50'>
          <TimeSheetList
            time_sheets={props.mine_time_sheets} header={dict.sent_by_me}
            page='page_mine' loadMore={props.loadMore}
          />
        </Col>
      </Row>

    </Page>
  )
}
export default TimeSheetIndex;
