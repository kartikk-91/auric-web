'use client';

import { useSession, signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

interface Props {
  collapsed?: boolean;
}

export default function UserProfileFooter({ collapsed = false }: Props) {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/login', redirect: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userName = session?.user?.name || 'Auric User';
  const userEmail = session?.user?.email || 'user@auric.app';
  const userInitials = userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="border-t border-gray-200 px-3 py-4">
      <div className={`flex items-center gap-3 ${collapsed ? 'flex-col' : ''}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <span className="text-sm font-semibold text-blue-600">{userInitials}</span>
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1 overflow-hidden text-left">
            <p className="truncate text-sm font-medium text-gray-900">{userName}</p>
            <p className="truncate text-xs text-gray-500">{userEmail}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          title="Log out"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}