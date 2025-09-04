import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const topCategories = [
    "Best Sellers", "Albany, NY", "Amalfi Coast, IT", "Amsterdam, NL", "Anchorage, AK",
    "Annapolis, MD", "Atlanta, GA", "Atlantic City, NJ", "Auckland, NZ", "Augusta, ME",
    "Austin, TX", "Baltimore, MD", "Baton Rouge, LA", "Belgium", "Bern, CH",
    "Biloxi, MS", "Birmingham, AL", "Birmingham, UK", "Boston, MA", "Brisbane, AU",
    "Buffalo, NY", "Charleston, SC", "Charleston, WV", "Charlotte, NC", "Chicago, IL",
    "Cincinnati, OH", "Cleveland, OH", "Columbia, SC", "Columbus, OH", "View More..."
  ];

  const quickLinks = ["Best Seller", "Shop", "Our Blogs", "Services", "About Us", "Contact Us"];
  const otherLinks = ["Order History", "Shipping Policy", "Return Policy", "Privacy Policy", "Terms & Conditions", "FAQ"];

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      src: "/icons/facebook.svg",
    },
    {
      name: "Twitter",
      href: "#",
      src: "/icons/twitter.svg",
    },
    {
      name: "Instagram",
      href: "#",
      src: "/icons/instagram.svg",
    },

    {
      name: "Youtube",
      href: "#",
      src: "/icons/youtube.svg",
    },

    {
      name: "Twitter",
      href: "#",
      src: "/icons/pinterest.svg",
    },

  ];


  return (
    <footer className="bg-[#343636] text-gray-300">
      <div className="content-container py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 gap-8">

          <div className="md:col-span-8">
            <h4 className="text-white font-semibold text-[22px] md:text-[26px] mb-4 md:mb-7">Top Categories</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {topCategories.map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  className={`hover:text-white text-base font-normal ${item === "View More..." ? "text-white" : "text-[#B1B7C7]"
                    }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-[22px] md:text-[26px] mb-4 md:mb-7">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white text-base font-normal text-[#B1B7C7]">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-[22px] md:text-[26px] mb-4 md:mb-7">Other Links</h4>
            <ul className="space-y-4">
              {otherLinks.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-white text-base font-normal text-[#B1B7C7]">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#494C4C] py-4">
        <div className="content-container gap-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base font-normal text-[#B1B7C7] leading-tight text-center">&copy; {new Date().getFullYear()} Skyline Scenes. All Rights Reserved.</p>
          <div className="flex space-x-4 items-center">
            {socialLinks.map((item, index) => (
              <Link key={index} href={item.href} aria-label={item.name}>
                <Image
                  src={item.src}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="hover:opacity-80 transition h-full object-cover w-full"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
