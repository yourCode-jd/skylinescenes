"use client"
import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

type OptionDetails = {
  optionId: string
  name: string
  label: string
  price: string
  groupId: string
  groupName: string
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({ product, disabled }: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [currentExtraPrice, setCurrentExtraPrice] = useState(0)
  const [isAdding, setIsAdding] = useState(false)

  const latestSelectionRef = useRef<{
    total: number
    selectedOptions: Record<string, string>
    filteredOptions: OptionDetails[]
    selectedGroup: string
  }>({
    total: 0,
    selectedOptions: {},
    filteredOptions: [],
    selectedGroup: "",
  })

  const params = useParams()
  let countryCode: string

  if (!params?.countryCode) {
    countryCode = "defaultCountryCode"
  } else if (Array.isArray(params.countryCode)) {
    countryCode = params.countryCode[0]
  } else {
    countryCode = params.countryCode
  }

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 0 && (
            <div className="flex flex-col gap-y-4">
              <OptionSelect current={options}
                updateOption={(optionId, value, price, groupId, groupName, label) => {
                  setOptions((prev) => ({ ...prev, [optionId]: value }))
                }}
                title="Custom Options" data-testid="product-options"
                disabled={!!disabled || isAdding}
                onExtraPriceChange={(total, details) => {
                  latestSelectionRef.current = {
                    total,
                    selectedOptions: details?.selectedOptions || {},
                    filteredOptions: (details?.filteredOptions || []).map((opt) => ({
                      optionId: opt.id,
                      name: details?.selectedOptions?.[opt.id] || "",
                      label: opt.name,
                      price: opt.attributes.find((a) => a.name === details?.selectedOptions?.[opt.id])?.price || "0",
                      groupId: opt.groupIds[0] || "",
                      groupName: details?.selectedGroup || "",
                    })),
                    selectedGroup: details?.selectedGroup || "",
                  }
                  setCurrentExtraPrice(total)
                  // console.log("✅ Updated Price:", latestSelectionRef.current)
                  // console.log("✅ Updated Pricing:", latestSelectionRef.current.total)
                }}
              />
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} extraPriceTotal={currentExtraPrice} />

        <Button onClick={async () => {
          setIsAdding(true)
          const variantToAdd = selectedVariant || product.variants?.[0]

          if (variantToAdd?.id) {
            const metadata: Record<string, unknown> = {
              selected_options: latestSelectionRef.current.filteredOptions,
            }
            if (latestSelectionRef.current.total > 0) {
              metadata.extra_price_total = latestSelectionRef.current.total
            }

            await addToCart({
              variantId: variantToAdd.id,
              quantity: 1,
              countryCode,
              metadata,
            })
          } else {
            console.error("No variant found for this product")
          }
          setIsAdding(false)
        }}
          disabled={!!disabled || isAdding} variant="primary" className="w-full h-10" isLoading={isAdding} data-testid="add-product-button">Add to cart</Button>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={(title: string, value: string) => {
            setOptions((prev) => ({
              ...prev,
              [title]: value,
            }))
          }}
          inStock={inStock}
          handleAddToCart={async () => {
            setIsAdding(true)
            const variantToAdd = selectedVariant || product.variants?.[0]
            if (variantToAdd?.id) {
              const metadata: Record<string, unknown> = {
                selected_options: latestSelectionRef.current.filteredOptions,
              }
              if (latestSelectionRef.current.total > 0) {
                metadata.extra_price_total = latestSelectionRef.current.total
              }
              await addToCart({
                variantId: variantToAdd.id,
                quantity: 1,
                countryCode,
                metadata,
              })
            }
            setIsAdding(false)
          }}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
