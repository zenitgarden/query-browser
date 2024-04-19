export default function Modal({modal}){
    return (
        <div className={`flex text-white px-3 py-2 fixed right-4 top-2 rounded w-auto transition-all ${modal.status === 'failed' ? 'bg-red-700' : 'bg-blue-950'}`}>
            <p><b>Message: </b> { modal.msg }</p>
        </div>
    )
}