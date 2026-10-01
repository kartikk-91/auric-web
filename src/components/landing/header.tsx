import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            width={100}
            height={38}
            alt="Auric"
            className="h-8 w-auto"
            priority
          />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 lg:flex">
          <a
            href="#workflow"
            className="relative py-2 transition hover:text-slate-950 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Platform
          </a>
          <a
            href="#capabilities"
            className="relative py-2 transition hover:text-slate-950 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Solutions
          </a>
          <a
            href="#start"
            className="relative py-2 transition hover:text-slate-950 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            Resources
          </a>
        </nav>
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/auth/login")}
            className="border-b border-transparent pb-0.5 text-sm font-semibold text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#1769e8] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(23,105,232,0.8)] transition hover:-translate-y-px hover:bg-[#0f58ca]"
          >
            Start free{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
