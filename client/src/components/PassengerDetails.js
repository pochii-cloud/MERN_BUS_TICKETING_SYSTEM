import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log('Received values from form:', values);
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Form</Button>
      <Form
        form={form}
        name="myForm"
        visible={visible}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MyForm;
