import Link from "next/link";

const navLinks = [
  { href: "/create-planet", label: "Create Planet" },
  { href: "/campaign-map", label: "Campaign Map" },
  { href: "/record-game", label: "Record Game" },
  { href: "/campaign-rules", label: "Campaign Rules" },
  { href: "/update-campaign", label: "Update Campaign" },
  { href: "/campaign-history", label: "Campaign History" },
  { href: "/profile", label: "My Profile" },
];

export default function SiteHeader() {
  return (
    <header className="w-full bg-gothicBlack border-b-2 border-gothicGold py-4 mb-8 flex justify-between items-center shadow-lg z-50 px-8">
      <Link
        href="/"
        className="text-gothicGold font-gothic text-3xl hover:text-gothicIvory transition px-2 py-1 rounded select-none"
      >
        40k Campaign Builder
      </Link>
      <nav className="flex gap-6">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gothicGold font-gothic text-xl hover:text-gothicIvory transition px-2 py-1 rounded"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
