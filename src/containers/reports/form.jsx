import React from "react";
import { List, ListItem, ListInput, Link, CardFooter, Button, Card, CardHeader } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import UploadForm from "../uploads/form"

import fa from '../../js/fa.js';
const ReportForm = (props) => {
  if (props.report) {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>{dict.new_report}</CardHeader>
          <List form>
            <ListInput
              label={dict.title + '*'}
              type="text"
              placeholder='...'
              maxlength='65'
              value={props.report.title}
              onInput={(e) => {
                props.handleChange({ title: e.target.value })
              }}
            />
            <Editor
              editorState={props.editorState}
              placeholder={dict.content}
              localization={{
                locale: 'fa',
                translations: fa
              }}
              toolbar={{
                options: ['inline', 'list', 'link'],
                inline: { options: ['bold', 'italic', 'underline'] },
                image: {
                  uploadCallback: props.uploadImageCallBack,
                  previewImage: true,
                },
              }}
              onEditorStateChange={props.onEditorStateChange}
            />
          </List>
          
          <CardFooter>
            <Link></Link>
            <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
          </CardFooter>
        </Card>
        <UploadForm uploadableType='Report' uuid={props.uuid} />

      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ReportForm;
