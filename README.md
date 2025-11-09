# Markdown Editor

A modern, scalable markdown editor built with Rust + Tauri and TypeScript, designed to be extensible with plugins and custom themes.

## Features

### Current Features

- ✅ **Live Preview**: Real-time markdown rendering as you type
- ✅ **Split View**: Side-by-side editor and preview panes
- ✅ **File Operations**: Open, save, and create markdown files
- ✅ **Keyboard Shortcuts**:
  - `Ctrl/Cmd + S`: Save file
  - `Ctrl/Cmd + N`: New file
  - `Ctrl/Cmd + O`: Open file
  - `Tab`: Insert spaces in editor
- ✅ **Statistics**: Live word count, character count, and cursor position
- ✅ **Modern UI**: Clean, dark-themed interface inspired by modern code editors
- ✅ **Toggle Preview**: Show/hide preview pane as needed
- ✅ **Unsaved Changes Warning**: Prompts before closing with unsaved work

### Planned Features

- 🔄 **Plugin System**: Load and manage custom plugins (architecture ready)
- 🔄 **Custom Themes**: Support for user-created themes (architecture ready)
- 🔄 **Syntax Highlighting**: Enhanced code block rendering
- 🔄 **Export Options**: PDF, HTML, and other formats
- 🔄 **Search & Replace**: Find and replace text across documents
- 🔄 **Multi-tab Support**: Work on multiple documents simultaneously
- 🔄 **File Tree**: Navigate through directories
- 🔄 **Auto-save**: Automatic backup of work
- 🔄 **Git Integration**: Version control support

## Tech Stack

### Frontend

- **TypeScript**: Type-safe JavaScript for robust development
- **Marked.js**: Fast markdown parsing and rendering
- **Vanilla JS**: No framework overhead, pure performance
- **CSS3**: Modern styling with CSS custom properties

### Backend

- **Rust**: High-performance, memory-safe backend
- **Tauri 2.0**: Modern desktop application framework
- **Tauri Plugins**:
  - `tauri-plugin-fs`: File system operations
  - `tauri-plugin-dialog`: Native file dialogs
  - `tauri-plugin-opener`: Open external links

## Architecture

### Plugin System (Ready for Implementation)

The application is architected with a plugin system in mind. The Rust backend includes placeholder structures:

```rust
pub struct PluginMetadata {
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
}
```

**To implement plugins:**

1. Create a `plugins/` directory in the app's data folder
2. Define plugin API interface in TypeScript
3. Implement plugin loader in Rust backend
4. Add plugin hooks in the editor lifecycle
5. Create plugin marketplace/registry

**Plugin capabilities could include:**

- Custom markdown syntax extensions
- Editor commands and shortcuts
- UI panel extensions
- File format converters
- Integration with external services
- Custom preview renderers

### Theme System (Ready for Implementation)

Theme support is built into the architecture with CSS custom properties:

```rust
pub struct ThemeMetadata {
    pub name: String,
    pub colors: ThemeColors,
}

pub struct ThemeColors {
    pub bg_primary: String,
    pub bg_secondary: String,
    pub text_primary: String,
    pub accent_color: String,
}
```

**To implement themes:**

1. Create a `themes/` directory structure
2. Define theme schema (JSON/TOML)
3. Implement theme loader and switcher
4. Add theme preview in settings
5. Support both light and dark themes

**CSS architecture for themes:**
All colors use CSS custom properties (`--bg-primary`, `--text-primary`, etc.), making theme switching straightforward.

### Project Structure

```
markdown-editor/
├── src/                      # Frontend TypeScript code
│   ├── main.ts              # Main application logic
│   └── styles.css           # Application styles
├── src-tauri/               # Rust backend
│   ├── src/
│   │   ├── lib.rs          # Main library with commands
│   │   └── main.rs         # Application entry point
│   ├── capabilities/        # Tauri permissions
│   └── Cargo.toml          # Rust dependencies
├── index.html              # Application HTML
└── package.json            # Node.js dependencies
```

### State Management

The editor uses a simple state management pattern:

```typescript
interface EditorState {
  currentFile: string | null;
  content: string;
  isDirty: boolean;
}
```

