import { ReactNode } from "react"
import { SidebarTrigger } from "@/components/layouts/sidebar"

const PageHeader = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <header className="flex shrink-0 items-center gap-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-3" />
        <h1 className="text-2xl font-semibold gap-2 inline-flex items-center">
          {children}
        </h1>
      </div>
    </header>
  )
}

export default PageHeader