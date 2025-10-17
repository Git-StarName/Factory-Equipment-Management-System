import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { authenticateRequest } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * pageSize

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { model: { contains: search } },
        { serialNumber: { contains: search } }
      ]
    }
    if (type) where.type = type
    if (status) where.status = status

    const [equipment, total] = await Promise.all([
      prisma.equipment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize
      }),
      prisma.equipment.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: equipment,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    })

  } catch (error) {
    console.error('获取设备列表错误:', error)
    return NextResponse.json(
      { success: false, message: '获取设备列表失败' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request)
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 })
    }

    const data = await request.json()
    
    // 验证必填字段
    const requiredFields = ['name', 'model', 'serialNumber', 'type', 'location', 'purchaseDate']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `${field} 是必填字段` },
          { status: 400 }
        )
      }
    }

    // 检查序列号是否已存在
    const existingEquipment = await prisma.equipment.findUnique({
      where: { serialNumber: data.serialNumber }
    })

    if (existingEquipment) {
      return NextResponse.json(
        { success: false, message: '设备序列号已存在' },
        { status: 400 }
      )
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        model: data.model,
        serialNumber: data.serialNumber,
        type: data.type,
        status: data.status || 'ACTIVE',
        location: data.location,
        purchaseDate: new Date(data.purchaseDate),
        warrantyDate: data.warrantyDate ? new Date(data.warrantyDate) : null,
        lastMaintenance: data.lastMaintenance ? new Date(data.lastMaintenance) : null,
        nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : null,
        manufacturer: data.manufacturer,
        specifications: data.specifications || {},
        image: data.image,
        notes: data.notes,
        userId: auth.userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: equipment,
      message: '设备创建成功'
    })

  } catch (error) {
    console.error('创建设备错误:', error)
    return NextResponse.json(
      { success: false, message: '创建设备失败' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}