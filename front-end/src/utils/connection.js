export function validateErrorMessage(messages, setFormDataError){
    messages.map((msg) => {
        for(const prop in msg){
          const value = msg[prop]
          setFormDataError((formDataError) => {
            return {
              ...formDataError,
              [prop]: value
            }
          })
        }
    })
}