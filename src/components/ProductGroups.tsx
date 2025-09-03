import { useEffect, useState } from "react"

type Group = {
    id: string
    name: string
}

const ProductGroups = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/store/options-groups")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched groups:", data)
                setGroups(Array.isArray(data) ? data : [])
                setLoading(false)
            })
    }, [])

    if (loading) return <span>Loading groups...</span>
    if (groups.length === 0) return <span>No groups found.</span>

    return (
        <ul>
            {groups.map((group) => (
                <li key={group.id}>{group.name}</li>
            ))}
        </ul>
    )
}

export default ProductGroups