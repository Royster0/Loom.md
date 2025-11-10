# Contributing to Markdown Editor

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and considerate of others. We aim to maintain a welcoming community for all contributors.

## Getting Started

### Prerequisites

- Node.js 18+
- Rust (latest stable)
- Git
- Code editor (VS Code recommended)

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/markdown-editor.git
cd markdown-editor

# Install dependencies
npm install

# Run in development mode
npm run tauri dev
```

## Project Structure

```
markdown-editor/
├── src/                 # Frontend TypeScript
│   ├── main.ts         # Application logic
│   └── styles.css      # Styles
├── src-tauri/          # Rust backend
│   └── src/
│       └── lib.rs      # Tauri commands
├── docs/               # Documentation
└── tests/              # Tests (future)
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests

### 2. Make Changes

Follow the coding standards outlined below.

### 3. Test Your Changes

```bash
# Run the app
npm run tauri dev

# Build for production
npm run tauri build
```

### 4. Commit

Use clear, descriptive commit messages:

```bash
git commit -m "Add: Live word count feature"
git commit -m "Fix: Preview toggle not working on mobile"
git commit -m "Docs: Update plugin architecture guide"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create a pull request with:

- Clear description of changes
- Screenshots/videos if UI changes
- Link to related issues
- Testing steps

## Coding Standards

### TypeScript

```typescript
// Use interfaces for type definitions
interface EditorState {
  currentFile: string | null;
  content: string;
  isDirty: boolean;
}

// Use arrow functions for handlers
const handleClick = () => {
  // Handler logic
};

// Use async/await, not promises
async function saveFile(): Promise<void> {
  try {
    await writeTextFile(path, content);
  } catch (error) {
    console.error("Save failed:", error);
  }
}

// Use descriptive variable names
const markdownContent = editor.value; // Good
const mc = editor.value; // Bad
```

### Rust

```rust
// Use standard Rust formatting (rustfmt)
// Run: cargo fmt

// Document public APIs
/// Gets the current application version
#[tauri::command]
fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

// Use descriptive names
pub struct PluginMetadata {
    pub name: String,
    pub version: String,
}
```

### CSS

```css
/* Use CSS custom properties for theming */
:root {
  --bg-primary: #1e1e1e;
  --text-primary: #d4d4d4;
}

/* Use BEM naming for complex components */
.toolbar__button--active {
  background: var(--accent-color);
}

/* Group related properties */
.editor {
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Sizing */
  width: 100%;
  height: 100%;

  /* Colors */
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

## Areas for Contribution

### High Priority

- Plugin system implementation
- Theme system implementation
- Export to PDF/HTML
- Search and replace
- Auto-save functionality

### Medium Priority

- Multi-tab support
- File tree navigator
- Syntax highlighting improvements
- Settings panel
- Keyboard shortcut customization

### Low Priority

- Additional themes
- Example plugins
- Documentation improvements
- Performance optimizations
- UI enhancements

## Creating Plugins

See [Plugin Architecture](docs/PLUGIN_ARCHITECTURE.md) for detailed guide.

Quick start:

1. Create plugin structure
2. Implement required exports
3. Test thoroughly
4. Document usage
5. Submit to plugin repository

## Creating Themes

See [Theme Architecture](docs/THEME_ARCHITECTURE.md) for detailed guide.

Quick start:

1. Copy theme template
2. Modify colors
3. Test accessibility
4. Create preview image
5. Submit to theme repository

## Testing

Currently, testing is manual. We plan to add automated tests.

### Manual Testing Checklist

- [ ] Create new file
- [ ] Open existing file
- [ ] Save file
- [ ] Save as new file
- [ ] Edit and see live preview
- [ ] Toggle preview pane
- [ ] Test keyboard shortcuts
- [ ] Check word/character count
- [ ] Test on different markdown content
- [ ] Check performance with large files

### Future: Automated Tests

```typescript
// Example test structure (not yet implemented)
describe("Editor", () => {
  it("should update preview on input", () => {
    editor.value = "# Hello";
    expect(preview.innerHTML).toContain("<h1>Hello</h1>");
  });
});
```

## Documentation

### Code Comments

```typescript
// Good: Explain WHY, not what
// Debounce to avoid excessive re-renders
const debouncedUpdate = debounce(updatePreview, 300);

// Bad: Stating the obvious
// Set the value
editor.value = text;
```

### Documentation Files

Update relevant docs when changing:

- README.md - For feature additions
- PLUGIN_ARCHITECTURE.md - For plugin API changes
- THEME_ARCHITECTURE.md - For theme changes
- CONTRIBUTING.md - For process changes

## Performance Guidelines

### Frontend

- Debounce expensive operations
- Use requestAnimationFrame for animations
- Minimize DOM manipulations
- Lazy load non-critical features

### Backend

- Keep commands fast (<100ms)
- Use async for I/O operations
- Minimize memory allocations
- Profile with Rust tools

## Accessibility

Ensure contributions meet accessibility standards:

- Use semantic HTML
- Provide ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios
- Support high contrast mode

## Security

- Never execute arbitrary code
- Validate all user input
- Use Tauri's security features
- Follow Rust safety practices
- Review dependencies regularly

## Pull Request Process

1. **Create PR**

   - Use PR template
   - Link related issues
   - Add clear description

2. **Review Process**

   - Address review comments
   - Keep PR focused and small
   - Update based on feedback

3. **Merge Requirements**
   - All discussions resolved
   - Passes all checks
   - Approved by maintainer
   - Up to date with main branch

## Release Process

### Versioning

We use Semantic Versioning (SemVer):

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist

- [ ] Update version in Cargo.toml
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Create release notes
- [ ] Tag release in git
- [ ] Build and test release
- [ ] Publish release

## Getting Help

- **Issues**: For bug reports and feature requests
- **Discussions**: For questions and ideas
- **Discord**: For real-time chat (coming soon)
- **Email**: contact@example.com

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in about dialog
- Given appropriate GitHub roles

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT/Apache 2.0).

## Questions?

Don't hesitate to ask! Open an issue with the "question" label, and we'll help you get started.

---

Thank you for contributing to making Markdown Editor better! 🎉
