// UI
import PageHeader from "@/components/layouts/page-header"
import TransactionsTable from "./table"
import WalletShort from "@/components/wallet-short"

export default function Page() {

  return (
    <div className="w-full grid gap-2 p-4">

      <PageHeader>
        <span>Transações</span>
      </PageHeader>

      <div className="flex flex-col w-full py-4 gap-4">
        <WalletShort />
        <TransactionsTable />
      </div>
    </div>
  )
}
