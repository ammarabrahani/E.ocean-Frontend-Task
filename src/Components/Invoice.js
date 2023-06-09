import { useEffect, useState } from "react";
import { Table, Popover, Input, Button, Tag, Row, Col, Spin } from "antd";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoice,
  invoicesFetch,
  searchInvoice,
} from "../Redux/invoiceSlice";
import InvoiceModal from "./InvoiceModal";
import { DailyChart, WeeklyChart } from "./InvoiceCharts";

import moment from "moment";

const { Search } = Input;

const Invoice = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  const [loading, setLoading] = useState(true);

  const [invoiceIndex, setinvoiceIndex] = useState(false);

  const { getInvoices } = useSelector((state) => state);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(invoicesFetch());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTableLoading(false);
    }, 1000);
  }, []);

  const onChange = () => {
    setTableLoading(true);

    setTimeout(() => {
      setTableLoading(false);
    }, 1000);
  };

  const handleInvoiceEdit = (invoice) => {
    const findIndex = getInvoices.items.findIndex(
      (item) => item.uuid === invoice.uuid
    );

    setinvoiceIndex(findIndex);
    setEditInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleInvoiceDelete = (invoice) => {
    const findIndex = getInvoices.items.find(
      (item) => item.uuid === invoice.uuid
    );
    dispatch(deleteInvoice(findIndex));
  };

  const columns = [
    {
      title: "Customer",
      render: (record) => {
        return (
          <div>
            {<b>{record?.customer_name}</b>}
            <span
              style={{
                display: "block",
                fontSize: "12px",
                color: "darkgray",
              }}
            >
              <b>Customer_Id:</b> {record?.uuid || ""}
            </span>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => {
        return `$${amount}`;
      },
    },
    {
      title: "Due Date",
      render: (record) => {
        return moment(record?.date_invoice).format("YYYY-DD-MM");
      },
    },
    {
      title: "Status",
      filters: [
        {
          text: "PAID",
          value: true,
        },
        {
          text: "UNPAID",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (record) => {
        return (
          <>
            {" "}
            {record.status ? (
              <Tag className="tags green" color={"green"}>
                PAID
              </Tag>
            ) : !record.status ? (
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
      title: "Action",
      render(record, i) {
        return (
          <>
            <Popover
              className="pop_hover"
              content={
                <div>
                  <span
                    className="action_icons"
                    onClick={() => {
                      handleInvoiceEdit(record, i);
                    }}
                  >
                    <AiOutlineEdit className="edit_icon" />
                  </span>
                  <span className="action_icons">
                    <AiOutlineDelete
                      title={"Delete"}
                      onClick={() => handleInvoiceDelete(record, i)}
                    />
                  </span>
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
  };

  // you can do the search on sumbit

  // const onSearch = (value) => {
  //   dispatch(searchInvoice(value));
  // };

  const handleSearch = (val) => {
    setTableLoading(true);
    dispatch(searchInvoice(val));

    setTimeout(() => {
      setTableLoading(false);
    }, 1000);
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
                      <b>$12000</b>
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
          placeholder="Search By Customer Name"
          // onSearch={onSearch}
          onChange={(event) => handleSearch(event.target.value)}
          allowClear
        />
        <div className="add__btn">
          <Button
            key="open-add-invoice-modal"
            type="primary"
            onClick={() => {
              setEditInvoice(false);
              setIsModalVisible(true);
            }}
          >
            + Add Invoice
          </Button>
        </div>
      </div>
      <div>
        <h3>INOVOICE</h3>
      </div>
      <InvoiceModal
        isModalVisible={isModalVisible}
        closeModal={closeAreaModal}
        editInvoice={editInvoice}
        invoiceIndex={invoiceIndex}
      />
      <Table
        className="invoice_table"
        columns={columns}
        dataSource={getInvoices?.items}
        onChange={onChange}
        loading={tableLoading}
        rowKey={(record) => record.uuid}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default Invoice;
