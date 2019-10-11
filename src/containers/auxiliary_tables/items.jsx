import React from "react";
import { List, ListItem, ListInput, Block, Row, Col, Icon, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import AuxiliaryTableOptions from "../auxiliary_tables/options";

const AuxiliaryTableItems = (props) => {

  if (props.auxiliaryTables) {
    let items = []
    for (let i = 0; i < props.fields.length; i++) {
      items.push(
        <React.Fragment>
          <List form>
            <ListInput
              label={dict.field_name}
              type="text"
              placeholder="..."
              value={props.fields[i].field_name}
              onInput={(e) => {
                props.onChangeValue(i, 'field_name',  e.target.value)
              }}
              />
            <ListInput
              label={dict.type}
              type="select"
              defaultValue={props.fields[i].type}
              placeholder="Please choose..."
              onChange={(e) => {
                props.onChangeValue(i, 'type',  e.target.value)
              }}
              >
              <option value="String">{dict.string}</option>
              <option value="Text">{dict.text}</option>
              <option value="Date">{dict.date}</option>
              <option value="Table">{dict.table}</option>
            </ListInput>

            <AuxiliaryTableOptions i={i} fieldType={props.fields[i].type} auxiliaryTables={props.auxiliaryTables} onChangeValue={props.onChangeValue}/>

          </List>
          <Block>
            <Row>
              <Col width="20">
                <Button fill color="red" onClick={() => props.removeField(i)}>
                  <Icon ios="f7:delete" aurora="f7:delete" md="material:delete"></Icon>
                  {dict.remove}
                </Button>
              </Col>
            </Row>
          </Block>
        </React.Fragment>
      )
    }
    return(items)
  } else {
    return (null)
  }
}
export default AuxiliaryTableItems;
