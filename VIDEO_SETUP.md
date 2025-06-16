# 背景動画のセットアップ

このプロジェクトでは8bitレトロゲーム風の背景動画を使用しています。

## ローカル開発

1. `backvideo.mp4`ファイルをプロジェクトルートに配置してください
2. ファイルサイズ: 約108MB

## 本番環境

動画ファイルが大きすぎるため、外部ホスティングサービスを使用してください：

1. 動画を以下のいずれかにアップロード：
   - YouTube（非公開/限定公開）
   - Vimeo
   - Cloudinary
   - AWS S3
   - Google Drive（共有リンク）

2. `index.html`の該当箇所を更新：
```html
<!-- <source src="https://your-cdn.com/backvideo.mp4" type="video/mp4"> -->
```

## 動画仕様

- フォーマット: MP4
- サイズ: 1920x1080推奨
- ビットレート: 2-5Mbps
- 長さ: ループ再生に適した長さ

## 圧縮推奨設定

```bash
# ffmpegを使用した圧縮例
ffmpeg -i backvideo.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart backvideo_compressed.mp4
```