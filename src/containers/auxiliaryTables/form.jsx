import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, Col, Icon, Page, Navbar, BlockTitle} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import AuxiliaryTableItems from "../auxiliaryTables/items";
import AuxiliaryTableType from "../auxiliaryTables/table_type";

const AuxiliaryTableForm = (props) => {
  if (props.auxiliaryTable) {
    return (
      <Page>
        <Navbar title="Form" backLink="Back" />
        <BlockTitle>{dict.auxiliary_table_form}</BlockTitle>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder="..."
            value={props.title}
            onInput={(e) => {
              props.handleChange({ title: e.target.value})
            }}
            />
          <AuxiliaryTableType tableType={props.auxiliaryTable.table_type} handleChange={props.handleChange} addTitleField={props.addTitleField} removeField={props.removeField} removeTitlefield={props.removeTitlefield}/>
        </List>
        <Block>
          <Row>
            <Col width="20">
              <Button fill color="green" onClick={props.addField}>
                <Icon ios="f7:add" aurora="f7:add" md="material:add"></Icon>
                {dict.add}
              </Button>
            </Col>
          </Row>
        </Block>
        <AuxiliaryTableItems fields={props.fields} auxiliaryTables={props.auxiliaryTables}  removeField={props.removeField} onChangeValue={props.onChangeValue}/>
        <Block strong>
          <Row tag="p">
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </Row>
        </Block>
      </Page>
    )} else {
      return (null)
    }
  }
  export default AuxiliaryTableForm;
