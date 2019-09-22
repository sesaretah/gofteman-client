import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import Graph from "../Graph"
const WorkflowForm = (props) => {
  if (props.workflow) {
    return (
      <React.Fragment>
      <List>
        <ListInput
          label={dict.title}
          type="text"
          placeholder="..."
          disabled={!props.editing}
          value={props.title}
          onInput={(e) => {
            props.handleChange({ title: e.target.value})
          }}
          />
      </List>
      <Graph g={props.workflow} e={props.editing}/>
      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
      </React.Fragment>
    )} else {
      return (null)
    }
  }
  export default WorkflowForm;
