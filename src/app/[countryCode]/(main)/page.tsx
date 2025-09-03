import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Weoffer from "@modules/home/components/we-offer"
import CanvasDisplay from "@modules/home/components/canvas-display"
import Gallery from "@modules/home/components/gallery"
import Features from "@modules/home/components/features"
import About from "@modules/home/components/about"
import Blogs from "@modules/home/components/ourBlogs"
import ChooseProduct from "@modules/home/components/chooseProduct"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"


export const metadata: Metadata = {
  title: "Skyline Scenes - Fine Art Prints & Aerial Photography",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      {/* <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div> */}
      <Weoffer />
      <CanvasDisplay />
      <Gallery />
      <Features />
      <ChooseProduct />
      <About />
      <Blogs />
    </>
  )
}
