# Theme Architecture

This document explains how to create custom themes for the Markdown Editor.

## Theme Structure

Themes are JSON files that define colors, fonts, and styling for the editor.

### Basic Theme Example

```json
{
  "name": "Ocean Blue",
  "version": "1.0.0",
  "author": "Your Name",
  "type": "dark",
  "colors": {
    "bg-primary": "#0d1117",
    "bg-secondary": "#161b22",
    "bg-tertiary": "#21262d",
    "text-primary": "#c9d1d9",
    "text-secondary": "#8b949e",
    "border-color": "#30363d",
    "accent-color": "#58a6ff",
    "accent-hover": "#79c0ff",
    "success-color": "#3fb950",
    "warning-color": "#d29922",
    "error-color": "#f85149"
  },
  "editor": {
    "fontFamily": "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    "fontSize": "15px",
    "lineHeight": "1.6",
    "cursorColor": "#58a6ff",
    "selectionBackground": "#264f78"
  },
  "markdown": {
    "headingColor": "#58a6ff",
    "linkColor": "#79c0ff",
    "codeBackground": "#161b22",
    "quoteColor": "#8b949e",
    "quoteBorder": "#3b434b"
  }
}
```

## Theme Properties

### Core Colors

```typescript
interface ThemeColors {
  // Background colors
  "bg-primary": string; // Main background
  "bg-secondary": string; // Editor background
  "bg-tertiary": string; // Hover/active states

  // Text colors
  "text-primary": string; // Main text
  "text-secondary": string; // Secondary text

  // UI colors
  "border-color": string; // Borders
  "accent-color": string; // Primary accent
  "accent-hover": string; // Accent hover state

  // Status colors
  "success-color": string; // Success messages
  "warning-color": string; // Warnings
  "error-color": string; // Errors
}
```

### Editor Styling

```typescript
interface EditorStyle {
  fontFamily: string; // Editor font
  fontSize: string; // Font size (px, em, rem)
  lineHeight: string; // Line height
  cursorColor: string; // Cursor color
  selectionBackground: string; // Text selection
  tabSize: number; // Tab size in spaces
}
```

### Markdown Styling

```typescript
interface MarkdownStyle {
  headingColor: string; // Heading text color
  linkColor: string; // Link color
  codeBackground: string; // Inline code background
  quoteColor: string; // Blockquote text
  quoteBorder: string; // Blockquote border
  tableHeaderBg: string; // Table header background
  tableBorderColor: string; // Table borders
}
```

## Complete Theme Template

```json
{
  "name": "Theme Name",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A beautiful theme for markdown editing",
  "type": "dark",
  "colors": {
    "bg-primary": "#1e1e1e",
    "bg-secondary": "#252526",
    "bg-tertiary": "#2d2d30",
    "text-primary": "#d4d4d4",
    "text-secondary": "#858585",
    "border-color": "#3e3e42",
    "accent-color": "#007acc",
    "accent-hover": "#0098ff",
    "success-color": "#4ec9b0",
    "warning-color": "#dcdcaa",
    "error-color": "#f48771"
  },
  "editor": {
    "fontFamily": "'Fira Code', 'Consolas', monospace",
    "fontSize": "15px",
    "lineHeight": "1.6",
    "cursorColor": "#007acc",
    "selectionBackground": "#264f78",
    "tabSize": 2
  },
  "markdown": {
    "headingColor": "#4ec9b0",
    "linkColor": "#3794ff",
    "codeBackground": "#1e1e1e",
    "quoteColor": "#858585",
    "quoteBorder": "#3e3e42",
    "tableHeaderBg": "#2d2d30",
    "tableBorderColor": "#3e3e42"
  },
  "syntax": {
    "comment": "#6a9955",
    "keyword": "#569cd6",
    "string": "#ce9178",
    "number": "#b5cea8",
    "function": "#dcdcaa",
    "variable": "#9cdcfe",
    "type": "#4ec9b0",
    "operator": "#d4d4d4"
  }
}
```

## Built-in Themes

### Dark Theme (Default)

The default dark theme inspired by VS Code Dark+.

### Light Theme

```json
{
  "name": "Light",
  "type": "light",
  "colors": {
    "bg-primary": "#ffffff",
    "bg-secondary": "#f5f5f5",
    "bg-tertiary": "#e0e0e0",
    "text-primary": "#1e1e1e",
    "text-secondary": "#666666",
    "border-color": "#d4d4d4",
    "accent-color": "#0066cc",
    "accent-hover": "#0052a3"
  }
}
```

### Dracula Theme

```json
{
  "name": "Dracula",
  "type": "dark",
  "colors": {
    "bg-primary": "#282a36",
    "bg-secondary": "#1e1f29",
    "bg-tertiary": "#343746",
    "text-primary": "#f8f8f2",
    "text-secondary": "#6272a4",
    "border-color": "#44475a",
    "accent-color": "#bd93f9",
    "accent-hover": "#d4bfff"
  }
}
```

### Solarized Light

