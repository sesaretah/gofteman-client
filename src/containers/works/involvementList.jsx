import React from "react";
import { List, ListItem, Link } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const InvolvementList = (props) => {
  if (props.involvements) {
    function select(involvement) {
      if (involvement.role !== 'Creator' && props.editable) {
        return (
          <select name="role" onChange={(e) => { props.changeRole(involvement.profile.id, e.target.value) }}>
            {option('Admin', involvement)}
            {option('Colleague', involvement)}
            {option('Observer', involvement)}
          </select>
        )
      }
    }
    function option(role, involvement) {
      var selected = false
      if (involvement.role == role) {
        selected = true
      }
      return (<option value={role} selected={selected}>{dict[role]}</option>)
    }
    function addLink(involvement) {
      if (props.removeProfile) {
        return (
          <div className='inline'>
            <a className=" fs-10 smart-select smart-select-init" data-open-in="popover">
              {select(involvement)}
              <div className="item-content">
                <div className="item-inner bg-w-after">
                  <div className="item-title">{dict.role}</div>
                  <div className="item-after mt-2">{dict[involvement.role]}</div>
                </div>
              </div>
            </a>
          </div>
        )
      }
    }
    return (
      <List className='fs-11'>
        {props.involvements.map((involvement) =>
          <ListItem
            key={'involvement' + involvement.profile.id}
            title={involvement.profile.fullname}
            after={addLink(involvement)}>
            <img slot="media" src={involvement.profile.avatar} width="27" height="27" />
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default InvolvementList;
