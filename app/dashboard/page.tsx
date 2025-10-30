import ApolloDataTable from "../_components/ApolloDataTable"

export default function page(){
    return(
        <div className="w-full bg-gray-100 overflow-hidden" style={{height: 'calc(100vh - 56px)'}}>
            <ApolloDataTable />
        </div>
    )
}