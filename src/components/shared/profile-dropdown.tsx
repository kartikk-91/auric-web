'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDown, Settings, CreditCard, LogOut } from 'lucide-react';

export default function UserProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            setIsOpen(false);

            await signOut({
                callbackUrl: '/login',
                redirect: true,
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userName =
        session?.user?.name || 'Auric User';

    const userEmail =
        session?.user?.email || 'user@auric.app';

    const userInitials = userName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const menuItems = [
        {
            icon: Settings,
            label: 'Settings',
            description: 'Manage your preferences',
            onClick: () => {
                router.push('/settings');
                setIsOpen(false);
            },
        },
        {
            icon: CreditCard,
            label: 'Subscription',
            description: 'View your plan & billing',
            onClick: () => {
                router.push('/subscription');
                setIsOpen(false);
            },
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
        <div
            className="px-3 py-4 border-t border-gray-200 relative"
            ref={dropdownRef}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                        {userInitials}
                    </span>
                </div>

                <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {userName}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                        {userEmail}
                    </p>
                </div>

                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        const isDanger =
                            item.variant === 'danger';

                        return (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                                    index !== menuItems.length - 1
                                        ? 'border-b border-gray-100'
                                        : ''
                                }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                        isDanger
                                            ? 'bg-red-50'
                                            : item.label === 'Settings'
                                            ? 'bg-blue-50'
                                            : 'bg-green-50'
                                    }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${
                                            isDanger
                                                ? 'text-red-500'
                                                : item.label === 'Settings'
                                                ? 'text-blue-500'
                                                : 'text-green-500'
                                        }`}
                                    />
                                </div>

                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {item.label}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}