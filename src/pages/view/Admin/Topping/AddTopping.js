import { Button, Form, Input, Modal } from 'antd';
import React, { useRef } from 'react';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const ModalAddTopping = ({ isModal, handleOk,category, handleCancel ,addFood}) => {
    const formRef = useRef(null);
 
    const onFinish = user => {
        const data ={ ...user.menu,status:'A'}
    
        addFood(data);
        handleCancel()
        
    };
    return (
        <Modal
            title="Thêm món ăn kèm "
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
           
            footer={null}
        >
            <Form  {...layout}  ref={formRef} name="nest-messages" onFinish={onFinish} >
            
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

export default ModalAddTopping;
