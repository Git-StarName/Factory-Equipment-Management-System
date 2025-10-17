'use client'

import { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Progress, Table, Tag, Button, Space, DatePicker } from 'antd'
import { 
  DashboardOutlined, 
  ToolOutlined, 
  AlertOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Line, Pie } from '@ant-design/plots'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { getDashboardStats, getEquipmentStatus, getRecentFaults, getMaintenanceSchedule } from '@/lib/api'
import { PageHeader } from '@/components/layout/PageHeader'

const { RangePicker } = DatePicker

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalEquipment: 0,
    activeEquipment: 0,
    totalFaults: 0,
    pendingMaintenance: 0
  })
  const [equipmentStatus, setEquipmentStatus] = useState([])
  const [recentFaults, setRecentFaults] = useState([])
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([])
  const [dateRange, setDateRange] = useState([])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      loadDashboardData()
    }
  }, [user, authLoading, router])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [
        statsData,
        statusData,
        faultsData,
        maintenanceData
      ] = await Promise.all([
        getDashboardStats(),
        getEquipmentStatus(),
        getRecentFaults(),
        getMaintenanceSchedule()
      ])

      setStats(statsData)
      setEquipmentStatus(statusData)
      setRecentFaults(faultsData)
      setMaintenanceSchedule(maintenanceData)
    } catch (error) {
      console.error('加载仪表板数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const equipmentStatusConfig = {
    data: equipmentStatus,
    angleField: 'count',
    colorField: 'status',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  }

  const faultTrendConfig = {
    data: recentFaults,
    xField: 'date',
    yField: 'count',
    seriesField: 'status',
    yAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  }

  const getStatusColor = (status: string) => {
    const statusColors = {
      'ACTIVE': 'success',
      'INACTIVE': 'default',
      'MAINTENANCE': 'processing',
      'FAULT': 'error',
      'RETIRED': 'warning'
    }
    return statusColors[status as keyof typeof statusColors] || 'default'
  }

  const getSeverityColor = (severity: string) => {
    const severityColors = {
      'LOW': 'success',
      'MEDIUM': 'warning',
      'HIGH': 'error',
      'CRITICAL': 'error'
    }
    return severityColors[severity as keyof typeof severityColors] || 'default'
  }

  const faultColumns = [
    {
      title: '设备名称',
      dataIndex: ['equipment', 'name'],
      key: 'equipmentName',
    },
    {
      title: '故障描述',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>
          {severity === 'LOW' ? '低' : severity === 'MEDIUM' ? '中' : severity === 'HIGH' ? '高' : '严重'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'OPEN' ? 'error' : status === 'IN_PROGRESS' ? 'processing' : 'success'}>
          {status === 'OPEN' ? '待处理' : status === 'IN_PROGRESS' ? '处理中' : '已解决'}
        </Tag>
      ),
    },
    {
      title: '报告时间',
      dataIndex: 'reportedAt',
      key: 'reportedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  const maintenanceColumns = [
    {
      title: '维护任务',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '设备',
      dataIndex: ['equipment', 'name'],
      key: 'equipmentName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag>
          {type === 'PREVENTIVE' ? '预防性' : type === 'CORRECTIVE' ? '纠正性' : type === 'EMERGENCY' ? '紧急' : '预测性'}
        </Tag>
      ),
    },
    {
      title: '计划日期',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'SCHEDULED' ? 'blue' : status === 'IN_PROGRESS' ? 'orange' : 'green'}>
          {status === 'SCHEDULED' ? '已安排' : status === 'IN_PROGRESS' ? '进行中' : '已完成'}
        </Tag>
      ),
    },
  ]

  if (authLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader
        title="仪表板"
        description="工厂设备管理系统概览"
        icon={<DashboardOutlined />}
      />

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="设备总数"
              value={stats.totalEquipment}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#3b82f6' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="运行设备"
              value={stats.activeEquipment}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="故障数量"
              value={stats.totalFaults}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ef4444' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="待维护"
              value={stats.pendingMaintenance}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#f59e0b' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表和表格 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card 
            title="设备状态分布" 
            className="shadow-sm"
            loading={loading}
          >
            <Pie {...equipmentStatusConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Card 
            title="故障趋势" 
            className="shadow-sm"
            loading={loading}
          >
            <Line {...faultTrendConfig} height={300} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={12}>
          <Card 
            title="最近故障" 
            className="shadow-sm"
            loading={loading}
            extra={<Button type="link" onClick={() => router.push('/dashboard/faults')}>更多</Button>}
          >
            <Table
              columns={faultColumns}
              dataSource={recentFaults}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="维护计划" 
            className="shadow-sm"
            loading={loading}
            extra={<Button type="link" onClick={() => router.push('/dashboard/maintenance')}>更多</Button>}
          >
            <Table
              columns={maintenanceColumns}
              dataSource={maintenanceSchedule}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}