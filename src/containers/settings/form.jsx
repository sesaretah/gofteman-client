import React from "react";
import { List, ListItem, Toggle, Block, Row, Button, Chip, Col } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';


const SettingForm = (props) => {
  if (true) {
    function setting(item) {
      if (props.notification_setting && props.notification_setting[item]) {
        return (true)
      } else {
        if (props.notification_setting && props.notification_setting[item] == false) {
          return (false)
        } else {
          return (true)
        }
      }
    }

    function blockList() {
      var chips = [
        <div>
          <a className='fs-11 ' href="#" id='user-blocklist'>
            <div className="item-title fs-11">
              <i className="va-minus-2 ml-5 fa fa-user-plus"></i>
              {dict.profiles}:
          </div>
          </a>
        </div>
      ]
      if (props.blockList) {
        props.blockList.map((profile) => {
          chips.push(<Chip text={profile.fullname} deleteable onClick={() => props.removeBlocked(profile.id)} />)
        }
        )
      }
      return chips
    }

    return (
      <React.Fragment>
        <List form className='fs-11'>
          <ListItem>
            <span >{dict.private}</span>
            <Toggle className='pd-5' onChange={(e) => props.changeSetting(e, '')} />
            <span className='pd-10 fs-8'>{dict.if_someone_adds_you_youll_be_asked}</span>
          </ListItem>
        </List>

        <List>
          <ListItem title='sss'></ListItem>
          <ListItem title={blockList()}></ListItem>
        </List>

        <div className="data-table card">
          <table className='fs-11'>
            <thead>
              <tr>
                <td>{dict.notification_type}</td>
                <td>{dict.mail_notification}</td>
                <td>{dict.push_notification}</td>
                <td>{dict.sms}</td>
              </tr>
            </thead>
            <tbody>
              {}
              <tr>
                <td className='fs-11'>{dict.add_involvement_to_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_tasks_email')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_tasks_push')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_tasks_sms')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_tasks_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.remove_involvement_from_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_tasks_email')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_tasks_push')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_tasks_sms')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_tasks_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.change_status_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('change_status_tasks_email')} onChange={(e) => props.changeSetting(e, 'change_status_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('change_status_tasks_push')} onChange={(e) => props.changeSetting(e, 'change_status_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('change_status_tasks_sms')} onChange={(e) => props.changeSetting(e, 'change_status_tasks_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_works_to_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('add_works_to_tasks_email')} onChange={(e) => props.changeSetting(e, 'add_works_to_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_works_to_tasks_push')} onChange={(e) => props.changeSetting(e, 'add_works_to_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_works_to_tasks_sms')} onChange={(e) => props.changeSetting(e, 'add_works_to_tasks_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_reports_to_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_tasks_email')} onChange={(e) => props.changeSetting(e, 'add_reports_to_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_tasks_push')} onChange={(e) => props.changeSetting(e, 'add_reports_to_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_tasks_sms')} onChange={(e) => props.changeSetting(e, 'add_reports_to_tasks_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_comments_to_tasks}</td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_tasks_email')} onChange={(e) => props.changeSetting(e, 'add_comments_to_tasks_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_tasks_push')} onChange={(e) => props.changeSetting(e, 'add_comments_to_tasks_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_tasks_sms')} onChange={(e) => props.changeSetting(e, 'add_comments_to_tasks_sms')} /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_involvement_to_works}</td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_works_email')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_works_push')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_works_sms')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_works_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.remove_involvement_from_works}</td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_works_email')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_works_push')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_works_sms')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_works_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.change_status_works}</td>
                <td><Toggle className='pd-5' checked={setting('change_status_works_email')} onChange={(e) => props.changeSetting(e, 'change_status_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('change_status_works_push')} onChange={(e) => props.changeSetting(e, 'change_status_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('change_status_works_sms')} onChange={(e) => props.changeSetting(e, 'change_status_works_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_todos_to_works}</td>
                <td><Toggle className='pd-5' checked={setting('add_todos_to_works_email')} onChange={(e) => props.changeSetting(e, 'add_todos_to_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_todos_to_works_push')} onChange={(e) => props.changeSetting(e, 'add_todos_to_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_todos_to_works_sms')} onChange={(e) => props.changeSetting(e, 'add_todos_to_works_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_reports_to_works}</td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_works_email')} onChange={(e) => props.changeSetting(e, 'add_reports_to_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_works_push')} onChange={(e) => props.changeSetting(e, 'add_reports_to_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_reports_to_works_sms')} onChange={(e) => props.changeSetting(e, 'add_reports_to_works_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_comments_to_works}</td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_works_email')} onChange={(e) => props.changeSetting(e, 'add_comments_to_works_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_works_push')} onChange={(e) => props.changeSetting(e, 'add_comments_to_works_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_comments_to_works_sms')} onChange={(e) => props.changeSetting(e, 'add_comments_to_works_sms')} /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_involvement_to_todos}</td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_todos_email')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_todos_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_todos_push')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_todos_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_todos_sms')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_todos_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.remove_involvement_from_todos}</td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_todos_email')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_todos_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_todos_push')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_todos_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_todos_sms')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_todos_sms')} /></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.add_involvement_to_time_sheets}</td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_time_sheets_email')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_time_sheets_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_time_sheets_push')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_time_sheets_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('add_involvement_to_time_sheets_sms')} onChange={(e) => props.changeSetting(e, 'add_involvement_to_time_sheets_sms')} /></td>
              </tr>
              <tr>
                <td className='fs-11'>{dict.remove_involvement_from_timesheets}</td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_timesheets_email')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_timesheets_email')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_timesheets_push')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_timesheets_push')} /></td>
                <td><Toggle className='pd-5' checked={setting('remove_involvement_from_timesheets_sms')} onChange={(e) => props.changeSetting(e, 'remove_involvement_from_timesheets_sms')} /></td>
              </tr>

            </tbody>
          </table>
        </div>



      </React.Fragment>
    )
  } else {
    return (null)
  }

}
export default SettingForm;
