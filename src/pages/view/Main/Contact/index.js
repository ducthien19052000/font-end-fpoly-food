import { Button, Col, Input, Row } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import React from 'react'
import './index.css'
const Contact = () => {
    return (
        <>
            <Row className='contactWrapped'>
                <Col className='colContainer' md={12} offset={6}>
                    <div style={{display:'flex',flexDirection:'column',marginTop:'20px'}}>
                        <h1 style={{fontSize:'3.2rem',fontWeight:600}}>Liên hệ</h1>
                        <Form layout='vertical'>
                            <FormItem label='Họ và tên' name='name'> 
                                    <Input placeholder='Điền họ tên' size='large'/>
                            </FormItem>
                            <FormItem label='Email' name='email'> 
                                    <Input placeholder='Điền email' size='large'/>
                            </FormItem>
                            <FormItem label='Số điện thoại' name='phone'> 
                                    <Input placeholder=''  size='large'/>
                            </FormItem>
                            <FormItem label='Địa chỉ' name='address'> 
                                    <Input placeholder='Điền địa chỉ' size='large'/>
                            </FormItem>
                            <FormItem label='Tiêu đề' name='title'> 
                                    <Input placeholder='Điền tiêu đề' size='large'/>
                            </FormItem>
                            <FormItem label='Nội dung' name='content'> 
                                    <Input.TextArea style={{height:'150px'}}/>
                            </FormItem>
                            <FormItem > 
                                    <Button className='btnContact'>
                                        Gửi thông tin
                                    </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Contact
