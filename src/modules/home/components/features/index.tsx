import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Features() {
    const featureData = [
        {
            id: 1,
            image: "/feature1.png",
            width: 268,
            height: 290,
            title: "Aerial of Downtown Raleigh, North Carolina",
            priceText: "Started from $9",
            link: "#",
        },
        {
            id: 2,
            image: "/feature2.png",
            width: 268,
            height: 290,
            title: "The Faraglioni Rocks",
            priceText: "Started from $9.45",
            link: "#",
        },
        {
            id: 3,
            image: "/feature3.png",
            width: 268,
            height: 290,
            title: "Charlotte Skyline with Bank of America Stadium",
            priceText: "Started from $40",
            link: "#",
        },
        {
            id: 4,
            image: "/feature4.png",
            width: 268,
            height: 290,
            title: "Gateway Arch, Saint Louis, Missouri",
            priceText: "Started from $9.45",
            link: "#",
        },
        {
            id: 5,
            image: "/feature5.png",
            width: 268,
            height: 290,
            title: "Punta Carena Lighthouse on Isle of Capri",
            priceText: "Started from $9.45",
            link: "#",
        },
    ]

    return (
        <div className='sectionSpace bg-[#EDF1F3]'>
            <div className='content-container'>
                <h2 className='mainHeading'>Featured Products</h2>
                <p className='mainText max-w-2xl'>
                    Explore Skyline Scenes' most popular image galleries for breathtaking aerial photography, perfect for enhancing any space with stunning views.
                </p>

                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 my-[90px]'>
                    {featureData.map((item) => (
                        <li
                            key={item.id}
                            className="relative p-[10px] pb-5 bg-white text-center"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className=""
                            />
                            <h5 className='mt-4 mb-2 text-lg font-normal text-[#666666] leading-tight px-4'>
                                {item.title}
                            </h5>
                            <p className='text-lg font-medium text-[#343636]'>{item.priceText}</p>
                        </li>
                    ))}
                </ul>
                <button className="customBtn mx-auto block" >
                    View All Products
                </button>
            </div>
        </div >
    )
}
