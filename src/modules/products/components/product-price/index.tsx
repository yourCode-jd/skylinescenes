import { clx } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { useEffect } from "react"

export default function ProductPrice({
  product,
  variant,
  extraPriceTotal = 0, // ✅ added prop (default 0 so old code still works)
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  extraPriceTotal?: number
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  // if no selectedPrice, fall back to only showing extraPriceTotal
  if (!selectedPrice) {
    return (
      <div className="flex flex-col text-ui-fg-base">
        {extraPriceTotal > 0 && (
          <span
            className="text-lg font-medium text-ui-fg-interactive"
            data-testid="final-product-price"
            data-value={extraPriceTotal}
          >
            <span className="text-gray-800 mb-6">Total Price: </span> {extraPriceTotal.toFixed(2)}
          </span>
        )}
      </div>
    )
  }

  // ✅ compute total without touching old code
  const basePriceNumber = selectedPrice.calculated_price_number || 0
  const finalPriceNumber = basePriceNumber + extraPriceTotal

  const finalPrice = selectedPrice.calculated_price.replace(
    /[0-9,.]+/,
    finalPriceNumber.toFixed(2)
  )

  // ✅ Log for debugging
  useEffect(() => {
    console.log("💰 Base Price:", basePriceNumber)
    console.log("➕ Extra Price:", extraPriceTotal)
    console.log("✅ Final Price:", finalPriceNumber)
  }, [basePriceNumber, extraPriceTotal, finalPriceNumber])

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx("text-xl-semi", {
          "text-ui-fg-interactive": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && "From "}
        <span
          data-testid="product-price"
          data-value={finalPriceNumber}
        >
          {finalPrice}
        </span>
      </span>


      {/* 🔹 show total only if there is an extra price */}
      {extraPriceTotal > 0 && (
        <span
          className="text-lg font-medium text-ui-fg-interactive"
          data-testid="final-product-price"
          data-value={finalPriceNumber}
        >
          Total Price: {finalPrice}
        </span>
      )}

      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-ui-fg-interactive">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
