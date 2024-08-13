import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from "@testing-library/react"
import { supabase } from '../utils/__mocks__/supabase'
import * as recordFunctions from "../utils/recordFunction";

// supabaseをモック
jest.mock("../utils/supabase")
// getAllRecords関数をモック
jest.spyOn(recordFunctions, 'getAllRecords').mockImplementation()
jest.spyOn(recordFunctions, 'deleteRecord').mockImplementation()
// 初期データ
const initialRecords = [{ id: 1, title: "Initial Record", time: 1 }];
recordFunctions.getAllRecords.mockResolvedValue({ data: initialRecords, error: null })
recordFunctions.deleteRecord.mockResolvedValue({ data: {}, error: null })

describe("Title Test", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();  // 各テストの前にモックをクリア
  });

  it("タイトルが学習記録一覧であること", async () => {
    await act( async() => {
      render(<App />);
    })
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("学習記録一覧")
  })

  it("取得したレコードが表示されていること", async () => {
    // コンポーネントをレンダリング
    await act(async () => {
      render(<App />);
    });
    // 初期の records の検証
    expect(screen.getByText("Initial Record 1時間")).toBeInTheDocument();
  })

  it("登録ボタンを押すと更新されたレコードが表示されていること", async () => {
    await act(async () => {
      render(<App />);
    })
    // 初期データのrecordが表示されているか
    expect(screen.getByText("Initial Record 1時間")).toBeInTheDocument();
    // 初期データのrecordsの要素数の検証
    expect(screen.getAllByText(/Record/i)).toHaveLength(1)
    const updatedRecords = [...initialRecords, { id: 2, title: "update Record", time: 2 }];
    recordFunctions.getAllRecords.mockResolvedValueOnce({ data: updatedRecords, error: null })
    // 値を入力
    const titleInput = screen.getByTestId("input-title")
    fireEvent.change(titleInput, { target: { value: 'update Record' } });
    const timeInput = screen.getByTestId("input-time")
    fireEvent.change(timeInput, { target: { value: '2' } });
    const submitButton = screen.getByTestId("submit-button")
    await act(async () => {
      fireEvent.click(submitButton);
    })
    // 追加データが表示されているか
    expect(screen.getByText("update Record 2時間")).toBeInTheDocument()
    // 初期データと合わせ2要素が表示されているか
    expect(screen.getAllByText(/Record/i)).toHaveLength(2)
  })

  it("削除ボタンを押すとレコードが一つ表示されていること", async () => {
    await act(async () => {
      render(<App />);
    })
    // 初期データのrecordが表示されているか
    expect(screen.getByText("Initial Record 1時間")).toBeInTheDocument();
    // 初期データのrecordsの要素数の検証
    expect(screen.getAllByText(/Record/i)).toHaveLength(1)
    // 削除ボタン取得
    const deleteButton = screen.getByTestId("delete-1")
    recordFunctions.getAllRecords.mockResolvedValueOnce({ data: [], error: null })
    await act(async () => {
      fireEvent.click(deleteButton);
    })
    // recordが削除されているか
    expect(screen.queryByAltText('Initial Record 1時間')).not.toBeInTheDocument()
    expect(screen.queryAllByText(/Record/i)).toHaveLength(0)
  })
})
