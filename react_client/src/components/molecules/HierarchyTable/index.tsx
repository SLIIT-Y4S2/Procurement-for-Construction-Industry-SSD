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

const HierarchyTable = ({
  allHierarchies,
}: {
  allHierarchies: IHierarchy[];
}) => {
  let data: DataType[] = [];

  for (let hierarchy of allHierarchies) {
    const obj = {
      key: allHierarchies.indexOf(hierarchy) + 1,
      hierarchyId: hierarchy.hierarchyId,
      lowerBoundPrice: hierarchy.lowerBoundPrice,
      upperBoundPrice: hierarchy.upperBoundPrice,
      managerInCharge: hierarchy.managerInCharge,
      description: `This hierarchy, ranging from ${hierarchy.lowerBoundPrice} - ${hierarchy.upperBoundPrice} inclusive can only be approved by ${hierarchy.managerInCharge} `,
    };
    data.push(obj);
  }

  return (
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
};

export default HierarchyTable;
