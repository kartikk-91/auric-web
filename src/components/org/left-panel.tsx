import Image from 'next/image'

const LeftPanel = () => {
    return (
        <div className="w-full lg:w-80 space-y-4 lg:space-y-8">
            <div>
                <p className="text-[11px] sm:text-xs uppercase font-semibold text-blue-600 tracking-wider mb-1.5 sm:mb-2">
                    welcome to auric
                </p>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                    Let's set up your organization 👋
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    This information helps us personalize your experience and organize your feedback beautifully.
                </p>
            </div>


           
            <div className="hidden lg:block space-y-4">
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold">1</span>
                    </div>
                    <div className="pt-1">
                        <p className="text-sm font-semibold text-gray-900">Organization Details</p>
                        <p className="text-sm text-gray-500">Tell us about your organization</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-gray-600 font-semibold">2</span>
                    </div>
                    <div className="pt-1">
                        <p className="text-sm font-semibold text-gray-400">Your First Feedback Form</p>
                        <p className="text-sm text-gray-400">Create your first form</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-gray-600 font-semibold">3</span>
                    </div>
                    <div className="pt-1">
                        <p className="text-sm font-semibold text-gray-400">Share with Customers</p>
                        <p className="text-sm text-gray-400">Start collecting feedback and analytics</p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative md:mt-16">
                <div>
                    <Image
                        src={"/bg/dots.png"}
                        alt="dots"
                        height={150}
                        width={150}
                        className="w-[80px] h-[80px] rotate-90"
                    />
                </div>
                <div className="absolute top-0 left-0">
                    <Image
                        src={"/bg/cloud.png"}
                        alt="dots"
                        height={250}
                        width={250}
                        className="w-full h-fit"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 z-5">
                    <Image
                        src={"/bg/file-float.png"}
                        alt="dots"
                        height={150}
                        width={150}
                        className="w-[280px] h-fit"
                    />
                </div>
            </div>
        </div>
    )
}

export default LeftPanel