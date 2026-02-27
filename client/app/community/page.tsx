"use client";
import { useState, useRef, useEffect } from "react";

// ── Warm Color Palette ──────────────────────────────────────────
// bg:       #FDF8F2   surface: #FFFCF7   card: #FFF8EE
// border:   #EAD9C0   accent:  #E8A45A   sage: #7B9E87
// amber:    #C4793A   text:    #2C2016   muted: #9E8B72

const COMMUNITIES = [
  { id: 1, name: "Dark Thoughts", icon: "🌑", members: 4821, lastMsg: "anyone else feel like a ghost?", time: "1m", unread: 12, color: "#9B7FD4", desc: "A space to speak the unspeakable" },
  { id: 2, name: "Neon Confessions", icon: "⚡", members: 2340, lastMsg: "I lied to my best friend today", time: "4m", unread: 3, color: "#E8A45A", desc: "Anonymous confessions, zero judgment" },
  { id: 3, name: "Midnight Poets", icon: "🌙", members: 1102, lastMsg: "wrote something raw at 3am", time: "12m", unread: 0, color: "#5BA8C4", desc: "Words without identity" },
  { id: 4, name: "The Void", icon: "🕳️", members: 9999, lastMsg: "hello void 🖤", time: "20m", unread: 7, color: "#D4654A", desc: "Scream into the void. It listens." },
  { id: 5, name: "Ghost Stories", icon: "👻", members: 3210, lastMsg: "real stories, fake names", time: "1h", unread: 0, color: "#C97AB2", desc: "Real experiences, no identity" },
  { id: 6, name: "Anonymous Art", icon: "🎨", members: 876, lastMsg: "dropped a new piece", time: "2h", unread: 0, color: "#7B9E87", desc: "Create without credit" },
];

type Msg = { id: number; from: string; avatar: string; text: string; time: string; color: string; reactions?: string[] };

const COMMUNITY_MSGS: Record<number, Msg[]> = {
  1: [
    { id: 1, from: "phantom_88", avatar: "P", text: "anyone else feel like a ghost?", time: "10:01", color: "#9B7FD4" },
    { id: 2, from: "void_42", avatar: "V", text: "every single day bro", time: "10:02", color: "#5BA8C4", reactions: ["🖤", "💀"] },
    { id: 3, from: "neon_x", avatar: "N", text: "the worst is when you're in a room full of people and still feel alone", time: "10:03", color: "#D4654A" },
    { id: 4, from: "ghost_m", avatar: "G", text: "this community gets it 🖤", time: "10:05", color: "#C97AB2", reactions: ["❤️"] },
    { id: 5, from: "anon_z", avatar: "A", text: "everyone here is seen even if not known", time: "10:07", color: "#7B9E87" },
  ],
  2: [
    { id: 1, from: "shadow_y", avatar: "S", text: "I lied to my best friend today", time: "9:50", color: "#E8A45A" },
    { id: 2, from: "dark_r", avatar: "D", text: "what happened?", time: "9:51", color: "#9B7FD4" },
    { id: 3, from: "shadow_y", avatar: "S", text: "told them I was fine. I wasn't.", time: "9:52", color: "#E8A45A", reactions: ["🤍", "💔"] },
  ],
  3: [
    { id: 1, from: "poet_k", avatar: "P", text: "wrote something raw at 3am", time: "8:30", color: "#5BA8C4" },
    { id: 2, from: "moon_q", avatar: "M", text: "share it 🌙", time: "8:31", color: "#9B7FD4" },
    { id: 3, from: "poet_k", avatar: "P", text: "\"I wear silence like a second skin / and wonder if anyone notices the weight\"", time: "8:33", color: "#5BA8C4", reactions: ["🔥", "🖤", "💜"] },
  ],
  4: [
    { id: 1, from: "void_user", avatar: "V", text: "hello void 🖤", time: "7:00", color: "#D4654A" },
    { id: 2, from: "echo_1", avatar: "E", text: "🖤", time: "7:01", color: "#9E8B72" },
    { id: 3, from: "dark_42", avatar: "D", text: "🖤", time: "7:01", color: "#9E8B72" },
    { id: 4, from: "anon_void", avatar: "A", text: "🖤", time: "7:02", color: "#9E8B72" },
  ],
  5: [
    { id: 1, from: "ghost_t", avatar: "G", text: "real stories, fake names", time: "6:00", color: "#C97AB2" },
  ],
  6: [
    { id: 1, from: "artist_x", avatar: "A", text: "dropped a new piece", time: "5:00", color: "#7B9E87" },
  ],
};

