import {
  Dispatch,
  SetStateAction,
  Fragment,
  useRef,
} from 'react'
import { cn } from '@/lib/utils'

// Types
type Props = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  size: 'sm' | 'md' | 'lg'
  title?: string
  children: React.ReactNode
  icon?: 'Create' | 'Edit' | 'Delete'
  zIndex?: number
}

// UI
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, Transition } from '@headlessui/react'
import { Trash2, Plus, X, SquarePen } from 'lucide-react'

const Modal = ({
  show,
  setShow,
  size,
  title,
  icon,
  zIndex = 10,
  children,
}: Props) => {

  const cancelButtonRef = useRef(null)
  const renderIcon = () => {
    if (icon) {

      if (icon === 'Create') {
        return (
          <div className='inline-flex justify-start mr-2 border border-dark-700 rounded-md p-1'>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </div>
        )
      }

      if (icon === 'Edit') {
        return (
          <div className='inline-flex justify-start mr-2 border border-dark-700 rounded-md p-1'>
            <SquarePen className="h-4 w-4" aria-hidden="true" />
          </div>
        )
      }

      // Delete
      return (
        <div className='inline-flex justify-start mr-2 border border-dark-700 rounded-md p-1'>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </div>
      )

    } else {
      return <></>
    }
  }

  return (
    <AnimatePresence>
      <Transition.Root
        show={show}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "keyframes", duration: 0.5 }}
              className={cn(
                "fixed inset-0 transition-opacity",
                "bg-primary-50/25 dark:bg-dark-950/50 backdrop-blur-sm"
              )}
            />
          </Transition.Child>

          <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            transition={{ type: "keyframes", duration: 0.25 }}
            className="fixed inset-0 z-99 overflow-y-auto scroll-hidden"
          >
            <div className="flex min-h-full items-center justify-center p-0 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className={cn(
                  'relative transform transition-all overflow-hidden',
                  'text-left rounded-2xl shadow-xl dark:shadow-dark-950 my-8',
                  "bg-dark-50 dark:bg-dark-950",
                  "border dark:border-dark-700",
                  'w-11/12',
                  size === 'sm' ? 'lg:w-4/12' : undefined,
                  size === 'md' ? 'lg:w-8/12' : undefined,
                  size === 'lg' ? 'lg:w-11/12' : undefined,
                )}>
                  <div className="flex flex-col">

                    <div className={cn(
                      "grid grid-cols-12 w-full p-5",
                    )}>

                      <div className='flex col-span-11 items-center'>
                        {renderIcon()}
                        <Dialog.Title as="div" className={cn(
                          "inline-flex text-xl tracking-tight",
                          "text-dark-700 dark:text-dark-100"
                        )}>
                          {title}
                        </Dialog.Title>
                      </div>

                      <div className='col-span-1 flex justify-end'>
                        <button
                          type="button"
                          className="rounded-md cursor-pointer"
                          onClick={() => setShow(false)}
                        >
                          <span className="sr-only">Fechar</span>
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 w-full p-4 overflow-y-auto">
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

export default Modal