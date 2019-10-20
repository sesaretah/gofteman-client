import React from "react";
import { List, ListItem} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const AuxiliaryTableType = (props) => {

  if (props.tableType) {
    var isBasic = true;
    var isRelation = false;
    if (props.tableType !== "Basic") {
        isBasic = false
        isRelation = true
    }
    return (
        <List>
      <ListItem radio value="Basic" checked={isBasic} name="table_type" title={dict.basic_table}
        onChange={(e) => {
          props.handleChange({ title: e.target.value})
          props.addTitleField()
        }}>
      </ListItem>
      <ListItem radio value="Relation" checked={isRelation} name="table_type" title={dict.relation_table}
        onChange={(e) => {
          props.handleChange({ table_type: e.target.value});
          props.removeTitlefield()
        }}>
      </ListItem>
      </List>
    )} else {
      return (null)
    }
  }
  export default AuxiliaryTableType;
