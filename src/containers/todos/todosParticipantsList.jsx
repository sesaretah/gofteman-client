import React from "react";
import { List, ListItem, Chip, Link } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';

const TodosParticipantsList = (props) => {

  function addParticipants(todo) {
    var chips = []
    todo.participants.map((participant) =>
      chips.push(<Chip key={'chip' +'-'+todo.id +'-'+ participant.profile.id} className="ml-5" text={participant.profile.fullname} />)
    )
    chips.push(<Link key={'todoEdit'+ todo.id} href={'/todos/' + todo.id + '/edit'}><i className="ml-5 fa fa-edit"></i></Link>)
    chips.push(<Link key={'todoDelete'+ todo.id} onClick={() => props.deleteTodoConfirm(todo.id)}><i className="ml-5 fa fa-trash"></i></Link>)
    return (chips)

  }
  function lt(todo) {
    if (todo.check) {
      return ('of-scroll line-through ')
    } else {
      return ('of-scroll')
    }
  }
  if (props.todos) {
    return (
      <List className='fs-11 ' >
        {props.todos.map((todo) =>

          <li className={lt(todo)} key={'todo' + todo.id}>
            <label className="item-content item-checkbox">
              <input type="checkbox" value="" checked={todo.check} onChange={(e) => props.todoChecked(todo.id,e)}></input>
              <i className="icon icon-checkbox"></i>
              <div className="item-inner of-scroll">
                <div className="item-title of-visible mw-auto">{todo.title}</div>
                <div className="item-after">
                  <span>
                    {addParticipants(todo)}
                  </span>
                </div>
              </div>
            </label>
          </li>
        )}
      </List>

    )
  } else {
    return (<ul></ul>)
  }
}
export default TodosParticipantsList;
        /*<ListItem
className={lt(todo)}
checkbox
checked={todo.check}
onChange={(e) => props.todoChecked(todo.id,e)}
title={todo.title}
after={addParticipants(todo)}>
</ListItem>*/