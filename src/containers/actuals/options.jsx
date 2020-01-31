import React from "react";

const ActualOptions = (props) => {
  var options = [<option value=''></option>]
  if(props.content){
    for (let i = 0; i < props.content.length; i++) {
      options.push(
        <option value={props.content[i].id}>
          {props.content[i].title}
        </option>
      )
    }

  }
  return options

}
export default ActualOptions;