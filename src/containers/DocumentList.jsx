import React from 'react';
import { Page, Navbar, Link, Block, BlockTitle, List, ListItem} from 'framework7-react';

export default class WorkflowList extends React.Component {
  render() {
    return(
      <Page>
        <Navbar title="About" backLink="Back"></Navbar>
        <BlockTitle>Mail App</BlockTitle>
        <List mediaList>
          <ListItem
            link="#"
            title="Facebook"
            after="17:14"
            subtitle="New messages from John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ></ListItem>
        </List>
      </Page>
    );
  }
}
