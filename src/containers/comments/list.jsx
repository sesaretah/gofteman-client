import React from "react";
import { List, ListItem, BlockTitle, Row, Link, Col } from 'framework7-react';
import { dict } from '../../Dict';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const CommentList = (props) => {
    var items = []
    if (props.comments) {

        for (let i = 0; i < props.comments.length; i++) {
            var time = <React.Fragment><Link><i className="va ml-5 fa fa-trash"></i></Link><Moment locale="fa" fromNow ago>{props.comments[i].created_at}</Moment>{dict.ago}</React.Fragment>
            items.push(
                <ListItem
                    text={time}
                    subtitle={props.comments[i].content}
                >
                    <img slot="media" src={props.comments[i].profile.avatar} width="44" />
                </ListItem>

            )
        }

        return (
            <React.Fragment>
                <BlockTitle>{dict.comments}</BlockTitle>
                <List mediaList inset>
                    {items}
                </List>
                <Row noGap>
                    <Col></Col>
                    <Col className='center'>
                        <a className="gray-color" onClick={() => props.loadMore()}>
                            {dict.more}
                        </a>
                    </Col>
                    <Col></Col>
                </Row>
            </React.Fragment>
        )
    }
    else {
        return (null)
    }
}
export default CommentList;