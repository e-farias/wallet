namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_APP_NAME: string
    
    DB_POSTGRES_URL: string
    
    HASH_SALT: string
    AUTH_SECRET: string

    DOCKER_HEALTHCHECK_INTERVAL: string
    DOCKER_HEALTHCHECK_RETRIES: string
    DOCKER_HEALTHCHECK_TIMEOUT: string
  }
}