import React from "react";
import { Button, Icon} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const ActualList = (props) => {

  if(props.meta && props.actuals){
    var head = []
    var meta_schema =props.meta.meta_schema
    if (props.editable){
      head.push(<td>{dict.actions}</td>)
    }
    if (meta_schema){
      for (let i = 0; i < meta_schema.length; i++) {
        head.push(<td key={crypto.lib.WordArray.random(32)}>{meta_schema[i].label}</td>)
      }
    }

    var body = []
    var actuals = props.actuals
    for (let i = 0; i < actuals.length; i++) {
      if(actuals[i].content){
        var td = []
        for (let j = 0; j < meta_schema.length; j++) {
          if(actuals[i].content[j] && actuals[i].content[j].fid === meta_schema[j].fid) {
            td.push(<td key={crypto.lib.WordArray.random(32)}>{actuals[i].content[j].value}</td>)
          } else {
            td.push(<td key={crypto.lib.WordArray.random(32)}></td>)
          }
        }
        var trash = null
        if (props.editable) {
          trash = <td className="checkbox-cell" key={crypto.lib.WordArray.random(32)}>
            <Button color='gray' onClick={() => props.removeActual(actuals[i].uuid)}>
              <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
            </Button>
          </td>
        }
        body.push(<tr key={crypto.lib.WordArray.random(32)}>
        {trash}
        {td}
      </tr>)
    }
  }

  return(
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <td><b>{props.meta.title}</b></td>
          </tr>
          <tr>
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
export default ActualList;