'use client'

import { useState } from 'react'
import { Form, Input, Button, Card, message, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { login } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true)
      const result = await login(values.username, values.password)
      
      if (result.success) {
        setUser(result.user)
        message.success('登录成功！')
        router.push('/dashboard')
      } else {
        message.error(result.message || '登录失败')
      }
    } catch (error) {
      message.error('登录失败，请检查网络连接')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={12}>
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <LoginOutlined className="text-white text-2xl" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  工厂设备管理系统
                </h1>
                <p className="text-xl text-gray-600">
                  现代化的工厂生产设备管理平台
                </p>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>设备全生命周期管理</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>实时监控与预警</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>智能故障管理</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>维护计划管理</span>
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card className="shadow-2xl rounded-2xl border-0">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎登录</h2>
                <p className="text-gray-600">请输入您的账户信息</p>
              </div>
              
              <Form
                name="login"
                onFinish={onFinish}
                layout="vertical"
                size="large"
                className="space-y-4"
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="用户名"
                    className="rounded-lg"
                  />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="密码"
                    className="rounded-lg"
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700"
                    size="large"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">测试账户：</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>管理员 - admin / admin123</div>
                  <div>操作员 - operator1 / operator123</div>
                  <div>维修员 - maintenance1 / maintenance123</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}