import { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// @ts-expect-error // TODO to add a type
import * as MonacoVim from "monaco-vim";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export default function Component() {
  const editorRef = useRef(null);
  const vimStatusBarRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value:
          "// Your code here\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('Alice'));\n",
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      });

      const vimMode = MonacoVim.initVimMode(editor, vimStatusBarRef.current);

      return () => {
        editor.dispose();
        vimMode.dispose();
      };
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Monaco Editor with Vim Mode</h2>
      <div
        ref={editorRef}
        className="border border-gray-300 w-full rounded-md shadow-sm"
        style={{ height: "400px" }}
        aria-label="Code editor with Vim mode enabled"
        data-gramm="false"
      />
      <div ref={vimStatusBarRef} className="vim-status-bar" />
    </div>
  );
}
