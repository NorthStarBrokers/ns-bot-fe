const environment = import.meta.env

export const enum Environment {
  local = 'local',
  development = 'development',
  production = 'production'
}

export const host = {
  environment: environment.VITE_ENVIRONMENT as Environment,
  backend: environment.VITE_HOST,
  backendAPIKey: environment.VITE_API_KEY
}