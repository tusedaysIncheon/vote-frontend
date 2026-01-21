import { LoginForm } from "@/features/auth/components/LoginForm"
import { PageLayout } from "@/shared/layouts/PageLayout"

export default function LoginPage() {
  return (
    <PageLayout
      variant="centered"
      contentWidth="sm"
    >
      <LoginForm />
    </PageLayout>
  )
}
