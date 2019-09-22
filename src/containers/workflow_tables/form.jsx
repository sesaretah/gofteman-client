import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import RecordOptions from "../auxiliary_records/options";


const WorkflowTableForm = (props) => {
  if (props.workflows && props.auxiliaryTables) {
    return (
      <React.Fragment>
      <List>
        <ListItem
          title={dict.auxiliary_table}
          smartSelect
          >
          <select name="content"
            onChange={(e) => {  props.handleChange({ auxiliaryTableId: e.target.value}) }}>
            <RecordOptions content={props.auxiliaryTables}/>
          </select>
        </ListItem>

        <ListItem
          title={dict.workflow}
          smartSelect
          >
          <select name="content"
            onChange={(e) => {   props.handleChange({ workflowId: e.target.value})}}>
            <RecordOptions content={props.workflows}/>
          </select>
        </ListItem>
      </List>
      <Block strong>
        <Row tag="p">
          <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
      </React.Fragment>
    )} else {
      return (null)
    }
  }
  export default WorkflowTableForm;
