import { useState } from "react"
import { postRecord } from "../utils/recordFunction"

export const InputForm = (props) => {
  const { getRecords } = props

  const [title, setTitle] = useState("")
  const [time, setTime] = useState(0)
  const [error, setError] = useState("")

  const initialize = () => {
    setError("")
    setTitle("")
    setTime(0)
  }

  const onChangeTitle = (event) => setTitle(event.target.value)
  const onChangeTime = (event) => setTime(parseInt(event.target.value))

  const onClickAdd = async () => {
    if (!title || !time) {
      setError("入力されていない項目があります")
      return
    }
    const newRecord = {title, time}
    const error = await postRecord(newRecord)
    if (error) {
      console.error(error)
      setError("データの記録に失敗しました")
      return
    }
    getRecords()
    initialize()
  }



  return (
    <div>
      学習内容<input value={title} onChange={onChangeTitle} data-testid="input-title"/><br />
      学習時間<input type="number" value={time} onChange={onChangeTime} data-testid="input-time"/><br />
      入力された学習内容：{title}<br />
      入力された学習時間：{time}時間<br />
      <button onClick={onClickAdd} data-testid="submit-button">登録</button>
      <div>{error}</div>
    </div>
  )
}