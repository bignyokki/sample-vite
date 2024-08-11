import { useEffect, useState } from "react"
import { getAllRecords } from "./utils/recordFunction"
import { InputForm } from "./components/InputForm"
import { RecordList } from "./components/RecordList"
import { LoadingComponent } from "./components/LoadingComponent"

function App() {
  const [records, setRecord] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getRecords = async () =>{
    const response = await getAllRecords()
    if (response.error) {
      window.alert("データの取得に失敗しました")
      return
    }
    const _records = response.data
    setRecord(_records)
  }

  useEffect(() => {
    getRecords()
    setIsLoading(false)
  },[])

  return (
    <>
      <h1>学習記録一覧ver2</h1>
      { isLoading ?
        <LoadingComponent /> :
        <div>
          <InputForm getRecords={() => getRecords()} />
          <RecordList records={records} getRecords= {() => getRecords()} />
        </div>
        }
    </>
  )
}

export default App
