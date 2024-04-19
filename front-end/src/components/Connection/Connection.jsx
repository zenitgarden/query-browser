import { useState } from "react";
import Input from "./Input";
import { validateErrorMessage } from "../../utils/connection";

export default function Connection({ setModal, isConnected, setIsConnected }) {
    const [formData, setFormData] = useState({user: "",password: "",database: "", host: ""});
    const [formDataError, setFormDataError] = useState({user: "",password: "",database: "", host: ""});
    const [loadingConnection, setLoadingConnection] = useState({isLoadingTest: false, isLoadingConnect: false});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const testConnection = async (e) => {
      e.preventDefault();
      setLoadingConnection({ ...loadingConnection, isLoadingTest: true})
      setModal((modal) => { return { ...modal, status: '', show: false, msg: ''}})
      const res = await fetch('http://localhost:3000/api/qb/test', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      setLoadingConnection({ ...loadingConnection, isLoadingTest: false})
      if(Array.isArray(result.errors?.message)){
        setFormDataError({})
        validateErrorMessage(result.errors.message, setFormDataError)
      } else {
        setFormDataError({})
        result.errors 
        ? setModal((modal) => { return { ...modal, status: 'failed', show: true, msg: result.errors.message }})
        : setModal((modal) => { return { ...modal, show: true, msg: result.message }})
      }
    }

    const connect = async (e) => {
      e.preventDefault();
      setLoadingConnection({ ...loadingConnection, isLoadingConnect: true})
      setModal((modal) => { return { ...modal, status: '', show: false, msg: ''}})
      const res = await fetch('http://localhost:3000/api/qb/connect', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const result = await res.json()
      setLoadingConnection({ ...loadingConnection, isLoadingConnect: false})
      if(Array.isArray(result.errors?.message)){
        setFormDataError({})
        validateErrorMessage(result.errors.message, setFormDataError)
      } else {
        setFormDataError({})
        console.log(result)
        if(result.errors){
          setModal((modal) => { return { ...modal, status: 'failed', show: true, msg: result.errors.message }})
          if(result?.data){
            setIsConnected(true)
            setFormData(result.data)
          }
        } else {
          setModal((modal) => { return { ...modal, show: true, msg: result.message }})
          setIsConnected(true)
        }
      }
    }

    const disconnect = async (e) => {
      e.preventDefault();
      setModal((modal) => { return { ...modal, status: '', show: false, msg: ''}})
      const res = await fetch('http://localhost:3000/api/qb/disconnect', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const result = await res.json()
      if(result.errors){
        setModal((modal) => { return { ...modal, status: 'failed', show: true, msg: result.errors.message }})
        if(result.errors.message === 'Not connected in any database'){
          setIsConnected(false)
        }
      } else {
        setModal((modal) => { return { ...modal, show: true, msg: result.message }})
        setIsConnected(false)
      }
    }

    return (
        <form onSubmit={isConnected ? disconnect : connect} className="px-6 md:px-20 bg-slate-950 pt-8 pb-6 text-white flex flex-col">
          <h1 className="text-center mb-10 text-3xl font-medium">Connection</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-14 self-center w-full md:w-auto">
            <Input name={'host'} data={formData.host} error={formDataError.host} handleChange={handleChange} />
            <Input name={'database'} data={formData.database} error={formDataError.database} handleChange={handleChange} />
            <Input name={'user'} data={formData.user} error={formDataError.user} handleChange={handleChange} />
            <Input name={'password'} data={formData.password} error={formDataError.password} handleChange={handleChange} />
            <div className="flex gap-4 md:col-span-2 justify-end mt-10 md:mt-0 mb-10">
              <button type="button" className="px-2 sm:px-4 py-2 bg-blue-700 hover:bg-blue-600 flex items-center justify-center gap-2" onClick={testConnection}>
              {loadingConnection.isLoadingTest ? <div class="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-blue-600" /> : ''} Test Connection</button>
              <button type="submit" className={`px-2 sm:px-4 py-2 flex items-center justify-center gap-2 ${isConnected ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'}`}>
              {loadingConnection.isLoadingConnect ? <div class="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-green-600" /> : ''} { isConnected ? 'Connected' : 'Connect'}</button>
            </div>
          </div>
        </form>
   );
}

