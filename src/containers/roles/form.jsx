import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const RoleForm = (props) => {
  if (props.defaultRole) {
    var isDefaultRole = true;
  } else {
    var isDefaultRole = false
  }
  
  return (
    <React.Fragment>
      <BlockTitle>{dict.role}</BlockTitle>
      <List >
        <ListInput
          label={dict.title}
          key='role-title'
          type="text"
          placeholder='...'
          defaultValue={props.role.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value })
          }}
        />
        <ListItem radio value={false} checked={!isDefaultRole} name="defaultRole" title={dict.NonDefault}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ defaultRole: JSON.parse(e.target.value) })
          }}>
        </ListItem>
        <ListItem radio value={true} checked={isDefaultRole} name="defaultRole" title={dict.Default}
          onChange={(e) => {
            console.log(e)
            props.handleChange({ defaultRole: JSON.parse(e.target.value) });
          }}>
        </ListItem>
      </List>

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
    </React.Fragment>
  )
}
export default RoleForm;
