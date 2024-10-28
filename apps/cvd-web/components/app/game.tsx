"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { EditorView, basicSetup } from "codemirror";
import { vim } from "@replit/codemirror-vim";
import { EditorState } from "@codemirror/state";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { formatNumber } from "@/lib/code-editor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Game(props: {
  user?: {
    id: string;
    name: string;
    createdAt: Date;
  };
  gameId: string;
  token?: string;
}) {
  const WS_URL = `ws://localhost:8080`;
  const router = useRouter();
  const [isServerReady, setIsServerReady] = useState(false);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    queryParams: {
      token: props.token || "",
    },
  });

  useEffect(() => {
    // @ts-expect-error TODO -> change the type from unknown
    if (lastJsonMessage && lastJsonMessage.type === "SERVER_READY") {
      setIsServerReady(true);
    }
    if (lastJsonMessage) {
      const message = lastJsonMessage as {
        e?: string;
      };
      if (message.e) {
        router.push("/game/" + props.gameId + "/lobby");
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (isServerReady && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "SUBSCRIBE",
        payload: {
          gameId: props.gameId,
        },
      });
    }
  }, [isServerReady, readyState, sendJsonMessage, props.gameId]);

  useEffect(() => {
    return () => {
      sendJsonMessage({
        type: "LEAVE_GAME",
        payload: {
          gameId: props.gameId,
        },
      });
    };
  }, [props.gameId, readyState, sendJsonMessage]);

  useEffect(() => {
    if (!props.user || !props.token) {
      router.push("/");
    }
  }, [props.token, props.user, router]);

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
    <div className="w-[95vw] h-[90vh] overflow-hidden flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={25}></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={15}></ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={25}>
              <div className="flex flex-col h-full justify-center items-center overflow-hidden">
                <div className="w-full max-w-[1024px] h-full bg-[#1E1E1E]  overflow-hidden relative">
                  <div className="h-[calc(100%-2rem)] flex flex-col">
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
                      className="text-lg bg-black overflow-hidden"
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={15}>
              <div className="flex flex-col h-full justify-center items-center overflow-hidden">
                <div className="w-full max-w-[1024px] h-full bg-[#1E1E1E]  overflow-hidden relative">
                  <div className="h-[calc(100%-2rem)] flex flex-col">
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
                        formatNumber(),
                      ]}
                      className="text-lg"
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
