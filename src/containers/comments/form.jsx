import React from "react";
import { List, ListInput, BlockTitle, Block, Row, Button} from 'framework7-react';
import { dict} from '../../Dict';

const CommentForm = (props) => {
    return (
      <React.Fragment>
        <BlockTitle>{dict.comment_form}</BlockTitle>
        <List form inset>
        <ListInput
            label={dict.comment}
            type="textarea"
            placeholder='...'
            resizable
            onInput={(e) => {
              props.handleChange({ commentContent: e.target.value})
            }}
            />
        </List>
      <Block strong inset>
        <Row tag="p">
          <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
        </Row>
      </Block>
      </React.Fragment>
    )
  }
  export default CommentForm;
