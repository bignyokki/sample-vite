import { useEffect, useState } from "react"
import { getAllRecords } from "./utils/recordFunction"
import { InputForm } from "./components/InputForm"
import { RecordList } from "./components/RecordList"
import { LoadingComponent } from "./components/LoadingComponent"

function App() {
  const [records, setRecord] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getRecords = async () =>{
      const _records = await getAllRecords()
      setRecord(_records)
      setIsLoading(false)
    }
    getRecords()
  },[])

  return (
    <>
      <h1>学習記録一覧</h1>
      { isLoading ?
        <LoadingComponent /> :
        <div>
          <InputForm />
          <RecordList records={records} />
        </div>
        }
    </>
  )
}

export default App
