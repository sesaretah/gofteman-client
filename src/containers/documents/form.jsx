import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
import Graph from "../Graph"
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import WorkflowOptions from "../workflows/options";
import RecordForm from "../auxiliary_records/form";

const DocumentForm = (props) => {
  if (props.document && props.workflows ) {
    return (
      <React.Fragment>
        <List form>
          <ListItem
            title={dict.workflow}
            smartSelect
            smartSelectParams={{pageBackLinkText: dict.back, searchbar:true, searchbarPlaceholder:dict.search}}
            >
            <select name="content"
              defaultValue={props.workflowId}
              onChange={(e) => { props.handleChange({ workflowId: e.target.value}) }}>
              <WorkflowOptions content={props.workflows}/>
            </select>
          </ListItem>
        </List>
        <List form>
          <ListInput
            label={dict.title}
            type="text"
            placeholder='...'
            value={props.document.title}
            onInput={(e) => {
              props.handleChange({ title: e.target.value})
            }}
            />
          <ListInput
            label={dict.abstract}
            type="textarea"
            placeholder='...'
            value={props.document.abstract}
            resizable
            onInput={(e) => {
              props.handleChange({ abstract: e.target.value})
            }}
            />
          <Editor
            editorState={props.editorState}
            placeholder={dict.content}
            textAlignment='right'
            toolbar={{options: ['inline', 'list', 'link'],   inline: { options: ['bold', 'italic', 'underline']}}}
            onEditorStateChange={props.onEditorStateChange}
            />
        </List>
          {props.auxiliaryTables.map((auxiliaryTable) =>
            <RecordForm auxiliaryTable={auxiliaryTable} onChangeValue={props.onChangeValue} />
          )}

      <Block strong>
        <Row tag="p">
          <Button className="col" fill disabled={!props.editing} onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
      </React.Fragment>
    )} else {
      return (null)
    }
  }
  export default DocumentForm;
