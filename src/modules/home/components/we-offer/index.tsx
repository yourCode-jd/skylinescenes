import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Weoffer() {
    // ✅ Data array
    const offers = [
        {
            id: 1,
            image: "/offer1.png",
            title: "For Hire",
            description: "Project photography aerial & architectural",
            link: "#",
        },
        {
            id: 2,
            image: "/offer2.png",
            title: "Wholesale",
            description: "Project photography aerial & architectural",
            link: "#",
        },
        {
            id: 3,
            image: "/offer3.png",
            title: "Special Request",
            description: "Project photography aerial & architectural",
            link: "#",
        },
    ]

    return (
        <section className='sectionSpace'>
            <div className='content-container'>
                <h2 className='mainHeading'>what We Offer</h2>
                <p className='mainText'>
                    Whether you need photography services, bulk orders, or something custom, we’ve got you covered.
                </p>

                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[90px]'>
                    {offers.map((item) => (
                        <li key={item.id}>
                            <div>
                                <Image src={item.image} alt={item.title} width={500} height={340} />
                                <h3 className='leading-tight mt-7 mb-1 text-[26px] font-semibold text-[#343636]'>
                                    {item.title}
                                </h3>
                                <p className='mb-2.5 text-lg font-normal text-[#808080]'>
                                    {item.description}
                                </p>
                                <Link
                                    href={item.link}
                                    className='text-[#73929B] font-semibold text-lg uppercase flex items-center gap-x-2'
                                >
                                    learn more{" "}
                                    <Image src="/icons/arrow-right.svg" alt="arrow-right" width={15} height={15} />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
