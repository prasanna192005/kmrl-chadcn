import { type NextRequest, NextResponse } from "next/server"

const mockUsers = [
  {
    id: "1",
    email: "admin@kmrl.co.in",
    password: "admin123",
    name: "Rajesh Kumar",
    role: "admin",
    department: "IT & Systems",
    permissions: ["read", "write", "delete", "admin"],
  },
  {
    id: "2",
    email: "engineer@kmrl.co.in",
    password: "eng123",
    name: "Priya Nair",
    role: "engineer",
    department: "Engineering",
    permissions: ["read", "write"],
  },
  {
    id: "3",
    email: "controller@kmrl.co.in",
    password: "ctrl123",
    name: "Suresh Menon",
    role: "controller",
    department: "Operations",
    permissions: ["read", "write"],
  },
  {
    id: "4",
    email: "hr@kmrl.co.in",
    password: "hr123",
    name: "Lakshmi Pillai",
    role: "hr",
    department: "Human Resources",
    permissions: ["read", "write"],
  },
  {
    id: "5",
    email: "safety@kmrl.co.in",
    password: "safety123",
    name: "Arun Krishnan",
    role: "safety_officer",
    department: "Safety & Security",
    permissions: ["read", "write", "compliance"],
  },
  {
    id: "6",
    email: "procurement@kmrl.co.in",
    password: "proc123",
    name: "Meera Thomas",
    role: "procurement",
    department: "Procurement",
    permissions: ["read", "write"],
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token: `kmrl-jwt-token-${user.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
