import React from "react";
import { List, BlockTitle, ListInput, Link, CardFooter, Button, Card, CardHeader } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import UploadForm from "../uploads/form"
import fa from '../../js/fa.js';

const ReportForm = (props) => {
  function attachments() {
    if (props.previous_attachments) {
      return (
        <React.Fragment>
          <BlockTitle>{dict.previous_attachments}</BlockTitle>
          <List>
            {props.attachments.map((attachment) =>
              <li className="">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">
                      <a className="link" onClick={() => props.removeAttachment(attachment.id)}>
                        <i className="fa ml-5 fa-trash" aria-hidden="true"></i>
                        {attachment.filename}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </List>
        </React.Fragment>
      )
    }
  }
  if (props.report) {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>{dict.new_report}</CardHeader>
          <List >
            <ListInput
              label={dict.title + '*'}
              type="text"
              placeholder='...'
              maxlength='65'
              defaultValue={props.title}
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
