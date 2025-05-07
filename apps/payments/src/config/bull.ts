import { JobsOptions } from "bullmq"

export const defaultJobOptions: JobsOptions = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
  lifo: false,
  stackTraceLimit: 10,
  removeOnComplete: false,
  removeOnFail: false,
}

export const queueNames = {
  deposit: "deposit"
} as const

export const jobNames = {
  deposit: {
    create: "create",
    cancel: "cancel"
  }
} as const
