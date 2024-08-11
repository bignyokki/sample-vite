import { useState } from "react"

export const InputForm = () => {

  const [text, setText] = useState("")
  const [time, setTime] = useState(0)
  const [error, setError] = useState("")

  const initialize = () => {
    setError("")
    setText("")
    setTime(0)
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
    // setRecord(newRecords)
    calcSumTime(newRecords)
    initialize()
  }



  return (
    <div>
      学習内容<input value={text} onChange={onChangeText} /><br />
      学習時間<input type="number" value={time} onChange={onChangeTime} /><br />
      入力された学習内容：{text}<br />
      入力された学習時間：{time}時間<br />
      <button onClick={onClickAdd}>登録</button>
      <div>{error}</div>
    </div>
  )
}