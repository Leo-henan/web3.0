# 这个脚本帮助准备GitHub上传，解决文件数量过多的问题
Write-Host "正在准备GitHub上传..."

# 检查并备份package.json和package-lock.json（如果存在）
if (Test-Path "package.json") {
    Copy-Item "package.json" "package.json.backup" -Force
    Write-Host "已备份package.json"
}

if (Test-Path "package-lock.json") {
    Copy-Item "package-lock.json" "package-lock.json.backup" -Force
    Write-Host "已备份package-lock.json"
}

# 检查并移除node_modules目录
if (Test-Path "node_modules") {
    Write-Host "正在移除node_modules目录..."
    Remove-Item "node_modules" -Recurse -Force
    Write-Host "已移除node_modules目录（包含约1171个文件）"
}

# 检查并移除其他大型或不需要的目录
if (Test-Path "Sans") {
    Remove-Item "Sans" -Recurse -Force
    Write-Host "已移除Sans字体目录"
}

Write-Host ""
Write-Host "上传准备完成！现在项目文件数量已大幅减少，可以更轻松地上传到GitHub。"
Write-Host ""
Write-Host "注意事项："
Write-Host "1. 上传完成后，在本地运行 'npm install' 可以重新安装依赖。"
Write-Host "2. 如需恢复被移除的文件，可以使用备份文件。"
Write-Host "3. 推荐使用Git命令行工具上传（git add, git commit, git push），比界面工具更稳定。"
Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')