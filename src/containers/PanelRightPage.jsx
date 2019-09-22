import React from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem,  FabButton, FabButtons, Fab, Icon } from 'framework7-react';
import { dict} from '../Dict';
export default () => (
  <Page>
    <Navbar title={dict.Divan} />
    <BlockTitle>{dict.home}</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"></ListItem>
      <ListItem link="/form/" title="Form"></ListItem>
    </List>
    <BlockTitle>{dict.settings}</BlockTitle>
    <List>
      <ListItem link="/documents/" title={dict.documents} view="#main-view" panelClose></ListItem>
      <ListItem link="/auxiliary_tables/" title={dict.auxiliary_tables} ignoreCache={true} view="#main-view" panelClose></ListItem>
      <ListItem link="/workflows/" title={dict.workflows} ignoreCache={true} view="#main-view" panelClose></ListItem>
      <ListItem link="/workflow_tables/" title={dict.workflow_tables} ignoreCache={true} view="#main-view" panelClose></ListItem>
    </List>
  </Page>
);
