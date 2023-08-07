import { Suspense } from 'react'

import ErrorBoundary from './ErrorBoundary'

function widthAsyncBoundary(
  Component: () => JSX.Element,
  { pendingFallback, rejectFallback }: any,
) {
  const Wrapper = (props: any) => {
    ;<ErrorBoundary rejectFallback={rejectFallback}>
      <Suspense fallback={pendingFallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  }

  return Wrapper
}

export default widthAsyncBoundary
