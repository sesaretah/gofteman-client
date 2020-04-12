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
            var date = new Date(new window.ODate(props.comments[i].created_at))
            var time = <React.Fragment><Link onClick={() => props.removeComment(props.comments[i].id)}><i className="va ml-5 fa fa-trash"></i></Link><Moment locale="fa" fromNow ago>{date}</Moment>{dict.ago}</React.Fragment>
            items.push(
                <ListItem
                    className='some-link'
                    text={time}
                    subtitle={props.comments[i].content}
                >
                    <img slot="media" src={props.comments[i].profile.avatar} width="44" height="44"/>
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
                <BlockTitle></BlockTitle>
            </React.Fragment>
        )
    }
    else {
        return ( <BlockTitle></BlockTitle>)
    }
}
export default CommentList;