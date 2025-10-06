"use client"

import { useState } from 'react'

// Mock employee data
const employeesData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    department: "Engineering",
    position: "Senior Developer",
    email: "rajesh.kumar@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 2,
    name: "Priya Sharma",
    department: "Marketing",
    position: "Marketing Manager",
    email: "priya.sharma@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 3,
    name: "Amit Patel",
    department: "Sales",
    position: "Sales Representative",
    email: "amit.patel@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    department: "HR",
    position: "HR Specialist",
    email: "sneha.reddy@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 5,
    name: "Vikram Singh",
    department: "Engineering",
    position: "Frontend Developer",
    email: "vikram.singh@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 6,
    name: "Ananya Iyer",
    department: "Finance",
    position: "Financial Analyst",
    email: "ananya.iyer@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 7,
    name: "Arjun Mehta",
    department: "Operations",
    position: "Operations Manager",
    email: "arjun.mehta@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 8,
    name: "Kavya Nair",
    department: "Marketing",
    position: "Content Specialist",
    email: "kavya.nair@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 9,
    name: "Rohan Verma",
    department: "Engineering",
    position: "Backend Developer",
    email: "rohan.verma@kmrl.in",
    phone: "+91 8468845787"
  },
  {
    id: 10,
    name: "Pooja Desai",
    department: "Sales",
    position: "Sales Manager",
    email: "pooja.desai@kmrl.in",
    phone: "+91 8468845787"
  }
]

interface Employee {
  id: number
  name: string
  department: string
  position: string
  email: string
  phone: string
}

export default function EmployeePage() {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({})

  const handleCall = async (employeeId: number, phone: string) => {
    if (!phone) return alert("Enter phone number")

    setLoadingStates(prev => ({ ...prev, [employeeId]: true }))
    
    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone }),
      })
      const data = await res.json()
      
      if (data.success) {
        alert("📞 Call initiated successfully!")
      } else {
        alert("❌ Error: " + (data.error?.message || data.error))
      }
    } catch (err: any) {
      alert("⚠️ Something went wrong: " + err.message)
    }
    
    setLoadingStates(prev => ({ ...prev, [employeeId]: false }))
  }

  // Group employees by department
  const employeesByDepartment = employeesData.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = []
    }
    acc[employee.department].push(employee)
    return acc
  }, {} as Record<string, Employee[]>)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
          <p className="mt-2 text-gray-600">
            Manage and contact employees across all departments
          </p>
        </div>

        {Object.entries(employeesByDepartment).map(([department, employees]) => (
          <div key={department} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              {department} ({employees.length})
            </h2>
            
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a 
                            href={`mailto:${employee.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {employee.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleCall(employee.id, employee.phone)}
                            disabled={loadingStates[employee.id]}
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors ${
                              loadingStates[employee.id]
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                          >
                            {loadingStates[employee.id] ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Calling...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                Take Update
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        {/* Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Department Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(employeesByDepartment).map(([department, employees]) => (
              <div key={department} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
                <div className="text-sm text-gray-600">{department}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}