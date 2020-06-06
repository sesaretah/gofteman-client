import React from "react";
import { List, ListItem, BlockTitle, Row, Link, Col, Card } from 'framework7-react';
import { dict } from '../../Dict';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const CommentList = (props) => {
    var items = []
    function editLink(item) {
        var result = []
        if (item.editable) {
            result.push(
                <Link onClick={() => props.deleteCommentConfirm(item.id)}>
                    <i className="va ml-5 fa fa-trash"></i>
                </Link>
            )
        }
        result.push(
            <Link onClick={() => props.replyToComment(item.id)}>
                <i className="va ml-5 fa fa-reply"></i>
            </Link>
        )
        return (result)
    }

    function title(item) {
        var result = [<span>{item.profile.fullname}: </span>]
        if (item.reply_to) {
            result.push(<span className='fs-10 f-color-gray'>{dict.in_reply_to} {item.reply_to}</span>)
        }
        return (result)
    }
    if (props.items) {

        for (let i = 0; i < props.items.length; i++) {
            items.push(
                <Card>
                    <List mediaList inset>
                        <ListItem
                            href={props.items[i].href}
                            key={'item' + props.items[i].id}
                            target='_blank'
                            external={true}
                            id={'cm-' + props.items[i].id}
                            title={props.items[i].title}
                            subtitle={props.items[i].description}
                        >
                            <img slot="media" src={props.items[i].screencap} width="100" />
                        </ListItem>
                    </List>
                </Card>


            )
        }

        return (
            <React.Fragment>
                {items}
            </React.Fragment >
        )
    }
    else {
    return (<BlockTitle></BlockTitle>)
}
}
export default CommentList;