import React from "react";
import { List, ListItem, CardHeader, CardContent, CardFooter } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const TaskList = (props) => {
  function title(t) {
    var date = new Date(new window.ODate(t))
    return (<Moment date={date} fromNow></Moment>)
  }
  function alerts(task) {
    var result = []
    if (task.deadline_alert) {
      result.push(
        <span className='color-red ml-5'>
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </span>
      )
    }
    if (task.report_alert) {
      result.push(
        <span className='color-blue ml-5'>
          <i class="fa fa-file-text-o " aria-hidden="true"></i>
        </span>
      )
    }
    if (task.comment_alert) {
      result.push(
        <span className='color-green mr-5'>
          <i class="fa fa-comments-o " aria-hidden="true"></i>
        </span>
      )
    }
    return (result)
  }

  function sort() {
    if (props.sortChange) {
      return (
        <a className=" fs-10 smart-select smart-select-init" data-open-in="popover">
          <select name="superhero" onChange={(e) => { props.sortChange({ title: e.target.value }) }}>
            <option value="title" key='option-title' >{dict.by_title}</option>
            <option value="events" key='option-events' selected>{dict.by_events}</option>
          </select>
          <div className="item-content">
            <div className="item-inner">
              <div className="item-title">{dict.sort_by}</div>
            </div>
          </div>
        </a>
      )
    }
  }

  if (props.tasks) {
    return (
      <React.Fragment>
        <CardHeader>
          {props.header}

          {sort()}
        </CardHeader>
        <CardContent>
          <List mediaList className='fs-11'>
            {props.tasks.map((task) =>
              <ListItem key={'task' + task.id} title={task.title} text={task.details} after={alerts(task)} link={'/tasks/' + task.id}></ListItem>
            )}
          </List>
        </CardContent>
        <CardFooter>
          {/* <span className='fs-10'>
            <span className='color-red ml-5'>
              <i class="fa fa-bell-o ml-5" aria-hidden="true"></i>
              {dict.deadline_near}
            </span>
            <span className='color-blue ml-5'>
              <i class="fa fa-file-text-o  ml-5" aria-hidden="true"></i>
              {dict.new_report}
            </span>
            <span className='color-green mr-5'>
              <i class="fa fa-comments-o ml-5" aria-hidden="true"></i>
              {dict.new_comments}
            </span>
            </span>*/}

        </CardFooter>
      </React.Fragment>

    )
  } else {
    return (<ul></ul>)
  }
}
export default TaskList;
