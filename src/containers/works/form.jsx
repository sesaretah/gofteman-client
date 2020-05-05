import React from "react";
import { List, Col, ListInput, Block, Row, Button, BlockTitle, Card, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const WorkForm = (props) => {
  if (props.privateWork) {
    var isPrivateWork = true;
  } else {
    var isPrivateWork = false
  }

  function deleteButton() {
    if (props.editing) {
      return (
        <Col>
          <Button className="col ml-5" outline color='red' disabled={!props.editing} onClick={() => props.deleteWorkConfirm()}>{dict.delete}</Button>
        </Col>
      )
    }
  }
  return (
    <Card>
      <BlockTitle>{dict.work}</BlockTitle>
      <List >
        <ListInput
          label={dict.title}
          type="text"
          placeholder={dict.select_appropriate_title}
          defaultValue={props.work.title}
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

        <ListInput
          label={dict.priority}
          type="select"
          defaultValue={props.priority}
          onChange={(e) => {
            props.handleChange({ priority: e.target.value })
          }}
        >
          <option value="normal">{dict.normal}</option>
          <option value="high">{dict.high}</option>
          <option value="urgent">{dict.urgent}</option>
        </ListInput>


        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">{dict.start_date}</div>
              <div class="item-input-wrap">
                <input type="text" placeholder={dict.select_a_date} readonly="readonly" id="start-calendar" />
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">{dict.start_time}</div>
              <div class="item-input-wrap">
                <input type="text" placeholder={dict.select_a_time} value={props.startTime} readonly="readonly" id="start-time-picker" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content item-input">

          </div>
        </li>
        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">{dict.deadline}</div>
              <div class="item-input-wrap">
                <input type="text" placeholder={dict.select_a_date} readonly="readonly" id="deadline-calendar" />
              </div>
            </div>
          </div>
        </li>

        <li>
          <div class="item-content item-input">
            <div class="item-inner">
              <div class="item-title item-label">{dict.deadline_time}</div>
              <div class="item-input-wrap">
                <input type="text" placeholder={dict.select_a_time} value={props.deadlineTime} readonly="readonly" id="deadline-time-picker" />
              </div>
            </div>
          </div>
        </li>
      </List>

      <Block strong>
        <Row tag="p">
          {deleteButton()}
          <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </Card >

  )
}
export default WorkForm;
