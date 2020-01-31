import React from "react";
import { List, ListInput, BlockTitle, Block, Link, Button, Card, CardHeader, CardFooter, ListItem, Row} from 'framework7-react';
import { dict} from '../../Dict';
import ActualOptions from "../actuals/options";

const ActualForm = (props) => {
    if (props.meta && props.meta.meta_schema) {

        var meta_schema = props.meta.meta_schema
        var items = []
        for (let i = 0; i < meta_schema.length; i++) {
          switch (meta_schema[i].type) {
            case 'String':
            items.push(
              <ListInput
                label={meta_schema[i].label}
                type="text"
                placeholder="..."
                onInput={(e) => props.onChangeValue(meta_schema[i].fid, e.target.value, props.meta)}
                />)
            break;
            case 'Text':
                items.push(
                  <ListInput
                    label={meta_schema[i].name}
                    type="textarea"
                    placeholder="..."
                    onInput={(e) => props.onChangeValue(meta_schema[i].fid, e.target.value, props.meta)}
                    />
                )
            break;
            case 'Table':
                if (meta_schema[i].content && meta_schema[i].content.title) {
                  items.push(
                    <ListItem
                      title={meta_schema[i].content.title}
                      smartSelect
                      smartSelectParams={{pageBackLinkText: dict.back}}
                      >
                      <select name="content"
                        onChange={(e) => props.onChangeValue(meta_schema[i].fid, e.target.value, props.meta)}
                        >
                        <ActualOptions content={meta_schema[i].content.auxiliary_records}/>
                      </select>
                    </ListItem>
                  )}
              break;
            }
            }
              var submit = null
              if (props.submit) {
                submit = <CardFooter><Link></Link><Button className="col" fill onClick={props.submit}>{dict.submit}</Button></CardFooter>
              }
              return(
                <Card>
                  <CardHeader>{props.meta.title}</CardHeader>
                  <List form>
                    {items}
                    {submit}
                  </List>
                </Card>
              )
            }
            else {
              return(<div></div>)
            }
          }
  export default ActualForm;
