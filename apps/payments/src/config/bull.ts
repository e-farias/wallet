import { JobsOptions, ConnectionOptions } from "bullmq"

export const connection: ConnectionOptions = {
  host: process.env.DB_REDIS_HOST,
  port: Number(process.env.DB_REDIS_PORT),
  password: process.env.DB_REDIS_PASSWORD,
}

export const defaultJobOptions: JobsOptions = {
  attempts: 0,
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
  deposit: "deposit",
  transaction: "transaction"
} as const

export const jobNames = {
  deposit: {
    create: "create",
    cancel: "cancel"
  },
  transaction: {
    create: "create",
    cancel: "cancel"
  },
} as const
