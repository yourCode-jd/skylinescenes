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
      <header className="relative py-5 mx-auto border-b duration-200 bg-white border-ui-border-base">
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
          <div className="hidden md:flex items-center gap-x-10 h-full flex-1 basis-0 justify-center mx-auto">
            {navLinks.map((link) => (
              <li key={link.id} className="list-none">
                <Link
                  href={link.href}
                  className="flex items-center uppercase text-lg text-[#333] font-medium lg:py-8"
                >
                  {link.label}
                </Link>
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
    </div>
  )
}
