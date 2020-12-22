import { Button, Form, Input, Modal } from 'antd';
import React, { useRef } from 'react';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const ModalAddMenu = ({ isModal, handleOk,category, handleCancel ,addFood}) => {
    const formRef = useRef(null);
 
    const onFinish = user => {
        const data ={ ...user.menu,status:'A'}
       
        addFood(data);
        handleCancel()
        
    };
    return (
        <Modal
            title="Thêm thực đơn "
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={null}
        >
            <Form  {...layout}  ref={formRef} name="nest-messages" onFinish={onFinish} >
            
                <Form.Item name={['menu', 'name']} label="Tên thực đơn" rules={[{ required: true ,message:'Vui lòng điền tên thực đơn'}]}>
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

export default ModalAddMenu;
