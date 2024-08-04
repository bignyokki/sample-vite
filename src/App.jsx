import { useState } from "react"
function App() {
  const targetTime = 1000 // 目標時間
  const [text, setText] = useState("")
  const [time, setTime] = useState(0)
  const [records, setRecord] = useState([])
  const [error, setError] = useState("")
  const [sumTime, setSumTime] = useState(0)

  const initialize = () => {
    setError("")
    setText("")
    setTime(0)
  }

  const calcSumTime = (records) => {
    const _sumTime = records.reduce((sum, currentRecord) => {
      return sum + currentRecord.time
    },
    0
  )
    console.log(_sumTime)
    setSumTime(_sumTime)
  }

  const onChangeText = (event) => setText(event.target.value)
  const onChangeTime = (event) => setTime(parseInt(event.target.value))
  const onClickAdd = () => {
    if (!text || !time) {
      setError("入力されていない項目があります")
      return
    }
    const _record = {title: text, time}
    const newRecords = [...records, _record]
    setRecord(newRecords)
    calcSumTime(newRecords)
    initialize()
  }


  return (
    <>
      <h1>学習記録一覧</h1>
      学習内容<input value={text} onChange={onChangeText} /><br />
      学習時間<input type="number" value={time} onChange={onChangeTime} /><br />
      入力された学習内容：{text}<br />
      入力された学習時間：{time}時間<br />
      {records.map((record) => {
        return <div key={record.title}>{record.title} {record.time}時間</div>
      })}
      <button onClick={onClickAdd}>登録</button>
      <div>{error}</div>
      <div>合計時間：{`${sumTime}/${targetTime}(h)`}</div>
    </>
  )
}

export default App
