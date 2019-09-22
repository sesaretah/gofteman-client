import React from "react";
import { List, ListItem} from 'framework7-react';
import crypto from 'crypto-js';

const WorkflowList = (props) => {

  if (props.workflows) {
    return (
      <List mediaList>
        {props.workflows.map((workflow) =>
          <ListItem
            key={crypto.lib.WordArray.random(32)}
            link={"/workflows/" + workflow.id}
            ignoreCache={true}
            title={workflow.title}
            after=""
            subtitle=""
            text="..."
            ></ListItem>
        )}
      </List>
    )} else {
      return (<ul></ul>)
    }
  }
  export default WorkflowList;
