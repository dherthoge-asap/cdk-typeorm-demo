import { existsSync, readFileSync } from 'fs'

export interface SharedResourcesContext {
  ROOT_DOMAIN_NAME: string
  COGNITO_DOMAIN_PREFIX: string
  AWS_CIDR: string
  ADMIN_GOOGLE_METADATA?: string
  APP_GOOGLE_METADATA?: string
}

function parseEnvFile(path: string): Record<string, string> {
  const envFile = readFileSync(path).toString()
  const envFileLines = envFile.split('\n')
  const envVars: Record<string, string> = {}
  for (const envFileLine of envFileLines) {
    if (!envFileLine) { continue }
    const parts = envFileLine.split('=')
    if (parts.length !== 2) { throw new Error('invalid env var, a line does not follow the name=value pattern') }
    const [name, value] = parts
    envVars[name] = value
  }

  return envVars
}

export function getSharedResourcesContext(): SharedResourcesContext {
  const envVars = parseEnvFile(`${__dirname}/../../../environments/shared-resources.env`)

  const {
    ROOT_DOMAIN_NAME,
    COGNITO_DOMAIN_PREFIX,
    AWS_CIDR,
  } = envVars

  if (!ROOT_DOMAIN_NAME) { throw new Error('ROOT_DOMAIN_NAME not set') }
  if (!COGNITO_DOMAIN_PREFIX) { throw new Error('COGNITO_DOMAIN_PREFIX not set') }
  if (!AWS_CIDR) { throw new Error('AWS_CIDR not set') }

  const context: SharedResourcesContext = {
    ROOT_DOMAIN_NAME,
    COGNITO_DOMAIN_PREFIX,
    AWS_CIDR,
  }

  if (existsSync(`${__dirname}/../google-metadata/admin.xml`)) {
    context.ADMIN_GOOGLE_METADATA = readFileSync(`${__dirname}/../google-metadata/admin.xml`).toString()
  }
  if (existsSync(`${__dirname}/../google-metadata/app.xml`)) {
    context.APP_GOOGLE_METADATA = readFileSync(`${__dirname}/../google-metadata/app.xml`).toString()
  }

  return context
}