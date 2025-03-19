# API文档: https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user
@repos
Feature: 获取用户仓库列表
  作为GitHub API用户
  我想要获取我的仓库列表
  以便查看我的所有仓库信息

  @get
  Scenario: 成功获取用户仓库列表
    When 我发送获取仓库列表请求
    Then API响应状态码应为 200
    And 响应中包含仓库列表数据
    And 列表中的每个仓库应该包含以下字段:
      | 字段          | 类型    | 描述           |
      | id           | 整数    | 仓库ID         |
      | name         | 字符串  | 仓库名称       |
      | full_name    | 字符串  | 完整仓库名称   |
      | description  | 字符串  | 仓库描述       |
      | private      | 布尔值  | 是否私有       |
      | html_url     | 字符串  | 仓库网页URL    |
      | language     | 字符串  | 主要编程语言   |
      | default_branch| 字符串 | 默认分支       |

  @get @error
  Scenario: 未授权访问仓库列表
    Given 我没有设置有效的访问令牌
    When 我发送获取仓库列表请求
    Then API响应状态码应为 401
    And 响应中包含错误信息 "Requires authentication" 