import { Home, Bell, User, BarChart3 } from "lucide-react"
import { NavItem } from "./NavItem"

export default function NavbarSidebar({ showLabels }: { showLabels?: boolean }) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-background p-4">
      <div className="flex flex-col gap-4">
        <NavItem icon={Home} label={showLabels ? "홈" : undefined} to="/" />
        <NavItem icon={BarChart3} label={showLabels ? "투표" : undefined} to="/vote" />
        <NavItem icon={Bell} label={showLabels ? "알림" : undefined} to="/notifications" />
        <NavItem icon={User} label={showLabels ? "프로필" : undefined} to="/profile" />
      </div>
    </aside>
  )
}
