import { cn } from "@/lib/utils"

export default function AppContent({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "h-[100dvh] overflow-hidden p-4 w-full",
        className
      )}
      {...props}
      >
      <div className={cn(
        "w-full h-full overflow-y-auto",
        "rounded-xl shadow-sm",
        "relative flex w-full flex-1 flex-col",
      )}>
        {props.children}
      </div>
    </main>
  )
}