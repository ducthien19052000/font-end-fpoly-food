import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import firebase from '../../../../firebase/index';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const ModalEditFood = ({
  isModal,
  handleOk,
  category,
  handleCancel,
  product,
  editFood,
}) => {
  const [form] = Form.useForm();
  const data = {
    productName: product.productName,
    image: product.image,
    price: product.price,
    categoryId: product.category.id,
    warehouses: product.warehouses,
    unit:product.unit,
    description: product.description,
  };
  form.setFieldsValue({ product: data });
  const [fileList, setFileList] = useState([{url:product.image}]);

  const [checkEdit,setCheckEdit]= useState(false)
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setCheckEdit(true)
    console.log(newFileList)
  };
  const onFinish = (user) => {
    const data = { ...user.product, status: "A" };
    console.log(user)
    console.log(product.id)

    if(checkEdit){
        let file = fileList[0].originFileObj;
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
          editFood(newData, product.id);
        handleCancel();
    
          })
      });
    }
    else{
        editFood(data, product.id);
        handleCancel();
    }
    
   
  };
  return (
    <Modal
      title="Sửa món ăn"
      visible={isModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      footer={null}
    >
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{ category: product.category.id }}
      >
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
              defaultFileList={fileList[0]}
            fileList={fileList}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
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
          rules={[
            { required: true, message: "Vui lòng chọn danh mục sản phẩm " },
          ]}
        >
          <Select defaultValue={product.category.name}>
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
