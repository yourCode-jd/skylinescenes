import React, { useEffect, useState } from "react"
import { Button } from "@medusajs/ui"

type Attribute = {
  name: string
  price: string
}

type Group = {
  id: string
  name: string
}

type CustomOption = {
  id: string
  name: string
  attributes: Attribute[]
  groupIds: string[]
  groups: Group[]
  isOptional: boolean
}

type OptionSelectProps = {
  current: Record<string, string>
  updateOption: (
    optionId: string,
    value: string,
    price?: string,
    groupId?: string,
    groupName?: string,
    label?: string
  ) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  onExtraPriceChange?: (
    total: number,
    details?: {
      selectedOptions: Record<string, string>
      filteredOptions: CustomOption[]
      selectedGroup?: string
    }
  ) => void
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  onExtraPriceChange,
}) => {
  const [customOptions, setCustomOptions] = useState<CustomOption[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>("")

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!

  useEffect(() => {
    const controller = new AbortController()
    const fetchCustomOptions = async () => {
      try {
        const res = await fetch(`${backendUrl}/store/options-data`, {
          headers: { "x-publishable-api-key": publishableKey },
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Failed to fetch options-data: ${res.status}`)

        const data: CustomOption[] = await res.json()
        setCustomOptions(Array.isArray(data) ? data : [])

        const uniqueGroups: Group[] = []
        data.forEach((opt) => {
          opt.groups.forEach((g) => {
            if (!uniqueGroups.find((ug) => ug.id === g.id)) {
              uniqueGroups.push(g)
            }
          })
        })
        setGroups(uniqueGroups)
        if (uniqueGroups.length > 0) {
          setSelectedGroup(uniqueGroups[0].id)
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Failed to load custom options", err)
        }
      }
    }
    fetchCustomOptions()
    return () => controller.abort()
  }, [backendUrl, publishableKey])

  const filteredOptions = customOptions.filter((opt) =>
    opt.groupIds.includes(selectedGroup)
  )
  const uniqueFilteredOptions = Array.from(
    new Map(filteredOptions.map((opt) => [`${opt.id}-${selectedGroup}`, opt])).values()
  )
  const selectedGroupName = groups.find((g) => g.id === selectedGroup)?.name

  // Auto-select required options + recalc total
  useEffect(() => {
    if (!selectedGroup || !uniqueFilteredOptions.length) return

    let totalExtraPrice = 0

    uniqueFilteredOptions.forEach((opt) => {
      let selectedValue = current[opt.id]
      let selectedAttr: Attribute | undefined

      if (!selectedValue && !opt.isOptional) {
        const firstAttr = opt.attributes[0]
        if (firstAttr) {
          selectedValue = firstAttr.name
          updateOption(
            opt.id,
            firstAttr.name,
            firstAttr.price,
            selectedGroup,
            selectedGroupName,
            opt.name
          )
          selectedAttr = firstAttr
        }
      } else {
        selectedAttr = opt.attributes.find((a) => a.name === selectedValue)
      }

      if (selectedAttr?.price && parseFloat(selectedAttr.price) > 0) {
        totalExtraPrice += parseFloat(selectedAttr.price)
      }
    })

    if (onExtraPriceChange) {
      onExtraPriceChange(totalExtraPrice, {
        selectedOptions: current,
        filteredOptions: uniqueFilteredOptions,
        selectedGroup: selectedGroupName,
      })
    }
  }, [selectedGroup, uniqueFilteredOptions])

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <label className="text-xs text-ui-fg-muted mb-1 block">Select Group</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full border rounded p-2"
          disabled={disabled}
          data-testid="group-select"
        >
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {uniqueFilteredOptions.map((opt) => (
        <div key={`${opt.id}-${selectedGroup}`} className="flex flex-col gap-y-2">
          <span className="text-xs text-ui-fg-muted mb-1">
            Select {opt.name} {opt.isOptional && "(Optional)"}
          </span>
          <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
            {opt.attributes.map((attr) => {
              const value = attr.name
              const price = attr.price?.trim() ? attr.price : "0"
              const isSelected = current[opt.id] === value

              return (
                <Button
                  key={value}
                  variant={isSelected ? "primary" : "secondary"}
                  onClick={() => {
                    if (isSelected && opt.isOptional) {
                      updateOption(opt.id, "", "0", selectedGroup, selectedGroupName, opt.name)
                    } else {
                      updateOption(
                        opt.id,
                        value,
                        price,
                        selectedGroup,
                        selectedGroupName,
                        opt.name
                      )
                    }

                    let totalExtraPrice = 0
                    uniqueFilteredOptions.forEach((o) => {
                      const selectedValue = o.id === opt.id
                        ? (isSelected && o.isOptional ? "" : value)
                        : current[o.id]
                      const selectedAttr = o.attributes.find((a) => a.name === selectedValue)
                      if (selectedAttr?.price && parseFloat(selectedAttr.price) > 0) {
                        totalExtraPrice += parseFloat(selectedAttr.price)
                      }
                    })

                    if (onExtraPriceChange) {
                      onExtraPriceChange(totalExtraPrice, {
                        selectedOptions: {
                          ...current,
                          [opt.id]: isSelected && opt.isOptional ? "" : value,
                        },
                        filteredOptions: uniqueFilteredOptions,
                        selectedGroup: selectedGroupName,
                      })
                    }
                  }}
                  disabled={disabled}
                  className="min-w-[100px] h-10"
                  data-testid="option-button"
                >
                  {value}
                  {price && parseFloat(price) > 0 ? ` (+$${parseFloat(price).toFixed(2)})` : ""}
                </Button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OptionSelect
