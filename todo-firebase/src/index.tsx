import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import ErrorBoundary from './components/Shared/ErrorBoundary'
import './index.css'

const client = new QueryClient({
  defaultOptions: {},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ErrorBoundary>
        <Suspense fallback={<>"에러"</>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
)
