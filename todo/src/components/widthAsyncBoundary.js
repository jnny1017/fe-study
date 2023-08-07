import { Suspense } from 'react';

import ErrorBoundary from './ErrorBoundary';

function widthAsyncBoundary(Component, { pendingFallback, rejectFallback }) {
  const Wrapper = (props) => {
    <ErrorBoundary rejectFallback={rejectFallback}>
      <Suspense fallback={pendingFallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>;
  };

  return Wrapper;
}

export default widthAsyncBoundary;


