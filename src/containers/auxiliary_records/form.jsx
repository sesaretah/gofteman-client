import React from "react";
import { List, ListItem, ListInput, Block, Row, Button} from 'framework7-react';
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
            onInput={(e) => props.onChangeValue(data_format[i].field_id, e.target.value)}
            />)
            break;
            case 'Text':
            items.push(
              <ListInput
                label={data_format[i].field_name}
                type="textarea"
                placeholder="..."
                onInput={(e) => props.onChangeValue(data_format[i].field_id, e.target.value)}
                />
            )
            break;
            case 'Table':
            console.log(data_format[i]);
            if (data_format[i].field_data && data_format[i].field_data[0]) {
            items.push(
              <ListItem
                title={data_format[i].field_name}
                smartSelect
                >
                <select name="content"
                  onChange={(e) => props.onChangeValue(data_format[i].field_id, e.target.value)}
                  >
                  <RecordOptions content={data_format[i].field_data}/>
                </select>
              </ListItem>
            )}
            break;
          }

        }
        return(
          <List form>
            {items}
            <Block strong>
              <Row tag="p">
                <Button className="col" fill onClick={props.submit}>{dict.submit}</Button>
              </Row>
            </Block>
          </List>
        )
      }
      else {
        return(<div></div>)
      }
    }
    export default RecordForm;
