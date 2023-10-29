import { Table } from "antd";
import React from "react";

const OrderItemTable = ({ items }: { items: IOrder["items"] }) => {
  const tableData = items.map((item) => {
    return {
      key: item.item.itemId,
      ...item,
    };
  });

  return (
    <Table
      dataSource={tableData}
      pagination={false}
      columns={[
        {
          title: "Item ID",
          dataIndex: ["item", "itemId"],
          key: "itemId",
        },
        {
          title: "Item Name",
          dataIndex: ["item", "name"],
          key: "name",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
        },
        {
          title: "Unit Price (Rs.)",
          dataIndex: "priceAtOrderTime",
          key: "unitPrice",
        },
        {
          title: "Total Price (Rs.)",
          key: "total",
          dataIndex: "",
          align: "right",
          render: (text: any, record) => (
            <span>{record.quantity * record.priceAtOrderTime}</span>
          ),
        },
      ]}
    />
  );
};

export default OrderItemTable;
