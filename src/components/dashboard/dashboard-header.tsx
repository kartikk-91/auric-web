import { Check, Eye, Send, MoreHorizontal } from "lucide-react";

export default function DashboardHeader() {

    return (
        <header className="w-full px-8 pt-8 pb-4 bg-white space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Welcome back, Kartik! Here's what's happening with your feedbacks.
                    </p>
                </div>

                <div className="flex items-center gap-5">

                    <button className="flex items-center gap-1.5 px-5 py-2  font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-5 h-5 text-gray-500" />
                        Copy Form Link
                    </button>


                    <button  className="flex items-center gap-1.5 px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        <Send className="w-5 h-5" />
                        Share Wall
                    </button>
                </div>
            </div>
        </header>
    );
}