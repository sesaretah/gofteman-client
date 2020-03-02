import React from "react";
import { Card, Chip, CardContent, CardHeader, Col, Row } from 'framework7-react';
import { dict } from '../../Dict';

import { Chart } from 'react-charts'
import { color } from "d3";

const ProfileShow = (props) => {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  if (props.profile) {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <img src={props.profile.avatar} width="80"></img>
            <div className='profile-card'>{props.profile.fullname}</div>
          </CardHeader>
          <CardContent>
            <Chip text="Example Chip" />
            <Chip text="Another Chip" />
          </CardContent>
        </Card>
        <Row noGap>
          <Col></Col>
          <Col>
            <Card>
              <div
                style={{
                  display: 'inline-block',
                  borderRadius: '5px',
                  padding: '10px',
                  marginRight: '10px',
                  backgroundColor: 'white',
                  width: '200px',
                  height: '200px'
                }}
              >
                <Chart data={data} axes={axes} />
              </div>
            </Card>
          </Col>
        </Row>

      </React.Fragment>
    )
  } else {
    return (null)
  }
}
export default ProfileShow;
