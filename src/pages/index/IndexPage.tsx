import { PageLayout } from "@/components/layouts/PageLayout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function IndexPage() {
  return (
    <PageLayout
      variant="centered"
      contentWidth="md"
      contentClassName="items-center text-center gap-6"
    >
      <h1 className="text-3xl font-bold">Vote SNS</h1>
      <p className="text-muted-foreground">지금 바로 함께해보세요 👇</p>

      <Button className="w-32">
        <Link to="/signup">시작하기</Link>
      </Button>
    </PageLayout>
  )
}

export default IndexPage
