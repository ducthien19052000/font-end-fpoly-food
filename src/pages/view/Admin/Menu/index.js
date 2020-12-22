import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as menuAction from "../../../../redux/Action/menuAction";
import ModalAddMenu from "../ModalAdd/addMenu";
import ModalEditMenu from "../ModalEdit/editMenu";
import FoodMenu from "./foodMenu";



const Menu = ({ menuAct, listGroup }) => {
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [productEdit,setProductEdit] = useState({})
  const [isTopping,setIsTopping] = useState(false)
  const [id,setId] =useState()
  const [search, setSearch] = useState("");
  const fetchmenu = useCallback(() => {
    const { getDataMenu } = menuAct;
    getDataMenu();

  }, [menuAct]);
  useEffect(() => {
    fetchmenu();
  }, [fetchmenu,isModal,isModalEdit]);

  const handleRemovemenu=(id) =>{
    const {deleteData} = menuAct;
    deleteData(id);
    
  }
  const onchange = e => {
    const {  value } = e.target;
    setSearch(value);
   
};
  const product = listGroup.filter(pr => {
    return pr.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;

});
 
  const handleOkTopping = (e) => {
    setIsTopping(false);
  };
  const handleCancelTopping = (e) => {
    setIsTopping(false);
  };
  const showModalTopping=(data)=>{
    setIsTopping(true)
    setId(data.id)
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
    const {addData} = menuAct;
    addData(data);
    // handleCancel()  
  }
  const handleEditFood=(data,id)=>{
    const {editData} = menuAct;
    editData(data,id);
    handleCancel()
  }
  const showModalEdit=(data)=>{
    setProductEdit(data)
    setIsModalEdit(true)
  } 

  const columns = [
    {
      title: "Tên thực đơn",
      dataIndex: "name",
      render: (text) => <span>{text}</span>,
      
    },
    {
      title: "Món ăn",
      dataIndex: "",
      render: (record) => <Button type='primary' onClick={()=>showModalTopping(record) }>Chi tiết</Button>,
      
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
            <Button onClick={()=>handleRemovemenu(record.id)}>
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
        <h4 className="title-h4">Quản lý thực đơn</h4>
      </Row>
      <Row className="site-layout-content-admin">
        <Col xs={24} lg={24}>
          <Row className="top-content-food">
            <Col xs={24} lg={12} className="col-add-food">
              <Button size="large"  type='primary'  onClick={showModal}>Thêm thực đơn</Button>
            </Col>
            <Col span={6}></Col>
            <Col xs={24} lg={5} className="col-search-food">
            <Input
                placeholder="Tìm thực đơn"
                size="large"
                name='search'
                onChange={onchange} 
              />
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
                dataSource={product}
              />
            </Col>
          </Row>
        </Col>
        {isModal === true ? (
          <ModalAddMenu
            isModal={isModal}
            
            addFood={handleAddFood}
            
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
        {isModalEdit === true ? (
          <ModalEditMenu
            isModal={isModalEdit}
            editFood={handleEditFood}
            product={productEdit}
            menu={listGroup}
            handleOk={handleOkEdit}
            handleCancel={handleCancelEdit}
          />
        ) : (
          ""
        )}
          {isTopping === true ? (
          <FoodMenu
            isModal={isTopping}
            editFood={handleEditFood}
            id={id}
            
            handleOk={handleOkTopping}
            handleCancel={handleCancelTopping}
          />
        ) : (
          ""
        )}
      </Row>
    </>
  );
};



const mapStateToProps = (state) => {
  return {
    listGroup: state.menuData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    menuAct: bindActionCreators(menuAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
