

環境構築の流れ
1. Node.jsバージョン管理（mise使用）

# miseのインストール（既にインストール済みの場合はスキップ）
# Windows PowerShellの場合
iwr -useb https://mise.jdx.dev/install.ps1 | iex

# Node.jsの最新22版をインストール
mise install node@22
mise use node@22

# バージョン確認
node --version
2. パッケージマネージャー（pnpm）のセットアップ

# pnpmのインストール
npm install -g pnpm

# バージョン確認
pnpm --version

3. Next.jsプロジェクトの作成

# Next.jsプロジェクトを作成
npx create-next-app@latest frontend

# プロジェクトディレクトリに移動
cd frontend

# 依存関係のインストール（create-next-appで自動実行されますが念のため）
pnpm install

4. 開発サーバーの起動

# ローカル開発サーバーを起動
pnpm run dev

5. v0（Vercel）プロジェクトの追加
注意点: この時点でappフォルダが重複して生成される場合があります。重複した場合は以下のように対処します：

pnpm dlx shadcn@latest add URL

6. Go（Gin）バックエンドのセットアップ

# Goプロジェクトの初期化
go mod init backend

# Ginフレームワークのインストール
go get github.com/gin-gonic/gin

# その他必要な依存関係
go get github.com/joho/godotenv  # 環境変数管理
go get gorm.io/gorm             # ORM
go get gorm.io/driver/postgres  # PostgreSQLドライバー（例）

7. プロジェクト構造の整理
現在のワークスペースのように、以下のような構造が推奨されます：

project-root/
├── backend/           # Go（Gin）バックエンド
│   ├── cmd/
│   ├── internal/
│   ├── pkg/
│   ├── go.mod
│   └── go.sum
├── frontend/          # Next.js フロントエンド
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── pnpm-lock.yaml
└── docker-compose.yml # 開発環境用

8. 開発時の起動手順
バックエンド（Go）:
cd backend
go run cmd/api/main.go

フロントエンド（Next.js）:
cd frontend
pnpm run dev

重要なポイント
appフォルダの重複: v0プロジェクト追加時に既存のsrc/appと競合するappフォルダが生成される場合があります。この場合は重複したものを削除してください。
ポート管理: バックエンド（通常8080）とフロントエンド（通常3000）のポートが重複しないように注意してください。
CORS設定: フロントエンドからバックエンドAPIにアクセスする場合、GinでCORSの設定が必要です。
