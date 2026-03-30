#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

// Simple MCP server for Playwright
class PlaywrightMCPServer {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    this.setupHandlers();
  }

  setupHandlers() {
    this.rl.on('line', (line) => {
      try {
        const message = JSON.parse(line);
        this.handleMessage(message);
      } catch (e) {
        this.sendError(`Failed to parse message: ${e.message}`);
      }
    });
  }

  handleMessage(message) {
    const { jsonrpc, id, method, params } = message;

    if (method === 'initialize') {
      this.sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {
            listChanged: false
          }
        },
        serverInfo: {
          name: 'playwright-mcp',
          version: '1.0.0'
        }
      });
    } else if (method === 'tools/list') {
      this.sendResponse(id, {
        tools: [
          {
            name: 'playwright_open',
            description: 'Open a browser and navigate to a URL',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string', description: 'URL to navigate to' },
                browser: { type: 'string', enum: ['chromium', 'firefox', 'webkit'], default: 'chromium' }
              },
              required: ['url']
            }
          },
          {
            name: 'playwright_screenshot',
            description: 'Take a screenshot of the current page',
            inputSchema: {
              type: 'object',
              properties: {
                path: { type: 'string', description: 'Path to save screenshot' }
              }
            }
          }
        ]
      });
    } else if (method === 'tools/call') {
      this.handleToolCall(id, params);
    } else {
      this.sendError(`Unknown method: ${method}`);
    }
  }

  handleToolCall(id, params) {
    const { name, arguments: args } = params;

    // For now, send a message that Playwright is available
    this.sendResponse(id, {
      content: [
        {
          type: 'text',
          text: `Playwright tool '${name}' called with arguments: ${JSON.stringify(args)}. Use 'npm test' or 'npx playwright' commands to run Playwright tests.`
        }
      ]
    });
  }

  sendResponse(id, result) {
    const response = {
      jsonrpc: '2.0',
      id,
      result
    };
    console.log(JSON.stringify(response));
  }

  sendError(message) {
    console.error(JSON.stringify({
      jsonrpc: '2.0',
      error: { code: -32000, message }
    }));
  }
}

new PlaywrightMCPServer();
