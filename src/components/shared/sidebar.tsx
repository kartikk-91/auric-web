'use client';

import React from 'react';
import {
    LayoutDashboard,
    MessageSquareQuote,
    MessageSquare,
    FileText,
    Settings,
    ChevronDown,
    Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: MessageSquareQuote, label: 'Testimonials', href: '/testimonials' },
        { icon: MessageSquare, label: 'Feedback', href: '/build/feedbackForm' },
        { icon: FileText, label: 'Templates', href: '/templates' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <div className="w-[228px] lg:w-[250] h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="pl-8 py-5 pt-8">
                <div className="flex items-center gap-2">
                    <Image src={'/logo.png'} width={100} height={100} alt={'Auric'} />
                </div>
                <p className="text-sm mt-2 text-gray-500">
                    Make every review count
                </p>
            </div>

            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        // ✅ active based on route
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.label}>
                                <button
                                    onClick={() => router.push(item.href)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={2} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* PRO PLAN */}
            <div className="px-3 py-4 border-t border-gray-200">
                <div className="bg-white rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">Pro Plan</span>
                    </div>
                    <div className="mb-2">
                        <p className="text-xs text-gray-600 mb-1.5">
                            8,432 / 25,000 credits used
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: '33.7%' }}
                            ></div>
                        </div>
                    </div>

                    {/* ✅ make functional */}
                    <button
                        onClick={() => router.push('/pricing')}
                        className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Upgrade Plan
                    </button>
                </div>
            </div>

            {/* USER */}
            <div className="px-3 py-4 border-t border-gray-200">
                <button
                    onClick={() => router.push('/settings')}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">AC</span>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900">Alex Carter</p>
                        <p className="text-xs text-gray-500">alex@auric.app</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    );
}