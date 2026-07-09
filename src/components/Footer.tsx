import logo from "@/assets/Logo wrap.svg";

export function Footer() {
  return (
    <footer className="bg-[#115E59] px-4 lg:px-8 py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-12 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <img src={logo} alt="Moose Software Solutions" />

          <nav className="flex gap-8 lg:gap-8 text-base font-semibold text-[#99F6E0]">
            <div className="flex flex-1 min-w-24 flex-col items-start gap-4 lg:contents">
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
            <div className="flex flex-1 min-w-24 flex-col items-start gap-4 lg:contents">
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
        </div>
      </div>
    </footer>
  );
}
