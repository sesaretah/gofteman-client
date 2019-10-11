import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { dict} from '../../Dict';
import RecordList from "../auxiliary_records/list";

const DocumentShow = (props) => {
  if (props.document){
    const contentState = convertFromRaw(props.document.draft);
    const editorState = EditorState.createWithContent(contentState);
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.document.title}</ListItem>
        </List>

        <BlockTitle>{dict.abstract}</BlockTitle>
        <List simple-list>
          <ListItem>{props.document.abstract}</ListItem>
        </List>

        <BlockTitle>{dict.content}</BlockTitle>
        <Editor editorState={editorState}
          toolbar={{options: [],   inline: { options: []}}}
          readOnly={true} />
          {props.document.auxiliaries.map((auxiliary) =>
            <RecordList auxiliaryTable={auxiliary.auxiliary_table} records={auxiliary.records} removeRecord={props.removeRecord}/>
            )}
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default DocumentShow;
