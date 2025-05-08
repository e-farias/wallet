"use client"

// Core
import { useState, useEffect } from "react"
import { cn, handleCopyToClipboard } from "@/lib/utils"
import { convertMoneyNumberToStr } from "@repo/lib/utils/currency"
import { getAllDeposits } from "@/lib/fetchs/deposit"
import { formatDateTime } from "@repo/lib/utils/datetime"
import { PaginationDataByPage, getPaginationDataByPage } from "@repo/lib/pagination"
import { transactionIsReversible } from "@repo/lib/schemas/general"
import { useWalletContext } from "@/providers/wallet"

// Types
import { DepositsTableData, GetAllDepositParams } from "@repo/lib/types/deposit"

// UI
import { toast } from "sonner"
import LoadingDots from "@/components/loaders/dots"
import Button from "@/components/button"
import {
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  Undo2
} from "lucide-react"
import TransactionStatusPill from "@/components/transaction-status-pill"
import Modal from "@/components/modal"
import DepositCancelForm from "@/components/deposit/cancel-deposit-form"

const DepositsTable = () => {

  const [loading, setLoading] = useState(true)
  const [tableData, setTableData] = useState<DepositsTableData>({ total: 0, items: [] })
  const [params, setParams] = useState<GetAllDepositParams>({
    page: 1,
  })
  const [pagination, setPagination] = useState<PaginationDataByPage>(getPaginationDataByPage(
    params.page,
    tableData.items.length,
    tableData.total
  ))
  const [showModalCancel, setShowModalCancel] = useState(false)
  const [depositIdActive, setDepositIdActive] = useState<null | string>(null)
  const { updateWallet } = useWalletContext()

  const getData = async (): Promise<void> => {
    try {

      setLoading(true)

      const data = await getAllDeposits(params)
      setTableData(data)

    } catch (error: any) {

      console.log('[ERROR]: ❌ onSubmit\n', error)
      let errorMsg = "Falha ao listar depósitos. Relate ao suporte."

      if (error.response?.data.msg) {
        errorMsg = error.response?.data.msg
      }

      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [params])

  useEffect(() => {
    setPagination(getPaginationDataByPage(
      params.page,
      tableData.items.length,
      tableData.total
    ))
  }, [tableData])

  return (
    <div className="w-full p-6 rounded-lg drop-shadow-2xl mb-12">

      <div className={cn(
        "flex overflow-x-auto justify-center items-center",
        "min-h-[67dvh] lg:min-h-[60dvh] 2xl:min-h-[70dvh]"
      )}>
        {loading ? (
          <div className="w-full min-h-[50dvh] flex justify-center items-center">
            <LoadingDots zoom={3} />
          </div>
        ) : (
          <>
            {tableData.items.length > 0 ? (
              <div className={cn(
                "w-full grid grid-cols-1 text-sm",
                "min-h-[67dvh] lg:min-h-[60dvh] 2xl:min-h-[70dvh]"
              )}>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-row w-full">
                    <table className="w-full whitespace-nowrap">
                      <thead>
                        <tr>
                          <th scope="col" className="px-2 py-3 text-left font-semibold">
                            ID
                          </th>
                          <th scope="col" className="px-2 py-3 text-left font-semibold">
                            Valor
                          </th>
                          <th scope="col" className="px-2 py-3 text-left font-semibold">
                            Status
                          </th>
                          <th scope="col" className="px-2 py-3 text-left font-semibold">
                            Feito em
                          </th>
                          <th scope="col" className="px-2 py-3 text-left font-semibold">
                            Atualizado em
                          </th>
                          <th scope="col" className="px-2 py-3 text-center font-semibold">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.items.map((item) => {
                          return (
                            <tr key={item.id} className="h-16 border-b border-dark-100 dark:border-dark-700 rounded">

                              <td className="p-2">
                                <div className="flex-auto truncate">
                                  <Button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(item.id)}
                                    popoverText="Copiar"
                                    className="min-h-0 p-0"
                                    theme="transparent"
                                  >
                                    {item.id}
                                  </Button>
                                </div>
                              </td>

                              <td className="p-2">
                                <div className="flex-auto">
                                  <p>
                                    {convertMoneyNumberToStr(item.amount)}
                                  </p>
                                </div>
                              </td>

                              <td className="p-2">
                                <div className="flex-auto">
                                  <TransactionStatusPill status={item.status} />
                                </div>
                              </td>

                              <td className="p-2">
                                <div className="flex-auto">
                                  <p>
                                    {formatDateTime(item.createdAt)}
                                  </p>
                                </div>
                              </td>

                              <td className="p-2">
                                <div className="flex-auto">
                                  <p>
                                    {formatDateTime(item.updatedAt)}
                                  </p>
                                </div>
                              </td>

                              <td className="p-2">
                                <div className={cn(
                                  "relative flex flex-row justify-center gap-2"
                                )}>
                                  {transactionIsReversible(item.status) && (
                                    <Button
                                      className={cn(
                                        "p-1 px-1 w-10 h-10 rounded-full border-transparent",
                                        "bg-transparent active:bg-transparent",
                                        "shadow-none hover:shadow",
                                      )}
                                      popoverText="Cancelar"
                                      onClick={() => {
                                        setShowModalCancel(true)
                                        setDepositIdActive(item.id)
                                      }}
                                    >
                                      <Undo2
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                      />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='flex pt-6 flex-row w-full items-center gap-2 justify-end'>
                  <div>
                    <div className='flex flex-row gap-4 items-center'>
                      <Button
                        className={cn(
                          'p-1.5 min-h-0 cursor-pointer'
                        )}
                        onClick={() => {
                          setParams(prev => ({
                            ...prev,
                            page: pagination.back,
                          }))
                        }}
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </Button>

                      <span className='text-xl'>
                        {params.page}
                      </span>

                      <Button
                        className={cn(
                          'p-1.5 min-h-0 cursor-pointer'
                        )}
                        onClick={() => {
                          setParams(prev => ({
                            ...prev,
                            page: pagination.next,
                          }))
                        }}
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <PackageOpen
                  className="h-16 w-16 text-primary-100"
                  aria-hidden="true"
                />
                <span>
                  Nada cadastrado no momento
                </span>
              </div>
            )}

            {(showModalCancel && depositIdActive) && (
              <Modal
                show={showModalCancel}
                setShow={setShowModalCancel}
                size="sm"
              >
                <DepositCancelForm
                  depositId={depositIdActive}
                  handleSubmitSuccess={() => {
                    getData()
                    setShowModalCancel(false)
                    setDepositIdActive(null)
                    updateWallet()
                  }}
                  handleCancel={() => {
                    setShowModalCancel(false)
                    setDepositIdActive(null)
                  }}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DepositsTable