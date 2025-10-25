import EmailFilter from "./EmailFilter"
import JobtitleFilter from "./JobtitleFilter"
import IndustryFilter from "./IndustryFilter"
import KeywordFilter from "./KeywordFilter"
import TechnologiesFilter from "./TechnologiesFilter"

export default function Sidebar(){
    return(
        <div className="w-[260px] space-y-2 h-screen overflow-hidden">
            <div className="bg-[#ECF3FE] text-gray-900 px-4 py-[14px] text-xl font-semibold">
                Total: <span className="font-medium">102.1M</span>
            </div>
            <div className="overflow-y-auto space-y-2" style={{height: 'calc(100vh - 60px)'}}>
                <EmailFilter />
                <JobtitleFilter />
                <IndustryFilter />
                <KeywordFilter />
                <TechnologiesFilter />
            </div>
        </div>
    )
}