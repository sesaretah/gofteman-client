import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const MetaList = (props) => {

  if (props.metas) {
    return (
      <List mediaList>
        {props.metas.map((meta) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/metas/" + meta.id}
            ignoreCache={true}
            title={meta.title}
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
  export default MetaList;
