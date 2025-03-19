# GitHub API 测试项目

本项目是一个基于 BDD (行为驱动开发) 的 GitHub API 测试框架，使用 Cucumber.js 和 TypeScript 实现。

## 环境要求

- Node.js >= 14
- npm >= 6

## 项目设置

1. 克隆项目
```bash
git clone <项目地址>
cd github_api_tests
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
```
然后编辑 `.env` 文件，填入必要的配置信息，特别是 `GITHUB_TOKEN`。

## 命令使用指南

### 测试命令

1. 执行所有测试
```bash
/test
```
这个命令会执行 `npm test`，运行所有测试用例。

2. 执行特定标签的测试
```bash
/test repos                   # 执行带有 @repos 标签的测试
/test login repos            # 执行带有 @login 或 @repos 标签的测试
```

注意：
- 标签名称区分大小写
- 多个标签之间使用空格分隔
- 多个标签之间是"或"的关系

### 功能文件生成命令

1. 生成新的功能文件
```bash
/add_feat -d docs/repos.json 仓库查询接口
```
这个命令会：
- 在 `src/features` 目录下生成新的 feature 文件
- 根据提供的 API 文档生成基础场景
- 自动添加 API 文档相关注释
- 仅生成第一个基础场景

参数说明：
- `-d`：指定 API 文档路径（必填）
- 描述信息：功能说明（可选）

2. 生成步骤定义文件
```bash
/steps src/features/repos/list_repos.feature
```
这个命令会：
- 在 `src/steps` 目录下生成对应的步骤定义文件
- 自动检查并复用已有的步骤定义
- 仅为未定义的步骤生成新的定义代码
- 生成的文件名格式为：[功能模块].steps.ts

3. 添加测试场景
```bash
/add_scene src/features/repos/list_repos.feature
```
这个命令会：
- 为现有 feature 文件添加新的测试场景
- 根据 API 文档检查当前场景覆盖情况
- 仅在现有场景未完全覆盖 API 功能时添加新场景
- 关注未覆盖的功能点或边界条件
- 遵循现有场景的编写风格
- 一次只添加一个场景

## 项目结构

```
├── src/
│   ├── features/          # 功能描述文件
│   ├── steps/            # 步骤定义文件
│   ├── support/          # 支持文件
│   └── api/             # API 相关配置
├── docs/                # API 文档
├── .env.example        # 环境变量示例
└── package.json        # 项目配置
```

## 开发规范

本项目遵循严格的 BDD 开发规范：

1. 功能文件 (.feature)
- 存放在 `src/features` 目录
- 按业务功能模块组织
- 遵循 Given-When-Then 结构

2. 步骤定义文件 (.steps.ts)
- 存放在 `src/steps` 目录
- 按功能模块拆分
- 实现要简单清晰

3. 场景开发流程
- 一次只开发一个场景
- 当前场景完成后才开始新场景
- 确保测试和实现代码质量

## 注意事项

1. 环境变量
- 必须配置 `GITHUB_TOKEN`
- 如果需要代理，配置 `HTTP_PROXY` 和 `HTTPS_PROXY`

2. 测试执行
- 测试可能需要网络连接
- 某些测试可能需要特定的权限
- 注意 API 调用限制

## 常见问题

1. 测试超时
- 检查网络连接
- 确认 `TEST_TIMEOUT` 设置
- 验证代理配置

2. 认证失败
- 确认 `GITHUB_TOKEN` 配置
- 检查 token 权限
- 验证 token 是否过期 