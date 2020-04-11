import React from "react";
import { Block, AccordionContent, Card, Row, Col, CardHeader, CardContent, List, ListItem, Chip, Icon, CardFooter, BlockTitle, Link } from 'framework7-react';
import { dict } from '../../Dict';
import Participants from './participants';
import Statuses from "./status";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const WorkShow = (props) => {
  if (props.work) {
    return (
      <React.Fragment>
        <Row>
          <Col width='100' tabletWidth='50'>
            <Card>
              <CardHeader>
                {props.work.title}
                <Link><i className="ml-5 fa fa-cog"></i></Link>
                </CardHeader>
              <CardContent>
                <List simple-list>
                  <ListItem className='fs-11' title={dict.start_date + ': ' + props.work.start_date_j}></ListItem>
                  <ListItem className='fs-11' title={dict.deadline + ': ' +props.work.deadline_date_j}></ListItem>
                  <ListItem className='fs-11' title=''></ListItem>
                </List>
                <span className='fs-11'>{props.work.details}</span>
                
              </CardContent>
              <CardFooter>
                <Statuses work={props.work} searchStatus={props.searchStatus} statuses={props.statuses} addStatus={props.addStatus}></Statuses>

              </CardFooter>
            </Card>
          </Col>

          <Col width='100' tabletWidth='50'>
            <Participants work={props.work} searchProfile={props.searchProfile} removeProfile={props.removeProfile} addProfile={props.addProfile} profiles={props.profiles}></Participants>
          </Col>
        </Row>


        <Row>
          <Col width='100' tabletWidth='100'>
            <Card>
              <CardHeader>
                {dict.works}
              </CardHeader>
              <CardContent>
                <List>
                  {props.work.works.map((work) =>
                    <ListItem title={work.title}></ListItem>
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
            {props.work.discussions.map((discussion) =>
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
export default WorkShow;
