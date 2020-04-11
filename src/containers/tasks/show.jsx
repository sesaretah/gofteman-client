import React from "react";
import { Block, AccordionContent, Card, Row, Col, CardHeader, CardContent, List, ListItem, Chip, Icon, CardFooter, BlockTitle, Link } from 'framework7-react';
import { dict } from '../../Dict';
import Participants from './participants';
import Statuses from "./status";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const TaskShow = (props) => {
  if (props.task) {
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
                  <ListItem className='fs-11' title={dict.start_date + ': ' + props.task.start_date_j}></ListItem>
                  <ListItem className='fs-11' title={dict.deadline + ': ' + props.task.deadline_date_j}></ListItem>
                  <ListItem className='fs-11' title=''></ListItem>
                </List>
                <span className='fs-11'>{props.task.details}</span>

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
            <Card>
              <CardHeader>
                {dict.works}
                <Link href={'/works/new/' + props.task.id}><i className="ml-5 fa fa-plus"></i> {dict.new}</Link>
              </CardHeader>
              <CardContent>
                <List mediaList >
                  {props.task.works.map((work) =>
                    <ListItem
                    className='work-media'
                    link={"/works/" + work.id}
                    title={work.title}
                    after={                      <div className="chip" >
                    <div className="chip-media" style={{ backgroundColor: 'red' }} >
                        <i className="icon f7-icons if-not-md">plus_circle</i>
                        <i className="icon material-icons md-only"></i>
                    </div>
                  <div className="chip-label">{dict.settings}</div>
                </div>}
                    text={work.details}
                  >
                  </ListItem>
                  )}
                </List>
              </CardContent>
              <CardFooter>
                +
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <BlockTitle>{dict.discussions}</BlockTitle>
        <Block>
          <List>
            {props.task.discussions.map((discussion) =>
              <ListItem title={discussion.content}></ListItem>
            )}
          </List>
        </Block>


      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default TaskShow;
