import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UserManagement } from "@/components/users/user-management"

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  )
}
