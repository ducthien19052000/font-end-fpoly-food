import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";
import ChartsPage from "./chartData";
import "./index.css";

const Statistics = () => {
   
const [num,setNum] = useState(0)
const [numActive,setNumActive] = useState(0)
const [numShip,setNumShip] = useState(0)
const [numSuc,setNumSuc] = useState(0)

const isLogin = localStorage.getItem('islogin')

useEffect(() => {
  fetch(API_BASE_URL+`/dashboard/statistics/new`,{
    method: 'GET',
    headers: new Headers({
        'Content-Type' : 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${isLogin}`
    })
})
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
     
        setNum(res.body)
    

    return res
      
    }
    )
    .catch((error) => {

    });
    fetch(API_BASE_URL+`/dashboard/statistics/processing`,{
      method: 'GET',
      headers: new Headers({
          'Content-Type' : 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${isLogin}`
      })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
     
      setNumActive(res.body)
     

    return res
      
    }
    )
    .catch((error) => {

    });
    fetch(API_BASE_URL+`/dashboard/statistics/transport`,{
      method: 'GET',
      headers: new Headers({
          'Content-Type' : 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${isLogin}`
      })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
     
        setNumShip(res.body)
      

    return res
      
    }
    )
    .catch((error) => {

    });
    fetch(API_BASE_URL+`/dashboard/statistics/finish`,{
      method: 'GET',
      headers: new Headers({
          'Content-Type' : 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${isLogin}`
      })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
     
        setNumSuc(res.body)
      

    return res
      
    }
    )
    .catch((error) => {

    });
    
}, [isLogin]);
  
  return (
    <div>
      <Row>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span style={{fontWeight:500}}> Hóa đơn mới</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng: 
                </Col>
                <Col span={2}>
                 {num}
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn đang chế biến</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
               {numActive}
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn vận chuyển</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                {numShip}
                </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} md={6} className="colDashboard">
          <div className="layerTotal">
            <Row>
              <span  style={{fontWeight:500}}> Hóa đơn hoàn thành</span>
            </Row>
            <Row style={{justifyContent:'space-between'}}>
                <Col span={15}>
                    Số lượng:
                </Col>
                <Col span={2}>
                {numSuc} 
                </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row style={{ maxHeight: "500px" }}>

        <ChartsPage />
      </Row>
    </div>
  );
};

export default Statistics;
