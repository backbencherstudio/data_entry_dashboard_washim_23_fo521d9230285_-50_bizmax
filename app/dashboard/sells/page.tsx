import SellsDataTable from "@/app/_components/SellsDataTable"

export default function sells() {
    return (
        <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
            <SellsDataTable />
        </div>
    )
}