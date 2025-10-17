/**
 * 格式化工具函数
 */

/**
 * 格式化日期
 */
export const formatDate = (date: string | Date, format: string = 'YYYY-MM-DD'): string => {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    return '';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'YYYY-MM-DD HH:mm':
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    case 'YYYY-MM-DD HH:mm:ss':
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case 'MM-DD':
      return `${month}-${day}`;
    case 'HH:mm':
      return `${hours}:${minutes}`;
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    default:
      return `${year}-${month}-${day}`;
  }
};

/**
 * 格式化货币
 */
export const formatCurrency = (amount: number | string, currency: string = 'CNY'): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) {
    return '0.00';
  }

  switch (currency) {
    case 'CNY':
      return `¥${num.toFixed(2)}`;
    case 'USD':
      return `$${num.toFixed(2)}`;
    case 'EUR':
      return `€${num.toFixed(2)}`;
    default:
      return `${num.toFixed(2)}`;
  }
};

/**
 * 格式化百分比
 */
export const formatPercentage = (value: number | string, decimals: number = 1): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return '0%';
  }

  return `${(num * 100).toFixed(decimals)}%`;
};

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * 格式化手机号码
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // 移除所有非数字字符
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    // 中国大陆手机号格式：138 0013 8000
    return cleanPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  }
  
  return phone;
};

/**
 * 格式化身份证号
 */
export const formatIdCard = (idCard: string): string => {
  if (!idCard) return '';
  
  // 移除所有非数字和字母字符
  const cleanId = idCard.replace(/[^\dXx]/g, '');
  
  if (cleanId.length === 18) {
    // 身份证格式：110105 19900307 8901
    return cleanId.replace(/(\d{6})(\d{8})(\w{4})/, '$1 $2 $3');
  }
  
  return idCard;
};

/**
 * 格式化设备状态
 */
export const formatEquipmentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'running': '运行中',
    'maintenance': '维护中',
    'fault': '故障',
    'offline': '离线',
    'idle': '待机',
    'startup': '启动中',
    'shutdown': '关机中'
  };
  
  return statusMap[status] || status;
};

/**
 * 格式化设备类型
 */
export const formatEquipmentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'processing': '加工设备',
    'forming': '成型设备',
    'stamping': '冲压设备',
    'automation': '自动化设备',
    'testing': '检测设备',
    'transportation': '运输设备',
    'packaging': '包装设备',
    'other': '其他设备'
  };
  
  return typeMap[type] || type;
};

/**
 * 格式化优先级
 */
export const formatPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'low': '低',
    'medium': '中',
    'high': '高',
    'urgent': '紧急',
    'critical': '严重'
  };
  
  return priorityMap[priority] || priority;
};

/**
 * 格式化工单状态
 */
export const formatWorkOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': '待处理',
    'in_progress': '处理中',
    'completed': '已完成',
    'cancelled': '已取消',
    'on_hold': '暂停',
    'overdue': '已逾期'
  };
  
  return statusMap[status] || status;
};

/**
 * 格式化维护类型
 */
export const formatMaintenanceType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'preventive': '预防性维护',
    'corrective': '纠正性维护',
    'predictive': '预测性维护',
    'emergency': '紧急维护',
    'upgrade': '升级改造',
    'inspection': '检查保养'
  };
  
  return typeMap[type] || type;
};

/**
 * 获取相对时间
 */
export const formatRelativeTime = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years}年前`;
  if (months > 0) return `${months}个月前`;
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  if (minutes > 0) return `${minutes}分钟前`;
  if (seconds > 0) return `${seconds}秒前`;
  
  return '刚刚';
};

/**
 * 格式化数字（千分位）
 */
export const formatNumber = (num: number | string): string => {
  const number = typeof num === 'string' ? parseFloat(num) : num;
  
  if (isNaN(number)) {
    return '0';
  }
  
  return number.toLocaleString();
};

/**
 * 截断文本
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};