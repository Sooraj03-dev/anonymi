"use client";
import { useState, useRef, useEffect } from "react";

const USERS = [
  { id: 1, name: "phantom_42", avatar: "P", status: "online", lastMsg: "hey, you there?", time: "2m", unread: 2, color: "#a855f7" },
  { id: 2, name: "ghost_wolf", avatar: "G", status: "online", lastMsg: "that post was deep 🖤", time: "15m", unread: 0, color: "#22d3ee" },
  { id: 3, name: "void_echo", avatar: "V", status: "away", lastMsg: "lmk when you're free", time: "1h", unread: 1, color: "#84cc16" },
  { id: 4, name: "neon_shade", avatar: "N", status: "offline", lastMsg: "see you on the other side", time: "3h", unread: 0, color: "#f97316" },
  { id: 5, name: "anon_spark", avatar: "A", status: "online", lastMsg: "🔥🔥🔥", time: "5h", unread: 0, color: "#ec4899" },
];

const MESSAGES: Record<number, { id: number; from: "me" | "them"; text: string; time: string }[]> = {
  1: [
    { id: 1, from: "them", text: "hey, you there?", time: "10:32" },
    { id: 2, from: "me", text: "yeah, what's up?", time: "10:33" },
    { id: 3, from: "them", text: "just wanted to say your post about identity hit different 🖤", time: "10:33" },
    { id: 4, from: "me", text: "thanks, means a lot when you're putting your raw thoughts out there anonymously", time: "10:35" },
    { id: 5, from: "them", text: "hey, you there?", time: "10:41" },
  ],
  2: [
    { id: 1, from: "them", text: "that post was deep 🖤", time: "9:50" },
    { id: 2, from: "me", text: "which one?", time: "9:52" },
    { id: 3, from: "them", text: "the one about feeling invisible in a crowd", time: "9:53" },
  ],
  3: [
    { id: 1, from: "them", text: "lmk when you're free", time: "Yesterday" },
  ],
  4: [
    { id: 1, from: "them", text: "see you on the other side", time: "Mon" },
  ],
  5: [
    { id: 1, from: "them", text: "🔥🔥🔥", time: "Mon" },
    { id: 2, from: "me", text: "😂", time: "Mon" },
  ],
};

type CallState = "idle" | "calling" | "video" | "voice";

