import {
  Table,
  Popover,
  Input,
  Button,
  Tag,
  Popconfirm,
  Row,
  Col,
  Card,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  invoicesFetch,
  searchInvoice,
} from "../Redux/invoiceSlice";
import InvoiceModal from "./InvoiceModal";
import { DailyChart, WeeklyChart } from "./InvoiceCharts";

import moment from "moment";
const { Meta } = Card;

const { Search } = Input;

const Invoice = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [loading, setLoading] = useState(true);

  const [invoiceIndex, setinvoiceIndex] = useState(false);

  const { geInvoices } = useSelector((state) => state);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoicesFetch());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleInvoiceEdit = (invoice) => {
    const findIndex = geInvoices.items.findIndex(
      (item) => item.uuid === invoice.uuid
    );

    setinvoiceIndex(findIndex);
    setEditInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleInvoiceDelete = (invoice) => {
    const findIndex = geInvoices.items.findIndex(
      (item) => item.uuid === invoice.uuid
    );
    dispatch(deleteInvoice(findIndex));
  };

  const buttonWidth = 70;
  const columns = [
    {
      title: "ID",
      render: (record, i) => {
        return <b>{record?.number}</b>;
      },
    },
    {
      title: "CUSTOMER NAME",
      render: (record) => {
        return <div>{record.customer_name}</div>;
      },
    },
    { title: "AMOUNT", dataIndex: "amount" },
    {
      title: "DATE",
      render: (record) => {
        return moment(record?.date_invoice).format("YYYY-DD-MM");
      },
    },
    {
      title: "STATUS",
      render: (record) => {
        return (
          <>
            {" "}
            {record.status === "Completed" ? (
              <Tag className="tags green" color={"green"}>
                PAID
              </Tag>
            ) : record.status === "Pending" ? (
              <Tag className="tags red" color={"red"}>
                UNPAID
              </Tag>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: "ACTION",
      filters: [
        {
          text: "PAID",
          value: "Completed",
        },
        {
          text: "UNPAID",
          value: "Pending",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      render(record, i) {
        return (
          <>
            <Popover
              className="pop_hover"
              content={
                <div>
                  <a
                    onClick={() => {
                      handleInvoiceEdit(record, i);
                    }}
                  >
                    <AiFillEdit />
                  </a>
                  <a>
                    <Popconfirm
                      title="Are you sure to delete this area?"
                      placement="topRight"
                      onConfirm={() => handleInvoiceDelete(record, i)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <AiFillDelete title={"Delete"} />
                    </Popconfirm>
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

  const onSearch = (value) => {
    dispatch(searchInvoice(value));
  };
  return (
    <>
      <Row gutter={30}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="daily_sales">
            <div className="card_invoice">
              {loading ? (
                <Spin className="global_invoice_loader" />
              ) : (
                <>
                  <div className="card_details">
                    <div className="card_titles">
                      <h2 className="card_head">Daily Sales</h2>
                      <span>Order Received</span>
                      <b>10</b>
                    </div>
                    <div className="card_titles">
                      <h2 className="card_head">Payments Received</h2>
                      <b>$6000</b>
                    </div>
                  </div>
                  <DailyChart />
                </>
              )}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="daily_sales">
            <div className="card_invoice">
              {loading ? (
                <Spin className="global_invoice_loader" />
              ) : (
                <>
                  <div className="card_details">
                    <div className="card_titles">
                      <h2 className="card_head">THIS WEEK</h2>
                      <span>Order Received</span>
                      <b>60</b>
                    </div>
                    <div className="card_titles">
                      <h2 className="card_head">Payments Received</h2>
                      <b>$90000</b>
                    </div>
                  </div>
                  <WeeklyChart />
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <div className="top_invoice_header">
        <Search
          className="invoice_search"
          placeholder="input search text"
          onSearch={onSearch}
          allowClear
        />
        <Button
          key="open-add-area-modal"
          type="primary"
          onClick={() => {
            setEditInvoice(false);
            setIsModalVisible(true);
          }}
        >
          + Add Area
        </Button>
      </div>

      <InvoiceModal
        isModalVisible={isModalVisible}
        closeModal={closeAreaModal}
        editInvoice={editInvoice}
        invoiceIndex={invoiceIndex}
      />
      {/* {loading ? <Spin /> : (
        
      )} */}
      <Table
        className="invoice_table"
        columns={columns}
        dataSource={geInvoices?.items}
        onChange={onChange}
        loading={loading}
        rowKey={(record) => record.uuid}
      />
    </>
  );
};

export default Invoice;
