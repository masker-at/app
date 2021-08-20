import React, { FC } from 'react';
import AliasList from './AliasList';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard: FC = () => {
  return (
    <>
      <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col sm:flex-row">
          <Sidebar />
          <AliasList />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
