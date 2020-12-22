import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Table, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryAction from "../../../../redux/Action/categoryAction";
import * as foodAction from "../../../../redux/Action/index";
import ModalAddEmployee from "../ModalAdd";
import ModalEditFood from "../ModalEdit/editFood";
import "./index.css";
import ToppingFood from "./toppingFood";

const Food = ({ foodAct, litsFoot, listGroup, categoryAct }) => {
  const [isModal, setIsModal] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isTopping,setIsTopping] = useState(false)
  const [productEdit,setProductEdit] = useState({})
  const [idProduct,setIdProduct] = useState()
    
  const [search, setSearch] = useState("");



  const onchange = e => {
      const {  value } = e.target;
      setSearch(value);
     
  };
  const handleOkTopping = (e) => {
    setIsTopping(false);
  };
  const handleCancelTopping = (e) => {
    setIsTopping(false);
  };
  
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
  const fetchEmployee = useCallback(() => {
    const { getData } = foodAct;
    const { getDataCategory } = categoryAct;
    getDataCategory();
    getData();
  }, [foodAct,categoryAct]);
  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee,isModalEdit ]);
  const product = litsFoot.filter(pr => {
    return pr.productName.toLowerCase().indexOf(search.toLowerCase()) !== -1;

});
  const handleAddFood = (data) =>{
    const {addData} = foodAct;
    addData(data);
    handleCancel()  
  }

  const handleEditFood=(data,id)=>{
    const {editData} = foodAct;
    editData(data,id);
    handleCancel()

  }

  const handleRemoveFood=(id)=>{
    const {deleteData} = foodAct;
    deleteData(id)
    // console.log(id)
  }

  const showModalEdit=(data)=>{
    setProductEdit(data)
    setIsModalEdit(true)
  } 
  const showModalTopping=(data)=>{
    setIsTopping(true)
    setIdProduct(data.id)
  } 

  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "productName",
      fixed: 'left',
      with: "10%",
      render: (text,index) => <span key={index}>{text}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      with: "10%",
      render: (text,index) => <span key={index}>{text} đ</span>
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      with: "10%",
      render: (text,index) => (
        <img style={{ height: "70px", width: "80px" }} src={text} key={index} />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      with: "10%",
      render: (text,index) => <span key={index}>{text.categoryName}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      with: "10%",
      ellipsis: {
        showTitle: false,
      },
      render: description => (
        <Tooltip placement="topLeft" title={description} >
          {description}
        </Tooltip>
      ),
      
    },
    {
      title: "Chi tiết",
      dataIndex: "",
      with: "10%",
      fixed: 'right',
      key: "x",
      render: (text, record,index) => (
          <div key={index}>
            <Button type='primary' onClick={()=>showModalTopping(record) }>
              Món ăn kèm
            </Button>
            
          </div>
        
      ),
    },
  
    {
      title: "",
      dataIndex: "",
      with: "10%",
      fixed: 'right',
      key: "x",
      render: (text, record,index) => (
          <div key={index}>
            <Button onClick={()=>handleRemoveFood(record.id)} >
              <DeleteFilled />
            </Button>
            <Button>
              <EditFilled  onClick={()=>showModalEdit(record)}/>
            </Button>
          </div>
        
      ),
    },
  ];

  const showModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <Row className="title-content-admin">
        <h4 className="title-h4">Quản lý món ăn</h4>
      </Row>
      <Row className="site-layout-content-admin">
        <Col xs={24} lg={24}>
          <Row className="top-content-food">
            <Col xs={24} lg={12} className="col-add-food">
              <Button size="large" type='primary' className='btn__addAdmin' onClick={showModal}>
                Thêm món ăn
              </Button>
            </Col>
            <Col span={6}></Col>
            <Col xs={24} lg={5} className="col-search-food">
            <Input placeholder="Tìm món ăn" size="large" name='search' type="text" onChange={onchange} />
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
          <ModalAddEmployee
            isModal={isModal}
            
            addFood={handleAddFood}
            category={listGroup}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        ) : (
          ""
        )}
        {isModalEdit === true ? (
          <ModalEditFood
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
        {isTopping === true ? (
          <ToppingFood
            isModal={isTopping}
            editFood={handleEditFood}
            product={productEdit}
            id={idProduct}
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
    litsFoot: state.foodData.lists,
    listGroup: state.groupData.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foodAct: bindActionCreators(foodAction, dispatch),
    categoryAct: bindActionCreators(categoryAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Food);
