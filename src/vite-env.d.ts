
```
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SUPABASE_URL: string
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string
  readonly VITE_SITE_URL?: string
  readonly VITE_BOOKING_API_URL?: string
  readonly VITE_TIMESLOTS_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  Calendly?: {
    initPopupWidget(options: { url: string }): void;
  };
  REACT_APP_NAVIGATE?: (path: string) => void;
}

declare const __BASE_PATH__: string;
```
