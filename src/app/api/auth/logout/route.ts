import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 这里可以添加令牌黑名单逻辑
    return NextResponse.json({
      success: true,
      message: '登出成功'
    })
  } catch (error) {
    console.error('登出错误:', error)
    return NextResponse.json(
      { success: false, message: '登出失败' },
      { status: 500 }
    )
  }
}