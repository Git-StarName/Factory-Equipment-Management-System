const WebSocket = require('ws');
const http = require('http');
const jwt = require('jsonwebtoken');

const PORT = process.env.WEBSOCKET_PORT || 3001;
const HOST = process.env.WEBSOCKET_HOST || '0.0.0.0';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// 创建HTTP服务器
const server = http.createServer();

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server });

// 存储连接的客户端
const clients = new Map();

// 验证JWT令牌
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// 广播消息给所有客户端
function broadcast(message, excludeClient = null) {
  const messageStr = JSON.stringify(message);
  clients.forEach((clientInfo, client) => {
    if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// 发送消息给特定用户
function sendToUser(userId, message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((clientInfo, client) => {
    if (clientInfo.userId === userId && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

// 发送消息给特定角色
function sendToRole(role, message) {
  const messageStr = JSON.stringify(message);
  clients.forEach((clientInfo, client) => {
    if (clientInfo.role === role && client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

wss.on('connection', (ws, request) => {
  console.log('新的WebSocket连接');
  
  let clientInfo = {
    userId: null,
    username: null,
    role: null,
    connectedAt: new Date()
  };

  // 发送连接成功消息
  ws.send(JSON.stringify({
    type: 'connection',
    status: 'connected',
    message: 'WebSocket连接已建立'
  }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('收到消息:', message);

      switch (message.type) {
        case 'auth':
          // 处理认证
          const payload = verifyToken(message.token);
          if (payload) {
            clientInfo.userId = payload.userId;
            clientInfo.username = payload.username;
            clientInfo.role = payload.role;
            clients.set(ws, clientInfo);
            
            ws.send(JSON.stringify({
              type: 'auth',
              status: 'success',
              user: {
                userId: payload.userId,
                username: payload.username,
                role: payload.role
              }
            }));
            
            console.log(`用户 ${payload.username} 已认证`);
          } else {
            ws.send(JSON.stringify({
              type: 'auth',
              status: 'error',
              message: '认证失败'
            }));
          }
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;

        case 'notification':
          // 处理通知消息
          if (message.target === 'all') {
            broadcast({
              type: 'notification',
              data: message.data,
              from: clientInfo.username
            }, ws);
          } else if (message.target === 'role') {
            sendToRole(message.role, {
              type: 'notification',
              data: message.data,
              from: clientInfo.username
            });
          } else if (message.target === 'user') {
            sendToUser(message.userId, {
              type: 'notification',
              data: message.data,
              from: clientInfo.username
            });
          }
          break;

        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: '未知的消息类型'
          }));
      }
    } catch (error) {
      console.error('处理消息错误:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: '消息格式错误'
      }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket连接关闭');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket错误:', error);
    clients.delete(ws);
  });
});

// 定期发送心跳包
setInterval(() => {
  clients.forEach((clientInfo, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'heartbeat',
        timestamp: Date.now()
      }));
    } else {
      clients.delete(client);
    }
  });
}, 30000); // 每30秒发送一次心跳

// 模拟一些系统通知
function simulateSystemNotifications() {
  const notifications = [
    {
      type: 'system',
      title: '系统维护通知',
      message: '系统将于今晚12点进行例行维护',
      priority: 'medium'
    },
    {
      type: 'equipment',
      title: '设备状态提醒',
      message: '设备EQ-001需要定期维护',
      priority: 'high'
    },
    {
      type: 'fault',
      title: '故障报警',
      message: '生产线A出现故障，请及时处理',
      priority: 'critical'
    }
  ];

  setInterval(() => {
    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    broadcast({
      type: 'notification',
      data: {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      }
    });
  }, 60000); // 每分钟发送一次模拟通知
}

server.listen(PORT, HOST, () => {
  console.log(`WebSocket服务器运行在 ws://${HOST}:${PORT}`);
  
  // 启动模拟通知（仅在开发环境）
  if (process.env.NODE_ENV === 'development') {
    simulateSystemNotifications();
    console.log('模拟通知已启用');
  }
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM，正在关闭WebSocket服务器...');
  wss.close(() => {
    server.close(() => {
      console.log('WebSocket服务器已关闭');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('收到SIGINT，正在关闭WebSocket服务器...');
  wss.close(() => {
    server.close(() => {
      console.log('WebSocket服务器已关闭');
      process.exit(0);
    });
  });
});

// 导出函数供其他模块使用
module.exports = {
  broadcast,
  sendToUser,
  sendToRole
};