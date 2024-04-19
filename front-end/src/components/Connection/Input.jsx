export default function Input({ name, data, handleChange, error}){
    return (
      <div className="flex flex-col md:flex-row gap-4 text-lg md:items-center">
        <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
        <input type="text" id={name} name={name} className="p-1 focus:outline-blue-900 outline-none text-black rounded text-base w-full md:w-auto" value={data} onChange={handleChange}/>
        {error ? <p className="text-sm text-red-500">{error}</p> : ''}
      </div>
    )
}