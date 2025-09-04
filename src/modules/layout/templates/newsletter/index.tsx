import React from 'react'

export default function Newsletter() {
    return (
        <section className='py-14 bg-[#EDF1F3]'>
            <div className='content-container'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>

                    {/* Left Side - Heading */}
                    <div>
                        <h2 className='mainHeading text-left'>Join Our Newsletter</h2>
                        <p className='mainText max-w-none text-left'>
                            Sign up for our newsletter to receive special offers and promotions
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <form className="flex w-full max-w-2xl">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 text-base text-[#808080] font-normal focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                        <button
                            type="submit"
                            className="customBtn font-bold min-w-[166px]"
                        >
                            Subscribe
                        </button>
                    </form>

                </div>
            </div>
        </section>
    )
}
