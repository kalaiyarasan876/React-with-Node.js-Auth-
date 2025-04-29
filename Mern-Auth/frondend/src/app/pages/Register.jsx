import { Button, Form, Input, Row, Col, Typography, Alert, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, register } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {
  const dispatch = useDispatch()
  const { error, loading } = useSelector((state) => state.auth)
  const navigate = useNavigate(); 
  // const onFinish = (values) => {
  //   dispatch(clearAuthError());
  //   dispatch(register(values))
  // }


  const onFinish = async (values) => {
      try {
        const resultAction = await dispatch(register(values)).unwrap()
        if (resultAction) {
          navigate('/login')
        }
      } catch (err) {
        // error is handled by Redux state
      }
    }

  return (
    <Row justify="center" style={{ marginTop: 100 }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card
          title={<Typography.Title level={3} style={{ marginBottom: 0 }}>Register</Typography.Title>}
          bordered={false}
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e6e6e6',
          }}
        >
          {error && <Alert message={error} type="error" style={{ marginBottom: 10 }} />}
          
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Register
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
            Already have an account? <Link to="/login">Log in here</Link>
          </Typography.Paragraph>
        </Card>
      </Col>
    </Row>
  )
}
