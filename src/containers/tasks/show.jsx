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
  if (props.task) {
    function tags(){
      var arr = []
      props.task.the_tags.map((tag) => 
      arr.push( <Chip text={tag.title} />)
      )
      return(arr)
    }
    function isPublic(){
      if (props.task.is_public){
        return(dict.public)
      } else {
        return(dict.private)
      }
    }


    return (
      <React.Fragment>
        <Row>
          <Col width='100' tabletWidth='50'>
            <Card>
              <CardHeader>
                {props.task.title}
                <Link><i className="ml-5 fa fa-cog"></i></Link>
              </CardHeader>
              <CardContent>
                <List simple-list>
                  {/*<ListItem className='fs-11' title={dict.start_date + ': ' + props.task.start_date_j}></ListItem>
                  <ListItem className='fs-11' title={dict.deadline + ': ' + props.task.deadline_date_j}></ListItem>*/}
                  <ListItem className='fs-11' title=''>{tags()}</ListItem>
                  <ListItem className='fs-11' title=''>{isPublic()}</ListItem>
                  <ListItem className='fs-11' title=''>{props.task.details}</ListItem>
                </List>

              </CardContent>
              <CardFooter>
                <Statuses task={props.task} searchStatus={props.searchStatus} statuses={props.statuses} addStatus={props.addStatus}></Statuses>

              </CardFooter>
            </Card>
          </Col>

          <Col width='100' tabletWidth='50'>
            <Participants task={props.task} searchProfile={props.searchProfile} removeProfile={props.removeProfile} addProfile={props.addProfile} profiles={props.profiles}></Participants>
          </Col>
        </Row>


        <Row>
          <Col width='100' tabletWidth='100'>
            <Works task={props.task} ></Works>
          </Col>
        </Row>

        <Row>
          <Col width='100' tabletWidth='100'>
            <Reports task={props.task} ></Reports>
          </Col>
        </Row>


        <BlockTitle>{dict.discussions}</BlockTitle>


        <CommentForm model={props.task} submit={props.submitComment} handleChange={props.handleChange} />
        <CommentList comments={props.comments} removeComment={props.removeComment} loadMore={props.loadMore}/>



      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default TaskShow;
