import logo from "@/assets/logo.png"
import { Bell } from "lucide-react"


export function UserHeader() {
  return (
    <header className="fixed w-full h-[60px] flex justify-between bg-background items-center border-b z-50">
      <div className="p-4">
        <a href="/">
          <img src={logo} alt="The WDUW Logo" className="h-10 w-auto select-none" />
        </a>
      </div>
      <div className="flex p-4 gap-2">
        <Bell size={24} className="active:scale-95 active:brightness-90 transition-transform duration-100"/>
      </div>
    </header>
  )
}