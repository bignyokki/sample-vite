# サービス名
学習記録残す君

# サービスの説明
- 学習用アプリケーションです
- 学習記録を追加、削除することができます
- フロント: React, Vite
- バックエンド(DB): supabase
- デプロイ: firebase
- テスト: Jest
- CICD: github actions

# 環境変数
.envに
- SUPABASE_URL
- SUPABASE_KEY
が必要です  
参考：https://supabase.com/docs/reference/javascript/installing  
またgithubのActions secrets and variablesのRepository secretsに  
上記の二つに加え  
- FIREBASE_KEY
- FIREBASE_PROJECT_ID
- FIREBASE_TOKEN
が必要です
参考：https://zenn.dev/jinwatanabe/articles/4026d373383739

# 起動の仕方
## ローカル環境
```
$ npm run dev
```

## TEST
```
$ npm test
```

## build + deploy
```
$ make deploy
```

## CI/CD
git push時に、test + build + deployを行います