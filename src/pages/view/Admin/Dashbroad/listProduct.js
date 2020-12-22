import { List } from "antd";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../constants";

const ListProduct = ({ id }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(API_BASE_URL + `/invoice/details/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        setProduct(
          res.body.cartProduct.map((item) => {
            return {
              name: item.productInfo.productName,
              quantity: item.quantity,
            };
          })
        );

        return res;
      })
      .catch((error) => {});
  }, [id]);

  console.log(product);

  return (
    <div>
      <List
        style={{ width: "100%" }}
        grid={{ gutter: 16, column: 5 }}
        dataSource={product}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "3px",
              border: "1px solid",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "16px" }}>
            {" "}
          x{item.quantity} {' '}
          {item.name}{" "}
            </span>
          </List.Item>
        )}
      />
      
    </div>
  );
};

export default ListProduct;
