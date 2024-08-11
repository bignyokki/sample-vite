import { useEffect, useState } from "react"
import { getAllRecords } from "./utils/recordFunction"
import { InputForm } from "./components/InputForm"
import { RecordList } from "./components/RecordList"

function App() {
  const [records, setRecord] = useState([])

  useEffect(() => {
    const getRecords = async () =>{
      const _records = await getAllRecords()
      setRecord(_records)
    }
    getRecords()
  },[])

  return (
    <>
      <h1>学習記録一覧</h1>
      <InputForm />
      <RecordList records={records} />
    </>
  )
}

export default App
