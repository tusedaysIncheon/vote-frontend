import { cn } from "@/lib/utils"

type PageLayoutVariant = "centered" | "top"
const variantClasses: Record<PageLayoutVariant, string> = {
  centered: "items-center justify-center",
  top: "items-stretch justify-start",
}

const predefinedWidthClasses = {
  full: "max-w-full",
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
} as const

type PredefinedWidth = keyof typeof predefinedWidthClasses
type PageLayoutWidth = PredefinedWidth | (string & {})

export interface PageLayoutProps extends React.ComponentProps<"section"> {
  /**
   * 컨텐츠 정렬 방식. 기본값은 중앙 정렬(centered)입니다.
   */
  variant?: PageLayoutVariant
  /**
   * 내부 컨텐츠 폭을 Tailwind width 유틸로 제한합니다.
   * "sm" | "md" | "lg" | "xl" 등 사전 정의 값을 쓰거나
   * 커스텀 클래스를 그대로 전달할 수 있습니다.
   */
  contentWidth?: PageLayoutWidth
  /**
   * 내부 컨텐츠 래퍼에 붙일 추가 클래스.
   * 기본적으로 내부는 column 레이아웃과 gap-6이 적용됩니다.
   */
  contentClassName?: string
  /**
   * 내부 래퍼 적용을 끄고 싶을 때 true로 설정하세요.
   * (레이아웃만 쓰고 싶은 경우)
   */
  noContentWrapper?: boolean
}

export function PageLayout({
  children,
  variant = "centered",
  contentWidth = "full",
  contentClassName,
  className,
  noContentWrapper = false,
  ...sectionProps
}: PageLayoutProps) {
  const widthClass =
    predefinedWidthClasses[contentWidth as PredefinedWidth] ?? contentWidth

  const inner = noContentWrapper ? (
    children
  ) : (
    <div className={cn("flex w-full flex-col gap-6", widthClass, contentClassName)}>
      {children}
    </div>
  )

  return (
    <section
      data-slot="page-layout"
      className={cn(
        "flex flex-1 min-h-0 flex-col px-6 py-12 transition-[padding] duration-300",
        variantClasses[variant],
        className
      )}
      {...sectionProps}
    >
      {inner}
    </section>
  )
}
