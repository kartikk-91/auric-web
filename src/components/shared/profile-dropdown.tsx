'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDown, Settings, CreditCard, LogOut } from 'lucide-react';

interface Props {
  collapsed?: boolean;
}

export default function UserProfileDropdown({ collapsed = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await signOut({ callbackUrl: '/auth/login', redirect: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userName = session?.user?.name || 'Auric User';
  const userEmail = session?.user?.email || 'user@auric.app';
  const userInitials = userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  const menuItems = [
    {
      icon: Settings,
      label: 'Settings',
      description: 'Manage your preferences',
      onClick: () => { router.push('/settings'); setIsOpen(false); },
    },
    {
      icon: CreditCard,
      label: 'Subscription',
      description: 'View your plan & billing',
      onClick: () => { router.push('/subscription'); setIsOpen(false); },
    },
    {
      icon: LogOut,
      label: 'Log out',
      description: 'Sign out of your account',
      onClick: handleLogout,
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="relative border-t border-gray-200 px-3 py-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={collapsed ? userName : undefined}
        className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50 ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <span className="text-sm font-semibold text-blue-600">{userInitials}</span>
        </div>

        {!collapsed && (
          <>
            <div className="flex-1 overflow-hidden text-left">
              <p className="truncate text-sm font-medium text-gray-900">{userName}</p>
              <p className="truncate text-xs text-gray-500">{userEmail}</p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div
          className={`
            absolute z-50 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg
            ${collapsed ? 'bottom-2 left-full ml-2' : 'bottom-full left-3 right-3 mb-2'}
          `}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isDanger = item.variant === 'danger';

            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isDanger ? 'bg-red-50' : item.label === 'Settings' ? 'bg-blue-50' : 'bg-green-50'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isDanger ? 'text-red-500' : item.label === 'Settings' ? 'text-blue-500' : 'text-green-500'
                    }`}
                  />
                </div>

                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}