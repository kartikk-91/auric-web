import { Check, Eye, Send, MoreHorizontal } from "lucide-react";

export default function FormBuilderHeader() {
    return (
        <header className="w-full px-8 py-8 bg-white space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Feedback Form Builder
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Create and customize forms to collect valuable feedback.
                    </p>
                </div>

                <div className="flex items-center gap-5">

                    <button className="flex items-center gap-1.5 px-5 py-2 text-lg font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-5 h-5 text-gray-500" />
                        Preview
                    </button>


                    <button className="flex items-center gap-1.5 px-4 py-2 text-l5 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        <Send className="w-5 h-5" />
                        Publish
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="h-px w-full bg-gray-200"></div>
        </header>
    );
}