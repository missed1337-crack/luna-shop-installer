export default function Home() {
  return (
    <main>
      <div className="orb" aria-hidden="true" />
      <p className="eyebrow">LUNA / SAFE LAUNCHER / WINDOWS</p>
      <h1>LUNA<span>|</span>SHOP</h1>
      <p className="lead">
        This public page contains only the auditable PowerShell launcher.
        The store, accounts, catalog and source remain private.
      </p>
      <pre><code>irm https://luna-shop-installer.missed1337.chatgpt.site/install.ps1 | iex</code></pre>
      <a href="/install.ps1" download>Download install.ps1 <span>↓</span></a>
      <section>
        <div><b>01</b><p>Installs a user-level <code>luna-shop</code> command.</p></div>
        <div><b>02</b><p>Opens the private HTTPS store in your browser.</p></div>
        <div><b>03</b><p>Never stores a password, token, cookie or payment detail.</p></div>
      </section>
      <footer>PUBLIC INSTALLER · PRIVATE STORE · PAYMENT DISABLED</footer>
    </main>
  );
}
