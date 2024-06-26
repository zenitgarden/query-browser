import React, { useEffect } from "react";

export default function TableFooter({ range, setPage, page, slice, length }){ 
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="py-2 w-full font-medium text-left text-base text-[#2c3e50] mt-2 flex items-center justify-between">
      <p>Rows {slice.length === 10 ? slice.length * page - 9 : range[range.length - 2] * 10 + 1} to {slice.length === 10 ? page * slice.length : length} of {length}</p>
      <div>
      {range.map((el, index) => (
        <button
          key={index}
          className={`border-none py-2 px-4 rounded-lg cursor-pointer mx-1 ${
            page === el ? 'text-white bg-blue-900' : 'text-white'
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      </div>
    </div>
  );
};