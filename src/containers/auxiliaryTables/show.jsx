import React from "react";
import { Page, Navbar, List, BlockTitle, ListItem, Fab, Icon,Preloader, Block} from 'framework7-react';
import { dict} from '../../Dict';
import AuxiliaryRecordForm from "../auxiliary_records/form";
import AuxiliaryRecordList from "../auxiliary_records/list";

const AuxiliaryTableShow = (props) => {
  if (props.auxiliaryTable){
    return(
      <React.Fragment>
        <BlockTitle>{dict.title}</BlockTitle>
        <List simple-list>
          <ListItem>{props.auxiliaryTable.title}</ListItem>
        </List>
        <AuxiliaryRecordList auxiliaryTable={props.auxiliaryTable} records={props.records} removeRecord={props.removeRecord}/>
        <AuxiliaryRecordForm auxiliaryTable={props.auxiliaryTable} onChangeValue={props.handleChangeValue} submit={props.submit} handleChange={props.handleChange}/>
      </React.Fragment>
    )
  } else {
    return(null)
  }
}
export default AuxiliaryTableShow;
