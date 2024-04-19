import { useEffect, useState } from "react";

const calculateRange = (data) => {
    const range = [];
    const num = Math.ceil(data.length / 10);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
};

const sliceData = (data, page) => {
    return data.slice((page - 1) * 10, page * 10);
};

const fieldData = (data) => {
    const fields = []
    for(const prop in data[0]){
        fields.push(prop)
    }
    return fields
};

const useTable = (data, page) => {
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const [fields, setFields] = useState([]);
    
  
    useEffect(() => {
      const range = calculateRange(data);
      setTableRange([...range]);

      const slice = sliceData(data, page);
      setSlice([...slice]);

      const fields = fieldData(data);
      setFields([...fields]);
    }, [data, setTableRange, page, setSlice]);
  
    return { slice, range: tableRange, fields, length: data.length };
};
export default useTable;
