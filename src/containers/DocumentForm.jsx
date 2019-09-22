import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  ListInput,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block, Icon
} from 'framework7-react';
import { dict} from '../Dict';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/editor.css';

export default class DocumentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

onEditorStateChange(editorState){
    this.setState({
    editorState,
  });
};


  render() {
    const { editorState } = this.state;
    return(
      <Page>
        <Navbar title={dict.documents} backLink="Back" >
          <a href="#" slot="nav-right">
            <Button fill small ><Icon fa="save"></Icon> {dict.save} </Button>
          </a>
        </Navbar>
        <BlockTitle>{dict.document_form}</BlockTitle>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder='...'
            />
          <ListInput
            label={dict.abstract}
            type="textarea"
            placeholder='...'
            resizable
            />
          <Editor
            editorState={editorState}
            placeholder={dict.content}
            toolbar={{options: ['inline', 'list', 'link'],   inline: { options: ['bold', 'italic', 'underline']}}}
            onEditorStateChange={this.onEditorStateChange}
            />

        </List>
      </Page>
    );
  }
}
