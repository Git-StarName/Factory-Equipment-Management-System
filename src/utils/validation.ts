/**
 * 验证工具函数
 */

/**
 * 验证邮箱地址
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证手机号码（中国大陆）
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * 验证身份证号码
 */
export const validateIdCard = (idCard: string): boolean => {
  if (!idCard || idCard.length !== 18) {
    return false;
  }
  
  // 验证格式
  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
  if (!idCardRegex.test(idCard)) {
    return false;
  }
  
  // 验证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard[i]) * weights[i];
  }
  
  const checkCode = checkCodes[sum % 11];
  return idCard[17].toUpperCase() === checkCode;
};

/**
 * 验证密码强度
 */
export const validatePassword = (password: string): {
  valid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  message: string;
} => {
  if (!password || password.length < 6) {
    return {
      valid: false,
      strength: 'weak',
      message: '密码长度至少为6位'
    };
  }
  
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = hasNumber + hasLower + hasUpper + hasSpecial;
  
  if (password.length >= 8 && strength >= 3) {
    return {
      valid: true,
      strength: 'strong',
      message: '密码强度：强'
    };
  } else if (password.length >= 6 && strength >= 2) {
    return {
      valid: true,
      strength: 'medium',
      message: '密码强度：中'
    };
  } else {
    return {
      valid: true,
      strength: 'weak',
      message: '密码强度：弱（建议包含大小写字母、数字和特殊字符）'
    };
  }
};

/**
 * 验证用户名
 */
export const validateUsername = (username: string): {
  valid: boolean;
  message: string;
} => {
  if (!username || username.length < 3) {
    return {
      valid: false,
      message: '用户名长度至少为3个字符'
    };
  }
  
  if (username.length > 20) {
    return {
      valid: false,
      message: '用户名长度不能超过20个字符'
    };
  }
  
  const usernameRegex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (!usernameRegex.test(username)) {
    return {
      valid: false,
      message: '用户名只能包含字母、数字、下划线和中文'
    };
  }
  
  return {
    valid: true,
    message: '用户名格式正确'
  };
};

/**
 * 验证设备编号
 */
export const validateEquipmentCode = (code: string): boolean => {
  if (!code || code.length < 3) {
    return false;
  }
  
  // 设备编号格式：EQ-001, MACHINE-001, 设备-001 等
  const codeRegex = /^[A-Za-z0-9\u4e00-\u9fa5]+[-_][A-Za-z0-9]+$/;
  return codeRegex.test(code);
};

/**
 * 验证MAC地址
 */
export const validateMacAddress = (mac: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

/**
 * 验证IP地址
 */
export const validateIpAddress = (ip: string): boolean => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

/**
 * 验证端口号
 */
export const validatePort = (port: number): boolean => {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
};

/**
 * 验证URL地址
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 验证数字范围
 */
export const validateNumberRange = (value: number, min: number, max: number): boolean => {
  return typeof value === 'number' && value >= min && value <= max;
};

/**
 * 验证整数
 */
export const validateInteger = (value: any): boolean => {
  return Number.isInteger(Number(value));
};

/**
 * 验证正数
 */
export const validatePositiveNumber = (value: number): boolean => {
  return typeof value === 'number' && value > 0;
};

/**
 * 验证日期格式
 */
export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  
  const d = new Date(date);
  return !isNaN(d.getTime());
};

/**
 * 验证时间格式
 */
export const validateTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * 验证日期时间格式
 */
export const validateDateTime = (dateTime: string): boolean => {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2} ([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  return dateTimeRegex.test(dateTime);
};

/**
 * 验证中文字符
 */
export const validateChinese = (text: string): boolean => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  return chineseRegex.test(text);
};

/**
 * 验证英文字符
 */
export const validateEnglish = (text: string): boolean => {
  const englishRegex = /[a-zA-Z]/;
  return englishRegex.test(text);
};

/**
 * 验证字母数字组合
 */
export const validateAlphanumeric = (text: string): boolean => {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(text);
};

/**
 * 验证文件扩展名
 */
export const validateFileExtension = (filename: string, allowedExtensions: string[]): boolean => {
  if (!filename || !allowedExtensions || allowedExtensions.length === 0) {
    return false;
  }
  
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
};

/**
 * 验证文件大小
 */
export const validateFileSize = (fileSize: number, maxSize: number): boolean => {
  return fileSize <= maxSize;
};

/**
 * 验证表单数据
 */
export const validateForm = (formData: Record<string, any>, rules: Record<string, any[]>): {
  valid: boolean;
  errors: Record<string, string[]>;
} => {
  const errors: Record<string, string[]> = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    const fieldErrors: string[] = [];
    
    fieldRules.forEach(rule => {
      if (rule.required && (!value || value.toString().trim() === '')) {
        fieldErrors.push(rule.message || `${field}不能为空`);
      }
      
      if (rule.minLength && value && value.length < rule.minLength) {
        fieldErrors.push(rule.message || `${field}长度不能少于${rule.minLength}个字符`);
      }
      
      if (rule.maxLength && value && value.length > rule.maxLength) {
        fieldErrors.push(rule.message || `${field}长度不能超过${rule.maxLength}个字符`);
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        fieldErrors.push(rule.message || `${field}格式不正确`);
      }
      
      if (rule.validator && typeof rule.validator === 'function') {
        const result = rule.validator(value);
        if (result !== true) {
          fieldErrors.push(result || `${field}验证失败`);
        }
      }
    });
    
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};