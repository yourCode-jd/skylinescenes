import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Blogs() {
    const blogData = [
        {
            id: 1,
            image: "/blog1.png",
            width: 370,
            height: 260,
            title: "Singapore Gallery Added",
            text: "Cityscape and skyline photos and images of Singapore taken in 2023 have been added to the website.",
            link: "#",
        },
        {
            id: 2,
            image: "/blog2.png",
            width: 370,
            height: 260,
            title: "Perth Skyline Photos Add...",
            text: "Cityscape and skyline photos and images of Perth Australia taken in 2023 have been added to the website",
            link: "#",
        },
        {
            id: 3,
            image: "/blog3.png",
            width: 370,
            height: 260,
            title: "New Photos Of Raleigh",
            text: "New photos of downtown Raleigh, North Carolina taken in 2023 have been added to the Raleigh photo gallery.",
            link: "#",
        },
        {
            id: 4,
            image: "/blog4.png",
            width: 370,
            height: 260,
            title: "New photos of Dallas...",
            text: "New photos of Dallas are now added to the Dallas gallery page. Check out the Dallas gallery for more information on...",
            link: "#",
        },
    ]

    return (
        <div className='sectionSpace'>
            <div className='content-container'>
                <h2 className='mainHeading'>Our Blogs</h2>
                <p className='mainText max-w-2xl'>
                    Explore Skyline Scenes' most popular image galleries for breathtaking aerial photography, perfect for enhancing any space with stunning views.
                </p>

                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-[90px]'>
                    {blogData.map((item) => (
                        <li
                            key={item.id}
                            className="relative bg-[#EDF1F3] "
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className=""
                            />
                            <div className='p-4 pb-7'>
                                <h5 className='mt-4 mb-2 text-[26px] font-semibold text-[#343636] leading-tight'>
                                    {item.title}
                                </h5>
                                <p className='text-lg font-normal text-[#808080]'>{item.text}</p>
                                <Link href={item.link} className="flex gap-2 items-center text-[#73929B] text-base font-semibold mt-4">Read More <Image src="/icons/arrow-right.svg" alt="arrow" width={15} height={15} /></Link></div>
                        </li>
                    ))}
                </ul>
                <button className="customBtn mx-auto block" >
                    View All Blogs
                </button>
            </div>
        </div >
    )
}
