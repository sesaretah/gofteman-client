import React from "react";
import { List, ListItem, ListInput, Link, CardFooter, Button, Card, CardHeader } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from "draft-js";
import ChannelOptions from "../channels/options";
import fa from '../../js/fa.js';
const PostForm = (props) => {
  if (props.post) {
    var channels = null;
    if (props.channels) {
      channels =
        <ListItem
          title={dict.channel}
          smartSelect
          smartSelectParams={{ pageBackLinkText: dict.back, searchbar: true, searchbarPlaceholder: dict.search }}
        >
          <select name="content"
            defaultValue={props.channelId}
            onChange={(e) => {
              props.handleChange({ channelId: e.target.value })
            }}>
            <ChannelOptions content={props.channels} />
          </select>
        </ListItem>
    }
    return (
      <React.Fragment>
        <Card>
          <CardHeader>{dict.post}</CardHeader>
          <List form>
            {channels}
            <ListInput
              label={dict.title}
              type="text"
              placeholder='...'
              value={props.post.title}
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
                options: ['inline', 'list', 'link', 'image'],
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

      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default PostForm;
