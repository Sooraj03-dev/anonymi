"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ─── NAV ─── */}
      <nav>
        <div className="nav-logo">
          <span className="dot" />
          Anonymi
        </div>

        <ul className="nav-links">
          <li>
            <Link href="/personal-space" className="nav-link">
              <span className="nav-icon">⬡</span>Personal Space
            </Link>
          </li>
          <li>
            <Link href="/community" className="nav-link">
              <span className="nav-icon">◈</span>Community
            </Link>
          </li>
          <li>
            <Link href="/groups" className="nav-link">
              <span className="nav-icon">⬠</span>Group Chat
            </Link>
          </li>
        </ul>

        <div className="nav-cta">
          <Link href="/login"><button className="btn-ghost">Log In</button></Link>
          <Link href="/get-started"><button className="btn-primary">Get Started</button></Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
        </div>

        <div className="hero-inner">
          <div className="hero-badge">
            <span>✦</span> Anonymous by Design
          </div>

          <h1 className="hero-title">
            Be <span className="highlight">Anyone.</span>
            <br />
            Say <span className="highlight-purple">Everything.</span>
          </h1>

          <p className="hero-desc">
            Anonymi is a sanctuary for unfiltered thought — where your identity
            stays hidden and your voice stays loud. Explore personal spaces,
            join communities, and connect in group chats, all without revealing
            who you are.
          </p>

          <div className="hero-actions">
            <Link href="/get-started"><button className="btn-large primary">Start Anonymously →</button></Link>
            <Link href="/community"><button className="btn-large outline">Explore Communities</button></Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">2.4M+</div>
              <div className="stat-label">Anonymous Posts</div>
            </div>
            <div className="stat">
              <div className="stat-num">180K</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-num">12K+</div>
              <div className="stat-label">Communities</div>
            </div>
            <div className="stat">
              <div className="stat-num">Zero</div>
              <div className="stat-label">Identity Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">
          Three ways to express<br />yourself freely
        </h2>
        <p className="section-sub">
          Each space is crafted for a different kind of connection — from
          intimate personal venting to wide-open community discourse.
        </p>

        <div className="features-grid">
          <div className="feature-card card-a">
            <div className="feature-icon icon-a">⬡</div>
            <div className="feature-name">Personal Space</div>
            <p className="feature-text">
              Your private corner of the internet. Write confessions, diary
              entries, thoughts you've never said aloud. Choose what stays
              private and what you share — all under a generated alias.
            </p>
          </div>

          <div className="feature-card card-b">
            <div className="feature-icon icon-b">◈</div>
            <div className="feature-name">Community</div>
            <p className="feature-text">
              Discover interest-based communities on anything from late-night
              anxieties to obscure hobbies. Vote, reply, and engage — your
              identity never enters the room.
            </p>
          </div>

          <div className="feature-card card-c">
            <div className="feature-icon icon-c">⬠</div>
            <div className="feature-name">Group Chat</div>
            <p className="feature-text">
              Ephemeral, encrypted group conversations that vanish when you
              leave. No logs, no traces, no screenshots that stick. Just
              real-time connection without consequence.
            </p>
          </div>

          <div className="feature-card card-d">
            <div className="feature-icon icon-d">🔒</div>
            <div className="feature-name">Zero-Trace Privacy</div>
            <p className="feature-text">
              We never store IP addresses, require emails, or tie sessions to
              real identities. Anonymi is built on the principle that privacy
              is a right, not a feature.
            </p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <div className="how-section">
        <div className="how-inner">
          <div>
            <div className="section-label">How It Works</div>
            <h2 className="section-title">Up and hidden<br />in seconds</h2>

            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <div className="step-content">
                  <h4>Generate your alias</h4>
                  <p>We assign you a random, rotating identity. No email, no phone number, no trace back to you.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <div className="step-content">
                  <h4>Pick your space</h4>
                  <p>Set up your Personal Space, browse Communities, or jump into a Group Chat — or all three.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <div className="step-content">
                  <h4>Express freely</h4>
                  <p>Post, chat, react, and connect. Your thoughts exist here. You don't have to.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="how-visual">
            <div className="mask-card">
              <div className="mask-avatar" style={{ background: "rgba(200,255,0,0.12)" }}>🌿</div>
              <div className="mask-text">
                <h5>VelvetFoxΔ</h5>
                <p>Posted in Personal Space</p>
              </div>
              <span className="tag-pill tag-space">Space</span>
            </div>

            <div className="mask-card">
              <div className="mask-avatar" style={{ background: "rgba(129,140,248,0.12)" }}>🌊</div>
              <div className="mask-text">
                <h5>StormCipherX</h5>
                <p>Active in r/midnightthoughts</p>
              </div>
              <span className="tag-pill tag-community">Community</span>
            </div>

            <div className="mask-card">
              <div className="mask-avatar" style={{ background: "rgba(251,146,60,0.12)" }}>🎭</div>
              <div className="mask-text">
                <h5>NeonShardΩ</h5>
                <p>Joined #nocturnal-vibes chat</p>
              </div>
              <span className="tag-pill tag-group">Group Chat</span>
            </div>

            <div className="mask-card">
              <div className="mask-avatar" style={{ background: "rgba(236,72,153,0.12)" }}>🦋</div>
              <div className="mask-text">
                <h5>CrimsonEchoΨ</h5>
                <p>Shared a thought anonymously</p>
              </div>
              <span className="tag-pill" style={{ color: "#f472b6", borderColor: "rgba(244,114,182,0.3)", background: "rgba(244,114,182,0.1)" }}>Anonymous</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <section className="cta-section">
        <div className="hero-badge" style={{ animation: "none" }}>
          <span>✦</span> No Sign-Up Required
        </div>
        <h2 className="hero-title">
          Your thoughts.<br /><span className="highlight">Your rules.</span>
        </h2>
        <p className="hero-desc" style={{ animation: "none" }}>
          Join thousands who've already discovered what it feels like to speak
          without filters. Anonymi is free, forever.
        </p>
        <div className="hero-actions">
          <Link href="/get-started"><button className="btn-large primary">Enter Anonymi →</button></Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="nav-logo">
          <span className="dot" />
          Anonymi
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Safety</a>
          <a href="#">About</a>
        </div>
        <p className="footer-text">© 2025 Anonymi. No logs. No traces. No regrets.</p>
      </footer>
    </>
  );
}
