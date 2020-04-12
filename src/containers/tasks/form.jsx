import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle, Card } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TaskForm = (props) => {
  if (props.privateTask) {
    var isPrivateTask = true;
  } else {
    var isPrivateTask = false
  }
  return (
    <Card>
      <BlockTitle>{dict.task}</BlockTitle>
      <List form>
        <ListInput
          label={dict.title}
          type="text"
          placeholder={dict.select_appropriate_title}
          defaultValue={props.task.title}
          required={true}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />

        <ListInput
          label={dict.details}
          type="textarea"
          placeholder={dict.write_appropriate_description}
          value={props.content}
          onInput={(e) => {
            props.handleChange({ details: e.target.value })
          }}
        />


        <li>
          <a className="item-link item-content" href="#" id="autocomplete-standalone-ajax">

            <div className="item-inner">
              <div className="item-title">{dict.tags}</div>
              <input className="hidden" />
              <div className="item-after"></div>
            </div>
          </a>
        </li>
      </List>



      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </Card >

  )
}
export default TaskForm;
