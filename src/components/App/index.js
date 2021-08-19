// == Import npm
import React from 'react';

// == Import css
import './styles.scss';

// == Import Components
import Header from 'src/components/Header';
import Connect from 'src/containers/Connect';
import SelectRegion from 'src/components/SelectRegion';
import VisitorCalendar from 'src/containers/VisitorCalendar';
import Footer from 'src/components/Footer';

// == App component
const App = () => (
  <div className="app">
    <Header />
    <Connect />
    <SelectRegion />
    <Footer />
  </div>
);

// == Export
export default App;
