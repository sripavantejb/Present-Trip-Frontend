const trim = (value: string | undefined) => (value ?? '').trim()

export const env = {
  apiBaseUrl: trim(import.meta.env.VITE_API_BASE_URL) || '/api/v1',
  apiToken: trim(import.meta.env.VITE_API_TOKEN),
}

if (import.meta.env.DEV) {
  if (!env.apiToken) {
    console.warn(
      '[Present Trip] VITE_API_TOKEN is missing. Set it in Present-Trip-Frontend/.env and restart `npm run dev`.',
    )
  } else if (/presentt/i.test(env.apiToken)) {
    console.error(
      '[Present Trip] VITE_API_TOKEN must be your internal token (present-trip-api-token), not the SRDV portal Api-Token. Restart Vite after fixing .env.',
    )
  }
}
