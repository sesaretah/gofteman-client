import React from "react";
import { List, BlockTitle, ListItem, Block, Row, Col, Button, Link } from 'framework7-react';
import { stateToHTML } from "draft-js-export-html";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import { dict } from '../../Dict';
import Moment from 'react-moment';
import JDate from 'jalali-date';
import 'moment-timezone';
import 'moment/locale/fa';



const ReportShow = (props) => {
  console.log(props)
  if (props.report && props.report.draft) {
    const contentState = convertFromRaw(props.report.draft);
    const editorState = EditorState.createWithContent(contentState);
    function parent(){
      if(props.report.the_work){
        return( <ListItem title={props.report.the_work.title} href={'/works/'+props.report.the_work.id}></ListItem>)
      }
      if(props.report.the_task){
        return( <ListItem title={props.report.the_task.title} href={'/tasks/'+props.report.the_task.id}></ListItem>)
      }
    }

    function creation(t) {
      var date = new Date(new window.ODate(t))
      return(<Moment date={date} fromNow></Moment>)
    }
    return (
      <React.Fragment>
        <Block>
          <Row>

          </Row>
        </Block>
        <List simple-list>
          {parent()}
        </List>

        <List simple-list>
        <ListItem
            key={'profile' + props.report.profile.id}
            title={props.report.profile.fullname}
            after=''>
            <img slot="media" src={props.report.profile.avatar} width="27" height="27" />
          </ListItem>
        </List>




        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.report.title}</ListItem>
        </List>

        <BlockTitle>{dict.content}</BlockTitle>
        <Editor editorState={editorState}
          toolbar={{ options: [] }}
          readOnly={true}
        />
        <List simple-list>
        <ListItem title={creation(props.report.creation_date)}></ListItem>
        </List>

        <BlockTitle>{dict.attachments}</BlockTitle>
        <List>
          {props.report.attachments.map((attachment) =>
            <li className="">
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title">
                    <a className="link external" target="_blank"  href={attachment.link}>
                      <i className="fa ml-5 fa-cloud-download" aria-hidden="true"></i>
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
  } else {
    return (null)
  }
}
export default ReportShow;
