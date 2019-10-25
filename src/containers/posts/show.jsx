import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { dict} from '../../Dict';
import RecordList from "../auxiliary_records/list";

const PostShow = (props) => {
  if (props.post){
    const contentState = convertFromRaw(props.post.draft);
    const editorState = EditorState.createWithContent(contentState);
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.post.title}</ListItem>
        </List>

        <BlockTitle>{dict.content}</BlockTitle>
        <Editor editorState={editorState}
          toolbar={{options: [],   inline: { options: []}}}
          readOnly={true} />
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default PostShow;
