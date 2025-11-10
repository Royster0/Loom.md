# Loom.md (in development)

A lightweight, flexible, minimal, and forever open-source knowledge base for all your thoughts

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

## Security

- **Sandboxed**: Tauri security model restricts dangerous operations
- **Permissions**: Explicit file system access only
- **No Remote Code**: All code is local and verified
- **Auto-updates**: Can be configured for secure updates

## Roadmap

### Version 1.0 (Current Foundation)

- [x] File tree/navigation
- [x] Settings panel
- [ ] Plugin system implementation
- [x] Theme system implementation
- [ ] Export to PDF/HTML
- [ ] Multi-tab support
- [ ] Search and replace
- [ ] Auto-save
- [ ] Collaborative editing
- [ ] Cloud sync
- [ ] Plugin marketplace

## License

This project will be released under an open-source license (MIT or Apache 2.0).

## Credits

Built with:

[Tauri](https://tauri.app/) - Desktop application framework

---

**Note**: This is a foundation release. The plugin and theme systems are architecturally ready but not yet implemented. Contributions welcome!
