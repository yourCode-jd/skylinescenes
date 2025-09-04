import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
    const aboutContent = [
        {
            id: 1,
            image: "/about.png",
            width: 584,
            height: 560,
            title: "About The Skyline Scenes",
            para: [
                "Welcome to SkylineScenes.com, we are glad you have visited our website and are interested in what we offer whether it's for art products, specialty photography services or you are just checking out all the stock photography on the site. Whatever brought you here, I hope we can be of service and you enjoy your stay.",

                "SkylineScenes.com is a family owned business that has one of the largest collections of urban city skyline stock photography available online. Nearly all photos on this site were taken by myself (Bill Cobb), making them unique and easy to license."
            ]
        },
    ]

    return (
        <section className="sectionSpace bg-[#EDF1F3]">
            <div className="max-w-[1330px] mx-auto">
                {aboutContent.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-2 items-center gap-24 mt-[10px] mb-[90px]"
                    >
                        {/* Left Side - Image */}
                        <div>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={item.width}
                                height={item.height}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Right Side - Content */}
                        <div>
                            <h3 className="leading-tight text-[40px] font-semibold text-[#343636] mb-5">
                                {item.title}
                            </h3>
                            {item.para.map((text, idx) => (
                                <p key={idx} className="text-lg font-normal text-[#808080] mb-7">
                                    {text}
                                </p>
                            ))}
                            <button
                                className="customBtn"
                            >
                                Read More About Us
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
