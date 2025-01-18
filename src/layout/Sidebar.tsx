import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  LayoutDashboardIcon,
  LogOutIcon,
  Settings,
  UserCircle,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { logoutUser } from '@/services/users';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';

function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboardIcon size={14} />,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: <UserCircle size={14} />,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings size={14} />,
    },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      Cookies.remove('token');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <SheetContent>
        <div className="flex flex-col gap-10 mt-20">
          {menuItems.map((item, index) => (
            <div
              className={`p-3 flex gap-2 items-center cursor-pointer ${
                pathname === item.path
                  ? 'bg-gray-100 border border-gray-500 rounded'
                  : ''
              }`}
              key={index}
              onClick={() => {
                router.push(item.path);
                setShowSidebar(false);
              }}
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleLogout}
          className="mt-10 w-full"
          disabled={loading}
        >
          <LogOutIcon size={14} />
          Logout
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar;
