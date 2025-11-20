import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { getMyInfoAPI } from "@/lib/api/UserApi";

function IndexPage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/"; // ✅ 새로고침하면서 상태 초기화
  };

  return (
    <PageLayout
      variant="centered"
      contentWidth="md"
      contentClassName="items-center text-center gap-6"
    >
      {isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold">
            {user?.nickname ?? user?.username}님, 환영합니다 🎉
          </h1>
          <p className="text-muted-foreground">
            오늘도 멋진 선택을 해보세요 👇
          </p>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="mt-4 active:scale-95 transition-transform"
          >
            로그아웃
          </Button>

          <button
            onClick={async () => {
              try {
                const res = await getMyInfoAPI();
                console.log("API 호출 성공:", res);
              } catch (error) {
                console.error("API 호출 실패:", error);
              }
            }}
            className="p-3 bg-blue-500 text-white rounded-lg"
          >
            🔥 API 테스트 (GET /v1/user)
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Vote SNS</h1>
          <p className="text-muted-foreground">지금 바로 함께해보세요 👇</p>

          <Button className="w-32">
            <Link to="/signup">시작하기</Link>
          </Button>
        </>
      )}
    </PageLayout>
  );
}

export default IndexPage;
