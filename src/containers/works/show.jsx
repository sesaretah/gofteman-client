import React from "react";
import { Block, AccordionContent, Card, Row, Col, CardHeader, CardContent, List, ListItem, Chip, Icon, CardFooter, BlockTitle, Link } from 'framework7-react';
import { dict } from '../../Dict';
import Involvements from './involvements';
import Statuses from "./status";
import Reports from "./reports";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';
import CommentForm from "../comments/form"
import CommentList from "../comments/list"
import TodoList from "../todos/list"

const WorkShow = (props) => {
console.log(props.work)
  function archived(){
    if(props.work.archived){
      return(
        <Row>
        <Col width='100' tabletWidth='100'>
        <Card className='fs-11 card-orange'>
          <CardContent>
          <i class="ml-2 fa fa-exclamation-triangle" aria-hidden="true"></i>
          {dict.archived} <br/>
          {props.work.task.archive_note}
          </CardContent>
          
        </Card>
        </Col>
      </Row>
      )
    }

  }

  function access(segment) {
    if (segment === 'statuses') {
      var editable = false
      if (props.access.includes('statuses')) {
        editable = true
      }
      return (
        <Statuses
          work={props.work} searchStatus={props.searchStatus} editable={editable}
          statuses={props.statuses} addStatus={props.addStatus}
        />
      )
    }

    if (segment === 'involvements') {
      var editable = false
      if (props.access.includes('involvements')) {
        editable = true
      }
      return (
        <Involvements
          work={props.work} searchProfile={props.searchProfile}
          removeProfile={props.removeProfile} addProfile={props.addProfile}
          profiles={props.profiles} changeRole={props.changeRole}
          editable={editable} />
      )
    }

    if (segment === 'todos') {
      var editable = false
      if (props.access.includes('todos')) {
        editable = true
      }
      return (
        <TodoList 
        work={props.work} todos={props.todos} 
        editable={editable} todoChecked={props.todoChecked}
        deleteTodoConfirm={props.deleteTodoConfirm}
        />
      )
    }


    if (segment === 'reports') {
      var editable = false
      if (props.access.includes('reports')) {
        editable = true
      }
      return (<Reports work={props.work} editable={editable} ></Reports>)
    }

    if (segment === 'comments') {
      if (props.access.includes('comments')) {
        return (<CommentForm model={props.work} submit={props.submitComment} handleChange={props.handleChange} />)
      }
    }

    if (segment === 'edit') {
      if (props.access.includes('edit')) {
        return (<Link href={'/works/' + props.work.id + '/edit'}><i className="ml-5 fa fa-cog"></i></Link>)
      }
    }


    if (segment === 'view') {
      if (props.access.includes('view')) {
        return (
          <React.Fragment>
            {archived()}
            <Row>
              <Col width='100' tabletWidth='50'>
                <Card>
                  <CardHeader>
                    {props.work.title}
                    {access('edit')}
                  </CardHeader>
                  <CardContent>
                    <List simple-list>
                      <ListItem className='fs-11' title={dict.task + ': ' + props.work.task.title} href={'/tasks/' + props.work.task.id}></ListItem>
                      <ListItem className='fs-11' title={dict.start_date + ': ' + props.work.start_date_j}></ListItem>
                      <ListItem className='fs-11' title={dict.deadline + ': ' + props.work.deadline_date_j}></ListItem>

                      <ListItem className='fs-11' title=''></ListItem>
                    </List>
                    <span className='fs-11'>{props.work.details}</span>

                  </CardContent>
                  <CardFooter>
                    {access('statuses')}
                  </CardFooter>
                </Card>
              </Col>

              <Col width='100' tabletWidth='50'>
                {access('involvements')}
              </Col>
            </Row>

            <Row>
              <Col width='100' tabletWidth='100'>
                {access('todos')}
              </Col>
            </Row>

            <Row>
              <Col width='100' tabletWidth='100'>
                {access('reports')}
              </Col>
            </Row>
            {access('comments')}

            <CommentList comments={props.comments} deleteCommentConfirm={props.deleteCommentConfirm}  />

          </React.Fragment>
        )
      }
    }

  }

  if (props.work && props.access) {
    return (<React.Fragment>{access('view')}</React.Fragment>)
  } else {
    return (null)
  }
}
export default WorkShow;
