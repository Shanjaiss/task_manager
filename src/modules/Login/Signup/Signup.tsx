import React from 'react';
import { Col, Form, Input, Row, Button, Checkbox, Divider } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import '../login.css';
import { useCreateQuery } from '../../../components/hooks/useCreateQuery';
import type { RegisterPayload } from './signup.types';

type SignupProps = {
  setSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup: React.FC<SignupProps> = ({ setSignup }) => {
  const [form] = Form.useForm();

  const createUser = useCreateQuery({
    url: '/auth/register',
    queryKey: ['users'], // better than ["tasks"]
  });

  const hadlenavigtelogin = () => {
    setSignup(false);
  };

  const onFinish = (values: RegisterPayload) => {
    createUser.mutate(values);
  };
  return (
    <Row>
      <Col xs={24} md={24} className='login-form-section'>
        <h2 className='login-title'>Create an account</h2>
        <p className='login-subtitle'>
          Already have an account ?{' '}
          <a href='#' onClick={hadlenavigtelogin}>
            Login
          </a>
        </p>

        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder='Enter your name' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox className='checkbox'>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              className='login-button'
            >
              Sign up
            </Button>
          </Form.Item>

          <Divider>Or register with</Divider>

          <Row gutter={12}>
            <Col span={12}>
              <Button block icon={<GoogleOutlined />}>
                Google
              </Button>
            </Col>
            <Col span={12}>
              <Button block icon={<AppleOutlined />}>
                Apple
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
