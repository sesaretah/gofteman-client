import React from "react";
import { List, Icon, ListInput, Block, Row, Button, BlockTitle } from 'framework7-react';
import { dict } from '../../Dict';
import crypto from 'crypto-js';
import UserOptions from "../users/options";

const AccessControlForm = (props) => {
    return (
        <React.Fragment>
            <BlockTitle>{dict.access_control_form}</BlockTitle>
            <List form inset>
                <ListInput
                    label={dict.item}
                    type="text"
                    placeholder='...'
                    onInput={(e) => {
                        props.handleChange({ abilityTitle: e.target.value })
                    }}
                />
                <ListInput
                    label={dict.value}
                    type="select"
                    defaultValue={true}
                    placeholder="Please choose..."
                    onChange={(e) => {
                        props.handleChange({ abilityValue: e.target.value })
                    }}
                >
                    <option value={true}>{dict.true}</option>
                    <option value={false}>{dict.false}</option>
                </ListInput>
            </List>
            <Block strong inset>
                <Row tag="p">
                    <Button className="col" fill onClick={props.addAbility}>{dict.submit}</Button>
                </Row>
            </Block>
        </React.Fragment>
    )
}
export default AccessControlForm;
