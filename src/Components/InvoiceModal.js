import { Modal, Button, Form, Input, Radio, message } from "antd";
import { useState, useEffect, useRef } from "react";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addInvoice, updateInvoice } from "../Redux/invoiceSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

import { parse } from "date-fns";

const InvoiceModal = ({
  isModalVisible,
  closeModal,
  editInvoice,
  invoiceIndex,
}) => {
  // const { Option } = Select;
  const [title, setTitle] = useState("Add Invoice");

  const areaForm = useRef(null);

  const dispatch = useDispatch();

  const range = (start, end) => {
    return new Array(end - start).fill().map((d, i) => i + start);
  };

  const years = range(1990, 2025);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [invoiceDate, setInvoiceDate] = useState(false);

  const selectDateHandler = (selectDate) => {
    setInvoiceDate(selectDate);
  };

  useEffect(() => {
    if (editInvoice) {
      setTitle("Edit Invoice: " + editInvoice?.customer_name);

      if (editInvoice.date_invoice) {
        setInvoiceDate(
          parse(editInvoice.date_invoice, "yyyy-MM-dd", new Date())
        );
      }

      areaForm?.current?.setFieldsValue({
        customer_name: editInvoice.customer_name,
        amount: editInvoice.amount,
        status: editInvoice.status,
      });
    } else {
      setTitle("Add Invoice");
      setInvoiceDate();
      areaForm?.current?.resetFields();
      // TODO: Reset All Fields
    }
  }, [areaForm, editInvoice]);

  const handleSavePrincipal = () => {
    areaForm?.current
      .validateFields()
      .then((values) => {
        // Access the form values

        const date_invoice = moment(invoiceDate).format("YYYY-MM-DD");

        if (!invoiceDate) {
          return message.error("Please Select A Date");
        }

        if (values.date_invoice) {
          values.date_invoice = moment(values.date_invoice).format(
            "YYYY-MM-DD"
          );
        }

        if (editInvoice) {
          dispatch(
            updateInvoice({
              ...values,
              date_invoice,
              invoiceIndex,
              uuid: uuidv4(),
            })
          );
          message.success("Invoice Updated Successfully");
        } else {
          dispatch(
            addInvoice({
              ...values,
              date_invoice,
              uuid: uuidv4(),
            })
          );
          message.success("Invoice Added Successfully");
        }

        closeModal(true);
        areaForm?.current?.resetFields();
      })
      .catch((error) => {
        // Handle validation errors or any other errors
        console.error(error);
        // message.success(error);
      });
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        width={650}
        bodyStyle={
          {
            //   height: " calc(100vh - 200px)",
            //   overflowY: "scroll",
          }
        }
        centered
        title={title}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={() => handleSavePrincipal()}
          >
            {editInvoice ? "Update" : "Add Invoice"}
          </Button>,
        ]}
      >
        <Form
          className="global__frm"
          ref={areaForm}
          layout="vertical"
          name="invoice_modal_form"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            label="Name"
            name="customer_name"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={invoiceDate}
              onChange={selectDateHandler}
              withPortal
              showIcon
              placeholderText="Select Date"
              // todayButton={"Today"}

              renderCustomHeader={({ changeYear, changeMonth }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <select
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Radio.Group name="radiogroup">
              <Radio value={true}>
                <b
                  style={{
                    paddingLeft: "5px",
                  }}
                >
                  PAID
                </b>
              </Radio>
              <Radio value={false}>
                <b
                  style={{
                    paddingLeft: "5px",
                  }}
                >
                  UNPAID
                </b>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InvoiceModal;
