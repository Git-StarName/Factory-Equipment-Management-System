# 🏭 工厂设备管理系统

现代化的工厂生产设备管理平台，提供设备监控、人员管理、故障追踪、维护计划等一站式解决方案。

## 📋 项目概述

这是一个基于Next.js全栈技术开发的工厂设备管理系统，专为中小型制造企业设计。系统采用现代化的Web技术栈，提供直观的用户界面和强大的功能模块，帮助企业实现设备数字化管理。

### 主要功能特点

- **设备全生命周期管理**：从设备入库到报废的完整管理流程
- **实时监控与预警**：WebSocket实时数据推送，设备状态异常及时预警
- **智能故障管理**：故障报告、处理流程跟踪、解决方案记录
- **维护计划管理**：定期维护提醒、维护记录追踪、成本统计
- **人员权限管理**：多角色权限控制，操作员、维修员、管理员分级管理
- **数据可视化**：设备状态统计、趋势分析、报表生成
- **通知系统**：系统通知、故障预警、维护提醒实时推送

## 🛠️ 技术架构

### 前端技术栈
- **框架**: Next.js 14 (React 18)
- **UI组件库**: Ant Design 5.x
- **样式**: Tailwind CSS + CSS Modules
- **图表**: Chart.js + React Chart.js 2
- **字体**: Inter (Google Fonts)
- **图标**: Ant Design Icons + Lucide React

### 后端技术栈
- **运行时**: Node.js 18+
- **数据库**: MySQL 8.0
- **ORM**: Prisma
- **认证**: JWT (JSON Web Token)
- **密码加密**: bcryptjs
- **实时通信**: WebSocket (ws库)
- **文件上传**: 本地存储 + 图片处理

### 开发工具
- **语言**: TypeScript
- **代码规范**: ESLint + Prettier
- **包管理**: npm
- **容器化**: Docker + Docker Compose
- **数据库工具**: Prisma Studio

## 📁 项目结构

```
factory-equipment-management/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API路由
│   │   ├── dashboard/            # 仪表板页面
│   │   ├── login/                # 登录页面
│   │   └── layout.tsx            # 根布局
│   ├── components/               # React组件
│   │   ├── charts/               # 图表组件
│   │   ├── common/               # 通用组件
│   │   ├── layout/               # 布局组件
│   │   └── ui/                   # UI组件
│   ├── hooks/                    # 自定义React Hooks
│   ├── lib/                      # 工具库
│   ├── types/                    # TypeScript类型定义
│   └── utils/                    # 工具函数
├── prisma/                       # 数据库模型
│   ├── schema.prisma             # Prisma数据模型
│   └── seed.ts                   # 数据库种子数据
├── public/                       # 静态资源
├── scripts/                      # 脚本文件
├── uploads/                      # 文件上传目录
└── websocket-server.js           # WebSocket服务器
```

## 🚀 快速开始

### 环境要求

- Node.js 18.0.0 或更高版本
- MySQL 8.0 或更高版本
- npm 9.0.0 或更高版本

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/Git-StarName/factory-equipment-management.git
   cd factory-equipment-management
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，配置数据库连接信息
   ```

4. **初始化数据库**
   ```bash
   npm run db:generate    # 生成Prisma客户端
   npm run db:push        # 推送数据模型到数据库
   npm run db:seed        # 插入种子数据
   ```

5. **启动开发服务器**
   ```bash
   npm run dev:full       # 同时启动Next.js和WebSocket服务器
   ```

6. **访问应用**
   - 主应用: http://localhost:3000
   - WebSocket测试: ws://localhost:3001
   - 数据库管理: http://localhost:5555 (Prisma Studio)

### Docker部署

1. **使用Docker Compose一键部署**
   ```bash
   docker-compose up -d
   ```

2. **生产环境部署**
   ```bash
   sudo ./deploy.sh
   ```

## 👥 默认账户

系统初始化时会创建以下默认账户：

| 角色 | 用户名 | 密码 | 权限说明 |
|------|--------|------|----------|
| 管理员 | admin | admin123 | 系统管理、用户管理、设备管理 |
| 操作员 | operator1 | operator123 | 设备操作、数据录入 |
| 维修员 | maintenance1 | maintenance123 | 设备维护、故障处理 |

## 📊 功能模块详解

### 1. 设备管理模块
- **设备档案**: 设备基本信息、技术参数、安装信息
- **状态监控**: 实时状态显示、运行数据统计
- **设备分组**: 按车间、类型、状态分类管理
- **生命周期**: 设备从采购到报废的完整记录

### 2. 故障管理模块
- **故障报告**: 快速故障上报、故障分类、严重程度评级
- **处理流程**: 故障分配、处理进度跟踪、解决方案记录
- **故障分析**: 故障统计分析、趋势预测、改进建议

### 3. 维护管理模块
- **维护计划**: 定期维护计划制定、提醒通知
- **维护记录**: 维护历史记录、维护成本统计
- **维护类型**: 预防性维护、纠正性维护、紧急维护
- **维护人员**: 维护人员调度、技能管理

### 4. 人员管理模块
- **用户管理**: 多角色用户管理、权限控制
- **技能管理**: 人员技能档案、培训记录
- **工作安排**: 工作任务分配、排班管理
- **绩效考核**: 工作效率统计、绩效评估

### 5. 数据可视化模块
- **实时监控**: 设备运行状态实时图表
- **统计分析**: 设备利用率、故障率、维护成本分析
- **趋势预测**: 基于历史数据的趋势分析
- **报表生成**: 各类管理报表自动生成

### 6. 通知系统模块
- **实时通知**: WebSocket推送各类通知消息
- **通知类型**: 系统通知、故障预警、维护提醒
- **通知管理**: 通知历史、已读/未读管理
- **消息订阅**: 个性化消息订阅设置

## 🔧 配置说明

### 环境变量配置

```bash
# 数据库配置
DATABASE_URL="mysql://username:password@localhost:3306/factory_db"

# JWT配置
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# WebSocket配置
WEBSOCKET_PORT=3001
WEBSOCKET_HOST=0.0.0.0

# 文件上传配置
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=/app/public/uploads

# 安全配置
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
```

### Docker配置

系统提供完整的Docker支持：
- **Dockerfile**: 多阶段构建，优化镜像大小
- **docker-compose.yml**: 一键部署应用和数据库
- **deploy.sh**: 生产环境自动化部署脚本

## 🧪 开发指南

### 代码规范
- 使用TypeScript进行类型安全的开发
- 遵循ESLint代码规范
- 使用Prettier进行代码格式化
- 组件化开发，提高代码复用性

### 数据库开发
- 使用Prisma进行数据库建模和迁移
- 提供数据库种子数据便于开发测试
- 支持Prisma Studio可视化数据库管理

### API开发
- RESTful API设计规范
- JWT认证机制
- 统一的错误处理和响应格式
- API文档自动生成

## 📈 性能优化

- **前端优化**: 代码分割、懒加载、图片优化
- **后端优化**: 数据库索引优化、查询优化
- **缓存策略**: 合理的缓存机制提高响应速度
- **CDN支持**: 静态资源CDN加速

## 🔒 安全特性

- **认证授权**: JWT令牌认证，多角色权限控制
- **数据加密**: 敏感数据加密存储
- **输入验证**: 严格的输入验证和过滤
- **SQL注入防护**: 使用ORM防止SQL注入
- **XSS防护**: 前端输入输出过滤
- **HTTPS支持**: 支持HTTPS加密传输

## 📱 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- 移动端浏览器支持

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📝 许可证

此项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 🆘 支持与联系

如遇到问题或有功能建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 项目讨论区

---

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**