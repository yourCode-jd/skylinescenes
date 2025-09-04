"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { navLinks } from "@modules/layout/components/navLinks"
import { useState } from "react"

// const SideMenuItems = {
//   Home: "/",
//   Store: "/store",
//   Account: "/account",
//   Cart: "/cart",
// }

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  <Image src="/icons/hamburger.svg" alt="Logo" width={24} height={20} className="w-5 sm:w-auto" />
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="-translate-x-[100%] opacity-0 backdrop-blur-0"
                enterTo="opacity-100 left-0 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="-translate-x-[100%]"
              >
                <PopoverPanel className="flex flex-col fixed top-0 w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[100vh] z-30 inset-x-0 text-sm text-white backdrop-blur-lg">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex gap-4 flex-col h-full bg-[rgba(3,7,18,0.5)] justify-between p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <Image src="/icons/cross.svg" alt="Logo" width={24} height={20} />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-2 items-start justify-start mb-auto">
                      {navLinks.map((link, index) => (
                        <li
                          key={link.id}
                          className="relative group w-full"
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <LocalizedClientLink
                              href={link.href}
                              className="text-lg leading-10 hover:text-ui-fg-disabled flex items-center"
                              onClick={close}
                            >
                              {link.label}
                            </LocalizedClientLink>

                            {link.subMenu && (
                              <button
                                type="button"
                                className="ml-2 sm:hidden" // only on mobile
                                onClick={() =>
                                  setActiveIndex(activeIndex === index ? null : index)
                                }
                              >
                                <Image
                                  src="/icons/downArrow-white.svg"
                                  alt="down"
                                  width={12}
                                  height={12}
                                  className={`transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Submenu */}
                          {link.subMenu && (
                            <ul
                              className={`absolute sm:static top-full left-0 w-full py-2 sm:w-full mt-2 sm:mt-0 bg-white sm:bg-transparent shadow-lg sm:shadow-none rounded-md transition duration-300 z-10 ${activeIndex === index
                                ? "opacity-100 visible"
                                : "opacity-0 invisible sm:group-hover:opacity-100 sm:group-hover:visible"
                                }`}
                            >
                              {link.subMenu.map((sub) => (
                                <li
                                  key={sub.id}
                                  className="px-4 py-2 hover:bg-gray-100 sm:hover:bg-transparent"
                                >
                                  <Link
                                    href={sub.href}
                                    className="text-sm text-[#343636] block"
                                    onClick={close}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>


                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Medusa Store. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
