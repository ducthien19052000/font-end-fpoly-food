import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const ModalEditMenu = ({ isModal, handleOk, handleCancel,product ,editFood}) => {
    const [form] = Form.useForm()
    const data ={name:product.name,}
    form.setFieldsValue({menu:data})
  
console.log(product)
 
    const onFinish = values => {
       
        const data ={ ...values.menu}
      
            editFood(data,product.id);
        handleCancel()
        
    };
    return (
        <Modal
            title="Cập nhật thực đơn"
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={null}
        >
            <Form  {...layout}  form={form}  name="nest-messages" onFinish={onFinish}   >
            
            <Form.Item name={['menu', 'name']} label="Tên danh mục" rules={[{ required: true ,message:'Vui lòng điền tên thực đơn '}]}>
                    <Input />
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

export default ModalEditMenu;
