import Image from "next/image";

const NotFound = () => {
    return (
        <div className=" min-h-screen w-full flex flex-col items-center justify-center bg-white px-4">

            <div className="relative flex justify-center">
                <Image
                    src="/not-found.png"
                    alt="404 not found"
                    width={700}
                    height={500}
                    className="object-contain max-w-full h-auto"
                    priority
                />

                <div className="absolute bottom-0">
                    <h1 className="text-4xl text-center font-bold text-gray-900 mt-6">
                        Oops! Page not found
                    </h1>

                    <p className="text-gray-500 text-center mt-3 max-w-xl">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;