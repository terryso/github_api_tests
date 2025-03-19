# GitHub API Testing Project

[中文文档](README.md) | English

A BDD (Behavior-Driven Development) testing framework for GitHub API, implemented using Cucumber.js and TypeScript.

## Requirements

- Node.js >= 14
- npm >= 6

## Setup

1. Clone the project
```bash
git clone <repository_url>
cd github_api_tests
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Then edit the `.env` file with necessary configurations, especially the `GITHUB_TOKEN`.

## Command Guide

### Test Commands

1. Run all tests
```bash
/test
```
This command executes `npm test` to run all test cases.

2. Run tests with specific tags
```bash
/test repos                   # Run tests with @repos tag
/test login repos            # Run tests with @login or @repos tags
```

Note:
- Tags are case-sensitive
- Multiple tags are space-separated
- Multiple tags have an "OR" relationship

### Feature File Generation Commands

1. Generate new feature file
```bash
/add_feat -d docs/repos.json Repository Query API
```
This command will:
- Generate a new feature file in the `src/features` directory
- Create basic scenarios based on API documentation
- Add API documentation related comments
- Generate only the first basic scenario

Parameters:
- `-d`: Specify API documentation path (required)
- Description: Feature description (optional)

2. Generate step definitions
```bash
/steps src/features/repos/list_repos.feature
```
This command will:
- Generate corresponding step definition file in `src/steps` directory
- Check and reuse existing step definitions
- Generate definitions only for undefined steps
- Generated filename format: [module].steps.ts

3. Add test scenarios
```bash
/add_scene src/features/repos/list_repos.feature
```
This command will:
- Add new test scenarios to existing feature files
- Check current scenario coverage against API documentation
- Add new scenarios only when API functionality is not fully covered
- Focus on uncovered functionality and edge cases
- Follow existing scenario writing style
- Add one scenario at a time

## Project Structure

```
├── src/
│   ├── features/          # Feature description files
│   ├── steps/            # Step definition files
│   ├── support/          # Support files
│   └── api/             # API related configurations
├── docs/                # API documentation
├── .env.example        # Environment variable example
└── package.json        # Project configuration
```

## Development Standards

This project follows strict BDD development standards:

1. Feature Files (.feature)
- Stored in `src/features` directory
- Organized by business function modules
- Follow Given-When-Then structure

2. Step Definition Files (.steps.ts)
- Stored in `src/steps` directory
- Split by functional modules
- Implementation should be simple and clear

3. Scenario Development Process
- Develop one scenario at a time
- Start new scenario only after current one is complete
- Ensure test and implementation code quality

## Important Notes

1. Environment Variables
- Must configure `GITHUB_TOKEN`
- Configure `HTTP_PROXY` and `HTTPS_PROXY` if proxy is needed

2. Test Execution
- Network connection may be required
- Some tests may require specific permissions
- Be aware of API rate limits

## Common Issues

1. Test Timeout
- Check network connection
- Verify `TEST_TIMEOUT` setting
- Validate proxy configuration

2. Authentication Failure
- Verify `GITHUB_TOKEN` configuration
- Check token permissions
- Verify token expiration 