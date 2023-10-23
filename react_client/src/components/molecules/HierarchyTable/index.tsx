import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  hierarchyId: string;
  lowerBoundPrice: number;
  upperBoundPrice: number;
  managerInCharge: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Hierarchy Id", dataIndex: "hierarchyId", key: "hierarchyId" },
  {
    title: "Lower Bound Price",
    dataIndex: "lowerBoundPrice",
    key: "lowerBoundPrice",
  },
  {
    title: "Upper Bound Price",
    dataIndex: "upperBoundPrice",
    key: "upperBoundPrice",
  },
  {
    title: "Manager in Charge",
    dataIndex: "managerInCharge",
    key: "managerInCharge",
  },
];

const data: DataType[] = [
  {
    key: 1,
    hierarchyId: "John Brown",
    lowerBoundPrice: 32,
    upperBoundPrice: 45,
    managerInCharge: "ABC",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    hierarchyId: "Jim Green",
    lowerBoundPrice: 42,
    upperBoundPrice: 45,
    managerInCharge: "ABC",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 4,
    hierarchyId: "Joe Black",
    lowerBoundPrice: 32,
    upperBoundPrice: 45,
    managerInCharge: "ABC",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];

const HierarchyTable: React.FC = () => (
  <>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <>
            <p style={{ margin: 0 }}>{record.description}</p>
            <div
              style={{ display: "flex", justifyContent: "end", gap: "40px" }}
            >
              <Button icon={<EditOutlined />} type="primary" ghost>
                Edit
              </Button>
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </div>
          </>
        ),
      }}
      dataSource={data}
    />
  </>
);

export default HierarchyTable;
