import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../../../redux/Action/categoryAction";
import ModalAddCategory from '../ModalAdd/addCategory';
import ModalEditCategory from "../ModalEdit/EditCategory";
import "./index.css";

const Category = ({ categoryAct, listGroup }) => {
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [productEdit,setProductEdit] = useState({})
  
  const [search, setSearch] = useState("");



  const onchange = e => {
      const {  value } = e.target;
      setSearch(value);
     
  };
  const fetchCategory = useCallback(() => {
    const { getDataCategory } = categoryAct;
    getDataCategory();

  }, [categoryAct]);
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory,isModal,isModalEdit]);

  const handleRemoveCategory=(id) =>{
    const {deleteData} = categoryAct;
    deleteData(id);
    
  }

  const handleOk = (e) => {
    setIsModal(false);
  };
  const handleCancel = (e) => {
    setIsModal(false);
  };
  const handleOkEdit = (e) => {
    setIsModalEdit(false);
  };
  const handleCancelEdit = (e) => {
    setIsModalEdit(false);
  };

  const handleAddFood = (data) =>{
    const {addData} = categoryAct;
    addData(data);
    setSearch('')
    handleCancel()  
  }
  const handleEditFood=(data,id)=>{
    const {editData} = categoryAct;
    editData(data,id);
    setSearch('')
    handleCancel()
  }
  const showModalEdit=(data)=>{
    setProductEdit(data)
    setIsModalEdit(true)
  } 
  const category = listGroup.filter(pr => {
    return pr.categoryName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

});
  const columns = [
    {
      title: "Tên thể loại",
      dataIndex: "categoryName",
      render: (text) => <span>{text}</span>,
      
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (text) => <img style={{ height: "70px", width: "80px" }} src={text}/>,
    },
     
 
    {
      title: "",
      dataIndex: "",
      with: 3,
    
      key: "x",
      render: (text, record) => (
        <>
          {" "}
          <>
            <Button onClick={()=>handleRemoveCategory(record.id)}>
              <DeleteFilled />
            </Button>
            <Button  onClick={()=>showModalEdit(record)}>
              <EditFilled />
            </Button>
          </>
        </>
      ),
    },
  ];

  const showModal = () => {
    setIsModal(true);
  };
  return (
    <>
      <Row className="title-content-admin">
        <h4 className="title-h4">Quản lý danh mục</h4>
      </Row>
      <Row className="site-layout-content-admin">
        <Col xs={24} lg={24}>
          <Row className="top-content-food">
            <Col xs={24} lg={12} className="col-add-food">
              <Button size="large"  type='primary'  onClick={showModal}>Thêm danh mục</Button>
            </Col>
            <Col span={6}></Col>
            <Col xs={24} lg={5} className="col-search-food">
            <Input placeholder="Tìm danh mục" size="large" name='search' type="text" onChange={onchange} />
            </Col>
          </Row>
          <Row>
            <Col xs={24} lg={24}>
              <Table
                className="table-food-admin"
                columns={columns}
                scroll={{ x: '100vh' }}
                expandable={{
                  expandedRowRender: (record) => (
                    <p style={{ margin: 0 }}>{record.name}</p>
                  ),
                }}
                dataSource={category}
              />
            </Col>
          </Row>
        </Col>
        {isModal === true ? (
          <ModalAddCategory
            isModal={isModal}
            
            addFood={handleAddFood}
            
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
        {isModalEdit === true ? (
          <ModalEditCategory
            isModal={isModalEdit}
            editFood={handleEditFood}
            product={productEdit}
            category={listGroup}
            handleOk={handleOkEdit}
            handleCancel={handleCancelEdit}
          />
        ) : (
          ""
        )}
      </Row>
    </>
  );
};

Category.propTypes = {};

const mapStateToProps = (state) => {
  return {
    listGroup: state.groupData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryAct: bindActionCreators(categoryAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
