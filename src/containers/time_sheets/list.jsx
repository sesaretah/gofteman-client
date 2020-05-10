import React from "react";
import { List, ListItem, CardHeader, CardContent, CardFooter, Card, Button, Link } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";

const TimeSheetList = (props) => {

  if (props.time_sheets) {
    return (
      <Card>
        <CardHeader>
          {props.header}
        </CardHeader>
        <CardContent>
          <List mediaList className='fs-11'>
            {props.time_sheets.map((time_sheet) =>
              <ListItem
              className='fs-11'
                key={crypto.lib.WordArray.random(32)}
                link={"/time_sheets/" + time_sheet.id}
                ignoreCache={true}
                title={time_sheet.jdate}
                after=""
                subtitle={time_sheet.profile.fullname}
                text=""
              >
                 <img slot="media" src={time_sheet.profile.avatar} width="28" height="28"/>
              </ListItem>
            )}
          </List>
        </CardContent>
        <CardFooter>
          <Link></Link>
            <Button  onClick={() => props.loadMore(props.page)}>{dict.more}</Button>
        </CardFooter>
      </Card>
    )
  } else {
    return (<ul></ul>)
  }
}
export default TimeSheetList;
