import Image from "next/image";

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 py-10 sm:-mt-10">

            <div className="w-full max-w-[700px] flex flex-col items-cente relative">

                <div className="relative w-full aspect-[7/5]">
                    <Image
                        src="/not-found.png"
                        alt="404 not found"
                        fill
                        sizes="(max-width: 768px) 90vw, 700px"
                        className="object-contain"
                        priority
                    />
                </div>

             
                <div className="text-center mt-4 sm:mt-6 lg:absolute lg:bottom-0 w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        Oops! Page not found
                    </h1>

                    <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-3 max-w-xl mx-auto px-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default NotFound;