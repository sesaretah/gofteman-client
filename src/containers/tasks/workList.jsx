import React from "react";
import { List, ListItem, CardHeader, CardContent, CardFooter } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const WorkList = (props) => {
  function title(t) {
    var date = new Date(new window.ODate(t))
    return (<Moment date={date} fromNow></Moment>)
  }
  function alerts(work) {
    var result = []
    if (work.deadline_alert) {
      result.push(
        <span className='color-red ml-5'>
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </span>
      )
    }
    if (work.report_alert) {
      result.push(
        <span className='color-blue ml-5'>
          <i class="fa fa-file-text-o " aria-hidden="true"></i>
        </span>
      )
    }
    if (work.comment_alert) {
      result.push(
        <span className='color-green mr-5'>
          <i class="fa fa-comments-o " aria-hidden="true"></i>
        </span>
      )
    }
    return(result)
  }

  if (props.works) {
    return (
      <React.Fragment>
        <CardHeader>
          {props.header}
        </CardHeader>
        <CardContent>
          <List mediaList className='fs-11'>
            {props.works.map((work) =>
              <ListItem   key={'workList'+work.id} title={work.title} text={dict.task + ':'+ work.task.title} after={alerts(work)} link={'/works/' + work.id}></ListItem>
            )}
          </List>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </React.Fragment>

    )
  } else {
    return (<ul></ul>)
  }
}
export default WorkList;
