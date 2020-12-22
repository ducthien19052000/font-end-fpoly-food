import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_BASE_URL } from "../../../../constants";
import moment from 'moment';
import { useForm } from "antd/lib/form/Form";

const ChartsPage = () => {
  const [labels, setLabels] = useState(["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"])
  const isLogin = localStorage.getItem('islogin')
  const [form] = useForm()
  var today = new Date();
  var date = (today.getMonth()+1)+'/'+today.getFullYear();
 const month = (today.getMonth()+1)
 const year=today.getFullYear()
  const [data, setData] = useState([12.2, 39, 3, 5, 2, 3, 20.5, 21, 50, 30, 20, 101])
  const [dataBar, setDataBar] = useState({
    labels: labels,
    datasets: [
      {
        label: "Triệu",
        data: data,
        backgroundColor: [
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(98,  182, 239,0.4)",
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(98,  182, 239, 1)",

        ]
      }
    ]
  })
  useEffect(()=>{
    form.setFieldsValue({year:moment(year,'YYYY'),month:month})
    fetch(API_BASE_URL+`/dashboard/chart/month/${date}`,{
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
       setDataBar({
        labels:res.body.key,
        datasets: [
          {
            label: "Triệu",
            data: res.body.vale,
            backgroundColor: [
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(98,  182, 239,0.4)",
             
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(98,  182, 239, 1)",
    
            ]
          }
        ]
      })     
      return res
        
      }
      )
      .catch((error) => {
  
      });
  },[isLogin])
  const [barChartOptions, setBarChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  })

  const onFinish = fieldsValue => {
    // Should format date value before submit.
    
    const values = {
      ...fieldsValue,
      'year': fieldsValue['year'].format('YYYY'),
     
    };
    const date = `${values.month}/${values.year}`
    fetch(API_BASE_URL+`/dashboard/chart/month/${date}`,{
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
        
        
       setDataBar({
        labels:res.body.key,
        datasets: [
          {
            label: "Triệu",
            data: res.body.vale,
            backgroundColor: 
            res.body.key.map(item=>{
              return "rgba(98,  182, 239,0.4)"
          })
              
            ,
            borderWidth: 2,
            borderColor: 
           res.body.key.map(item=>{
                "rgba(98,  182, 239, 1)"
              }),
              
            
          }
        ]
      })     
      return res
        
      }
      )
      .catch((error) => {
  
      });
    
  };


  return (
    <>
      <Col xs={24} md={23}>

        <h3 className="mt-5">Doanh thu</h3>
        <Form name="time_related_controls" onFinish={onFinish} form={form}>
          <Row>
            <Col  xs={24} md={3}>
            <Form.Item name="year" label="Năm" defaultValue='2020' rules={[{required:true,message:'Chưa chọn năm'}]}>
            <DatePicker picker="year" defaultValue={moment(year,'YYYY')} placeholder='chọn thời gian' />
          </Form.Item>
          </Col>
          <Col xs={24} md={12}>
          <Form.Item name="month" label="Tháng" rules={[{required:true,message:'Chưa chọn tháng'}]}>
            <Select
              
              style={{ width: 200 }}
              placeholder="Chọn tháng"
              defaultValue={month}
              // onChange={onChange}
            >
              <Option value="" key={0}></Option>
              <Option value="1" key={1}>Tháng 1</Option>
              <Option value="2" key={2}>Tháng 2</Option>
              <Option value="3" key={3}>Tháng 3</Option>
              <Option value="4" key={4}>Tháng 4</Option>
              <Option value="5" key={5}>Tháng 5</Option>
              <Option value="6" key={6}>Tháng 6</Option>
              <Option value="7" key={7}>Tháng 7</Option>
              <Option value="8" key={8}>Tháng 8</Option>
              <Option value="9" key={9}>Tháng 9</Option>
              <Option value="10" key={10}>Tháng 10</Option>
              <Option value="11" key={11}>Tháng 11</Option>
              <Option value="12" key={12}>Tháng 12</Option>

            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Form.Item  >
            <Button type='primary' htmlType='submit' >Xác nhận</Button>
          </Form.Item>
        </Form>

        <Row style={{ maxHeight: '300px' }} >
          <Bar data={dataBar} options={barChartOptions} width={300} height={300} />
        </Row>
      </Col>
    </>
  );

}

export default ChartsPage;