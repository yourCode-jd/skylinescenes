import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CanvasDisplay() {

    const canvasData = [
        {
            id: 1,
            image: "/canvas1.png",
            width: 650,
            height: 624,
            title: "License Stock Photography",
            subtitle: "For Digital Applications",
            link: "#",
            large: true, // ✅ mark this for row-span-2
        },
        {
            id: 2,
            image: "/canvas2.png",
            width: 435,
            height: 292,
            title: "Stretched & Mounted Canvas",
            subtitle: "Single or Multi Panel Options",
            link: "#",
        },
        {
            id: 3,
            image: "/canvas3.png",
            width: 435,
            height: 292,
            title: "Fine Art Prints",
            subtitle: "In Color or B&W Framed and Unframed",
            link: "#",
        },
        {
            id: 4,
            image: "/canvas4.png",
            width: 435,
            height: 292,
            title: "Professional Aerial Photography",
            subtitle: "Single or Multi Panel Options",
            link: "#",
        },
        {
            id: 5,
            image: "/canvas5.png",
            width: 435,
            height: 292,
            title: "Free Shipping",
            subtitle: "On Prints and Canvas",
            link: "#",
        },
    ]

    return (
        <div className='sectionSpace bg-[#EDF1F3]'>
            <div className='content-container'>
                <h2 className='mainHeading'>Prints, Photography & More</h2>
                <p className='mainText'>
                    Explore stock photography, aerial shots, fine art prints, and custom canvas displays—all with free shipping.
                </p>

                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[650px_1fr_1fr] gap-10 mt-[90px]'>
                    {canvasData.map((item) => (
                        <li
                            key={item.id}
                            className={`relative ${item.large ? "row-span-2" : ""}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className={`${item.large ? "" : "h-full object-cover"}`}
                            />
                            <div className='absolute top-7 left-7'>
                                <h3 className='leading-tight mb-1 text-[26px] font-semibold text-white'>
                                    {item.title}
                                </h3>
                                <p className='mb-2.5 text-lg font-normal text-white'>{item.subtitle}</p>
                                <Link
                                    href={item.link}
                                    className='text-white font-semibold text-base uppercase flex items-center gap-x-2'
                                >
                                    more info{" "}
                                    <Image
                                        src="/icons/arrow-right-white.svg"
                                        alt="arrow-right"
                                        width={15}
                                        height={15}
                                    />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}
