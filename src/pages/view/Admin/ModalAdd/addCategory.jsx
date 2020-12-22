import { Button, Form, Input, Modal } from 'antd';
import React, { useRef } from 'react';


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const ModalAddCategory = ({ isModal, handleOk,category, handleCancel ,addFood}) => {
    const formRef = useRef(null);
 
    const onFinish = user => {
        const data ={ ...user.category,status:'A'}
     
        addFood(data);
        handleCancel()
        
    };
    return (
        <Modal
            title="Thêm danh mục  "
            visible={isModal}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={null}
        >
            <Form  {...layout}  ref={formRef} name="nest-messages" onFinish={onFinish} >
            
                <Form.Item name={['category', 'categoryName']} label="Tên danh mục" rules={[{ required: true ,message:'Vui lòng điền tên danh mục '}]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['category', 'image']} label="Ảnh"  rules={[{ required: true,message:'Vui lòng điền ảnh danh mục ' }]}>
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

export default ModalAddCategory;
