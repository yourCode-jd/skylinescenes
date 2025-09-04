import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ChooseProduct() {
    const chooseProduct = [
        {
            id: 1,
            image: "/chooseProduct1.png",
            width: 233,
            height: 255,
            title: "Digital Stock",
            link: "#",
        },
        {
            id: 2,
            image: "/chooseProduct2.png",
            width: 233,
            height: 255,
            title: "Fine Art Prints",
            link: "#",
        },
        {
            id: 3,
            image: "/chooseProduct3.png",
            width: 233,
            height: 255,
            title: "Mounted Canvas",
            link: "#",
        },
        {
            id: 4,
            image: "/chooseProduct4.png",
            width: 233,
            height: 255,
            title: "Aluminum Metal Prints",
            link: "#",
        },
        {
            id: 5,
            image: "/chooseProduct5.png",
            width: 233,
            height: 255,
            title: "Acrylic Prints",
            link: "#",
        },
        {
            id: 6,
            image: "/chooseProduct6.png",
            width: 233,
            height: 255,
            title: "Wall Murals",
            link: "#",
        },
    ]

    return (
        <section className='sectionSpace '>
            <div className='content-container'>
                <h2 className='mainHeading'>Choose Your Perfect Finish</h2>
                <p className='mainText max-w-2xl'>
                    From digital stock to fine art prints, canvas, metal, and acrylic—select the format that best brings your images to life.
                </p>

                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 my-[30px]  md:my-[50px] lg:my-[90px]'>
                    {chooseProduct.map((item) => (
                        <li
                            key={item.id}
                            className="relative"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className="mx-auto"
                            />
                            <Link href={item.link} className='mt-5 block text-center'>
                                <h3 className='leading-tight text-lg font-medium text-[#343636]'>
                                    {item.title}
                                </h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
