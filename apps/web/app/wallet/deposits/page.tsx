// UI
import PageHeader from "@/components/layouts/page-header"
import DepositsTable from "./table"

export default function Page() {

  return (
    <div className="w-full grid gap-8 p-4">
      <PageHeader>
        <span>Depósitos</span>
      </PageHeader>

      <div className="flex flex-col w-full py-8">
        <DepositsTable />
      </div>
    </div>
  )
}
