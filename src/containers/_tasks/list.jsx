import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const TaskList = (props) => {
  function title(t) {
    var date = new Date(new window.ODate(t))
    return(<Moment date={date} fromNow></Moment>)
  }
  if (props.tasks) {
    console.log(props.tasks)
    
    return (
      <List>
        {props.tasks.map((task) =>
        <ListItem header={task.title} title={title(task.deadline_date)} link={'/tasks/'+task.id}></ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default TaskList;
