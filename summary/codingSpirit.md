---
heading: coding-spirit
description: 開発を迅速にするためのMyベストプラクティス集
draft: false
---

## 開発を迅速にするためのMyベストプラクティス集

負債をため込まないために重視していること

### Auto generate

#### Types

型安全にバックエンドサーバ、Databaseにアクセスすることで、実際にコードを動かす前に、型チェックで明らかなエラーを検知できる。
また、SQLインジェクション等のセキュリティ対策も同時に行うライブラリもあり、セキュリティの担保にもなる場合がある。

例

ORM

- [Prisma](https://www.prisma.io/), [TypeORM](https://typeorm.io/): Databaseのテーブル定義からTypeScript型定義を自動作成。SQL文を書く必要がなくなり、型安全にDatabaseにアクセスできる。また、テーブル定義からDatabaseのテーブルを作成ができ、DBの設定、マイグレーションも自動で行える。

GraphQL codegenerator

- [GraphQL Code Generator](https://graphql-code-generator.com/): GraphQLのQuery/Mutation/Subscriptionの型定義を自動作成。型安全にGraphQLサーバにアクセスできる。

REST API codegenerator

- [openapi2aspida](https://github.com/aspida/openapi2aspida/): OpenAPIからTypeScript型定義を自動作成。型安全にREST APIサーバにアクセスできる。

gRPC tRPC

#### Documentation

自動でドキュメントを生成できるようにする。
CIと連携して、常にAPIのドキュメントが最新の状態であることが担保できる。

ドキュメントを挟まないことで、ドキュメントの更新忘れによる不整合を防ぐ。

例

REST API(Open API)

- [tsoa](https://github.com/lukeautry/tsoa)+[Swagger UI](https://swagger.io/tools/swagger-ui/): tsoaを利用し、ExpressのControllerからSwagger UIのドキュメントを自動生成し、Swagger UIで確認可能。

GraphQL

- [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/): 動いているGraphQLサーバにpost可能なQuery/Mutationのドキュメントを確認可能。

### スキーマ駆動開発

スキーマの定義ファイルからフロントエンドもバックエンドも実装を行う開発方針。

[スキーマ駆動開発ってなに？便利なの？って方へ。](https://zenn.dev/manabu/articles/35ea2ddfe2df3a)

例

- [express-openapi](https://www.npmjs.com/package/express-openapi): OpenAPIからExpressのControllerを自動生成。

### CI

コードの体裁を守ることによって品質管理がしやすくなる。

また、パッケージのアップデートに伴う不具合をある程度未然に防ぐことができる。

- formatter
  - [prettier](https://prettier.io/)
    - 本ブログで利用している設定は[prettier.config.mjs](https://github.com/s-hirano-ist/blog/blob/main/prettier.config.mjs)を参照。
- linter
  - [ESLint](https://eslint.org/)
    - 本ブログで利用している設定は[.eslintrc.cjs](https://github.com/s-hirano-ist/blog/blob/main/.eslintrc.cjs)を参照。
  - [Stylelint](https://stylelint.io/)
    - 本ブログで利用している設定は[.stylelintrc.mjs](https://github.com/s-hirano-ist/blog/blob/main/.stylelintrc.mjs)を参照。
  - [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
    - 本ブログで利用している設定は[.markdownlint-cli2.jsonc](https://github.com/s-hirano-ist/blog/blob/main/.markdownlint-cli2.jsonc)を参照。
  - [secretlint](https://github.com/secretlint/secretlint)
    - 本ブログで利用している設定は[.secretlintrc.json](https://github.com/s-hirano-ist/blog/blob/main/.secretlintrc.json)を参照。
- test
  - E2E, Visual Regression
    - [Playwright Test](https://playwright.dev/docs/test-intro)
  - Unit, Integration
    - [Jest](https://jestjs.io/)
    - [Vitest](https://vitest.dev/)
- else
  - [LightHouse CI](https://github.com/GoogleChrome/lighthouse-ci) | [Page Speed Insights](https://pagespeed.web.dev/)
  - [Nu Html Checker](https://github.com/validator/validator)
  - [htmlhint](https://htmlhint.com/)を利用（`npx htmlhint https://example.com`）。

### CD

GitHub/GitLabのMainブランチへのマージや、タグの付与をトリガーに自動デプロイを行うことで、コードと環境のコードの不整合を防ぐ。

- Vercel bot: Vercelへのデプロイを自動化。
- Render bot: Renderへのデプロイを自動化。
- AWS CDK: AWSのリソースをコードベースで管理し、差分を自動デプロイ。

### Container service

開発環境にdocker composeを利用することで、開発環境を即時に作成できる。

また、フルマネージなコンテナサービス（AWS Elastic Container Service等）を利用することで、容易にk8sのようにコンテナの管理を自動化できる。

### Update and Security alerts

常に最新の状態のライブラリを使うことで、脆弱性を防いだり、メンテナンスがしやすくなる。

- Renovate: 定期的にパッケージのアップデートのPRを自動作成。
- Dependabot alerts: 脆弱性を自動で検知し、パッケージのアップデートのPRを自動作成。

### Git

- CHANGELOGを自動生成。
  - [standard-version](https://github.com/conventional-changelog/standard-version): `CHANGELOG.md`を自動作成 + `package.json`の`version`を自動更新。
  - `gh release create --generate-notes`コマンドによって、GitHubのReleaseのタイトルと本文を自動生成。
- [git-cz](https://github.com/streamich/git-cz): [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)に則ったコミットメッセージを自動生成。
- [commitizen](https://github.com/commitizen/cz-cli): 同上。
- [Husky](https://typicode.github.io/husky/): コミット前にlinterを実行し、コードの品質を担保する。GitでMarkdownを管理している場合やCI/CDの実行時間を削減したい場合に有効。
- Squash Commit by default: Pull Requestをマージする際に、コミットをsquashすることで、コミット履歴をきれいに保つ。
- Pull Request単位でビルドを共有する（iOSやAndroidアプリの場合、[DeployGate](https://deploygate.com/?locale=ja)等を活用する）。

### Single source of truth

ドキュメントを唯一の情報ソースとし、色々な箇所にドキュメントを散りばめないようにしよう。

[オフィスなしのオールリモートで成長するGitLab社、世界中の2,000人をつなぐカルチャーとは](https://codezine.jp/article/detail/18281)

## その他

### プログラマの三大美徳

- 怠惰
- 短気
- 傲慢

[プログラマーのための原則](https://qiita.com/yokarikeri/items/cbdef66fca460253cc7f)

### つよつよエンジニアになるために

1. 非機能要件が考慮されている。
2. プログラミングの原理原則が守られている。
3. レポジトリ内に無駄なコードがない（`.DS_Store`等）。
4. CI/CD pipelineが初期から整備されている。
5. テストコードが（高確率で）存在する。

[つよつよエンジニアの成果物にある5つの特徴](https://qiita.com/lazy-kz/items/727299cae893ab3442a0)

### 初学者エンジニアの心得

[マネージャーが進捗を管理しやすい部下の仕事の進め方](https://qiita.com/soyanchu/items/d1cb9785fc211941a009)

### ライブラリを気軽に導入しないほうがいい?

[ライブラリを気軽に導入しないこと](https://sizu.me/ktsn/posts/v3n2rkzcckia)

### スケーラビリティ

[スケールするというのはどうゆうことなのか](https://speakerdeck.com/kurochan/what-does-it-mean-to-scalability)

### Test

[Webフロントエンドテスト自動化](https://speakerdeck.com/cybozuinsideout/web_frontend_testing_and_automation-2023)

### Issue管理

[NotionのチケットとGitHubのPRの連携](https://zenn.dev/hokuto_tech/articles/b143133e8c8366)
