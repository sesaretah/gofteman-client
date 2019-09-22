import React from "react";
import { List, ListItem, Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const RecordList = (props) => {

  if(props.auxiliaryTable && props.records){
    var head = []
    var data_format =props.auxiliaryTable.data_format
    if (data_format){
      for (let i = 0; i < data_format.length; i++) {
        head.push(<td key={crypto.lib.WordArray.random(32)}>{data_format[i].field_name}</td>)
      }
    }

    var body = []
    var records = props.records
    for (let i = 0; i < records.length; i++) {
      if(records[i].data_record){
        var td = []
        for (let j = 0; j < data_format.length; j++) {
          td.push(<td key={crypto.lib.WordArray.random(32)}>{records[i].data_record[data_format[j].field_id]}</td>)
        }
        body.push(<tr key={crypto.lib.WordArray.random(32)}>
        <td className="checkbox-cell" key={crypto.lib.WordArray.random(32)}>
          <Button color='gray' onClick={() => props.removeRecord(records[i].uuid)}>
            <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
          </Button>
        </td>
        {td}
      </tr>)
    }
  }

  return(
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <td>{dict.actions}</td>
            {head}
          </tr>
        </thead>

        <tbody>
          {body}
        </tbody>
      </table>
    </div>

  )
}
else {
  return(<div></div>)
}
}
export default RecordList;
