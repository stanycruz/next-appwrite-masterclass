import React from 'react';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces';
import { CircleUserRound, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

function Header({ loggedInUser }: { loggedInUser: IUser }) {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
  return (
    <div className="bg-primary p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">S C</h1>

      <div className={`flex gap-5 ${showSidebar ? 'hidden' : 'block'}`}>
        <div className="flex gap-1 items-center">
          <CircleUserRound className="text-white" size={14} />
          <h1 className="text-sm text-white">{loggedInUser?.name}</h1>
        </div>

        <Button onClick={() => setShowSidebar(true)}>
          <Menu className="text-white cursor-pointer" />
        </Button>
      </div>

      {showSidebar && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      )}
    </div>
  );
}

export default Header;
