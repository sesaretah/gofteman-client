import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const TimeSheetList = (props) => {

  if (props.time_sheets) {
    return (
      <List mediaList>
        {props.time_sheets.map((time_sheet) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/time_sheets/" + time_sheet.id}
            ignoreCache={true}
            title={time_sheet.jdate}
            after=""
            subtitle=""
            text=""
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default TimeSheetList;
