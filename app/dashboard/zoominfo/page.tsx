import ZoominfoDataTable from "@/app/_components/ZoominfoDataTable"

export default function zoominfo() {
    return (
        <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
            <ZoominfoDataTable />
        </div>
    )
}