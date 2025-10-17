import './globals.css'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '工厂设备管理系统',
  description: '现代化的工厂生产设备管理平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#0ea5e9',
                colorInfo: '#0ea5e9',
                colorSuccess: '#10b981',
                colorWarning: '#f59e0b',
                colorError: '#ef4444',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                borderRadius: 6,
              },
              components: {
                Layout: {
                  headerBg: '#ffffff',
                  siderBg: '#f8fafc',
                },
                Menu: {
                  itemBg: 'transparent',
                  itemHoverBg: '#e2e8f0',
                  itemSelectedBg: '#e2e8f0',
                  itemSelectedColor: '#0ea5e9',
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}