import Table from "./Table";

export default function Result({queryResult}){

    return (
        <div className="px-6 md:px-20 lg:px-40 xl:px-52 bg-slate-950 py-6 text-white flex flex-col">
            <h1 className="text-center mb-10 text-3xl font-medium">Result</h1>
            <Table data={queryResult} />
        </div>
    )
}