import React from "react";
import { List, ListItem, BlockTitle, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const CommentList = (props) => {
    var items = []
    if (props.comments) {
        

        for (let i = 0; i < props.comments.length; i++) {
        var time  = <React.Fragment><Moment locale="fa" fromNow ago>{props.comments[i].created_at}</Moment>{dict.ago}</React.Fragment>
            items.push(
                <ListItem
                text={time}
                subtitle={props.comments[i].content}
                >
                <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg" width="44" />
              </ListItem>

            )
        }

        return (
            <React.Fragment>
                <BlockTitle>{dict.comments}</BlockTitle>
                <List mediaList inset>
                    {items}
                </List>
            </React.Fragment>
        )
    }
    else {
        return (null)
    }
}
export default CommentList;