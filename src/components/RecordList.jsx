import { useEffect, useState } from "react"

export const RecordList = (props) => {
  const { records } = props

  const targetTime = 1000 // 目標時間
  const [sumTime, setSumTime] = useState(0)

  useEffect(() => {
    const _sumTime = records.reduce((sum, currentRecord) => {
      return sum + currentRecord.time
    }, 0)
    setSumTime(_sumTime)
  }, [records])

  return (
    <div>
      {records.map((record) => {
        return <div key={record.id}>{record.title} {record.time}時間</div>
      })}
      <div>合計時間：{`${sumTime}/${targetTime}(h)`}</div>
    </div>
  )
}