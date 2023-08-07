import { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

function withAsyncBoundary<
  Props extends Record<string, unknown> = Record<string, never>,
>(
  Component: () => JSX.Element,
  {
    pendingFallback,
    rejectFallback,
  }: { pendingFallback: React.ReactNode; rejectFallback?: React.ReactNode },
) {
  const Wrapper = (props: Props) => {
    return (
      <ErrorBoundary rejectFallback={rejectFallback}>
        <Suspense fallback={pendingFallback}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return Wrapper
}

export default withAsyncBoundary
