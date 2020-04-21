import React from "react";
import { Page, Navbar, Row, BlockTitle, Col, Fab, Icon, Card, Link } from 'framework7-react';
import TaskList from "./list"
import WorkList from "./workList"
import { dict } from '../../Dict';

const TaskIndex = (props) => {
  return (
    <Page>
      <Navbar title={dict.tasks} >
        <Link panelOpen="right">
          <Icon f7="bars"></Icon>
        </Link>
      </Navbar>
      <BlockTitle>{dict.list}</BlockTitle>
      <Fab href="/tasks/new" target="#main-view" position="left-bottom" slot="fixed" color="deeporange">
        <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
        <Icon ios="f7:close" aurora="f7:close" md="material:close"></Icon>
      </Fab>
      <Row>
        <Col width='100' tabletWidth='50'>
          <Card>
            <TaskList tasks={props.tasks} header={dict.your_tasks} sortChange={props.sortChange} />
          </Card>
        </Col>
        <Col width='100' tabletWidth='50'>
          <Card>
            <WorkList works={props.works} header={dict.your_newest_works} sortChange={props.sortChange} />
          </Card>
        </Col>

      </Row>

    </Page>
  )
}
export default TaskIndex;
