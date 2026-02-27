"use client";
import Link from "next/link";
import { useState } from "react";

export default function GetStartedPage() {
  const [selectedVibes, setSelectedVibes] = useState<string[]>(["Lurker"]);
  const [termsChecked, setTermsChecked] = useState(false);
  const [handleVal, setHandleVal] = useState("");
  const [showPass, setShowPass] = useState(false);

  const toggleVibe = (v: string) =>
    setSelectedVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const getStrength = (val: string) => {
    if (!val) return 0;
    let s = 0;
    if (val.length >= 4) s = 30;
    if (val.length >= 8) s = 60;
    if (val.length >= 12) s = 85;
    if (/[_\-\.0-9]/.test(val) && val.length >= 6) s = Math.min(s + 15, 100);
    return s;
  };

  const strength = getStrength(handleVal);
  const strengthColor =
    strength < 40 ? "#ff4444" : strength < 70 ? "#ffaa00" : "var(--accent)";

  const vibes = [
    { label: "🕶 Lurker" },
    { label: "🔥 Provocateur" },
    { label: "👻 Ghost" },
    { label: "🎭 Storyteller" },
    { label: "🌀 Chaos Agent" },
    { label: "🧠 Thinker" },
  ];

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg);
        }

        /* ── LEFT PANEL ── */
        .auth-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          background: var(--bg-2);
          border-right: 1px solid var(--border);
          overflow: hidden;
        }

        .auth-left::before {
          content: '';
          position: absolute;
          top: -100px; right: -150px;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(200,255,0,0.09) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-left::after {
          content: '';
          position: absolute;
          bottom: -120px; left: -80px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(155,93,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-bg-text {
          position: absolute;
          bottom: -40px; right: -20px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 9rem;
          color: rgba(255,255,255,0.018);
          letter-spacing: -0.05em;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          margin-bottom: 40px;
        }

        /* Step indicator */
        .step-track {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 44px;
        }

        .step-bar {
          height: 3px;
          width: 28px;
          border-radius: 2px;
          background: rgba(255,255,255,0.08);
          transition: background 0.3s;
        }

        .step-bar.active { background: var(--accent); }
        .step-bar.done { background: rgba(200,255,0,0.3); }

        .step-label-text {
          font-size: 0.68rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-left: 6px;
        }

        .auth-left-content h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.2vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .auth-left-content > p {
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--text-muted);
          max-width: 350px;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }

        .vibe-label {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .vibe-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .vibe-chip {
          padding: 7px 14px;
          border-radius: 100px;
          font-size: 0.8rem;
          cursor: pointer;
          border: 1px solid var(--border);
          background: var(--bg-3);
          color: var(--text-muted);
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .vibe-chip:hover { border-color: var(--purple); color: var(--text); }

        .vibe-chip.selected {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-dim);
        }

        /* ── RIGHT PANEL ── */
        .auth-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 70px;
          overflow-y: auto;
          background: var(--bg);
        }

        .auth-form-wrap {
          width: 100%;
          max-width: 400px;
          animation: fade-up 0.5s ease both;
        }

        .auth-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          border: 1px solid rgba(155,93,255,0.3);
          background: rgba(155,93,255,0.08);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--purple);
          margin-bottom: 1.5rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .auth-form-wrap h1 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.9rem;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 0.5rem;
        }

        .auth-form-wrap > p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .form-field {
          margin-bottom: 1rem;
        }

        .form-field label {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-field label .opt {
          color: var(--bg-3);
          filter: brightness(3);
          text-transform: none;
          letter-spacing: 0;
          margin-left: 4px;
          font-size: 0.65rem;
          font-weight: 400;
        }

        .form-input {
          width: 100%;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .form-input::placeholder { color: rgba(255,255,255,0.12); }

        .form-input:focus {
          border-color: var(--purple);
          background: rgba(155,93,255,0.04);
        }

        .handle-wrap {
          position: relative;
        }

        .handle-at {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .handle-wrap .form-input {
          padding-left: 26px;
        }

        .strength-track {
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.05);
          margin-top: 8px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.35s ease, background 0.3s;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .pass-wrap {
          position: relative;
        }

        .eye-btn {
          background: none;
          border: none;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: var(--text-muted);
          font-size: 0.95rem;
          padding: 0;
          line-height: 1;
        }

        /* Terms */
        .terms-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 1.25rem 0;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.6;
          font-weight: 300;
        }

        .check-box {
          width: 18px; height: 18px;
          border: 1px solid var(--border);
          border-radius: 5px;
          flex-shrink: 0;
          margin-top: 2px;
          background: var(--bg-2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .check-box.checked {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }

        .terms-row a {
          color: var(--purple);
          text-decoration: none;
        }

        .terms-row a:hover { text-decoration: underline; }

        /* Buttons */
        .btn-auth-primary {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: var(--accent);
          color: var(--bg);
          transition: all 0.2s;
          letter-spacing: -0.01em;
        }

        .btn-auth-primary:hover {
          background: #d4ff1a;
          box-shadow: 0 0 28px var(--accent-glow);
          transform: translateY(-1px);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.25rem 0;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .auth-divider span {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .btn-auth-ghost {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: var(--text-dim);
          border: 1px solid var(--border);
          transition: all 0.2s;
        }

        .btn-auth-ghost:hover {
          color: var(--text);
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
        }

        .auth-footer-note {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .auth-footer-note a {
          color: var(--purple);
          text-decoration: none;
          font-weight: 500;
        }

        .auth-footer-note a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 40px 24px; }
          .form-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="auth-page">

        {/* ── LEFT ── */}
        <div className="auth-left">
          <span className="auth-bg-text">FREE</span>

          <Link href="/" className="auth-brand">
            <div className="nav-logo">
              <span className="dot" />
              Anonymi
            </div>
          </Link>

          <div className="step-track">
            <div className="step-bar active" />
            <div className="step-bar" />
            <div className="step-bar" />
            <span className="step-label-text">Step 1 of 3 — Create Account</span>
          </div>

          <div className="auth-left-content">
            <h2>
              Become{" "}
              <span style={{ color: "var(--accent)" }}>anyone.</span>
              <br />
              <span style={{ color: "var(--purple)" }}>Start free.</span>
            </h2>
            <p>
              No real name. No phone number. No photo. Just a handle and a voice
              — that&apos;s all you need to join 180K+ anonymous users.
            </p>

            <div className="vibe-label">Pick your vibe (optional)</div>
            <div className="vibe-chips">
              {vibes.map((v) => (
                <button
                  key={v.label}
                  className={`vibe-chip${selectedVibes.includes(v.label) ? " selected" : ""}`}
                  onClick={() => toggleVibe(v.label)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            <div className="auth-tag">
              <span>◈</span> Anonymous Signup
            </div>

            <h1>Create your mask.</h1>
            <p>We don&apos;t need your real name. We just need to recognize <em>you</em>.</p>

            {/* Handle */}
            <div className="form-field">
              <label>Anonymous Handle</label>
              <div className="handle-wrap">
                <span className="handle-at">@</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="shadow_oracle_42"
                  autoComplete="off"
                  value={handleVal}
                  onChange={(e) => setHandleVal(e.target.value)}
                />
              </div>
              {handleVal && (
                <div className="strength-track">
                  <div
                    className="strength-fill"
                    style={{ width: `${strength}%`, background: strengthColor }}
                  />
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-field">
              <label>
                Email <span className="opt">(for recovery only)</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="something@anon.im or real email"
              />
            </div>

            {/* Password row */}
            <div className="form-row-2">
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label>Password</label>
                <div className="pass-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    className="form-input"
                    placeholder="••••••••"
                    style={{ paddingRight: "38px" }}
                  />
                  <button
                    className="eye-btn"
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password"
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label>Confirm</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="terms-row">
              <div
                className={`check-box${termsChecked ? " checked" : ""}`}
                onClick={() => setTermsChecked(!termsChecked)}
              >
                {termsChecked && "✓"}
              </div>
              <div>
                I agree to the{" "}
                <Link href="/terms">Terms of Silence</Link> and{" "}
                <Link href="/privacy">Privacy Veil</Link>. I understand my identity stays mine.
              </div>
            </div>

            <button className="btn-auth-primary">Start Anonymously →</button>

            <div className="auth-divider"><span>or</span></div>

            <button className="btn-auth-ghost">👻 &nbsp;Continue Without Account</button>

            <div className="auth-footer-note">
              Already masked up?{" "}
              <Link href="/login">Log In</Link>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
