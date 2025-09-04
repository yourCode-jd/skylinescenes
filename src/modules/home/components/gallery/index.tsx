import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Gallery() {

    const galleryData = [
        {
            id: 1,
            image: "/gallery1.png",
            width: 233,
            height: 255,
            title: "Albany, NY",
            link: "#",
        },
        {
            id: 2,
            image: "/gallery2.png",
            width: 233,
            height: 255,
            title: "Chicago, IL",
            link: "#",
        },
        {
            id: 3,
            image: "/gallery3.png",
            width: 233,
            height: 255,
            title: "Belgium",
            link: "#",
        },
        {
            id: 4,
            image: "/gallery4.png",
            width: 233,
            height: 255,
            title: "Birmingham, UK",
            link: "#",
        },
        {
            id: 5,
            image: "/gallery5.png",
            width: 233,
            height: 255,
            title: "Dallas, TX",
            link: "#",
        },
        {
            id: 6,
            image: "/gallery6.png",
            width: 233,
            height: 255,
            title: "Gold Coast, AU",
            link: "#",
        },
        {
            id: 7,
            image: "/gallery7.png",
            width: 233,
            height: 255,
            title: "Greenville, SC",
            link: "#",
        },
        {
            id: 8,
            image: "/gallery8.png",
            width: 233,
            height: 255,
            title: "Denver, CO",
            link: "#",
        },
        {
            id: 9,
            image: "/gallery9.png",
            width: 233,
            height: 255,
            title: "Columbus, OH",
            link: "#",
        },
        {
            id: 10,
            image: "/gallery10.png",
            width: 233,
            height: 255,
            title: "Indianapolis, IN",
            link: "#",
        },
        {
            id: 11,
            image: "/gallery11.png",
            width: 233,
            height: 255,
            title: "New York City, NY",
            link: "#",
        },
        {
            id: 12,
            image: "/gallery12.png",
            width: 233,
            height: 255,
            title: "Pittsburgh, PA",
            link: "#",
        },
    ]

    return (
        <section className='sectionSpace '>
            <div className='content-container'>
                <h2 className='mainHeading'>Most Popular Image Galleries</h2>
                <p className='mainText max-w-2xl'>
                    Explore Skyline Scenes' most popular image galleries for breathtaking aerial photography, perfect for enhancing any space with stunning views.
                </p>

                <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-10 my-[30px] md:my-[50px] lg:my-[90px]'>
                    {galleryData.map((item) => (
                        <li
                            key={item.id}
                            className="relative"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className="w-full object-cover"
                            />
                            <Link href={item.link} className='mt-3 md:mt-5 block text-center'>
                                <h3 className='leading-tight text-base md:text-lg font-medium text-[#343636]'>
                                    {item.title}
                                </h3>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="customBtn mx-auto block" >
                    show more
                </button>
            </div>
        </section>
    )
}
