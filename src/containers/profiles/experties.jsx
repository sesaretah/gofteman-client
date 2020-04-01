import React from "react";
import { Row, CardHeader, Card, CardContent, Col, Link, CardFooter, Chip, Icon } from 'framework7-react';
import crypto from 'crypto-js';
import { dict } from "../../Dict";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fa';

const ExpertiesList = (props) => {

    if (props.experties) {
        if (props.editable) {
            return (
                <Row noGap>
                    {props.experties.map((expert) =>
                        <a onClick={() => props.removeExperties(expert)}>
                            <Chip text={expert} mediaBgColor="orange">
                                <Icon slot="media" aurora="fa:times"></Icon>
                            </Chip>
                        </a>
                    )}
                </Row>
            )
        } else {
            return (
                <Row noGap>
                    {props.experties.map((expert) =>
                        <a href={'/experties/'+expert}><Chip text={expert} /></a>
                    )}
                </Row>
            )
        }

    } else {
        return (null)
    }
}
export default ExpertiesList;
