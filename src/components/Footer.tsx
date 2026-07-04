import logo from "@/assets/Logo wrap.svg";

export function Footer() {
  return (
    <footer className="bg-[#115E59] px-4 py-16 space-y-12">
      <img src={logo} alt="Moose Software Solutions" />

      <nav className="flex gap-8 text-base font-semibold text-[#99F6E0]">
        <div className="flex flex-1 min-w-24 flex-col items-start gap-4">
          <a href="#" className="hover:underline">
            Overview
          </a>
          <a href="#" className="hover:underline">
            Features
          </a>
          <a href="#" className="hover:underline">
            Pricing
          </a>
        </div>
        <div className="flex flex-1 min-w-24 flex-col items-start gap-4">
          <a href="#" className="hover:underline">
            Careers
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
        </div>
      </nav>

      <p className="text-base font-normal text-[#5FE9D0]">
        © 2026 Moose Software Solutions. All rights reserved.
      </p>
    </footer>
  );
}
