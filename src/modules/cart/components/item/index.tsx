"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"
import { convertToLocale } from "@lib/util/money"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory
  // console.log(item.metadata)

  const meta = item.metadata as { base_price?: number; extra_price?: number } | undefined

  return (
    <Table.Row className="w-full p-2" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left py-2">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        {/* <LineItemOptions variant={item.variant} data-testid="product-variant" /> */}

        {meta?.base_price !== undefined && (
          <Text className="txt-compact-small text-ui-fg-subtle pb-1">
            <span className="font-medium">
              Price:{" "}
            </span>
            {convertToLocale({
              amount: meta.base_price,
              currency_code: currencyCode,
            })}
          </Text>
        )}

        {/* ✅ Render selected options from metadata */}
        {Array.isArray((item.metadata as any)?.selected_options) && (
          <div className="mb-2">
            <Text className="txt-compact-small text-ui-fg-subtle font-medium">
              Attributes:
            </Text>
            {(item.metadata as any).selected_options.map(
              (
                opt: {
                  name: string
                  label?: string
                  price?: string | number
                  groupName?: string
                },
                idx: number,
                arr: {
                  name: string
                  label?: string
                  price?: string | number
                  groupName?: string
                }[]
              ) => {
                const price = Number(opt.price)

                // Check if groupName is different from the previous one
                const showGroupName =
                  opt.groupName && (idx === 0 || arr[idx - 1].groupName !== opt.groupName)

                // Check if next groupName is different → insert separator
                const isLastInGroup =
                  idx < arr.length - 1 &&
                  opt.groupName &&
                  arr[idx + 1].groupName !== opt.groupName

                return (
                  <div key={idx} className={clx("ml-3 txt-compact-small text-ui-fg-subtle", idx > 0 && "border-t border-dashed border-gray-300 mt-2 pt-2")}>
                    {showGroupName && (
                      <div>
                        <span className="font-medium">Product Type: </span>
                        {opt.groupName}
                      </div>
                    )}

                    {opt.label && opt.name && (
                      <div>
                        <span className="font-medium">{opt.label.charAt(0).toUpperCase() + opt.label.slice(1)}:{" "} </span>
                        {opt.name}
                      </div>
                    )}

                    {price > 0 && (
                      <div>
                        <span className="font-medium">Price: </span>
                        {convertToLocale({
                          amount: price,
                          currency_code: currencyCode,
                        })}
                      </div>
                    )}
                  </div>
                )
              }
            )}
          </div>
        )}

      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-10 p-4"
              data-testid="product-select-button"
            >
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}

              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
