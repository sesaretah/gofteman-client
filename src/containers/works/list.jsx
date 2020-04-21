import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const WorkList = (props) => {
  function title(t) {
    var date = new Date(new window.ODate(t))
    return(<Moment date={date} fromNow></Moment>)
  }
  if (props.works) {
    console.log(props.works)
    
    return (
      <List>
        {props.works.map((work) =>
        <ListItem key={'worklist' + work.id} header={work.title} title={title(work.deadline_date)} link={'/works/'+work.id}></ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default WorkList;
