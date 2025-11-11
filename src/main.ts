/**
 * Markdown Editor - Main Entry Point
 *
 * This is a modular markdown editor built with TypeScript, Tauri, and Rust.
 * The application provides live markdown preview with LaTeX support.
 */

import "./lib/types";
import { state } from "./lib/state";
import { updateStatistics, updateCursorPosition } from "./lib/ui";
import { initEditorEvents } from "./lib/editor";
import { initWindowControls } from "./lib/window-controls";
import { initializeTheme } from "./lib/theme";
import { initializeSettings } from "./lib/settings";
import { initFileTree } from "./lib/file-tree";
import { initWelcomeScreen } from "./lib/welcome-screen";
import { initTabs, openInTab } from "./lib/tabs";
import { readTextFile } from "@tauri-apps/plugin-fs";

/**
 * Check if a file path was passed via URL parameters and open it
 */
async function checkAndOpenFileFromUrl() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get("file");

    if (filePath) {
      console.log("Opening file from URL parameter:", filePath);
      const decodedPath = decodeURIComponent(filePath);

      // Read the file content
      const content = await readTextFile(decodedPath);

      // Open it in a new tab
      await openInTab(decodedPath, content);

      console.log("File opened successfully:", decodedPath);
    }
  } catch (error) {
    console.error("Failed to open file from URL parameter:", error);
    alert(`Failed to open file: ${error}`);
  }
}

/**
 * Initialize the application
 */
async function initialize() {
  // Initialize theme system first (loads saved theme preference)
  await initializeTheme();

  // Initialize settings system
  await initializeSettings();

  // Initialize tab system (this will create the initial tab with current state)
  initTabs();

  // Initialize event handlers
  initEditorEvents();
  initWindowControls();
  initFileTree();
  initWelcomeScreen();

  // Initialize UI
  updateStatistics(state.content);
  updateCursorPosition();

  // Check if a file should be opened from URL parameters
  await checkAndOpenFileFromUrl();

  console.log("Markdown Editor initialized successfully");
}

// Start the application
initialize().catch((error) => {
  console.error("Failed to initialize application:", error);
});
