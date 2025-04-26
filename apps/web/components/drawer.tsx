import {
  Dispatch,
  SetStateAction,
  Fragment,
  useRef,
} from 'react'
import { cn } from '@/lib/utils'

// Types
type Props = {
  showDrawer: boolean
  setShowDrawer: Dispatch<SetStateAction<boolean>>
  height: number
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  zIndex?: number
  showHeader?: boolean
  hiddenOverlayBg?: boolean
}


// UI
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, Transition } from '@headlessui/react'
import { Trash2, Plus, X, SquarePen } from 'lucide-react'

const Drawer = ({
  showDrawer,
  setShowDrawer,
  height,
  size,
  zIndex = 10,
  showHeader = false,
  hiddenOverlayBg = false,
  children,
}: Props) => {

  const cancelButtonRef = useRef(null)
  const dialogPanelClassNames = cn(
    'relative transform transition-all overflow-hidden',
    'bg-dark-50 dark:bg-dark-950 text-left rounded-t-4xl shadow-xl',
    `w-full h-[${height}dvh] border-t`,
    'border-primary-50/20',
    size === 'sm' ? 'lg:w-4/12' : undefined,
    size === 'md' ? 'lg:w-9/12' : undefined,
    size === 'lg' ? 'lg:w-11/12' : undefined,
  )

  return (
    <AnimatePresence>
      <Transition.Root
        show={showDrawer}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative"
          initialFocus={cancelButtonRef}
          onClose={() => { }}
          style={{
            zIndex
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={cn(
              "fixed inset-0 transition-opacity",
              "bg-primary-50/25 dark:bg-dark-800/25 backdrop-blur-sm",
              hiddenOverlayBg ? 'bg-transparent' : undefined
            )} />
          </Transition.Child>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="fixed inset-0 z-99 overflow-y-auto"
          >
            <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={dialogPanelClassNames}>
                  <div className="flex flex-col h-full">

                    {showHeader && (
                      <div className="grid grid-cols-12 w-full p-4">
                        <div className='col-span-12 flex justify-end'>
                          <button
                            type="button"
                            className="rounded-md"
                            onClick={() => setShowDrawer(false)}
                          >
                            <span className="sr-only">Fechar</span>
                            <X className="h-7 w-7" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 w-full h-full p-6 lg:px-10 2xl:px-16 overflow-y-auto">
                      {children}
                    </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </motion.div>

        </Dialog>
      </Transition.Root >
    </AnimatePresence>
  )
}

export default Drawer