import React from "react";
import { List, ListItem, Link, Icon, Chip } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const SimpleList = (props) => {
  if (props.statuses) {
    function addLink(status) {
      if (props.addStatus) {
        return (<Link onClick={() => props.addStatus(status.id)}>{dict.select}</Link>)
      }
    }
    return (
      <List>
        {props.statuses.map((status) =>
          <ListItem
            title={
              <div className="chip" >
                <div className="chip-media" style={{ backgroundColor: status.the_color }} >
                  <i className="icon f7-icons if-not-md">plus_circle</i>
                  <i className="icon material-icons md-only"></i>
                </div>
                <div className="chip-label">{status.title}</div>
              </div>}
            after={addLink(status)}
          />
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default SimpleList;
