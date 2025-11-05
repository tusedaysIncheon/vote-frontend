import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

interface NavItemProps {
  icon: React.ElementType
  label?: string
  to: string
}

export function NavItem({ icon: Icon, label, to }: NavItemProps) {
  const location = useLocation()
  const active = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent",
        active && "bg-accent text-primary"
      )}
    >
      <Icon className="h-6 w-6" />
      {label && <span className="text-sm font-medium">{label}</span>}
    </Link>
  )
}
