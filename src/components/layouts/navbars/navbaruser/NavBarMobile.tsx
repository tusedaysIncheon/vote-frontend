import { Home, Bell, User, BarChart3 } from "lucide-react"
import { NavItem } from "./NavItem"

export default function NavbarMobile() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-background py-3">
      <NavItem icon={Home} label="홈" to="/" />
      <NavItem icon={BarChart3} label="투표" to="/vote" />
      <NavItem icon={Bell} label="알림" to="/notifications" />
      <NavItem icon={User} label="프로필" to="/profile" />
    </nav>
  )
}
