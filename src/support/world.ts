import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { spec, request } from 'pactum';
import * as dotenv from 'dotenv';

export class CustomWorld extends World {
  public apiResponse: any;
  public requestBody: any;
  public headers: Record<string, string>;
  public spec: typeof spec;

  constructor(options: IWorldOptions) {
    super(options);
    
    // 加载环境变量
    dotenv.config();

    this.apiResponse = null;
    this.requestBody = null;
    this.headers = {};
    this.spec = spec;

    // 设置基础 URL
    const baseUrl = process.env.GITHUB_API_BASE_URL || 'https://api.github.com';
    request.setBaseUrl(baseUrl.replace(/\/+$/, '')); // 移除末尾的斜杠

    // 设置默认超时时间
    request.setDefaultTimeout(30000);
  }
}

setWorldConstructor(CustomWorld); 