'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  MessageSquareQuote,
  MessageSquare,
  FileText,
  Settings,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import UserProfileDropdown from './profile-dropdown';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageSquare, label: 'Feedbacks', href: '/feedbacks' },
  { icon: MessageSquareQuote, label: 'Testimonials', href: '/testimonials' },
  { icon: FileText, label: 'Form Builder', href: '/build/feedbackForm' },
  { icon: Sparkles, label: 'Ask Auric', href: '/ask-auric' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

interface UsageData {
  used: number;
  limit: number;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/usage');
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setUsage(data);
      } catch {
        // card just stays blank if this fails
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const pct = usage && usage.limit > 0 ? Math.min(100, (usage.used / usage.limit) * 100) : 0;

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <Image src="/logo.png" width={90} height={90} alt="Auric" className="h-8 w-auto" />
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
          fixed left-0 top-0 z-50 flex h-screen h-dvh flex-col
          overflow-hidden
          border-r border-gray-200 bg-white
          transition-[transform,width] duration-300 ease-in-out
          w-[280px] sm:w-[300px]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
          ${collapsed ? 'md:w-[84px]' : 'md:w-[228px] lg:w-[250px]'}
        `}
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-gray-100 px-6 py-6">
          <div className="flex items-start justify-between">
            {!collapsed && (
              <div>
                <Image src="/logo.png" width={110} height={110} alt="Auric" className="h-9 w-auto" />
                <p className="mt-2 text-sm text-gray-500">Make every review count</p>
              </div>
            )}

            {collapsed && (
              <Image src="/logo.png" width={36} height={36} alt="Auric" className="mx-auto h-8 w-8 object-contain" />
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Collapse toggle, desktop only */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="absolute -right-3 top-7 hidden h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-blue-600 md:flex"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    title={collapsed ? item.label : undefined}
                    className={`
                      flex w-full items-center gap-3 rounded-xl
                      px-4 py-3 text-sm font-medium
                      transition-all duration-200
                      ${collapsed ? 'justify-center px-0' : ''}
                      ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Usage card */}
        <div className="shrink-0 border-t border-gray-200 px-3 py-4">
          {collapsed ? (
            <button
              onClick={() => router.push('/pricing')}
              title="Upgrade plan"
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
            >
              <Sparkles className="h-4 w-4" />
            </button>
          ) : (
            <div className="rounded-2xl bg-gray-50 p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-gray-900">Pro Plan</span>
                </div>
                <span className="text-[11px] text-gray-500">
                  {usage ? `${usage.used.toLocaleString()} / ${usage.limit.toLocaleString()}` : '—'}
                </span>
              </div>

              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <button
                onClick={() => router.push('/pricing')}
                className="h-9 w-full rounded-xl bg-blue-600 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                Upgrade Plan
              </button>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-gray-200">
          <UserProfileDropdown collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}