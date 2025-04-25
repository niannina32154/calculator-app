# Calculator App

这是一个使用 **Go + ConnectRPC** 编写的后端服务，以及使用 **Next.js (React + TypeScript)** 构建的前端应用的全栈计算器项目。支持基本的加法、减法、乘法和除法操作。

---

## 🚀 项目结构

app-project2/ ├── calculator-backend/ # 使用 Go 和 ConnectRPC 编写的后端服务 ├── app/ # Next.js 前端页面 (app router) ├── public/ # 前端静态资源 ├── .gitignore ├── package.json └── README.md

---

## ✨ 功能特色

- ✅ 支持加、减、乘、除四则运算
- ✅ 使用 gRPC-Web 协议通信（通过 ConnectRPC）
- ✅ 前后端完全解耦
- ✅ 前端采用 Next.js + React Hooks 开发
- ✅ 支持 CORS 跨域请求（开发环境）

---

## 🛠️ 技术栈

- 后端：Go, ConnectRPC, Protocol Buffers
- 前端：Next.js (App Router), React, TypeScript
- 测试：Jest, Testing Library
- 项目管理：Git + GitHub

---

## ⚙️ 快速启动

### 后端运行

```bash
cd calculator-backend
go run main.go
默认监听地址：http://localhost:8080

前端运行
bash
npm install
npm run dev
打开浏览器访问：http://localhost:3000

✅ 单元测试
bash
npm run test
🧾 示例请求格式（Proto）
proto

message CalculationRequest {
  double a = 1;
  double b = 2;
  string operator = 3; // 可选值: "+", "-", "*", "/"
}

message CalculationResponse {
  double result = 1;
}
📂 已实现目录说明
calculator.proto：gRPC 接口定义

calculator.go：业务逻辑实现

main.go：启动服务、配置路由、启用 CORS

page.tsx：前端计算器页面

CalculatorPage.test.tsx：前端单元测试
calculator_test.go ：后端单元测试
