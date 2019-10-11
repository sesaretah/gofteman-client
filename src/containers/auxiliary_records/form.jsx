import React from "react";
import { List, ListItem, ListInput, Block, Row, Button, BlockTitle} from 'framework7-react';
import { dict} from '../../Dict';
import RecordOptions from "../auxiliary_records/options";
import crypto from 'crypto-js';

const RecordForm = (props) => {

  if (props.auxiliaryTable && props.auxiliaryTable.data_format) {
    var data_format = props.auxiliaryTable.data_format
    var items = []
    for (let i = 0; i < data_format.length; i++) {
      switch (data_format[i].type) {
        case 'String':
        items.push(
          <ListInput
            label={data_format[i].field_name}
            type="text"
            placeholder="..."
            onInput={(e) => props.onChangeValue(data_format[i].field_id, e.target.value, props.auxiliaryTable)}
            />)
            break;
            case 'Text':
            items.push(
              <ListInput
                label={data_format[i].field_name}
                type="textarea"
                placeholder="..."
                onInput={(e) => props.onChangeValue(data_format[i].field_id, e.target.value, props.auxiliaryTable)}
                />
            )
            break;
            case 'Table':
            if (data_format[i].field_data && data_format[i].field_data[0]) {
            items.push(
              <ListItem
                title={data_format[i].field_name}
                smartSelect
                smartSelectParams={{pageBackLinkText: dict.back}}
                >
                <select name="content"
                  onChange={(e) => props.onChangeValue(data_format[i].field_id, e.target.value, props.auxiliaryTable)}
                  >
                  <RecordOptions content={data_format[i].field_data}/>
                </select>
              </ListItem>
            )}
            break;
          }

        }
        var submit = null
        if (props.submit) {
          submit = <Block strong><Row tag="p"><Button className="col" fill onClick={props.submit}>{dict.submit}</Button></Row></Block>
        }
        return(
          <React.Fragment>
          <BlockTitle>{props.auxiliaryTable.title}</BlockTitle>
          <List form>
            {items}
            {submit}
          </List>
          </React.Fragment>
        )
      }
      else {
        return(<div></div>)
      }
    }
    export default RecordForm;
