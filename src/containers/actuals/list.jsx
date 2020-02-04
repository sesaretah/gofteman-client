import React from "react";
import { Button, Icon, Card, ListInput, List, BlockTitle} from 'framework7-react';
import { dict} from '../../Dict';
import crypto from 'crypto-js';
const ActualList = (props) => {
  var meta_schema =props.meta.meta_schema
  if(props.meta && props.actuals){
  var body = [<BlockTitle>{props.meta.label}</BlockTitle>]
    var td = []
    var actuals =  props.actuals
    for (let i = 0; i < actuals.length; i++) {
     var content = actuals[i].content
     var td = []
      for (let j= 0; j < content.length; j++) {
        //console.log(content[j])
          td.push(<ListInput key={crypto.lib.WordArray.random(32)} label={content[j].label} type="text" defaultValue={content[j].value}/>)
        
        if( props.editable && content[j] && j == meta_schema.length - 1 && props.meta.id == content[j].metaId){
          td.push(<Button color='gray' onClick={() => props.removeActual(actuals[i].uuid)}>
          <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
        </Button>)
        }
      }
      body.push(<Card><List key={crypto.lib.WordArray.random(32)}>{td}</List></Card>)
    }

    


  return(
    <React.Fragment>
      {body}
    </React.Fragment>
  )
}
else {
  return(<div></div>)
}
}
export default ActualList;