import { lineNumbers } from "@codemirror/view";

export function formatNumber() {
  return lineNumbers({
    formatNumber: (lineNo, state) => {
      if (lineNo > state.doc.lines) {
        return "0";
      }
      const cursorLine = state.doc.lineAt(
        state.selection.asSingle().ranges[0].to
      ).number;
      if (lineNo === cursorLine) {
        return "0";
      } else {
        return Math.abs(cursorLine - lineNo).toString();
      }
    },
  });
}

export function formatNumberExampleCode() {
  return lineNumbers({
    formatNumber: () => {
      return " ";
    },
  });
}

export function goCodeToString(code: string): string {
  const escaped = code
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
  return `${escaped}`;
}
