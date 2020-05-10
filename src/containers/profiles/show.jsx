import React from "react";
import { List, ListItem, Card } from 'framework7-react';
import { dict } from '../../Dict';
import { Chart } from 'react-charts'
import { color } from "d3";
import TaskList from "../tasks/list"
import WorkList from "../tasks/workList"
const ProfileShow = (props) => {

  if (props.profile) {
    console.log(props)
    return (
      <React.Fragment>
        <List className='fs-12'>
          <ListItem
            key={'profile-show' + props.profile.id}
            title={props.profile.fullname}
            after=''>
            <img slot="media" src={props.profile.avatar} width="27" height="27" />
          </ListItem>

        </List>
        <Card>
          <TaskList tasks={props.profile.the_tasks} header={dict.tasks} sortChange={props.sortChange} />
        </Card>
        <Card>
          <WorkList works={props.profile.the_works} header={dict.works} sortChange={props.sortChange} />
        </Card>
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ProfileShow;
