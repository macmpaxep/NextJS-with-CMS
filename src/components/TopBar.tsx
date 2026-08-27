import { site } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-navy text-white/85 text-xs border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-9 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2 truncate">
          <PinIcon />
          <span className="truncate">{site.address}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <a href={site.phoneHref} className="hover:text-cyan transition flex items-center gap-1.5">
            <PhoneIcon />
            {site.phoneDisplay}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366]/15 text-[#25D366] px-2.5 py-1 rounded-full hover:bg-[#25D366]/25 transition font-medium"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 text-cyan">
      <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5c0-.6.4-1 1-1h3l2 5-2 1.3a10 10 0 004.7 4.7L14 13l5 2v3c0 .6-.4 1-1 1C10.5 19 4 12.5 4 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
