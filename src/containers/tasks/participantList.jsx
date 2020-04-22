import React from "react";
import { List, ListItem, Link } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const ParticipantList = (props) => {
  if (props.participants) {
    function select(participant) {
      if (participant.role !== 'Creator' && props.editable) {
        return (
          <select name="role" onChange={(e) => { props.changeRole(participant.profile.id, e.target.value) }}>
            {option('Admin', participant)}
            {option('Confirmer', participant)}
            {option('Colleague', participant)}
            {option('Observer', participant)}
          </select>
        )
      }
    }
    function option(role, participant) {
      var selected = false
      if (participant.role == role) {
        selected = true
      }
      return (<option value={role} selected={selected}>{dict[role]}</option>)
    }
    function addLink(participant) {
      if (props.removeProfile) {
        return (
          <div className='inline'>
            <Link className="mt-4" onClick={() => props.removeProfile(participant.profile.id)}>{dict.remove}</Link>
            <a className=" fs-10 smart-select smart-select-init" data-open-in="popover">
              {select(participant)}
              <div className="item-content">
                <div className="item-inner bg-w-after">
                  <div className="item-title">{dict.role}</div>
                  <div className="item-after mt-2">{dict[participant.role]}</div>
                </div>
              </div>
            </a>
          </div>
        )
      }
    }
    return (
      <List className='fs-11'>
        {props.participants.map((participant) =>
          <ListItem
            key={participant.profile.id}
            title={participant.profile.fullname}
            after={addLink(participant)}>
            <img slot="media" src={participant.profile.avatar} width="27" height="27" />
          </ListItem>
        )}
      </List>
    )
  } else {
    return (<ul></ul>)
  }
}
export default ParticipantList;
