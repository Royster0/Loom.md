import { invoke } from "@tauri-apps/api/core";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { marked } from "marked";

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Application state
interface EditorState {
  currentFile: string | null;
  content: string;
  isDirty: boolean;
}

const state: EditorState = {
  currentFile: null,
  content: "",
  isDirty: false,
};

// DOM elements
const markdownEditor = document.getElementById(
  "markdown-editor"
) as HTMLTextAreaElement;
const markdownPreview = document.getElementById(
  "markdown-preview"
) as HTMLDivElement;
const fileNameDisplay = document.getElementById("file-name") as HTMLSpanElement;
const wordCountDisplay = document.getElementById(
  "word-count"
) as HTMLSpanElement;
const charCountDisplay = document.getElementById(
  "char-count"
) as HTMLSpanElement;
const cursorPositionDisplay = document.getElementById(
  "cursor-position"
) as HTMLSpanElement;
const previewToggle = document.getElementById(
  "preview-toggle"
) as HTMLInputElement;
const editorPane = document.getElementById("editor-pane") as HTMLDivElement;
const previewPane = document.getElementById("preview-pane") as HTMLDivElement;

// Markdown rendering function
function renderMarkdown(markdown: string): void {
  try {
    const html = marked.parse(markdown) as string;
    markdownPreview.innerHTML = html;
  } catch (error) {
    console.error("Error rendering markdown:", error);
    markdownPreview.innerHTML = "<p>Error rendering markdown</p>";
  }
}

// Update statistics
function updateStatistics(text: string): void {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  wordCountDisplay.textContent = `${words} word${words !== 1 ? "s" : ""}`;
  charCountDisplay.textContent = `${chars} character${chars !== 1 ? "s" : ""}`;
}

// Update cursor position
function updateCursorPosition(): void {
  const cursorPos = markdownEditor.selectionStart;
  const textBeforeCursor = markdownEditor.value.substring(0, cursorPos);
  const lines = textBeforeCursor.split("\n");
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;

  cursorPositionDisplay.textContent = `Ln ${line}, Col ${col}`;
}

// Mark document as dirty
function markDirty(): void {
  if (!state.isDirty) {
    state.isDirty = true;
    updateTitle();
  }
}

// Update title display
function updateTitle(): void {
  const fileName = state.currentFile
    ? state.currentFile.split(/[\\/]/).pop() || "Untitled.md"
    : "Untitled.md";
  fileNameDisplay.textContent = state.isDirty ? `${fileName} •` : fileName;
}

// Handle editor input
markdownEditor.addEventListener("input", () => {
  const content = markdownEditor.value;
  state.content = content;
  renderMarkdown(content);
  updateStatistics(content);
  markDirty();
});

// Handle cursor movement
markdownEditor.addEventListener("keyup", updateCursorPosition);
markdownEditor.addEventListener("click", updateCursorPosition);

// Handle preview toggle
previewToggle.addEventListener("change", () => {
  if (previewToggle.checked) {
    previewPane.style.display = "block";
    editorPane.style.width = "50%";
  } else {
    previewPane.style.display = "none";
    editorPane.style.width = "100%";
  }
});

// New file
document.getElementById("new-file")?.addEventListener("click", async () => {
  if (state.isDirty) {
    const shouldSave = await confirm(
      "You have unsaved changes. Do you want to save them?"
    );
    if (shouldSave) {
      await saveFile();
    }
  }

  markdownEditor.value = "";
  state.content = "";
  state.currentFile = null;
  state.isDirty = false;
  renderMarkdown("");
  updateStatistics("");
  updateTitle();
  markdownEditor.focus();
});

// Open file
document.getElementById("open-file")?.addEventListener("click", async () => {
  try {
    const selected = await open({
      multiple: false,
      filters: [
        {
          name: "Markdown",
          extensions: ["md", "markdown", "txt"],
        },
      ],
    });

    if (selected && typeof selected === "string") {
      const content = await readTextFile(selected);
      markdownEditor.value = content;
      state.content = content;
      state.currentFile = selected;
      state.isDirty = false;
      renderMarkdown(content);
      updateStatistics(content);
      updateTitle();
      markdownEditor.focus();
    }
  } catch (error) {
    console.error("Error opening file:", error);
    alert("Failed to open file");
  }
});

// Save file
async function saveFile(): Promise<void> {
  try {
    if (state.currentFile) {
      await writeTextFile(state.currentFile, state.content);
      state.isDirty = false;
      updateTitle();
    } else {
      await saveFileAs();
    }
  } catch (error) {
    console.error("Error saving file:", error);
    alert("Failed to save file");
  }
}

// Save file as
async function saveFileAs(): Promise<void> {
  try {
    const filePath = await save({
      filters: [
        {
          name: "Markdown",
          extensions: ["md"],
        },
      ],
      defaultPath: "Untitled.md",
    });

    if (filePath) {
      await writeTextFile(filePath, state.content);
      state.currentFile = filePath;
      state.isDirty = false;
      updateTitle();
    }
  } catch (error) {
    console.error("Error saving file:", error);
    alert("Failed to save file");
  }
}

document.getElementById("save-file")?.addEventListener("click", saveFile);

// Keyboard shortcuts
document.addEventListener("keydown", async (e) => {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    await saveFile();
  }

  // Ctrl/Cmd + N to new file
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault();
    document.getElementById("new-file")?.click();
  }

  // Ctrl/Cmd + O to open file
  if ((e.ctrlKey || e.metaKey) && e.key === "o") {
    e.preventDefault();
    document.getElementById("open-file")?.click();
  }

  // Tab key handling in editor
  if (e.target === markdownEditor && e.key === "Tab") {
    e.preventDefault();
    const start = markdownEditor.selectionStart;
    const end = markdownEditor.selectionEnd;
    markdownEditor.value =
      markdownEditor.value.substring(0, start) +
      "  " +
      markdownEditor.value.substring(end);
    markdownEditor.selectionStart = markdownEditor.selectionEnd = start + 2;
    markdownEditor.dispatchEvent(new Event("input"));
  }
});

// Before unload - warn about unsaved changes
window.addEventListener("beforeunload", (e) => {
  if (state.isDirty) {
    e.preventDefault();
    e.returnValue = "";
  }
});

// Initialize
renderMarkdown("");
updateStatistics("");
updateCursorPosition();
markdownEditor.focus();
