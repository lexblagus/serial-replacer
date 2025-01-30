import {Routes as ReactRoutes, Route} from 'react-router-dom';
import Wrapper from './components/Wrapper'

// =============================================================================

function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Wrapper />} />
    </ReactRoutes>
  );
}

export default Routes;
