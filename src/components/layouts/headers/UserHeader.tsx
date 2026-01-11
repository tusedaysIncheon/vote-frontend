import logo from "@/assets/logo.png"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore" // 유저 정보 가져오기
const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL;

export function UserHeader() {
  // 스토어에서 로그인한 유저 정보 꺼내기
  const { user } = useAuthStore()
  const imageKey = user?.imageUrl;

  const fullUrl = imageKey ? `${CDN_BASE_URL}/${imageKey}` : undefined;

  return (
    // sticky + backdrop-blur로 유리창 효과 구현
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-[60px] items-center justify-between px-4 max-w-screen-xl mx-auto w-full">
        {/* 로고 영역 */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <img src={logo} alt="The WDUW Logo" className="h-8 w-auto select-none" />
        </a>

        {/* 우측 아이콘 영역 */}
        <div className="flex items-center gap-2">
          {/* 알림 버튼 */}
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">알림</span>
          </Button>
          
          {/* 프로필 아바타 (스토어 이미지 연동) */}
          <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
            {/* S3 이미지 URL이 있으면 보여주고, 없으면 기본값 */}
            {user?.imageUrl ? (
              // S3 URL이 전체 경로(http...)가 아니라면 앞에 도메인 붙여야 할 수도 있음 (확인 필요)
              // 현재는 Presigned URL 방식으로 전체 경로가 저장된다고 가정
              <AvatarImage src={fullUrl} alt={user.nickname} className="object-cover" />
            ) : null}
            <AvatarFallback className="bg-muted text-xs font-medium">
              {user?.nickname?.[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}