import PageHeader from "@/components/layouts/page-header"
import Wallet from "@/components/wallet"

export default function Page() {
  return (
    <div className="w-full grid gap-8 p-4">
      <PageHeader>
        <span>Carteira</span>
      </PageHeader>

      <div className="flex flex-col w-full py-8">
        <Wallet />
      </div>
    </div>
  )
}
