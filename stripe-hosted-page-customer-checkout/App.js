// App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Success from './component/success';

function App() {
  return (
    <Router>
      <Route path="./component/success" component={Success} />
    </Router>
  );
}

export default App;
