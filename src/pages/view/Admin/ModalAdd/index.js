import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import firebase from '../../../../firebase/index';
// import {storage} from '../../../../firebase/index'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};


const ModalAddEmployee = ({
  isModal,
  handleOk,
  category,
  handleCancel,
  addFood,
}) => {
  const [fileList, setFileList] = useState([

    ]);

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };

  //   const onPreview = async file => {
  //     let src = file.url;
  //     if (!src) {
  //       src = await new Promise(resolve => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file.originFileObj);
  //         reader.onload = () => resolve(reader.result);
  //       });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow.document.write(image.outerHTML);
  //   };
 
  const formRef = useRef(null);

  const onFinish = (user) => {
     
    const data = {...user.product, status: "A" };
    let file = user.product.image.fileList[0].originFileObj;
    // tạo folder chứa ảnh trên firesbase
    let storageRef = firebase.storage().ref(`images/${file.name}`);
    // đẩy ảnh lên đường dẫn trên
    // đẩy ảnh lên đường dẫn trên
    storageRef.put(file).then(function () {
      storageRef.getDownloadURL().then((url) => {
          
            // Tạo object mới chứa toàn bộ thông tin từ input
        const newData = {  
          ...data,
          image: url
      }
      // đẩy dữ liệu ra ngoài app.js thông qua props onAdd
      addFood(newData);

      })
  });

    
  };
  return (
    <Modal
      title="Thêm món ăn  "
      visible={isModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      footer={null}
    >
      <Form {...layout} ref={formRef} name="nest-messages" onFinish={onFinish}>
        <Form.Item
          name={["product", "productName"]}
          label="Tên món ăn"
          rules={[{ required: true, message: "Vui lòng điền tên sản phẩm " }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            name={["product", "image"]}
            label="Ảnh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm " }]}
         
        >
        <Upload 
        onChange={onChange}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
    //   defaultFileList={[...fileList]}
    fileList={fileList}
    >
        {fileList.length >= 1 ? null :  <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>} 
    </Upload>
        </Form.Item>
        <Form.Item
          name={["product", "price"]}
          label="Giá"
          rules={[{ required: true, message: "Vui lòng điền giá sản phẩm " }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={["product", "categoryId"]}
          label="Danh mục"
          rules={[{ required: true, message: "Vui lòng chọn danh mục " }]}
        >
          <Select>
            {category.map((item, index) => (
              <Select.Option value={item.id} key={index}>
                {item.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["product", "warehouses"]}
          label="Số lượng"
          rules={[
            { required: true, message: "Vui lòng điền số lượng sản phẩm " },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={["product", "unit"]}
          label="Đơn vị"
          rules={[
            { required: true, message: "Vui lòng điền đơn vị sản phẩm " },
          ]}
        >
          <Input />
        </Form.Item>
       

        <Form.Item
          name={["product", "description"]}
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng điền mô tả sản phẩm " }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          className="mt-3 "
          wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
        >
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddEmployee;
