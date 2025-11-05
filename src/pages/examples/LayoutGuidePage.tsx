import { PageLayout } from "@/components/layouts/PageLayout"
import { Button } from "@/components/ui/button"

export default function LayoutGuidePage() {
  return (
    <PageLayout
      variant="centered"
      contentWidth="md"
      contentClassName="gap-10"
      className="md:py-16"
    >
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">PageLayout 사용 가이드</h1>
        <p className="text-sm text-muted-foreground">
          헤더와 내비게이션을 제외한 컨텐츠 영역을 일관되게 사용하기 위한 기본 규칙입니다.
        </p>
      </header>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-base font-semibold text-foreground">기본 원칙</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            새 페이지는 <code>{`<PageLayout>`}</code>으로 감싸고, 필요한 정렬을{" "}
            <code>variant</code>로 지정합니다. 기본값은 중앙 정렬입니다.
          </li>
          <li>
            내부 컨텐츠 폭은 <code>contentWidth</code>로 조절합니다. 예){" "}
            <code>sm</code>, <code>md</code>, <code>lg</code>, 직접 Tailwind 클래스를 전달할 수도 있습니다.
          </li>
          <li>
            세부 여백이나 정렬은 <code>contentClassName</code>과 <code>className</code>으로 조정하세요.
          </li>
          <li>
            폼처럼 폭이 제한되어야 하는 경우, 내부에서 <code>max-w-*</code> 클래스를 추가로 사용합니다.
          </li>
        </ol>
      </section>

      <section className="space-y-4 rounded-lg border p-6">
        <h2 className="text-base font-semibold text-foreground">센터 정렬 예시</h2>
        <p className="text-sm text-muted-foreground">
          로그인/회원가입 페이지와 같이 콘텐츠를 가운데 배치하고 폭을 제한할 때 사용합니다.
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
{`<PageLayout variant="centered" contentWidth="sm">
  <Logo />
  <LoginForm />
</PageLayout>`}
        </pre>
      </section>

      <section className="space-y-4 rounded-lg border p-6">
        <h2 className="text-base font-semibold text-foreground">상단 정렬 예시</h2>
        <p className="text-sm text-muted-foreground">
          리스트나 대시보드처럼 위에서부터 자연스럽게 흐르는 레이아웃에 사용합니다.
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
{`<PageLayout variant="top" contentWidth="lg" contentClassName="gap-8">
  <PageHeader />
  <Filters />
  <CardGrid />
</PageLayout>`}
        </pre>
        <div className="grid gap-4 rounded-md border bg-card p-4 text-sm">
          <strong className="text-card-foreground">실행 예시</strong>
          <Button className="w-fit">필터 토글</Button>
          <div className="grid gap-2 md:grid-cols-2">
            <article className="rounded-md border p-4">
              <h3 className="font-semibold">더미 카드 1</h3>
              <p className="text-muted-foreground">
                리스트형 페이지에서는 variant="top"으로 상단 정렬을 사용하세요.
              </p>
            </article>
            <article className="rounded-md border p-4">
              <h3 className="font-semibold">더미 카드 2</h3>
              <p className="text-muted-foreground">
                필요에 따라 contentWidth를 lg나 xl로 확장할 수 있습니다.
              </p>
            </article>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
