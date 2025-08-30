import http.server
import socketserver
import webbrowser
import threading
import time

# 设置服务器端口
PORT = 8000

# 获取当前目录作为服务器根目录
handler = http.server.SimpleHTTPRequestHandler

# 启动服务器
def start_server():
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"服务器启动在 http://localhost:{PORT}")
        httpd.serve_forever()

# 在新线程中启动服务器
server_thread = threading.Thread(target=start_server)
server_thread.daemon = True
server_thread.start()

# 等待服务器启动
print("正在启动服务器...")
time.sleep(1)

# 打开浏览器预览
try:
    webbrowser.open(f"http://localhost:{PORT}")
    print("浏览器已打开预览")
except Exception as e:
    print(f"无法自动打开浏览器: {e}")
    print(f"请手动访问 http://localhost:{PORT}")

# 保持脚本运行
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("服务器已停止")