export default function PersonalSpaceChat() {
  const [activeUser, setActiveUser] = useState(USERS[0]);
  const [messages, setMessages] = useState(MESSAGES[1]);
  const [input, setInput] = useState("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectUser = (u: typeof USERS[0]) => {
    setActiveUser(u);
    setMessages(MESSAGES[u.id] || []);
    setCallState("idle");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "me", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  const startCall = (type: "video" | "voice") => {
    setCallState("calling");
    setTimeout(() => setCallState(type), 2000);
  };

  const endCall = () => setCallState("idle");

  const statusColor = (s: string) => s === "online" ? "#84cc16" : s === "away" ? "#f59e0b" : "#4b5563";

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#080810", fontFamily: "'DM Sans', sans-serif",
      color: "#e2e8f0", overflow: "hidden", position: "relative"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2d2d4e; border-radius: 4px; }
        input:focus { outline: none; }
        textarea:focus { outline: none; }
        .user-row:hover { background: rgba(168,85,247,0.08) !important; }
        .msg-input:focus { border-color: rgba(168,85,247,0.5) !important; }
        .icon-btn:hover { background: rgba(255,255,255,0.08) !important; transform: scale(1.05); }
        .send-btn:hover { background: #9333ea !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes ring { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarOpen ? "300px" : "0", minWidth: sidebarOpen ? "300px" : "0",
        borderRight: "1px solid #1a1a2e", display: "flex", flexDirection: "column",
        overflow: "hidden", transition: "all 0.3s ease", background: "#0a0a16"
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1a1a2e" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 800, color: "#a855f7" }}>
              Anonymi
            </div>
            <div style={{ fontSize: "11px", background: "rgba(168,85,247,0.15)", color: "#a855f7", padding: "2px 8px", borderRadius: "20px", border: "1px solid rgba(168,85,247,0.3)" }}>
              Personal Space
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <input placeholder="Search chats..." style={{
              width: "100%", background: "#12122a", border: "1px solid #1e1e3a", borderRadius: "10px",
              padding: "8px 12px 8px 32px", color: "#e2e8f0", fontSize: "13px"
            }} />
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", opacity: 0.4, fontSize: "13px" }}>⌕</span>
          </div>
        </div>

        {/* User List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {USERS.map(u => (
            <div key={u.id} className="user-row" onClick={() => selectUser(u)} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px",
              cursor: "pointer", transition: "background 0.2s",
              background: activeUser.id === u.id ? "rgba(168,85,247,0.1)" : "transparent",
              borderLeft: activeUser.id === u.id ? "2px solid #a855f7" : "2px solid transparent"
            }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "14px",
                  background: `${u.color}22`, border: `1.5px solid ${u.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: 600, color: u.color, fontFamily: "'Syne', sans-serif"
                }}>{u.avatar}</div>
                <div style={{
                  position: "absolute", bottom: "-1px", right: "-1px",
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: statusColor(u.status), border: "2px solid #0a0a16"
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: activeUser.id === u.id ? "#e2e8f0" : "#94a3b8" }}>{u.name}</span>
                  <span style={{ fontSize: "11px", color: "#4b5563" }}>{u.time}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#4b5563", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>{u.lastMsg}</div>
              </div>
              {u.unread > 0 && (
                <div style={{ background: "#a855f7", color: "white", fontSize: "11px", fontWeight: 600, borderRadius: "20px", padding: "1px 7px", flexShrink: 0 }}>{u.unread}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", minWidth: 0 }}>

        {/* Chat Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px", borderBottom: "1px solid #1a1a2e", background: "#0a0a16",
          backdropFilter: "blur(10px)", zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="icon-btn" style={{
              background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer",
              padding: "6px", borderRadius: "8px", transition: "all 0.2s", fontSize: "18px"
            }}>☰</button>
            <div style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: `${activeUser.color}22`, border: `1.5px solid ${activeUser.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", fontWeight: 700, color: activeUser.color, fontFamily: "'Syne', sans-serif"
            }}>{activeUser.avatar}</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{activeUser.name}</div>
              <div style={{ fontSize: "11px", color: statusColor(activeUser.status), display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: statusColor(activeUser.status) }} />
                {activeUser.status}
              </div>
            </div>
          </div>

          {/* Call Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { icon: "🎙️", label: "Voice Call", action: () => startCall("voice") },
              { icon: "📹", label: "Video Call", action: () => startCall("video") },
              { icon: "⋯", label: "More", action: () => {} },
            ].map(btn => (
              <button key={btn.label} title={btn.label} className="icon-btn" onClick={btn.action} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid #1e1e3a",
                borderRadius: "10px", color: "#94a3b8", cursor: "pointer",
                padding: "8px 12px", fontSize: "16px", transition: "all 0.2s"
              }}>{btn.icon}</button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {messages.map((msg, i) => (
            <div key={msg.id} style={{
              display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
              animation: "fadeIn 0.25s ease forwards", animationDelay: `${i * 0.03}s`, opacity: 0
            }}>
              {msg.from === "them" && (
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0, marginRight: "8px", marginTop: "2px",
                  background: `${activeUser.color}22`, border: `1px solid ${activeUser.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: activeUser.color
                }}>{activeUser.avatar}</div>
              )}
              <div style={{ maxWidth: "60%" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: msg.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.from === "me" ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#12122a",
                  border: msg.from === "me" ? "none" : "1px solid #1e1e3a",
                  fontSize: "13.5px", lineHeight: "1.5", color: msg.from === "me" ? "white" : "#cbd5e1",
                  boxShadow: msg.from === "me" ? "0 4px 15px rgba(168,85,247,0.2)" : "none"
                }}>{msg.text}</div>
                <div style={{ fontSize: "10px", color: "#374151", marginTop: "4px", textAlign: msg.from === "me" ? "right" : "left", paddingInline: "4px" }}>{msg.time}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #1a1a2e", background: "#0a0a16" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button className="icon-btn" style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid #1e1e3a",
              borderRadius: "10px", color: "#94a3b8", cursor: "pointer", padding: "10px 12px",
              fontSize: "16px", transition: "all 0.2s", flexShrink: 0
            }}>+</button>
            <input
              className="msg-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${activeUser.name}...`}
              style={{
                flex: 1, background: "#12122a", border: "1px solid #1e1e3a", borderRadius: "12px",
                padding: "11px 16px", color: "#e2e8f0", fontSize: "13.5px", transition: "border 0.2s"
              }}
            />
            <button className="icon-btn" style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid #1e1e3a",
              borderRadius: "10px", color: "#94a3b8", cursor: "pointer", padding: "10px 12px",
              fontSize: "16px", transition: "all 0.2s", flexShrink: 0
            }}>😊</button>
            <button className="send-btn" onClick={sendMessage} style={{
              background: "#7c3aed", border: "none", borderRadius: "10px", color: "white",
              cursor: "pointer", padding: "10px 16px", fontSize: "16px", transition: "all 0.2s", flexShrink: 0
            }}>➤</button>
          </div>
        </div>
      </div>

      {/* CALL OVERLAY */}
      {callState !== "idle" && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(5,5,15,0.92)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 100, gap: "24px"
        }}>
          {/* Video feeds (mock) */}
          {callState === "video" && (
            <div style={{ position: "relative", width: "100%", maxWidth: "700px", height: "380px", borderRadius: "20px", overflow: "hidden", background: "#0a0a1a", border: "1px solid #1e1e3a" }}>
              {/* Remote */}
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${activeUser.color}11, #12122a)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: `${activeUser.color}22`, border: `2px solid ${activeUser.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 700, color: activeUser.color, fontFamily: "'Syne', sans-serif" }}>{activeUser.avatar}</div>
                <div style={{ color: "#94a3b8", fontSize: "14px" }}>{camOff ? "Camera off" : activeUser.name}</div>
              </div>
              {/* Self PiP */}
              <div style={{ position: "absolute", bottom: "16px", right: "16px", width: "130px", height: "90px", borderRadius: "12px", background: "#1a1a2e", border: "2px solid #2d2d4e", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ color: "#4b5563", fontSize: "12px" }}>You</div>
              </div>
            </div>
          )}

          {/* Voice call avatar */}
          {(callState === "voice" || callState === "calling") && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{
                width: "100px", height: "100px", borderRadius: "28px",
                background: `${activeUser.color}22`, border: `2px solid ${activeUser.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "40px", fontWeight: 800, color: activeUser.color, fontFamily: "'Syne', sans-serif",
                animation: callState === "calling" ? "ring 1.2s infinite" : "none",
                boxShadow: `0 0 40px ${activeUser.color}22`
              }}>{activeUser.avatar}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 700 }}>{activeUser.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "13px", animation: "pulse 1.5s infinite" }}>
                {callState === "calling" ? "Calling..." : "Voice call • 00:42"}
              </div>
            </div>
          )}

          {callState === "video" && (
            <div style={{ color: "#94a3b8", fontSize: "13px", animation: "pulse 2s infinite" }}>Video call • 00:42</div>
          )}

          {/* Call Controls */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {callState !== "calling" && (
              <>
                <button onClick={() => setMuted(!muted)} style={{
                  width: "54px", height: "54px", borderRadius: "16px", border: "1px solid #2d2d4e",
                  background: muted ? "#1e1e3a" : "rgba(255,255,255,0.06)", color: muted ? "#6b7280" : "#e2e8f0",
                  cursor: "pointer", fontSize: "20px", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                }}>{muted ? "🔇" : "🎙️"}</button>
                {callState === "video" && (
                  <button onClick={() => setCamOff(!camOff)} style={{
                    width: "54px", height: "54px", borderRadius: "16px", border: "1px solid #2d2d4e",
                    background: camOff ? "#1e1e3a" : "rgba(255,255,255,0.06)", color: camOff ? "#6b7280" : "#e2e8f0",
                    cursor: "pointer", fontSize: "20px", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{camOff ? "📷" : "📹"}</button>
                )}
              </>
            )}
            <button onClick={endCall} style={{
              width: "60px", height: "60px", borderRadius: "18px", border: "none",
              background: "#dc2626", color: "white", cursor: "pointer",
              fontSize: "22px", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(220,38,38,0.4)", transition: "all 0.2s"
            }}>📵</button>
            {callState !== "calling" && (
              <button style={{
                width: "54px", height: "54px", borderRadius: "16px", border: "1px solid #2d2d4e",
                background: "rgba(255,255,255,0.06)", color: "#e2e8f0",
                cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center"
              }}>🔊</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
