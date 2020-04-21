import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, Chip, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TodoForm = (props) => {
  if (true) {
    function participantChecked(workParticipant) {
      var flag = false
      props.participants.map((participant) => {
        if (participant.id === workParticipant.profile.id) {
          flag = true
        }
      }
      )
      return flag
    }
    return (
      <List form>
        <ListInput
          key='todos-form-title'
          label={dict.title}
          type="text"
          placeholder={dict.select_appropriate_title}
          defaultValue={props.title}
          required={true}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />

        <List className='fs-11 ' >
          {props.workParticipants.map((workParticipant) =>
            <ListItem
              key={workParticipant.id}
              checkbox
              checked={participantChecked(workParticipant)}
              onChange={(e) => props.participantCheck(workParticipant.profile.id, e)}
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
    return (null)
  }

}
export default TodoForm;