export default function CommunityPage() {
  const [active, setActive] = useState(COMMUNITIES[0]);
  const [msgs, setMsgs] = useState(COMMUNITY_MSGS[1]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"chats" | "discover">("chats");
  const [joined, setJoined] = useState([1, 2, 3]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const selectCommunity = (c: typeof COMMUNITIES[0]) => {
    setActive(c);
    setMsgs(COMMUNITY_MSGS[c.id] || []);
  };

  const send = () => {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, {
      id: Date.now(), from: "you", avatar: "Y", text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      color: "#E8A45A"
    }]);
    setInput("");
  };

  const filtered = COMMUNITIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isJoined = (id: number) => joined.includes(id);
  const toggleJoin = (id: number) => setJoined(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FDF8F2", fontFamily: "'Nunito', sans-serif", color: "#2C2016", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Nunito:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #EAD9C0; border-radius: 4px; }
        input, textarea { outline: none; }
        .comm-row:hover { background: rgba(232,164,90,0.07) !important; }
        .icon-btn:hover { background: rgba(44,32,22,0.06) !important; }
        .send-btn:hover { background: #C4793A !important; box-shadow: 0 4px 14px rgba(196,121,58,0.4) !important; }
        .join-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .reaction-chip:hover { border-color: #E8A45A; background: rgba(232,164,90,0.1); transform: scale(1.05); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes breathe { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes popIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: sidebarOpen ? "310px" : "0", minWidth: sidebarOpen ? "310px" : "0",
        borderRight: "1px solid #EAD9C0", display: "flex", flexDirection: "column",
        overflow: "hidden", transition: "all 0.3s ease", background: "#FFFCF7"
      }}>
        {/* Header */}
        <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid #EAD9C0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "9px",
                background: "linear-gradient(135deg, #E8A45A, #D4654A)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px"
              }}>🌿</div>
              <span style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600, color: "#2C2016" }}>Community</span>
            </div>
            <button style={{
              background: "linear-gradient(135deg, #E8A45A, #C4793A)", border: "none",
              borderRadius: "20px", color: "white", fontSize: "12px", fontWeight: 700,
              padding: "7px 14px", cursor: "pointer", boxShadow: "0 2px 8px rgba(196,121,58,0.3)",
              transition: "all 0.2s"
            }}>＋ New</button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "#F5EDD9", borderRadius: "12px", padding: "4px", marginBottom: "12px" }}>
            {(["chats", "discover"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "7px", borderRadius: "9px", border: "none", cursor: "pointer",
                background: tab === t ? "#FFFCF7" : "transparent",
                color: tab === t ? "#2C2016" : "#9E8B72",
                fontSize: "12.5px", fontWeight: tab === t ? 700 : 500,
                transition: "all 0.2s", textTransform: "capitalize",
                boxShadow: tab === t ? "0 2px 8px rgba(44,32,22,0.06)" : "none"
              }}>{t === "chats" ? "💬 Chats" : "🔍 Discover"}</button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..." style={{
              width: "100%", background: "#F5EDD9", border: "1.5px solid transparent", borderRadius: "12px",
              padding: "9px 12px 9px 34px", color: "#2C2016", fontSize: "13px", fontFamily: "'Nunito', sans-serif",
              transition: "all 0.2s"
            }}
              onFocus={e => (e.target.style.borderColor = "#E8A45A", e.target.style.background = "#FFFCF7")}
              onBlur={e => (e.target.style.borderColor = "transparent", e.target.style.background = "#F5EDD9")}
            />
            <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", opacity: 0.45, fontSize: "15px" }}>🔍</span>
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: "12px" }}>
          {tab === "chats" ? (
            <>
              <div style={{ padding: "12px 16px 6px", fontSize: "10.5px", fontWeight: 800, letterSpacing: "0.08em", color: "#9E8B72", textTransform: "uppercase" }}>Your Communities</div>
              {filtered.filter(c => isJoined(c.id)).map(c => (
                <div key={c.id} className="comm-row" onClick={() => selectCommunity(c)} style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "11px 16px",
                  cursor: "pointer", transition: "all 0.2s",
                  background: active.id === c.id ? "rgba(232,164,90,0.1)" : "transparent",
                  borderLeft: `3px solid ${active.id === c.id ? c.color : "transparent"}`,
                  margin: "2px 0"
                }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "13px", flexShrink: 0,
                    background: `${c.color}18`, border: `1.5px solid ${c.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
                  }}>{c.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "13.5px", fontWeight: 700, color: active.id === c.id ? "#2C2016" : "#4A3828" }}>{c.name}</span>
                      <span style={{ fontSize: "11px", color: "#B5A08A" }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#9E8B72", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>{c.lastMsg}</div>
                  </div>
                  {c.unread > 0 && (
                    <div style={{
                      background: `linear-gradient(135deg, ${c.color}, ${c.color}CC)`,
                      color: "white", fontSize: "10px", fontWeight: 800,
                      borderRadius: "20px", padding: "2px 8px", flexShrink: 0,
                      boxShadow: `0 2px 6px ${c.color}40`
                    }}>{c.unread}</div>
                  )}
                </div>
              ))}
              {filtered.filter(c => isJoined(c.id)).length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 20px", color: "#9E8B72", fontSize: "13px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌱</div>
                  <div style={{ fontWeight: 600, marginBottom: "4px" }}>No communities yet</div>
                  <div style={{ fontSize: "12px" }}>Discover communities and join the ones that feel like home</div>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: "12px" }}>
              <div style={{ fontSize: "10.5px", color: "#9E8B72", fontWeight: 800, letterSpacing: "0.08em", marginBottom: "12px", paddingLeft: "4px", textTransform: "uppercase" }}>Discover Communities</div>
              {filtered.map((c, i) => (
                <div key={c.id} style={{
                  background: "#FFFCF7", border: "1.5px solid #EAD9C0", borderRadius: "16px",
                  padding: "14px", marginBottom: "10px",
                  animation: "popIn 0.25s ease forwards", animationDelay: `${i * 0.05}s`, opacity: 0,
                  transition: "box-shadow 0.2s",
                  boxShadow: "0 2px 8px rgba(44,32,22,0.04)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      background: `${c.color}15`, border: `1.5px solid ${c.color}35`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#2C2016" }}>{c.name}</div>
                      <div style={{ fontSize: "11px", color: "#9E8B72", marginTop: "1px" }}>👤 {c.members.toLocaleString()} members</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#6B5A45", marginBottom: "12px", lineHeight: 1.5 }}>{c.desc}</div>
                  <button className="join-btn" onClick={() => { toggleJoin(c.id); if (!isJoined(c.id)) { setTab("chats"); selectCommunity(c); } }} style={{
                    width: "100%", padding: "8px", borderRadius: "10px", border: "none", cursor: "pointer",
                    background: isJoined(c.id)
                      ? "rgba(123,158,135,0.15)"
                      : `linear-gradient(135deg, ${c.color}, ${c.color}CC)`,
                    color: isJoined(c.id) ? "#7B9E87" : "white",
                    fontSize: "12.5px", fontWeight: 700, transition: "all 0.2s",
                    fontFamily: "'Nunito', sans-serif",
                    boxShadow: isJoined(c.id) ? "none" : `0 2px 8px ${c.color}35`
                  }}>{isJoined(c.id) ? "✓ Joined" : "Join Community"}</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CHAT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#FDF8F2" }}>

        {/* Chat Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 22px", borderBottom: "1px solid #EAD9C0",
          background: "#FFFCF7", boxShadow: "0 2px 12px rgba(44,32,22,0.04)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="icon-btn" style={{
              background: "transparent", border: "none", color: "#9E8B72", cursor: "pointer",
              padding: "7px 9px", borderRadius: "10px", fontSize: "17px", transition: "all 0.2s"
            }}>☰</button>
            <div style={{
              width: "42px", height: "42px", borderRadius: "13px",
              background: `${active.color}15`, border: `1.5px solid ${active.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px"
            }}>{active.icon}</div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700, fontFamily: "'Lora', serif", color: "#2C2016" }}>{active.name}</div>
              <div style={{ fontSize: "11.5px", color: "#9E8B72", marginTop: "1px", display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", background: "#7B9E87", borderRadius: "50%", display: "inline-block", animation: "breathe 2s infinite" }}></span>
                {active.members.toLocaleString()} anonymous members
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["🔍", "👥", "⋯"].map(icon => (
              <button key={icon} className="icon-btn" style={{
                background: "#F5EDD9", border: "1px solid #EAD9C0",
                borderRadius: "10px", color: "#6B5A45", cursor: "pointer",
                padding: "8px 12px", fontSize: "15px", transition: "all 0.2s"
              }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Community Banner */}
        <div style={{
          padding: "10px 22px", background: `linear-gradient(90deg, ${active.color}12, rgba(253,248,242,0))`,
          borderBottom: "1px solid #EAD9C0", display: "flex", alignItems: "center", gap: "8px"
        }}>
          <span style={{ fontSize: "12px", color: active.color }}>✦</span>
          <span style={{ fontSize: "12.5px", color: "#6B5A45", fontStyle: "italic" }}>{active.desc}</span>
          <span style={{ marginLeft: "auto", fontSize: "11.5px", color: "#9E8B72", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "6px", height: "6px", background: "#7B9E87", borderRadius: "50%", display: "inline-block" }}></span>
            {Math.floor(active.members * 0.12).toLocaleString()} online
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {msgs.map((msg, i) => {
            const isMe = msg.from === "you";
            return (
              <div key={msg.id} style={{
                display: "flex", gap: "10px", justifyContent: isMe ? "flex-end" : "flex-start",
                animation: "fadeUp 0.25s ease forwards", animationDelay: `${i * 0.04}s`, opacity: 0
              }}>
                {!isMe && (
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0, marginTop: "2px",
                    background: `${msg.color}18`, border: `1.5px solid ${msg.color}35`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 800, color: msg.color
                  }}>{msg.avatar}</div>
                )}
                <div style={{ maxWidth: "62%" }}>
                  {!isMe && (
                    <div style={{ fontSize: "11.5px", color: msg.color, fontWeight: 700, marginBottom: "4px", paddingLeft: "2px" }}>{msg.from}</div>
                  )}
                  <div style={{
                    padding: "11px 15px",
                    borderRadius: isMe ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                    background: isMe
                      ? `linear-gradient(135deg, #E8A45A, #C4793A)`
                      : "#FFFCF7",
                    border: isMe ? "none" : "1px solid #EAD9C0",
                    fontSize: "14px", lineHeight: "1.6",
                    color: isMe ? "white" : "#2C2016",
                    boxShadow: isMe ? "0 4px 14px rgba(196,121,58,0.25)" : "0 2px 8px rgba(44,32,22,0.04)"
                  }}>{msg.text}</div>
                  {msg.reactions && (
                    <div style={{ display: "flex", gap: "5px", marginTop: "6px", paddingLeft: isMe ? "0" : "2px", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                      {msg.reactions.map((r, ri) => (
                        <span key={ri} className="reaction-chip" style={{
                          background: "#FFFCF7", border: "1.5px solid #EAD9C0",
                          borderRadius: "20px", padding: "2px 9px", fontSize: "13px",
                          cursor: "pointer", transition: "all 0.15s", display: "inline-flex", alignItems: "center"
                        }}>{r}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: "10.5px", color: "#B5A08A", marginTop: "5px", textAlign: isMe ? "right" : "left", paddingInline: "2px" }}>{msg.time}</div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "14px 22px 18px", borderTop: "1px solid #EAD9C0", background: "#FFFCF7" }}>
          <div style={{
            display: "flex", gap: "8px", alignItems: "center",
            background: "#F5EDD9", borderRadius: "16px", padding: "8px 10px",
            border: "1.5px solid transparent", transition: "all 0.2s"
          }}
            onFocus={() => { }}
          >
            <button className="icon-btn" style={{
              background: "transparent", border: "none",
              color: "#9E8B72", cursor: "pointer",
              padding: "8px 10px", fontSize: "18px", transition: "all 0.2s", flexShrink: 0, borderRadius: "10px"
            }}>📎</button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder={`Message ${active.name} anonymously...`}
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "#2C2016", fontSize: "14px", fontFamily: "'Nunito', sans-serif",
                padding: "4px 0"
              }}
            />
            <button className="icon-btn" style={{
              background: "transparent", border: "none",
              color: "#9E8B72", cursor: "pointer",
              padding: "8px 10px", fontSize: "18px", transition: "all 0.2s", flexShrink: 0, borderRadius: "10px"
            }}>😊</button>
            <button className="send-btn" onClick={send} style={{
              background: "linear-gradient(135deg, #E8A45A, #C4793A)",
              border: "none", borderRadius: "11px", color: "white",
              cursor: "pointer", padding: "10px 16px", fontSize: "16px",
              transition: "all 0.2s", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(196,121,58,0.3)"
            }}>➤</button>
          </div>
          <div style={{ fontSize: "11.5px", color: "#B5A08A", textAlign: "center", marginTop: "9px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            🔒 <span>Your identity is hidden · Anonymous by design</span>
          </div>
        </div>
      </div>
    </div>
  );
}
