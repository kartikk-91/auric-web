'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquareQuote,
  MessageSquare,
  FileText,
  Settings,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import UserProfileDropdown from './profile-dropdown';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: MessageSquare, label: 'Feedbacks', href: '/feedbacks' },
    {
      icon: MessageSquareQuote,
      label: 'Testimonials',
      href: '/testimonials',
    },
    { icon: FileText, label: 'Form Builder', href: '/build/feedbackForm' },
    { icon: Sparkles, label: 'Ask Auric', href: '/ask-auric' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <Image
          src="/logo.png"
          width={90}
          height={90}
          alt="Auric"
          className="h-8 w-auto"
        />

        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 transition hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen
          w-[280px] flex-col border-r border-gray-200 bg-white
          transition-transform duration-300 ease-in-out
          sm:w-[300px]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-[228px]
          lg:w-[250px]
        `}
      >
        <div className="border-b border-gray-100 px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <Image
                src="/logo.png"
                width={110}
                height={110}
                alt="Auric"
                className="h-9 w-auto"
              />

              <p className="mt-2 text-sm text-gray-500">
                Make every review count
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      router.push(item.href);
                      setIsOpen(false);
                    }}
                    className={`
                      flex w-full items-center gap-3 rounded-xl
                      px-4 py-3 text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />

                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 px-3 py-4">
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />

              <span className="text-sm font-semibold text-gray-900">
                Pro Plan
              </span>
            </div>

            <div className="mb-3">
              <p className="mb-2 text-xs text-gray-600">
                8,432 / 25,000 credits used
              </p>

              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: '33.7%' }}
                />
              </div>
            </div>

            <button
              onClick={() => router.push('/pricing')}
              className="h-10 w-full rounded-xl bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <UserProfileDropdown />
        </div>
      </aside>
    </>
  );
}