'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  DashboardOutlined, 
  ToolOutlined, 
  WarningOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: '设备总数',
      value: 156,
      icon: <DashboardOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      color: '#1890ff',
      trend: 'up',
      trendValue: '12%'
    },
    {
      title: '运行中设备',
      value: 142,
      icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      color: '#52c41a',
      trend: 'up',
      trendValue: '8%'
    },
    {
      title: '维护中设备',
      value: 8,
      icon: <ToolOutlined style={{ fontSize: 24, color: '#faad14' }} />,
      color: '#faad14',
      trend: 'down',
      trendValue: '3%'
    },
    {
      title: '故障设备',
      value: 6,
      icon: <WarningOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />,
      color: '#ff4d4f',
      trend: 'down',
      trendValue: '15%'
    }
  ];

  return (
    <div className="dashboard-stats">
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card hoverable>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#8c8c8c', marginBottom: 8 }}>{stat.title}</div>
                  <div style={{ fontSize: 28, fontWeight: 'bold', color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: stat.trend === 'up' ? '#52c41a' : '#ff4d4f' }}>
                    {stat.trend === 'up' ? '↗' : '↘'} {stat.trendValue}
                  </div>
                </div>
                <div>{stat.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="设备运行状态分布" hoverable>
            <div style={{ padding: '20px 0' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>运行率</span>
                  <span>91.0%</span>
                </div>
                <Progress percent={91} strokeColor="#52c41a" showInfo={false} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>维护率</span>
                  <span>5.1%</span>
                </div>
                <Progress percent={5.1} strokeColor="#faad14" showInfo={false} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>故障率</span>
                  <span>3.9%</span>
                </div>
                <Progress percent={3.9} strokeColor="#ff4d4f" showInfo={false} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="今日设备效率" hoverable>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Progress 
                type="circle" 
                percent={87} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                width={120}
              />
              <div style={{ marginTop: 16, fontSize: 16, color: '#595959' }}>
                整体设备效率 (OEE)
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStats;