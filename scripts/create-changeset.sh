#!/bin/bash

# Changeset 创建脚本
# 此脚本将引导您创建一个新的 changeset

echo "🦋 欢迎使用 Changeset 创建助手！"
echo ""

# 检查是否在正确的目录中
if [ ! -d ".changeset" ]; then
  echo "❌ 错误：未找到 .changeset 目录。请确保在项目根目录中运行此脚本。"
  exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  警告：您有未提交的更改。建议先提交这些更改，然后再创建 changeset。"
  echo ""
  read -p "是否继续？(y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "取消操作。"
    exit 1
  fi
fi

# 运行 changeset 命令
echo "🔄 正在启动 changeset 向导..."
echo ""
pnpm changeset

# 检查是否创建了新的 changeset
if [ -n "$(ls -A .changeset/*.md 2>/dev/null | grep -v README.md)" ]; then
  echo ""
  echo "✅ Changeset 创建成功！"
  echo ""
  echo "📝 请记得提交 changeset 文件："
  echo "   git add .changeset/*"
  echo "   git commit -m \"chore: add changeset\""
  echo ""
  echo "🚀 当您准备好发布时，请运行："
  echo "   pnpm version-and-release"
else
  echo ""
  echo "❌ 未创建新的 changeset。"
fi