import { Table, Popover, Input, Button, Tag } from "antd";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { invoicesFetch } from "../Redux/invoiceSlice";
import InvoiceModal from "./InvoiceModal";

import moment from "moment";

const { Search } = Input;

const Invoice = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { geInvoices } = useSelector((state) => state);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoicesFetch());
    console.log(geInvoices?.items?.users);
  }, [dispatch]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const buttonWidth = 70;
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (recordId) => {
        return <b>{recordId}</b>;
      },
    },
    {
      title: "CUSTOMER NAME",
      render: (record) => {
        var fullName = `${record.firstName}`;
        return <div>{fullName}</div>;
      },
    },
    { title: "AMOUNT", dataIndex: "amount" },
    {
      title: "DATE",
      render: (record) => {
        return record?.courses?.map((item) => {
          return moment(item?.createdAt).format("YYYY-MM-DD");
        });
      },
    },
    {
      title: "STATUS",
      render: (record) => {
        return (
          <>
            {" "}
            {!record.is_blocked ? (
              <Tag className="tags" color={"green"}>
                Paid
              </Tag>
            ) : (
              <Tag className="tags" color={"red"}>
                UnPaid
              </Tag>
            )}
          </>
        );
      },
    },
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

  const closeAreaModal = (success = false) => {
    setIsModalVisible(false);
    // setEditArea(false);
    // if (success) {
    //   setReload((reload) => reload + 1);
    // }
  };

  const onSearch = (value) => console.log(value);
  return (
    <>
      <div>
        <Button
          key="open-add-area-modal"
          type="primary"
          onClick={() => {
            // setEditArea(false);
            setIsModalVisible(true);
          }}
        >
          + Add Area
        </Button>
        ,
      </div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />

      <InvoiceModal
        isModalVisible={isModalVisible}
        closeModal={closeAreaModal}
      />
      <Table
        columns={columns}
        dataSource={geInvoices?.items}
        onChange={onChange}
        rowKey={(record) => record._id}
      />
    </>
  );
};

export default Invoice;
