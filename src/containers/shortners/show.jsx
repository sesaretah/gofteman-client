import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon, Preloader, Block, Link } from 'framework7-react';
import { dict } from '../../Dict';
import ItemForm from "../items/form"
import ItemList from "../items/list"


const ShortnerShow = (props) => {
  function editable() {
    if (props.editable) {
      return (
        <React.Fragment>
          <List simple-list className='mb-20'>
            
            <ItemForm handleChange={props.handleChange} submitItem={props.submitItem} rnd={props.rnd} />
            <ListItem><Link href={'https://r.ut.ac.ir/' + props.shortner.url}>https://r.ut.ac.ir/{props.shortner.url}</Link></ListItem>
          </List>
        </React.Fragment>
      )
    }
  }
  if (props.shortner) {
    return (
      <React.Fragment>
        <ItemList items={props.items} />
        {editable()}
      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ShortnerShow;
