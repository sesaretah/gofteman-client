import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, Chip, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TodoForm = (props) => {
  if (true) {
    function participants() {
        if (props.participants) {
          var chips = [<span className='fs-11'>{dict.todo_participants}: </span>]
          props.participants.map((participant) =>
            chips.push(<Chip text={participant.fullname} deleteable onClick={() => props.removeParticipant(participant.id)} />)
          )
          return chips
        }
      }
    return (
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder={dict.select_appropriate_title}
            defaultValue={props.title}
            required={true}
            onInput={(e) => {
              props.handleChange({ title: e.target.value })
            }}
          />
  
          <ListItem title={participants()}></ListItem>
          <li>
            <a className="item-link item-content" href="#" id="autocomplete-todos-participants">
  
              <div className="item-inner">
                <div className="item-title fs-11">{dict.new_todo_participants}</div>
                <input className="hidden" />
                <div className="item-after"></div>
              </div>
            </a>
          </li>
          <List className='fs-11 ' >
          {props.workParticipants.map((workParticipant) =>
          <ListItem
          checkbox
          checked={workParticipant.check}
          onChange={(e) => props.participantCheck(workParticipant.profile.id,e)}
          title={workParticipant.profile.fullname}
          after=''>
          </ListItem>
          
          )}
          </List>
  
  
  
        <Block strong>
          <Row tag="p">
            <Col>
            <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
            </Col>
          </Row>
        </Block>
        </List>
    )
  } else {
    return(null)
  }

}
export default TodoForm;
