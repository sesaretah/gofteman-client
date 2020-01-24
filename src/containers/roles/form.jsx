import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';


const RoleForm = (props) => {
    return (
      <React.Fragment>
        <BlockTitle>{dict.role}</BlockTitle>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder='...'
            defaultValue={props.role.title}
            onInput={(e) => {
              props.handleChange({ title: e.target.value})
            }}
            />
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
