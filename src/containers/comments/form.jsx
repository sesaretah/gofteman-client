import React from "react";
import { List, ListInput, BlockTitle, Block, Link, Button, Card, CardHeader, CardFooter } from 'framework7-react';
import { dict } from '../../Dict';
import InputTrigger from 'react-input-trigger';

const CommentForm = (props) => {
  return (
    <Card>
      <CardHeader>{dict.comment_form}</CardHeader>
      {/*<List form>
        <ListInput
          label={dict.comment}
          id="cm-form"
          type="textarea"
          placeholder='...'
          maxlength='300'
          resizable
          clearButton={true}
          onInput={(e) => {
            props.handleChange({ commentContent: e.target.value })
          }}
        />
        </List>*/}

      <form class="list">
        <ul>
          <li id="cm-form" class="">
            <div class="item-content item-input">
              <div class="item-inner">
                <div class="item-input-wrap">
                  <InputTrigger
                    trigger={{
                      keyCode: 56,
                      shiftKey: true,
                    }}
                    onStart={(metaData) => { props.toggleSuggestor(metaData); }}
                    onCancel={(metaData) => { props.toggleSuggestor(metaData); }}
                  >
                    <textarea placeholder="..." maxlength="300" class="resizable"
                      onInput={(e) => {
                        props.handleChange({ commentContent: e.target.value })
                      }}></textarea>
                  </InputTrigger>

                  <span class="input-clear-button"></span>
                </div>

              </div>
            </div>
          </li>
        </ul>
      </form>
      <div
                    id=""
                    style={{
                      position: "absolute",
                      width: "200px",
                      height: "60px",
                      borderRadius: "1px",
                      background: "white",
                      boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",

                      display: props.showSuggestor ? "block" : "none",
                      top: props.top +39,
                      left: props.left - 182,
                      zIndex: 100,
                    }}
                  >
                  </div>
      <CardFooter>
        <Link></Link>
        <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
      </CardFooter>
    </Card>
  )
}
export default CommentForm;
