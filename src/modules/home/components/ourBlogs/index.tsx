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
            icon: "/icons/calendar.svg",
            date: "May 03, 2024"
        },
        {
            id: 2,
            image: "/blog2.png",
            width: 370,
            height: 260,
            title: "Perth Skyline Photos Add...",
            text: "Cityscape and skyline photos and images of Perth Australia taken in 2023 have been added to the website",
            link: "#",
            icon: "/icons/calendar.svg",
            date: "Feb 02, 2024"
        },
        {
            id: 3,
            image: "/blog3.png",
            width: 370,
            height: 260,
            title: "New Photos Of Raleigh",
            text: "New photos of downtown Raleigh, North Carolina taken in 2023 have been added to the Raleigh photo gallery.",
            link: "#",
            icon: "/icons/calendar.svg",
            date: "Feb 20, 2024"

        },
        {
            id: 4,
            image: "/blog4.png",
            width: 370,
            height: 260,
            title: "New photos of Dallas...",
            text: "New photos of Dallas are now added to the Dallas gallery page. Check out the Dallas gallery for more information on...",
            link: "#",
            icon: "/icons/calendar.svg",
            date: "Feb 20, 2024"

        },
    ]

    return (
        <section className='sectionSpace'>
            <div className='content-container'>
                <h2 className='mainHeading'>Our Blogs</h2>
                <p className='mainText max-w-2xl'>
                    Explore Skyline Scenes' most popular image galleries for breathtaking aerial photography, perfect for enhancing any space with stunning views.
                </p>

                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-[30px]  md:my-[50px] lg:my-[90px]'>
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
                                className="w-full object-cover"
                            />
                            <div className='px-5 py-6'>
                                <h5 className='mb-2 text-[22px] md:text-[26px] font-semibold text-[#343636] leading-tight truncate'>
                                    {item.title}
                                </h5>
                                <div className='flex items-start mb-2'>

                                    <Image src={item.icon} alt="calendar" width={15} height={15} className='inline mt-0.5 mr-2' />
                                    <span className='text-[#808080]'>{item.date}</span>
                                </div>
                                <p className='text-base md:text-lg font-normal text-[#808080]'>{item.text}</p>
                                <Link href={item.link} className="flex gap-2 items-center text-[#73929B] text-sm md:text-base font-semibold mt-4 uppercase">Read More <Image src="/icons/arrow-right.svg" alt="arrow" width={15} height={15} /></Link></div>
                        </li>
                    ))}
                </ul>
                <button className="customBtn mx-auto block" >
                    View All Blogs
                </button>
            </div>
        </section >
    )
}
