import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const ModalEditTopping = ({ isModal, handleOk, handleCancel,product ,editFood}) => {
    const [form] = Form.useForm()
    const data ={name:product.name,price:product.price}
    form.setFieldsValue({menu:data})
  
console.log(product)
 
    const onFinish = values => {
        
        const data ={ ...values.menu}
    
            editFood(data,product.id);
        handleCancel()
        
    };
    return (
        <Modal
            title="Cập nhật món ăn kèm"
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
           
            footer={null}
        >
            <Form  {...layout}  form={form}  name="nest-messages" onFinish={onFinish}   >
            
            <Form.Item name={['menu', 'name']} label="Tên món ăn kèm" rules={[{ required: true ,message:'Vui lòng nhập tên món ăn  kèm'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['menu', 'price']} label="Giá" rules={[{ required: true , message:'Vui lòng nhập giá'}]}>
                    <Input type='number' />
                </Form.Item>
                

                <Form.Item className="mt-3 " wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalEditTopping;