```json
{
  "name": "Solarized Light",
  "type": "light",
  "colors": {
    "bg-primary": "#fdf6e3",
    "bg-secondary": "#eee8d5",
    "bg-tertiary": "#d3cbb7",
    "text-primary": "#657b83",
    "text-secondary": "#93a1a1",
    "border-color": "#d3cbb7",
    "accent-color": "#268bd2",
    "accent-hover": "#2aa198"
  }
}
```

## Creating a Theme

### Step 1: Start with Template

Copy the complete theme template and modify colors.

### Step 2: Test Your Theme

1. Save theme as `my-theme.json`
2. Load in editor: Settings > Themes > Load Theme
3. Test with various markdown documents
4. Adjust colors as needed

### Step 3: Add Syntax Highlighting

Define colors for code syntax highlighting:

```json
{
  "syntax": {
    "comment": "#6a9955",
    "keyword": "#569cd6",
    "string": "#ce9178",
    "number": "#b5cea8",
    "function": "#dcdcaa",
    "variable": "#9cdcfe",
    "type": "#4ec9b0",
    "operator": "#d4d4d4",
    "punctuation": "#808080",
    "tag": "#4ec9b0",
    "attribute": "#9cdcfe",
    "constant": "#4fc1ff"
  }
}
```

### Step 4: Preview and Refine

Use the theme preview feature to see changes in real-time.

## Theme Variables in CSS

The application uses CSS custom properties for theming:

```css
:root {
  --bg-primary: #1e1e1e;
  --bg-secondary: #252526;
  --bg-tertiary: #2d2d30;
  --text-primary: #d4d4d4;
  --text-secondary: #858585;
  --border-color: #3e3e42;
  --accent-color: #007acc;
  --accent-hover: #0098ff;
}
```

These variables are automatically updated when a theme is applied.

## Advanced Theming

### Responsive Themes

Themes can define different colors for different screen sizes:

```json
{
  "responsive": {
    "mobile": {
      "fontSize": "14px",
      "lineHeight": "1.5"
    },
    "tablet": {
      "fontSize": "15px",
      "lineHeight": "1.6"
    },
    "desktop": {
      "fontSize": "16px",
      "lineHeight": "1.6"
    }
  }
}
```

### Accessibility

Ensure themes meet accessibility standards:

- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Test with color blindness simulators

### Dynamic Themes

Themes can change based on time of day:

```json
{
  "dynamic": {
    "enabled": true,
    "sunrise": "06:00",
    "sunset": "18:00",
    "dayTheme": "light",
    "nightTheme": "dark"
  }
}
```

## Theme Distribution

### Package Structure

```
my-theme/
├── theme.json
├── preview.png
└── README.md
```

### Preview Image

Create a preview image showing:

- Editor with sample markdown
- Preview pane
- UI elements
- Color palette

Recommended size: 1280x720px

### README Template

```markdown
# Theme Name

A beautiful theme for Markdown Editor.

## Preview

![Preview](preview.png)

## Installation

1. Download `theme.json`
2. Open Markdown Editor
3. Go to Settings > Themes > Import Theme
4. Select the downloaded file

## Colors

- Background: #1e1e1e
- Text: #d4d4d4
- Accent: #007acc

## License

MIT
```

## Theme Marketplace (Future)

Planned features:

- Browse and search themes
- One-click installation
- Ratings and reviews
- Author profiles
- Theme updates
- Collections and categories

## Best Practices

1. **Contrast**: Ensure good readability
2. **Consistency**: Use color palette consistently
3. **Testing**: Test with real content
4. **Accessibility**: Follow WCAG guidelines
5. **Documentation**: Provide clear descriptions
6. **Preview**: Include quality preview images
7. **Versioning**: Use semantic versioning
8. **License**: Include proper licensing

## Color Tools

Recommended tools for theme creation:

- [Coolors](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG compliance
- [Paletton](https://paletton.com) - Color scheme designer

## Popular Theme Styles

### Nord

```json
{
  "name": "Nord",
  "colors": {
    "bg-primary": "#2e3440",
    "bg-secondary": "#3b4252",
    "text-primary": "#eceff4",
    "accent-color": "#88c0d0"
  }
}
```

### Monokai

```json
{
  "name": "Monokai",
  "colors": {
    "bg-primary": "#272822",
    "bg-secondary": "#1e1f1c",
    "text-primary": "#f8f8f2",
    "accent-color": "#a6e22e"
  }
}
```

### One Dark

```json
{
  "name": "One Dark",
  "colors": {
    "bg-primary": "#282c34",
    "bg-secondary": "#21252b",
    "text-primary": "#abb2bf",
    "accent-color": "#61afef"
  }
}
```

## Contributing Themes

To contribute your theme:

1. Create theme JSON file
2. Test thoroughly
3. Create preview image
4. Write documentation
5. Submit pull request to theme repository
6. Share on community forums

## Theme API (Future)

Programmatic theme creation:

```typescript
import { Theme } from "@markdown-editor/themes";

const myTheme = new Theme({
  name: "My Theme",
  type: "dark",
  colors: {
    primary: "#1e1e1e",
    accent: "#007acc",
  },
});

myTheme.apply();
```
