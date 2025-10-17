'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Input, Select, Tooltip, Modal, message } from 'antd';
import { 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ToolOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Equipment {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: 'running' | 'maintenance' | 'fault' | 'offline';
  purchaseDate: string;
  warrantyDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  manufacturer: string;
  model: string;
  specifications: string;
  operator?: string;
}

const EquipmentTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // 模拟数据
  const mockData: Equipment[] = [
    {
      id: '1',
      name: '数控机床',
      code: 'EQ-001',
      type: '加工设备',
      location: '车间A-1号',
      status: 'running',
      purchaseDate: '2023-01-15',
      warrantyDate: '2025-01-15',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      manufacturer: '德国西门子',
      model: 'SINUMERIK 828D',
      specifications: 'X轴行程: 800mm, Y轴行程: 500mm, Z轴行程: 500mm',
      operator: '张三'
    },
    {
      id: '2',
      name: '注塑机',
      code: 'EQ-002',
      type: '成型设备',
      location: '车间B-3号',
      status: 'maintenance',
      purchaseDate: '2022-08-20',
      warrantyDate: '2024-08-20',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-03-01',
      manufacturer: '日本东芝',
      model: 'EC-SXII',
      specifications: '锁模力: 1800kN, 螺杆直径: 50mm',
      operator: '李四'
    },
    {
      id: '3',
      name: '冲压机',
      code: 'EQ-003',
      type: '冲压设备',
      location: '车间A-5号',
      status: 'fault',
      purchaseDate: '2021-05-10',
      warrantyDate: '2023-05-10',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20',
      manufacturer: '中国徐工',
      model: 'XCMG-XD123',
      specifications: '公称力: 1200kN, 滑块行程: 200mm',
      operator: '王五'
    },
    {
      id: '4',
      name: '焊接机器人',
      code: 'EQ-004',
      type: '自动化设备',
      location: '车间C-2号',
      status: 'running',
      purchaseDate: '2023-06-30',
      warrantyDate: '2025-06-30',
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-04-25',
      manufacturer: '日本发那科',
      model: 'FANUC M-20iA',
      specifications: '负载: 20kg, 工作半径: 1811mm',
      operator: '赵六'
    },
    {
      id: '5',
      name: '三坐标测量机',
      code: 'EQ-005',
      type: '检测设备',
      location: '检测室-1号',
      status: 'running',
      purchaseDate: '2022-12-05',
      warrantyDate: '2024-12-05',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      manufacturer: '德国蔡司',
      model: 'ZEISS CONTURA',
      specifications: '测量范围: 700x1000x600mm, 精度: 1.9μm',
      operator: '钱七'
    }
  ];

  const [data, setData] = useState<Equipment[]>(mockData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'success';
      case 'maintenance': return 'warning';
      case 'fault': return 'error';
      case 'offline': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircleOutlined />;
      case 'maintenance': return <ToolOutlined />;
      case 'fault': return <WarningOutlined />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running': return '运行中';
      case 'maintenance': return '维护中';
      case 'fault': return '故障';
      case 'offline': return '离线';
      default: return status;
    }
  };

  const columns: ColumnsType<Equipment> = [
    {
      title: '设备编号',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: [
        { text: '加工设备', value: '加工设备' },
        { text: '成型设备', value: '成型设备' },
        { text: '冲压设备', value: '冲压设备' },
        { text: '自动化设备', value: '自动化设备' },
        { text: '检测设备', value: '检测设备' },
      ],
      onFilter: (value: any, record) => record.type === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag icon={getStatusIcon(status)} color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      filters: [
        { text: '运行中', value: 'running' },
        { text: '维护中', value: 'maintenance' },
        { text: '故障', value: 'fault' },
        { text: '离线', value: 'offline' },
      ],
      onFilter: (value: any, record) => record.status === value,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: '操作员',
      dataIndex: 'operator',
      key: 'operator',
      width: 100,
    },
    {
      title: '下次维护',
      dataIndex: 'nextMaintenance',
      key: 'nextMaintenance',
      width: 120,
      sorter: (a, b) => new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime(),
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      width: 150,
      responsive: ['lg'],
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      width: 150,
      responsive: ['lg'],
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_: any, record: Equipment) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleView = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setModalVisible(true);
  };

  const handleEdit = (equipment: Equipment) => {
    message.info(`编辑设备: ${equipment.name}`);
  };

  const handleDelete = (equipment: Equipment) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除设备 "${equipment.name}" 吗？`,
      onOk: () => {
        setData(data.filter(item => item.id !== equipment.id));
        message.success('设备删除成功');
      },
    });
  };

  const filteredData = data.filter(item => {
    const matchesSearch = !searchText || 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.code.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = !statusFilter || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="equipment-table">
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="搜索设备名称、编号或类型"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="筛选状态"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 120 }}
            allowClear
          >
            <Select.Option value="">全部状态</Select.Option>
            <Select.Option value="running">运行中</Select.Option>
            <Select.Option value="maintenance">维护中</Select.Option>
            <Select.Option value="fault">故障</Select.Option>
            <Select.Option value="offline">离线</Select.Option>
          </Select>
          <Button type="primary">添加设备</Button>
        </Space>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          total: filteredData.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
        }}
      />

      <Modal
        title="设备详情"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedEquipment && (
          <div>
            <h3>{selectedEquipment.name}</h3>
            <p><strong>设备编号:</strong> {selectedEquipment.code}</p>
            <p><strong>设备类型:</strong> {selectedEquipment.type}</p>
            <p><strong>状态:</strong> {getStatusText(selectedEquipment.status)}</p>
            <p><strong>位置:</strong> {selectedEquipment.location}</p>
            <p><strong>操作员:</strong> {selectedEquipment.operator}</p>
            <p><strong>制造商:</strong> {selectedEquipment.manufacturer}</p>
            <p><strong>型号:</strong> {selectedEquipment.model}</p>
            <p><strong>规格:</strong> {selectedEquipment.specifications}</p>
            <p><strong>购买日期:</strong> {selectedEquipment.purchaseDate}</p>
            <p><strong>保修到期:</strong> {selectedEquipment.warrantyDate}</p>
            <p><strong>上次维护:</strong> {selectedEquipment.lastMaintenance}</p>
            <p><strong>下次维护:</strong> {selectedEquipment.nextMaintenance}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EquipmentTable;