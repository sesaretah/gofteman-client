import React from "react";
import { List, ListItem} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const AuxiliaryTableList = (props) => {

  if (props.auxiliaryTables) {
    return (
      <List mediaList>
        {props.auxiliaryTables.map((auxiliaryTable) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/auxiliary_tables/"+auxiliaryTable.id}
            title={auxiliaryTable.title}
            after=""
            subtitle=""
            text={dict[auxiliaryTable.table_type]}
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default AuxiliaryTableList;
