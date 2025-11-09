# Plugin Architecture

This document outlines how to create plugins for the Markdown Editor.

## Plugin Structure

A plugin is a JavaScript/TypeScript module that exports specific hooks and metadata.

### Basic Plugin Example

```typescript
// example-plugin.ts
export const metadata = {
  name: "Example Plugin",
  version: "1.0.0",
  description: "A simple example plugin",
  author: "Your Name",
  id: "example-plugin",
};

export const activate = (context: PluginContext) => {
  console.log("Plugin activated!");

  // Register a command
  context.commands.register({
    id: "example.hello",
    title: "Say Hello",
    execute: () => {
      context.ui.showNotification("Hello from plugin!");
    },
  });

  // Add a toolbar button
  context.ui.addToolbarButton({
    icon: "star",
    tooltip: "Example Action",
    onClick: () => {
      context.editor.insertText("Plugin text!");
    },
  });
};

export const deactivate = () => {
  console.log("Plugin deactivated!");
};
```

## Plugin API

### PluginContext

The context object passed to plugins provides access to editor functionality:

```typescript
interface PluginContext {
  // Editor operations
  editor: {
    getText(): string;
    setText(text: string): void;
    insertText(text: string): void;
    getCursorPosition(): Position;
    setCursorPosition(position: Position): void;
    getSelection(): Selection;
    replaceSelection(text: string): void;
  };

  // UI operations
  ui: {
    showNotification(
      message: string,
      type?: "info" | "warning" | "error"
    ): void;
    showDialog(options: DialogOptions): Promise<DialogResult>;
    addToolbarButton(button: ToolbarButton): void;
    addMenuItem(menu: MenuItem): void;
    addPanel(panel: Panel): void;
  };

  // Command system
  commands: {
    register(command: Command): void;
    execute(commandId: string, ...args: any[]): void;
  };

  // File operations
  files: {
    getCurrentFile(): string | null;
    readFile(path: string): Promise<string>;
    writeFile(path: string, content: string): Promise<void>;
  };

  // Settings
  settings: {
    get(key: string): any;
    set(key: string, value: any): void;
  };

  // Events
  events: {
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
    emit(event: string, data: any): void;
  };
}
```

## Plugin Types

### 1. Markdown Syntax Extensions

Add custom markdown syntax:

```typescript
export const activate = (context: PluginContext) => {
  context.markdown.addSyntax({
    name: "emoji",
    pattern: /:([a-z_]+):/g,
    render: (match, emojiName) => {
      return `<span class="emoji">${getEmoji(emojiName)}</span>`;
    },
  });
};
```

### 2. Export Plugins

Add new export formats:

```typescript
export const activate = (context: PluginContext) => {
  context.export.register({
    name: "PDF",
    extension: "pdf",
    mimeType: "application/pdf",
    export: async (markdown: string) => {
      // Convert markdown to PDF
      return pdfBuffer;
    },
  });
};
```

### 3. Integration Plugins

Connect to external services:

```typescript
export const activate = (context: PluginContext) => {
  context.commands.register({
    id: "github.publish",
    title: "Publish to GitHub Gist",
    execute: async () => {
      const content = context.editor.getText();
      await publishToGist(content);
      context.ui.showNotification("Published to GitHub!");
    },
  });
};
```

### 4. UI Enhancement Plugins

Add custom UI components:

```typescript
export const activate = (context: PluginContext) => {
  context.ui.addPanel({
    id: "toc",
    title: "Table of Contents",
    position: "right",
    render: (container) => {
      const toc = generateTableOfContents(context.editor.getText());
      container.innerHTML = toc;
    },
  });
};
```

## Plugin Events

Plugins can listen to editor events:

```typescript
export const activate = (context: PluginContext) => {
  // When content changes
  context.events.on("content-changed", (content) => {
    console.log("Content updated:", content);
  });

  // When file is saved
  context.events.on("file-saved", (filePath) => {
    console.log("File saved:", filePath);
  });

  // When file is opened
  context.events.on("file-opened", (filePath) => {
    console.log("File opened:", filePath);
  });

  // Custom events
  context.events.on("custom-event", (data) => {
    // Handle custom event
  });
};
```

## Plugin Configuration

Plugins can define settings:

```typescript
export const settings = {
  apiKey: {
    type: "string",
    default: "",
    description: "Your API key for the service",
  },
  enabled: {
    type: "boolean",
    default: true,
    description: "Enable this feature",
  },
  maxItems: {
    type: "number",
    default: 10,
    description: "Maximum number of items",
  },
};

export const activate = (context: PluginContext) => {
  const apiKey = context.settings.get("apiKey");
  // Use the API key
};
```

## Plugin Distribution

### Package Structure

```
my-plugin/
├── package.json
├── plugin.json
├── src/
│   └── index.ts
├── dist/
│   └── index.js
└── README.md
```

### plugin.json

```json
{
  "name": "my-plugin",
  "displayName": "My Awesome Plugin",
  "version": "1.0.0",
  "description": "Does something awesome",
  "author": "Your Name",
  "license": "MIT",
  "main": "dist/index.js",
  "engines": {
    "markdown-editor": "^1.0.0"
  },
  "categories": ["editor", "productivity"],
  "keywords": ["markdown", "plugin"],
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-plugin"
  }
}
```

## Installation

Users can install plugins in several ways:

1. **From Plugin Marketplace** (future):

   ```
   Settings > Plugins > Browse > Install
   ```

2. **From File**:

   ```
   Settings > Plugins > Install from file > Select .plugin file
   ```

3. **Manual Installation**:
   ```
   Copy plugin folder to: ~/.markdown-editor/plugins/
   Restart application
   ```

## Best Practices

1. **Error Handling**: Always handle errors gracefully
2. **Performance**: Don't block the main thread
3. **Cleanup**: Properly clean up resources in `deactivate()`
4. **Documentation**: Provide clear README and examples
5. **Testing**: Test plugin with different scenarios
6. **Versioning**: Use semantic versioning
7. **Dependencies**: Minimize external dependencies
8. **Permissions**: Request only necessary permissions

## Example Plugins

### Word Counter Plugin

```typescript
export const metadata = {
  name: "Advanced Word Counter",
  version: "1.0.0",
  id: "word-counter",
};

export const activate = (context: PluginContext) => {
  let wordCount = 0;

  const updateCount = () => {
    const text = context.editor.getText();
    wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    context.ui.updateStatusBar("word-count", `${wordCount} words`);
  };

  context.events.on("content-changed", updateCount);
  updateCount();
};
```

### Auto-save Plugin

```typescript
export const metadata = {
  name: "Auto-save",
  version: "1.0.0",
  id: "auto-save",
};

export const activate = (context: PluginContext) => {
  const interval = setInterval(() => {
    const currentFile = context.files.getCurrentFile();
    if (currentFile && context.editor.isDirty()) {
      context.commands.execute("file.save");
      context.ui.showNotification("Auto-saved!", "info");
    }
  }, 60000); // Every minute

  return () => clearInterval(interval);
};
```

## Security Considerations

- Plugins run in a sandboxed environment
- File system access is restricted
- Network requests require user permission
- Plugins cannot access other plugins directly
- All API calls are logged for security audit

## Future Enhancements

- WebAssembly plugin support
- Python/Lua scripting support
- Plugin marketplace with ratings
- Automated testing framework
- Hot reload during development
- Plugin dependencies management
