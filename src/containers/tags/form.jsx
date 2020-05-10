import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const TagForm = (props) => {

  if (props.isConfirmed) {
    var isConfirmedTag = true;
  } else {
    var isConfirmedTag = false
  }

  function confirm() {
    if (props.confirmable) {
      return (
        <List>
          <ListItem radio value={false} checked={!isConfirmedTag} name="selectedMode" title={dict.not_confirmed}
            onChange={(e) => {
              props.handleChange({ isConfirmed: JSON.parse(e.target.value) });
            }}>
          </ListItem>
          <ListItem radio value={true} checked={isConfirmedTag} name="selectedMode" title={dict.confirmed}
            onChange={(e) => {
              props.handleChange({ isConfirmed: JSON.parse(e.target.value) })
            }}>
          </ListItem>
        </List>
      )
    }

  }
  return (
    <React.Fragment>
      <BlockTitle>{dict.tag}</BlockTitle>
      <List >
        <ListInput
          label={dict.title}
          type="text"
          placeholder='...'
          defaultValue={props.tag.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />
      </List>
      {confirm()}

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default TagForm;
