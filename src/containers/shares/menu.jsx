import React from "react";
import { Actions, ActionsLabel, ActionsGroup, ActionsButton, Icon, Button, Sheet, Toolbar, Link, PageContent, Block, ListInput, List , Row} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';

const ShareMenu = (props) => {
  if (props.model){
    if(props.channels){
      var options = []
      for (let i = 0; i < props.channels.length; i++) {
        options.push(
          <option value={props.channels[i].id} key={crypto.lib.WordArray.random(32)}>
            {props.channels[i].title}
          </option>
        )
      }
    }
    return(
      <React.Fragment>
        <Sheet className="demo-sheet" opened={props.sheetOpened} onSheetClosed={() => {props.handleChange({ sheetOpened: false})}}>
          <Toolbar>
            <div className="left"></div>
            <div className="right">
              <Link sheetClose>{dict.close}</Link>
            </div>
          </Toolbar>
          {/*  Scrollable sheet content */}
          <PageContent>

              <List>
                <ListInput
                  label={dict.channel}
                  type="select"
                  defaultValue="Male"
                  placeholder="Please choose..."
                  onChange={(e) => {
                    props.handleChange({ channel_id: e.target.value})}
                  }
                >
                  <Icon icon="demo-list-icon" slot="media"/>
                  {options}
                </ListInput>
</List>
            <Block strong>
              <Row tag="p">
                <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
              </Row>
            </Block>
          </PageContent>
        </Sheet>

        <Button className="col"  href={false} sheetOpen=".demo-sheet"><i class="va fas fa-retweet"></i></Button>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default ShareMenu;
