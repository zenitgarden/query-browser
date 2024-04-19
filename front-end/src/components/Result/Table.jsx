import { useState } from "react";

import useTable from "../../utils/table";
import TableFooter from "./TableFooter";

export default function Table({ data }){
    const [page, setPage] = useState(1);
    const { slice, range, fields, length } = useTable(data, page);

    return (
      <>
        <div className="w-full overflow-x-scroll">
            <table className='border-collapse border-none w-full'>
            <thead className='transition-all duration-200'>
                <tr>
                {fields.map((name, i) => (
                <th className='bg-white p-3 font-bold text-left text-black' key={i}>{name}</th>
                ))}
                </tr>   
            </thead>
            <tbody>
                {slice.map((el) => (
                <tr className='bg-white text-black' key={el.id}>
                    {fields.map((prop, i) => (
                        <td className='p-3 border-2' key={i}>{el[prop]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} length={length}/>
      </>
    );
};