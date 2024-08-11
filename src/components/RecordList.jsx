import { useEffect, useState } from "react"
import { deleteRecord } from "../utils/recordFunction"

export const RecordList = (props) => {
  const { records, getRecords } = props

  const targetTime = 1000 // 目標時間
  const [sumTime, setSumTime] = useState(0)

  useEffect(() => {
    const _sumTime = records.reduce((sum, currentRecord) => {
      return sum + currentRecord.time
    }, 0)
    setSumTime(_sumTime)
  }, [records])

  const onClickDelete = async (id) => {
    const response = await deleteRecord(id)
    getRecords()
  }

  return (
    <div>
      {records.map((record) => {
        return <div key={record.id}>{record.title} {record.time}時間 <button onClick={() => onClickDelete(record.id)}>削除</button></div>
      })}
      <div>合計時間：{`${sumTime}/${targetTime}(h)`}</div>
    </div>
  )
}