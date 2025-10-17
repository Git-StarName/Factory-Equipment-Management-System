import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface JWTPayload {
  userId: string
  username: string
  role: string
}

export interface AuthResult {
  success: boolean
  message: string
  userId?: string
  username?: string
  role?: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'default-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as JWTPayload
  } catch (error) {
    return null
  }
}

export async function authenticateRequest(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        message: '未提供认证令牌'
      }
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)

    if (!payload) {
      return {
        success: false,
        message: '无效的认证令牌'
      }
    }

    // 检查用户是否存在且状态正常
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, username: true, role: true, status: true }
    })

    if (!user || user.status !== 'ACTIVE') {
      return {
        success: false,
        message: '用户不存在或已被禁用'
      }
    }

    return {
      success: true,
      message: '认证成功',
      userId: user.id,
      username: user.username,
      role: user.role
    }

  } catch (error) {
    console.error('认证错误:', error)
    return {
      success: false,
      message: '认证失败'
    }
  }
}

export async function login(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return { success: false, message: '用户不存在' }
    }

    const bcrypt = require('bcryptjs')
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, message: '密码错误' }
    }

    if (user.status !== 'ACTIVE') {
      return { success: false, message: '账户已被禁用' }
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    })

    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      user: userWithoutPassword,
      token
    }

  } catch (error) {
    console.error('登录错误:', error)
    return { success: false, message: '登录失败' }
  }
}