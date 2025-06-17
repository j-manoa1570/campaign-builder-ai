"use client";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="w-full bg-gothicBlack border-b-2 border-gothicGold py-4 mb-8 flex justify-between items-center shadow-lg z-50 px-8">
      <Link
        href="/"
        className="text-gothicGold font-quintessential text-3xl hover:text-gothicIvory transition px-2 py-1 rounded select-none"
      >
        Campaign Builder
      </Link>
      <nav className="flex gap-8 items-center">
        {/* Planets Dropdown */}
        <div className="relative">
          <button
            className="text-gothicGold font-quintessential text-xl hover:text-gothicIvory transition px-2 py-1 rounded"
            onClick={() =>
              setOpenDropdown(openDropdown === "planets" ? null : "planets")
            }
            onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
          >
            Planets
          </button>
          {openDropdown === "planets" && (
            <div className="absolute left-0 mt-2 w-48 bg-gothicBlack border border-gothicGold rounded shadow-lg z-50">
              <Link
                href="/create-planet"
                className="block px-4 py-2 hover:bg-gothicGray"
              >
                Create Planet
              </Link>
              <Link
                href="/planets"
                className="block px-4 py-2 hover:bg-gothicGray"
              >
                Planets
              </Link>
            </div>
          )}
        </div>
        {/* Campaigns Dropdown */}
        <div className="relative">
          <button
            className="text-gothicGold font-quintessential text-xl hover:text-gothicIvory transition px-2 py-1 rounded"
            onClick={() =>
              setOpenDropdown(openDropdown === "campaigns" ? null : "campaigns")
            }
            onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
          >
            Campaigns
          </button>
          {openDropdown === "campaigns" && (
            <div className="absolute left-0 mt-2 w-56 bg-gothicBlack border border-gothicGold rounded shadow-lg z-50">
              <Link
                href="/create-campaign"
                className="block px-4 py-2 hover:bg-gothicGray"
              >
                Create Campaign
              </Link>
              <Link
                href="/campaigns"
                className="block px-4 py-2 hover:bg-gothicGray"
              >
                Campaigns
              </Link>
              <Link
                href="/record-game"
                className="block px-4 py-2 hover:bg-gothicGray"
              >
                Record Match
              </Link>
            </div>
          )}
        </div>
        {/* My Profile */}
        <Link
          href="/profile"
          className="text-gothicGold font-quintessential text-xl hover:text-gothicIvory transition px-2 py-1 rounded"
        >
          My Profile
        </Link>
      </nav>
    </header>
  );
}