This can be extended to support:

- Multiple document tabs
- Editor settings/preferences
- Plugin state
- Theme configuration

## Development

### Prerequisites

- **Node.js** (v18 or higher)
- **Rust** (latest stable)
- **System dependencies**:
  - Linux: `webkit2gtk`, `libgtk-3-dev`, `libsoup-3.0`
  - macOS: Xcode command line tools
  - Windows: WebView2 (usually pre-installed)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd markdown-editor

# Install dependencies
npm install

# Run in development mode
npm run tauri dev
```

### Building

```bash
# Build for production
npm run tauri build
```

The compiled application will be in `src-tauri/target/release/`.

## Open Source & Extensibility

### Open Source Strategy

This project is designed to be open-sourced with:

- **Permissive License**: MIT or Apache 2.0 (choose based on your preference)
- **Clear Contributing Guidelines**: CONTRIBUTING.md with coding standards
- **Issue Templates**: Bug reports and feature requests
- **Documentation**: Comprehensive API docs for plugin developers
- **Community**: Discord/forum for discussions

### Extension Points

The architecture provides several extension points:

1. **Editor Commands**: Add custom toolbar buttons and commands
2. **Markdown Processors**: Custom parsing and rendering
3. **File Handlers**: Support for additional file formats
4. **UI Components**: Inject custom panels and widgets
5. **Keyboard Shortcuts**: Register custom key bindings
6. **Event System**: Hook into editor lifecycle events

### Contributing Areas

Future contributors can focus on:

- Creating and sharing plugins
- Designing themes
- Improving markdown rendering
- Adding export formats
- Building integrations (GitHub, Dropbox, etc.)
- Enhancing accessibility
- Performance optimizations
- Documentation and tutorials

## Markdown Support

### Supported Syntax

- **Headings**: `# H1` through `###### H6`
- **Emphasis**: `*italic*`, `**bold**`, `***bold italic***`
- **Lists**: Unordered (`-`, `*`) and ordered (`1.`)
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Code**: Inline `` `code` `` and fenced ` ```code blocks``` `
- **Quotes**: `> blockquote`
- **Tables**: GitHub Flavored Markdown tables
- **Task Lists**: `- [ ]` and `- [x]`
- **Horizontal Rules**: `---` or `***`
- **HTML**: Raw HTML is supported

### GitHub Flavored Markdown (GFM)

The editor uses GFM mode, supporting:

- Autolinked URLs
- Strikethrough: `~~text~~`
- Tables with alignment
- Task lists
- Line breaks without double spaces

## Performance

- **Instant Startup**: Tauri apps start in milliseconds
- **Low Memory**: Rust backend uses minimal resources
- **Efficient Rendering**: Incremental markdown parsing
- **Native Feel**: True native performance, not Electron

## Security

- **Sandboxed**: Tauri security model restricts dangerous operations
- **Permissions**: Explicit file system access only
- **No Remote Code**: All code is local and verified
- **Auto-updates**: Can be configured for secure updates

## Roadmap

### Version 1.0 (Current Foundation)

- [x] Basic editor and preview
- [x] File operations
- [x] Keyboard shortcuts
- [x] Statistics

### Version 1.1

- [ ] Plugin system implementation
- [ ] Theme system implementation
- [ ] Settings panel
- [ ] Export to PDF/HTML

### Version 1.2

- [ ] Multi-tab support
- [ ] File tree/navigator
- [ ] Search and replace
- [ ] Auto-save

### Version 2.0

- [ ] Collaborative editing
- [ ] Cloud sync
- [ ] Mobile apps
- [ ] Plugin marketplace

## License

This project will be released under an open-source license (MIT or Apache 2.0).

## Credits

Built with:

- [Tauri](https://tauri.app/) - Desktop application framework
- [Marked](https://marked.js.org/) - Markdown parser
- [Rust](https://www.rust-lang.org/) - Backend language
- [TypeScript](https://www.typescriptlang.org/) - Frontend language

---

**Note**: This is a foundation release. The plugin and theme systems are architecturally ready but not yet implemented. Contributions welcome!
