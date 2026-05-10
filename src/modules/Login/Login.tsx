import { useState } from 'react';
import { Card, Col, Form, Input, Row, Button, Checkbox, Divider } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import './login.css';
import Signup from './Signup/Signup';
import { useCreateQuery } from '../../components/hooks/useCreateQuery';
import { useNavigate } from 'react-router-dom';
import type { LoginPayload, LoginRespose } from './login.type';

export const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [signup, setSignup] = useState(false);

  const loginUser = useCreateQuery<LoginRespose, LoginPayload>({
    url: '/auth/login',
    queryKey: ['auth'],
    successMessage: 'Login Successfull',
  });

  const handleclicksignup = () => {
    setSignup(true);
  };

  const onFinish = (values: LoginPayload) => {
    loginUser.mutate(values, {
      onSuccess: (data) => {
        // Save token
        localStorage.setItem('token', data.token);

        // Navigate after login
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className='login-container'>
      <Card className='login-card'>
        <Row>
          {/* Left Image Section */}
          <Col xs={24} md={12} className='login-image-section'>
            <div className='login-image-text'>
              <h2>
                Capturing Moments,
                <br />
                Creating Memories
              </h2>
            </div>
          </Col>

          {/* Right Form Section */}
          {signup ? (
            <Signup setSignup={setSignup} />
          ) : (
            <Col xs={24} md={12} className='login-form-section'>
              <h2 className='login-title'>Login</h2>
              <p className='login-subtitle'>
                Don't have an account?{' '}
                <a href='#' onClick={handleclicksignup}>
                  Sign up
                </a>
              </p>

              <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
                autoComplete='off'
              >
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
                    Login
                  </Button>
                </Form.Item>

                <Divider>Or login with</Divider>

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
          )}
        </Row>
      </Card>
    </div>
  );
};
