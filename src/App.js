import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNumber from './components/FilterNumber';
import FilterList from './components/FilterList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <AppProvider className="mainContainer">
      <div className="mainBody">
        <FilterName />
        <FilterNumber />
        <FilterList />
        <Table />
      </div>
      <Footer />
    </AppProvider>
  );
}

export default App;
