import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import UserOptions from "../users/options";

const AssignmentForm = (props) => {
    return (
      <React.Fragment>
        <List form>
          <ListItem
            title={dict.username}
            smartSelect
            >
            <select name="content"
              onChange={(e) => {  props.handleChange({ user_id: e.target.value}) }}>
              <UserOptions users={props.users}/>
            </select>
          </ListItem>
        </List>
      <Block strong>
        <Row tag="p">
          <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
      </React.Fragment>
    )
  }
  export default AssignmentForm;
