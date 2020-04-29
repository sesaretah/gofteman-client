import React from "react";
import { List, Chip, ListInput, Block, Row, Button, BlockTitle, Card, ListItem, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TaskForm = (props) => {
  if (props.isPublic) {
    var isPublicTask = true;
  } else {
    var isPublicTask = false;
  }
  function tags() {
    if (props.tags) {
      var chips = [
        <div>
          <a className='fs-11 ' href="#" id='autocomplete-standalone-ajax'>
            <div className="item-title fs-11">
              <i className="va-minus-2 ml-5 fa fa-plus"></i>
              {dict.tags}:
        </div>
          </a>
        </div>]
      props.tags.map((tag) =>
        chips.push(<Chip text={tag.title} deleteable onClick={() => props.removeTag(tag.id)} />)
      )
      return chips
    }
  }

  function deleteButton() {
    if (props.editing) {
      return (
        <Col>
          <Button className="col ml-5" outline color='red' disabled={!props.editing} onClick={() => props.deleteTaskConfirm()}>{dict.delete}</Button>
        </Col>
      )
    }
  }

  function archive() {
    if (props.editing) {
      return (
        <List>
          <ListItem checkbox value={props.archived} checked={props.archived} title={dict.archived}
            onChange={(e) => {
              props.handleChange({ archived: !JSON.parse(e.target.value) })
            }}
          ></ListItem>
          <ListInput
            label={dict.archive_note}
            type="textarea"
            placeholder={dict.write_archive_note}
            value={props.archiveNote}
            onInput={(e) => {
              props.handleChange({ archiveNote: e.target.value })
            }}
          />

        </List>)
    }

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
          value={props.details}
          onInput={(e) => {
            props.handleChange({ details: e.target.value })
          }}
        />

        <ListItem radio value={false} checked={!isPublicTask} name="selectedMode" title={dict.private}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ isPublic: JSON.parse(e.target.value) });
          }}>
        </ListItem>
        <ListItem radio value={true} checked={isPublicTask} name="selectedMode" title={dict.public}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ isPublic: JSON.parse(e.target.value) })
          }}>
        </ListItem>


        <ListItem title={tags()}></ListItem>

      </List>

      {archive()}

      <Block strong>
        <Row tag="p">
          {deleteButton()}
          <Col>
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </Col>
        </Row>
      </Block>
    </Card >

  )
}
export default TaskForm;
