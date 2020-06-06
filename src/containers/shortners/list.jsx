import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const ShortnerList = (props) => {

  if (props.shortners) {
    return (
      <List mediaList>
        {props.shortners.map((shortner) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/shortners/" + shortner.id}
            ignoreCache={true}
            title={shortner.url}
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
  export default ShortnerList;
