import { useState } from "react";

export default function Query({ setQueryResult, setModal, isConnected }){
    const [query, setQuery] = useState('')
    const handleChangeQuery = (e) => {
        const { value } = e.target;
        setQuery(value);
    };

    const execQuery = async (e) => {
        e.preventDefault();
        setModal((modal) => { return { ...modal, status: '', show: false, msg: ''}})
        const res = await fetch('http://localhost:3000/api/qb/exec', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        })
        const result = await res.json()
        if(result.errors){
            setModal((modal) => { return { ...modal, status: 'failed', show: true, msg: result.errors.message }})
            setQueryResult([])
        }else {
            setModal((modal) => { return { ...modal, show: true, msg: result.message }})
            setQueryResult([...result.data])
        }
    }
    return (
        <div className="px-6 md:px-20 lg:px-40 xl:px-52 bg-slate-950 py-6 text-white flex flex-col">
            <h1 className="text-center mb-10 text-3xl font-medium">Query</h1>
            <textarea className="w-full text-black px-2 py-2 text-base outline-none focus:outline-blue-900 h-60" onChange={handleChangeQuery} disabled={!isConnected}></textarea>
            <button disabled={!isConnected} className="self-end px-8 py-2 bg-green-700 hover:bg-green-600 mt-5 disabled:opacity-50 disabled:hover:bg-none" onClick={execQuery}>RUN</button>
        </div>
    )
}