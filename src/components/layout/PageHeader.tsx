import { ReactNode } from 'react'
import { Breadcrumb, Space } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  breadcrumbs?: Array<{
    title: string
    href?: string
  }>
  extra?: ReactNode
}

export function PageHeader({ 
  title, 
  description, 
  icon, 
  breadcrumbs = [],
  extra 
}: PageHeaderProps) {
  const items = [
    {
      title: (
        <Space>
          <HomeOutlined />
          <span>首页</span>
        </Space>
      ),
      href: '/dashboard',
    },
    ...breadcrumbs.map(item => ({
      title: item.title,
      href: item.href,
    }))
  ]

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <div className="text-blue-600 text-lg">{icon}</div>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        {extra && <div>{extra}</div>}
      </div>
      {breadcrumbs.length > 0 && (
        <Breadcrumb items={items} className="text-sm" />
      )}
    </div>
  )
}