import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const DocumentList = (props) => {

  if (props.documents) {
    return (
      <List mediaList>
        {props.documents.map((document) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/documents/" + document.id}
            ignoreCache={true}
            title={document.title}
            after=""
            subtitle=""
            text={document.abstract}
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default DocumentList;
