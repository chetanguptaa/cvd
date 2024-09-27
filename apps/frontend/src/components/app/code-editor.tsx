import { useEffect, useState } from "react";
import { EditorView, basicSetup } from "codemirror";
import { vim } from "@replit/codemirror-vim";
import { EditorState } from "@codemirror/state";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { motion } from "framer-motion";
import { langs } from "@uiw/codemirror-extensions-langs";
import { formatNumber, formatNumberExampleCode } from "@/lib/code-editor";
import RaceTrack from "../user-profile-avatar/user-profile-avatar";

export default function CodeEditor() {
  const goCode = `/* 
package main
import "fmt"
func main() {
  fmt.Println("Hello, world!")
} 
*/
`;

  const [code, setCode] = useState("");
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    setCode(goCode);
  }, [goCode]);

  return (
    <div className="flex flex-col justify-center items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-[1024px] h-[600px] bg-[#1E1E1E] rounded-[16px] shadow-2xl overflow-hidden relative mt-8"
      >
        <div className="h-8 bg-black flex items-center px-4 rounded-t-lg">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="relative h-[calc(100%-96px)] flex flex-col justify-between">
          <CodeMirror
            value={userCode}
            height="100%"
            theme={vscodeDark}
            extensions={[
              vscodeDark,
              basicSetup,
              langs.go(),
              vim(),
              EditorState.tabSize.of(4),
              EditorView.lineWrapping,
              EditorView.domEventHandlers({
                paste: (event) => {
                  event.preventDefault();
                  return true;
                },
              }),
              formatNumber(),
            ]}
            onChange={(value) => setUserCode(value)}
            className="text-lg bg-black max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-track"
          />
          <CodeMirror
            value={code}
            height="100%"
            theme={vscodeDark}
            extensions={[
              vscodeDark,
              langs.go(),
              EditorView.lineWrapping,
              EditorState.readOnly.of(true),
              EditorView.domEventHandlers({
                copy: (event) => {
                  event.preventDefault();
                  return true;
                },
                paste: (event) => {
                  event.preventDefault();
                  return true;
                },
              }),
              formatNumberExampleCode(),
            ]}
            className="text-lg"
          />
        </div>
      </motion.div>
      <RaceTrack />
      {/* <img src="/race_finish_flag.png" alt="race finish flag" /> */}
    </div>
  );
}
