import React from "react";
import { Block, AccordionContent, Card, Row, Col, CardHeader, CardContent, List, ListItem, Chip, Icon, CardFooter, BlockTitle, Link } from 'framework7-react';
import { dict } from '../../Dict';
import Participants from './participants';
import Statuses from "./status";
import Works from "./works";
import Reports from "./reports";
import CommentForm from "../comments/form"
import CommentList from "../comments/list"
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const TaskShow = (props) => {
  if (props.task && props.access) {
    function tags() {
      var arr = []
      props.task.the_tags.map((tag) =>
        arr.push(<Chip text={tag.title} />)
      )
      return (arr)
    }

    function isPublic() {
      if (props.task.is_public) {
        return (dict.public)
      } else {
        return (dict.private)
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
            task={props.task} searchStatus={props.searchStatus} editable={editable}
            statuses={props.statuses} addStatus={props.addStatus}
          />)
      }

      if (segment === 'participants') {
        var editable = false
        if (props.access.includes('participants')) {
          editable = true
        }
        return (
          <Participants
            task={props.task} searchProfile={props.searchProfile}
            removeProfile={props.removeProfile} addProfile={props.addProfile}
            profiles={props.profiles} changeRole={props.changeRole}
            editable={editable}
          />)
      }


      if (segment === 'works') {
        var editable = false
        if (props.access.includes('works')) {
          editable = true
        }
        return (<Works task={props.task} editable={editable} ></Works>)
      }

      if (segment === 'reports') {
        var editable = false
        if (props.access.includes('reports')) {
          editable = true
        }
        return (<Reports task={props.task} editable={editable} ></Reports>)
      }

      if (segment === 'comments') {
        if (props.access.includes('comments')) {
          return (<CommentForm model={props.task} submit={props.submitComment} handleChange={props.handleChange} />)
        }
      }

      if (segment === 'edit') {
        if (props.access.includes('edit')) {
          return (<Link href={'/tasks/' + props.task.id + '/edit'}><i className="ml-5 fa fa-cog"></i></Link>)
        }
      }

      if (segment === 'view') {
        if (props.access.includes('view')) {
          return (
            <React.Fragment>
            <Row>
              <Col width='100' tabletWidth='50'>
                <Card>
                  <CardHeader>
                    {props.task.title}
                    {access('edit')}
                  </CardHeader>
                  <CardContent>
                    <List simple-list>
                      <ListItem className='fs-11' title=''>{tags()}</ListItem>
                      <ListItem className='fs-11' title=''>{isPublic()}</ListItem>
                      <ListItem className='fs-11' title=''>{props.task.details}</ListItem>
                    </List>
    
                  </CardContent>
                  <CardFooter>
                    {access('statuses')}
                  </CardFooter>
                </Card>
              </Col>
    
              <Col width='100' tabletWidth='50'>
                {access('participants')}
              </Col>
            </Row>
    
    
            <Row>
              <Col width='100' tabletWidth='100'>
                {access('works')}
              </Col>
            </Row>
    
            <Row>
              <Col width='100' tabletWidth='100'>
                {access('reports')}
              </Col>
            </Row>
    
    
            <BlockTitle>{dict.discussions}</BlockTitle>
    
            {access('comments')}
            <CommentList comments={props.comments} removeComment={props.removeComment} loadMore={props.loadMore} />
          </React.Fragment>

          )
        }
      }

    }


    return (<React.Fragment>{access('view')}</React.Fragment>)
  } else {
    return (null)
  }
}
export default TaskShow;
