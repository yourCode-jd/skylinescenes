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
    <section className="sticky top-0 inset-x-0 z-50 group">
      <div className="h-10 flex justify-center items-center text-white text-xs sm:text-sm text-center md:text-base font-medium uppercase bg-[#343636] leading-tight px-1">
        <p>Summer is here!  Sale!! use code spring15 for 15% off canvas and prints</p>
      </div>
      <header className="relative py-4 mx-auto border-b duration-200 bg-white ">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* sideMenu */}
          <div className="h-full flex items-center lg:hidden order-1 ml-5">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Logo */}
          <div className="flex mr-auto items-center h-full">
            <LocalizedClientLink
              href="/"
              className=""
              data-testid="nav-store-link"
            >
              <Image src="/logo.svg" alt="Logo" width={266} height={68} className="hidden sm:block w-44 md:w-52 xl:w-auto" />
              <Image src="/logomobile.svg" alt="Logo" width={188} height={48} className="sm:hidden block w-40" />
            </LocalizedClientLink>
          </div>
          <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-12 h-full flex-1 basis-0 justify-center mx-auto">
            {navLinks.map((link) => (
              <li key={link.id} className="list-none relative ">
                <Link
                  href={link.href}
                  className="flex items-center capitalize text-base xl:text-lg text-[#333] font-normal lg:py-6"
                >
                  {link.label}
                  {link.subMenu && (
                    <span className="ml-2 transition-transform duration-300 ">
                      <Image src="/icons/downArrow.svg" alt="down" width={12} height={12} />
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

          <div className="flex items-center gap-x-2 sm:gap-x-4 xl:gap-x-6 h-full">
            <ul><li><Link href="#"><Image className="w-5 sm:w-auto" src="/icons/Search.svg" alt="" width={24} height={24} /></Link></li></ul>
            <ul><li><Link href="#"><Image className="w-5 sm:w-auto" src="/icons/user.svg" alt="" width={24} height={24} /></Link></li></ul>
            <ul><li><Link href="#"><Image className="w-5 sm:w-auto" src="/icons/shopping-cart.svg" alt="" width={24} height={24} /></Link></li></ul>
          </div>
        </nav>
      </header>
    </section >
  )
}
