import React, { FC } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard: FC = () => {
  return (
    <>
      <div className="container mx-auto px-10 overflow-auto min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex">
          <Sidebar />
        </main>
      </div>
    </>
  );
};
export default Dashboard;
