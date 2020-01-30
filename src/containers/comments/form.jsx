import React from "react";
import { List, ListInput, BlockTitle, Block, Link, Button, Card, CardHeader, CardFooter} from 'framework7-react';
import { dict} from '../../Dict';

const CommentForm = (props) => {
    return (
      <Card>
        <CardHeader>{dict.comment_form}</CardHeader>
        <List form>
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
        <CardFooter>
          <Link></Link>
          <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
        </CardFooter>
      </Card>
    )
  }
  export default CommentForm;
