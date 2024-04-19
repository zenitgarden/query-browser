import { useEffect, useState } from 'react'
import Connection from './components/Connection/Connection'
import Modal from './components/Modal'
import Query from './components/Query/Query'
import Result from './components/Result/Result'

function App() {
  const [modal, setModal] = useState({ status: '', show: false, msg: ''})
  const [queryResult, setQueryResult] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let tm
    if(modal.show){
      tm = setTimeout(() => { setModal((modal) => { return { ...modal, status: '', show: false, msg: ''}})},3000)
    }
    return () => clearTimeout(tm)
  },[modal])
  return (
    <>
      <Connection setModal={setModal} isConnected={isConnected} setIsConnected={setIsConnected}/>
      <Query setModal={setModal} setQueryResult={setQueryResult} isConnected={isConnected}/>

      {queryResult.length > 0 ? <Result queryResult={queryResult}/> : ''}
      {modal.show ? <Modal modal={modal}/> : ''}
    </>
  )
}

export default App
