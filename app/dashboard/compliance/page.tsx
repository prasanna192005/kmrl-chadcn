import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ComplianceMonitor } from "@/components/compliance/compliance-monitor"

export default function CompliancePage() {
  return (
    <DashboardLayout>
      <ComplianceMonitor />
    </DashboardLayout>
  )
}
