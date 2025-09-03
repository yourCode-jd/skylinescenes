import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { navLinks } from "@modules/layout/components/navLinks"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import Link from "next/link"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <div className="h-10 flex justify-center items-center text-white text-base font-medium uppercase bg-[#343636] leading-tight">
        <p>Summer is here!  Sale!! use code spring15 for 15% off canvas and prints</p>
      </div>
      <header className="relative py-4 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* sideMenu */}
          <div className="flex-1 basis-0 h-full flex items-center md:hidden">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <Image src="/logo.svg" alt="Logo" width={266} height={68} />
            </LocalizedClientLink>
          </div>
          <div className="hidden md:flex items-center gap-x-12 h-full flex-1 basis-0 justify-center mx-auto">
            {navLinks.map((link) => (
              <li key={link.id} className="list-none relative ">
                <Link
                  href={link.href}
                  className="flex items-center capitalize text-lg text-[#333] font-normal lg:py-6"
                >
                  {link.label}
                  {link.subMenu && (
                    <span className="ml-2 transition-transform duration-300 ">
                      <Image src="/downArrow.svg" alt="down" width={12} height={12} />
                    </span>
                  )}
                </Link>

                {/* Submenu dropdown */}
                {link.subMenu && (
                  <ul className="absolute top-full left-0 w-40 mt-2 bg-white shadow-lg opacity-0 invisible duration-300 z-10">
                    {link.subMenu.map((sub) => (
                      <li key={sub.id} className="px-4 py-2 hover:bg-gray-100">
                        <Link href={sub.href} className="text-sm text-[#343636] block">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </div>

          <div className="flex items-center gap-x-6 h-full">
            <ul><li><Link href="#"><Image src="/Search.svg" alt="" width={24} height={24} /></Link></li></ul>
            <ul><li><Link href="#"><Image src="/user.svg" alt="" width={24} height={24} /></Link></li></ul>
            <ul><li><Link href="#"><Image src="/shopping-cart.svg" alt="" width={24} height={24} /></Link></li></ul>
          </div>
        </nav>
      </header>
    </div >
  )
}
