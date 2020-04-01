import React from "react";
import { Card, Chip, CardContent, CardHeader, Col, Row, Tab, Tabs, Icon } from 'framework7-react';
import { dict } from '../../Dict';
import { Chart } from 'react-charts'
import { color } from "d3";
import ExpertiesList from "./experties";

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

      <Tabs>
        <Tab id="tab-1" className="page-content" tabActive>
          <Row>
            <Col width="100" tabletWidth="50">

              <Card>
                <CardHeader>
                  <img src={props.profile.avatar} width="80"></img>
                  <div className='profile-card'>{props.profile.fullname}</div>
                </CardHeader>
                <CardContent>
                  <ExpertiesList experties={props.profile.experties} />
                </CardContent>
              </Card>
            </Col>

            <Col width="100" tabletWidth="50">

            </Col>
          </Row>

        </Tab>
        <Tab id="tab-2" className="page-content">
          <Row noGap>
            <Col width="100" tabletWidth="50">
              <Card>
                <CardHeader>Chart</CardHeader>
                <CardContent className='ta-center'>
                  <div
                    style={{
                      display: 'inline-block',
                      borderRadius: '5px',
                      padding: '10px',
                      marginRight: '10px',
                      backgroundColor: 'white',
                      width: '250px',
                      height: '200px'
                    }}
                  >
                    <Chart data={data} axes={axes} />
                  </div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab id="tab-3" className="page-content">
          <div className="block-title">Only Tablet Side By Side</div>
          <Row>
            <Col width="100" tabletWidth="100">
              <div className="timeline timeline-sides">
                <div className="timeline-item">
                  <div className="timeline-item-date">21 <small>DEC</small></div>
                  <div className="timeline-item-divider"></div>
                  <div className="timeline-item-content">
                    <div className="timeline-item-inner">
                      <div className="timeline-item-time">12:30</div>
                      <div className="timeline-item-title">Title</div>
                      <div className="timeline-item-subtitle">Subtitle</div>
                      <div className="timeline-item-text">Text</div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-item-date">21 <small>DEC</small></div>
                  <div className="timeline-item-divider"></div>
                  <div className="timeline-item-content">
                    <div className="timeline-item-inner">
                      <div className="timeline-item-time">12:30</div>
                      <div className="timeline-item-title">Title</div>
                      <div className="timeline-item-subtitle">Subtitle</div>
                      <div className="timeline-item-text">Text</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>

    )
  } else {
    return (null)
  }
}
export default ProfileShow;
