import { useEffect, useState } from "react"
import { useRouter } from "next/router"

type Option = {
  id: string
  name: string
  attributes: { name: string; price: string }[]
  groupIds: string[]
}

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<any>(null)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      // Fetch product (existing Medusa Store API)
      const productRes = await fetch(`/store/products/${id}`)
      const productData = await productRes.json()
      setProduct(productData.product)

      // Fetch custom options (our new endpoint)
      const optionsRes = await fetch(`/store/options-data`)
      const optionsData = await optionsRes.json()
      setOptions(Array.isArray(optionsData) ? optionsData : [])
    }

    fetchData()
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>

      {/* Product Images */}
      {product.images?.length > 0 && (
        <img
          src={product.images[0].url}
          alt={product.title}
          className="w-full max-h-96 object-cover rounded-lg my-4"
        />
      )}

      {/* ✅ Custom Options (global, shown for all products) */}
      {options.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Available Options</h2>
          {options.map((opt) => (
            <div key={opt.id} className="border rounded-lg p-4 mb-4">
              <h3 className="font-semibold">{opt.name}</h3>
              <ul className="list-disc pl-6">
                {opt.attributes.map((a, idx) => (
                  <li key={idx}>
                    {a.name}{" "}
                    {a.price?.trim() ? (
                      <span className="text-gray-500">(+${parseFloat(a.price).toFixed(2)})</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
