import logo from "@/assets/logo.png"
import { ModeToggle } from "@/components/theme/mod-toggle"
import { Button } from "@/components/ui/button"

export function GuestHeader() {
  return (
    <header className="fixed w-full h-[60px] flex justify-between bg-background items-center border-b z-50">
      <div className="p-4">
        <a href="/">
          <img src={logo} alt="The WDUW Logo" className="h-10 w-auto select-none" />
        </a>
      </div>
      {/* 우측 다크모드 토글 */}
      <div className="flex p-4 gap-2">
        <Button
          asChild
          variant="outline"
          className="active:scale-95 active:brightness-90 transition-transform duration-100"
        >
          <a href="/login">로그인</a>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
