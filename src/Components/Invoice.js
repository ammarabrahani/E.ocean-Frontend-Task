import { Table, Popover, Input } from "antd";
import { AiFillEdit, AiFillDelete, AiOutlineMore } from "react-icons/ai";

const { Search } = Input;

const Invoice = () => {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const buttonWidth = 70;
  const columns = [
    { title: "ID", dataIndex: "name" },
    { title: "CUSTOMER NAME", dataIndex: "age" },
    { title: "AMOUNT", dataIndex: "age" },
    { title: "DATE", dataIndex: "age" },
    { title: "STATUS", dataIndex: "age" },
    {
      title: "ACTION",
      dataIndex: "age",
      render() {
        return (
          <>
            <Popover
              content={
                <div>
                  <a>
                    <AiFillEdit />
                  </a>
                  <a>
                    <AiFillDelete />
                  </a>
                </div>
              }
              title=""
              trigger="click"
              placement="rightBottom"
            >
              {" "}
              <AiOutlineMore />
            </Popover>
          </>
        );
      },
    },
  ];
  const onSearch = (value) => console.log(value);
  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />;
    </>
  );
};

export default Invoice;
