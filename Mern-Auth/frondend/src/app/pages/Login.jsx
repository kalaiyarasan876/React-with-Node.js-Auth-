import { Button, Form, Input, Row, Col, Typography, Alert, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, login } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'



export default function Login() {
  const dispatch = useDispatch()
  const { error, loading, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearAuthError())
    if (token) {
      navigate('/dashboard', { replace: true }) // Redirect to dashboard if already logged in
    }
  }, [navigate])

  const onFinish = async (values) => {
    try {
      const resultAction = await dispatch(login(values)).unwrap()
      if (resultAction) {
        navigate('/dashboard')
      }
    } catch (err) {
      // error is handled by Redux state
    }
  }

  return (
    <Row justify="center" style={{ marginTop: 100 }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card
          title={<Typography.Title level={3} style={{ marginBottom: 0 }}>Login</Typography.Title>}
          bordered={false}
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            padding: '24px',
            // backgroundColor: '#f9f9f9',
            border: '1px solid #e6e6e6',
          }}
        >

          {error && <Alert message={error} type="error" style={{ marginBottom: 16, textAlign: 'center' }} />}

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography.Paragraph>
        </Card>
      </Col>
    </Row>
  )
}
