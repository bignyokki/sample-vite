import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen, act } from "@testing-library/react";

// supabaseをモック
jest.mock("../utils/supabase")

describe("Title Test", () => {

  beforeEach(() => {
    jest.clearAllMocks();  // 各テストの前にモックをクリア
  });

  it("タイトルがHello Jestであること", async () => {
    // testId(title)を指定して取得
    await act( async() => {
      render(<App />);
    })
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧")
  })
})
