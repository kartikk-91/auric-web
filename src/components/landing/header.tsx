import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router=useRouter();
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={'/logo.png'}
              width={100}
              height={100}
              alt={'Auric'}
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Product', 'Use Cases', 'Resources'].map((item) => (
              <button
                key={item}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
              >
                {item}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ))}

            <button className="text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={()=>{router.push('/auth/login')}} className="text-gray-700 hover:text-gray-900 font-medium text-[15px]">
              Log in
            </button>

            <button onClick={()=>{router.push('/auth/signup')}} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-[15px] rounded-md font-medium transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}