import { Modal, Button, Form, Select, Input, Radio, DatePicker } from "antd";
import { useState } from "react";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addInvoice } from "../Redux/invoiceSlice";

const InvoiceModal = ({ isModalVisible, closeModal }) => {
  const { Option } = Select;
  const [title, setTitle] = useState("Add Area");

  const dispatch = useDispatch();

  const [areaForm] = Form.useForm();
  const handleSavePrincipal = () => {
    areaForm
      .validateFields()
      .then((values) => {
        // Access the form values
        // setLoading(true);
        if (values.createdAt) {
          values.createdAt = moment(values.date).format("YYYY-MM-DD");
        }

        dispatch(addInvoice(values));
        // const formData = new window.FormData();

        // const getOBJ = Object.keys(values).map((key) => {
        //   console.log(key, "key");

        //   if (key === "date") {
        //     const date = moment(values[key]).format("YYYY-MM-DD");
        //     return {
        //       date: date,
        //     };
        //   } else {
        //     return values[key];
        //   }
        // });

        // console.log(getOBJ, "getOBJgetOBJ");
      })
      .catch((error) => {
        // Handle validation errors or any other errors
        console.error(error);
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
            Add Area
          </Button>,
        ]}
      >
        <Form
          className="global__frm"
          form={areaForm}
          layout="vertical"
          name="invoice_modal_form"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            label="Name"
            name="firstName"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amont"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="createdAt">
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input amount!" }]}
          >
            <Radio.Group name="radiogroup">
              <Radio value={false}>
                <b
                  style={{
                    paddingLeft: "5px",
                  }}
                >
                  Paid
                </b>
              </Radio>
              <Radio value={true}>
                <b
                  style={{
                    paddingLeft: "5px",
                  }}
                >
                  UnPaid
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
