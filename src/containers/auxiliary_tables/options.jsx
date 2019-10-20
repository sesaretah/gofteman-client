import React from "react";
import { List, ListItem, Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const AuxiliaryTableOptions = (props) => {
  var options = []
  if(props.auxiliaryTables){
    for (let i = 0; i < props.auxiliaryTables.length; i++) {

      options.push(
        <option value={props.auxiliaryTables[i].id}>
          {props.auxiliaryTables[i].title}
        </option>
      )
    }

  }
  if (props.fieldType == 'Table') {
    return (
      <List>
        <ListItem
          title={dict.table}
          smartSelect
          >
          <select name="content"
            defaultValue={props.content}
            onChange={(e) => {
              props.onChangeValue(props.i, 'content',  e.target.value)
            }}>
            {options}
          </select>
        </ListItem>
      </List>
    )
  } else {
    return(null)
  }
}
export default AuxiliaryTableOptions;
