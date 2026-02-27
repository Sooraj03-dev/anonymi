"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
          top: -150px; left: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(155,93,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-left::after {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-bg-text {
          position: absolute;
          bottom: -40px; left: -10px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 11rem;
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
          margin-bottom: 70px;
        }

        .auth-left-content h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 3.5vw, 3.2rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .auth-left-content p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--text-muted);
          max-width: 340px;
          margin-bottom: 3rem;
          font-weight: 300;
        }

        .auth-perks {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .auth-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--text-dim);
        }

        .perk-icon {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: var(--bg-3);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* ── RIGHT PANEL ── */
        .auth-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 80px;
          background: var(--bg);
        }

        .auth-form-wrap {
          width: 100%;
          max-width: 380px;
          animation: fade-up 0.5s ease both;
        }

        .auth-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          border: 1px solid rgba(200,255,0,0.25);
          background: rgba(200,255,0,0.07);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--accent);
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
          margin-bottom: 2.25rem;
          font-weight: 300;
        }

        .form-field {
          margin-bottom: 1.1rem;
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

        .field-wrap {
          position: relative;
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

        .form-input::placeholder { color: var(--bg-3); filter: brightness(3); }

        .form-input:focus {
          border-color: var(--purple);
          background: rgba(155,93,255,0.04);
        }

        .field-action {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          color: var(--purple);
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }

        .field-action:hover { opacity: 0.7; }

        .eye-btn {
          background: none;
          border: none;
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: var(--text-muted);
          font-size: 1rem;
          padding: 0;
          line-height: 1;
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 6px;
        }

        .forgot-link {
          font-size: 0.75rem;
          color: var(--purple);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .forgot-link:hover { opacity: 0.7; }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.5rem 0;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .auth-divider span {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

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
          margin-top: 0.5rem;
        }

        .btn-auth-primary:hover {
          background: #d4ff1a;
          box-shadow: 0 0 28px var(--accent-glow);
          transform: translateY(-1px);
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
          margin-top: 1.5rem;
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
        }
      `}</style>

      <div className="auth-page">

        {/* ── LEFT ── */}
        <div className="auth-left">
          <span className="auth-bg-text">LOG</span>

          <Link href="/" className="auth-brand">
            <div className="nav-logo">
              <span className="dot" />
              Anonymi
            </div>
          </Link>

          <div className="auth-left-content">
            <h2>
              Your voice.<br />
              <span style={{ color: "var(--accent)" }}>No face.</span>{" "}
              <span style={{ color: "var(--purple)" }}>No name.</span>
            </h2>
            <p>
              Welcome back to the space where identity doesn't matter — only what you have to say.
            </p>

            <div className="auth-perks">
              <div className="auth-perk">
                <div className="perk-icon">◎</div>
                Zero identity required to post
              </div>
              <div className="auth-perk">
                <div className="perk-icon">◈</div>
                End-to-end encrypted group chats
              </div>
              <div className="auth-perk">
                <div className="perk-icon">⬠</div>
                12K+ anonymous communities
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            <div className="auth-tag">
              <span>⊕</span> Masked Entry
            </div>

            <h1>Log back in.</h1>
            <p>Your identity stays hidden. Your session does not.</p>

            {/* Handle / Email */}
            <div className="form-field">
              <label>Anonymous Handle or Email</label>
              <div className="field-wrap">
                <input
                  type="text"
                  className="form-input"
                  placeholder="ghost_user_9821 or you@anon.im"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-field">
              <label>Password</label>
              <div className="field-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••••••"
                  style={{ paddingRight: "44px" }}
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              <div className="forgot-row">
                <Link href="/forgot-password" className="forgot-link">Forgot it?</Link>
              </div>
            </div>

            <button className="btn-auth-primary">Log In →</button>

            <div className="auth-divider"><span>or continue as</span></div>

            <button className="btn-auth-ghost">👻 &nbsp;Enter as Guest</button>

            <div className="auth-footer-note">
              No account?{" "}
              <Link href="/get-started">Get Started — it&apos;s free</Link>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
