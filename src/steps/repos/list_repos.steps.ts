import { Given, When, Then } from '@cucumber/cucumber';
import { API_URLS } from '../../api/urls';
import { CustomWorld } from '../../support/world';
import { expect } from 'chai';
import { spec } from 'pactum';

interface FieldDefinition {
  字段: string;
  类型: string;
  描述: string;
}

async function retryRequest(fn: () => Promise<any>, maxRetries = 3, delay = 1000): Promise<any> {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        console.log(`请求失败，${i + 1}秒后重试...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

Given('我没有设置有效的访问令牌', async function () {
  // 清除之前设置的 token
  process.env.GITHUB_TOKEN = '';
});

When('我发送获取仓库列表请求', async function () {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'User-Agent': 'GitHub-API-Test'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    this.apiResponse = await spec()
      .get('/user/repos')
      .withHeaders(headers)
      .withRequestTimeout(30000);
  } catch (error) {
    this.error = error;
  }
});

Then('API响应状态码应为 {int}', async function (statusCode: number) {
  expect(this.apiResponse.statusCode).to.equal(statusCode);
});

Then('响应中包含仓库列表数据', async function () {
  const body = this.apiResponse.body;
  expect(body).to.be.an('array');
  expect(body.length).to.be.at.least(0);
});

Then('列表中的每个仓库应该包含以下字段:', async function (dataTable) {
  const body = this.apiResponse.body;
  const expectedFields = dataTable.hashes().reduce((acc: Record<string, string>, field: FieldDefinition) => {
    acc[field.字段] = field.类型;
    return acc;
  }, {});

  // 验证每个仓库对象
  body.forEach((repo: any) => {
    Object.entries(expectedFields).forEach(([field, type]) => {
      expect(repo).to.have.property(field);
      
      switch(type) {
        case '整数':
          expect(repo[field]).to.be.a('number');
          expect(Number.isInteger(repo[field])).to.be.true;
          break;
        case '字符串':
          // 某些字段可能为 null
          if (repo[field] !== null) {
            expect(repo[field]).to.be.a('string');
          }
          break;
        case '布尔值':
          expect(repo[field]).to.be.a('boolean');
          break;
      }
    });
  });
});

Then('响应中包含错误信息 {string}', async function (errorMessage: string) {
  const body = this.apiResponse.body;
  expect(body).to.have.property('message');
  expect(body.message).to.equal(errorMessage);
}); 