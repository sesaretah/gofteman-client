
import React from "react";
import { List, ListItem, Button, Icon, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
const AbilityList = (props) => {
    var body = []
    if (props.ability) {


        for (let i = 0; i < props.ability.length; i++) {
            var td = []
            body.push(<tr key={crypto.lib.WordArray.random(32)}>
                <td key={crypto.lib.WordArray.random(32)}>{props.ability[i].title}</td>
                <td key={crypto.lib.WordArray.random(32)}>{dict[props.ability[i].value]}</td>
                <td className="checkbox-cell" key={crypto.lib.WordArray.random(32)}>
                    <Button color='gray' onClick={() => props.removeAbility(props.ability[i].title)}>
                        <Icon ios="f7:trash" aurora="f7:trash" md="material:trash"></Icon>
                    </Button>
                </td>
            </tr>)
        }

        return (
            <React.Fragment>
            <BlockTitle>{dict.access_control_list}</BlockTitle>
            <div className="data-table card">
                <table>
                    <thead>
                        <tr>
                            <td>{dict.title}</td>
                            <td>{dict.value}</td>
                        </tr>
                    </thead>

                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
            </React.Fragment>

        )
    }
    else {
        return (null)
    }
}
export default AbilityList;