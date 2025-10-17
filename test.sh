#!/bin/bash

# 工厂设备管理系统测试脚本
# 用于运行各种测试和检查

set -e

echo "🧪 开始运行工厂设备管理系统测试..."

# 检查Node.js版本
echo "📋 检查Node.js版本..."
node_version=$(node --version)
echo "Node.js版本: $node_version"

# 检查npm版本
echo "📋 检查npm版本..."
npm_version=$(npm --version)
echo "npm版本: $npm_version"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 检查TypeScript编译
echo "🔍 检查TypeScript编译..."
npx tsc --noEmit

# 检查ESLint（如果有配置）
if [ -f ".eslintrc.json" ] || [ -f ".eslintrc.js" ]; then
    echo "🔍 运行ESLint检查..."
    npx eslint . --ext .js,.jsx,.ts,.tsx
fi

# 检查Prettier（如果有配置）
if [ -f ".prettierrc" ] || [ -f ".prettierrc.json" ]; then
    echo "🔍 运行Prettier检查..."
    npx prettier --check .
fi

# 运行单元测试（如果有测试文件）
if [ -d "__tests__" ] || [ -d "test" ] || [ -d "tests" ]; then
    echo "🧪 运行单元测试..."
    npm test
fi

# 检查Prisma Schema
echo "🔍 检查Prisma Schema..."
npx prisma validate

# 生成Prisma客户端
echo "🔧 生成Prisma客户端..."
npx prisma generate

# 检查数据库连接（如果配置了数据库）
if [ -n "$DATABASE_URL" ]; then
    echo "🔗 检查数据库连接..."
    npx prisma db ping || echo "⚠️ 数据库连接失败，请检查数据库配置"
fi

# 检查环境变量
echo "🔍 检查环境变量..."
if [ ! -f ".env" ]; then
    echo "⚠️ 未找到.env文件，请复制.env.example并配置必要的环境变量"
fi

# 检查构建
echo "🔨 检查Next.js构建..."
npm run build

# 检查WebSocket服务器
echo "🔗 检查WebSocket服务器配置..."
if [ -f "websocket-server.js" ]; then
    echo "✅ WebSocket服务器文件存在"
else
    echo "⚠️ WebSocket服务器文件不存在"
fi

# 检查Docker配置
echo "🐳 检查Docker配置..."
if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile存在"
else
    echo "⚠️ Dockerfile不存在"
fi

if [ -f "docker-compose.yml" ]; then
    echo "✅ Docker Compose配置存在"
else
    echo "⚠️ Docker Compose配置不存在"
fi

# 检查部署脚本
echo "🚀 检查部署脚本..."
if [ -f "deploy.sh" ]; then
    echo "✅ 部署脚本存在"
    chmod +x deploy.sh
else
    echo "⚠️ 部署脚本不存在"
fi

# 检查关键目录
echo "📁 检查关键目录..."
directories=("src" "public" "prisma" "uploads")
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir 目录存在"
    else
        echo "⚠️ $dir 目录不存在"
    fi
done

# 运行健康检查
echo "🏥 运行健康检查..."
if command -v curl &> /dev/null; then
    # 检查开发服务器是否可访问
    if npm run dev &
    then
        sleep 10
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            echo "✅ 开发服务器运行正常"
        else
            echo "⚠️ 开发服务器可能有问题"
        fi
        pkill -f "next dev" || true
    fi
fi

echo ""
echo "✅ 测试完成！"
echo ""
echo "📊 测试结果摘要："
echo "  - Node.js版本: $node_version"
echo "  - npm版本: $npm_version"
echo "  - TypeScript编译: 通过"
echo "  - Next.js构建: 通过"
echo "  - Prisma Schema: 有效"
echo ""
echo "🔧 下一步建议："
echo "  1. 配置环境变量（复制.env.example到.env）"
echo "  2. 设置数据库连接"
echo "  3. 运行数据库迁移: npx prisma db push"
echo "  4. 启动开发服务器: npm run dev"
echo "  5. 或使用Docker部署: ./deploy.sh"
echo ""
echo "🎉 工厂设备管理系统测试脚本执行完毕！"