#!/bin/bash

# 工厂设备管理系统部署脚本
# 支持Docker容器化部署

set -e

echo "🚀 开始部署工厂设备管理系统..."

# 检查Docker和Docker Compose是否已安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，请先安装Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 检查必要的文件是否存在
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml文件不存在"
    exit 1
fi

if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile文件不存在"
    exit 1
fi

# 创建必要的目录
echo "📁 创建必要的目录..."
mkdir -p uploads
mkdir -p logs
mkdir -p mysql-data

# 设置目录权限
chmod 755 uploads
chmod 755 logs
chmod 755 mysql-data

# 停止现有的容器（如果存在）
echo "🛑 停止现有容器..."
docker-compose down || true

# 拉取最新的镜像
echo "📦 拉取最新的镜像..."
docker-compose pull

# 构建应用镜像
echo "🔨 构建应用镜像..."
docker-compose build --no-cache

# 启动服务
echo "▶️ 启动服务..."
docker-compose up -d

# 等待数据库启动
echo "⏳ 等待数据库启动..."
sleep 30

# 初始化数据库（如果需要）
echo "🗄️ 初始化数据库..."
docker-compose exec app npx prisma generate || true
docker-compose exec app npx prisma db push || true
docker-compose exec app npm run db:seed || true

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 显示访问信息
echo "✅ 部署完成！"
echo ""
echo "📋 服务信息："
echo "  - 主应用: http://localhost:3000"
echo "  - WebSocket: ws://localhost:3001"
echo "  - 数据库: localhost:3306"
echo ""
echo "👥 默认账户："
echo "  - 管理员: admin / admin123"
echo "  - 操作员: operator1 / operator123"
echo "  - 维修员: maintenance1 / maintenance123"
echo ""
echo "📖 常用命令："
echo "  - 查看日志: docker-compose logs -f"
echo "  - 停止服务: docker-compose down"
echo "  - 重启服务: docker-compose restart"
echo "  - 更新部署: ./deploy.sh"
echo ""
echo "🎉 工厂设备管理系统已成功部署！"