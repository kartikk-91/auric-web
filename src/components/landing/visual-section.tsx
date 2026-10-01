import { ArrowUpRight, Quote, Sparkles, Star } from "lucide-react";

const feedbackCards = [
  {
    name: "Maya Chen",
    role: "Product lead",
    text: "The new dashboard gives our team a much clearer starting point.",
    position: "left-0 top-8 -rotate-[4deg]",
    accent: "bg-blue-600",
    score: "5.0",
  },
  {
    name: "Jordan Ellis",
    role: "Customer success",
    text: "Billing is smoother, but customers still get stuck during plan changes.",
    position: "right-0 top-2 rotate-[3deg]",
    accent: "bg-amber-400",
    score: "3.8",
  },
  {
    name: "Nina Patel",
    role: "Founder",
    text: "The weekly summary caught a risk we would have otherwise missed.",
    position: "bottom-2 left-[18%] rotate-[1.5deg]",
    accent: "bg-indigo-500",
    score: "4.7",
  },
];

export default function VisualSection() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-2xl sm:h-[460px]">
      <div className="absolute inset-x-10 top-10 bottom-12 rounded-[32px] border border-blue-100 bg-[#f4f8ff]" />
      <div className="absolute left-1/2 top-1/3 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-200 bg-white text-center shadow-[0_22px_50px_-28px_rgba(37,99,235,0.55)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="mt-3 text-[10px] font-semibold tracking-[0.14em] text-slate-400">
          AURIC SIGNAL
        </p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
          8.7
        </p>
        <p className="mt-1 text-xs text-slate-500">Customer clarity</p>
      </div>
      {feedbackCards.map((card) => (
        <article
          key={card.name}
          className={`absolute z-10 w-[208px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_22px_40px_-26px_rgba(15,23,42,0.5)] transition-transform duration-300 hover:z-20 hover:-translate-y-2 hover:rotate-0 sm:w-[226px] ${card.position}`}
        >
          <div className="flex items-center justify-between">
            <span className={`h-2 w-2 rounded-full ${card.accent}`} />
            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {card.score}
            </span>
          </div>
          <Quote className="mt-4 h-4 w-4 text-blue-200" />
          <p className="mt-2 text-xs leading-5 text-slate-700">{card.text}</p>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                {card.name}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-400">{card.role}</p>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" />
          </div>
        </article>
      ))}
      <div className="absolute bottom-1 right-[13%] flex items-center gap-2 text-[10px] font-semibold text-blue-600">
        <span className="h-px w-8 bg-blue-300" /> 184 responses connected
      </div>
    </div>
  );
}
