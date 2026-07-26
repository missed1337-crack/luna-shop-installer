export default function Home() {
  return (
    <main>
      <div className="orb" aria-hidden="true" />
      <p className="eyebrow">LUNA / SAFE LAUNCHER / WINDOWS</p>
      <h1>LUNA<span>|</span>SHOP</h1>
      <p><strong>DEMO ONLY — NO REAL STORE, PAYMENTS OR SHIPMENTS</strong></p>
      <p className="lead">
        This public page contains only the auditable PowerShell launcher.
        The store, accounts, catalog and source remain private.
      </p>
      <pre><code>irm https://raw.githubusercontent.com/missed1337-crack/luna-shop-installer/main/install.ps1 | iex</code></pre>
      <a href="/install.ps1" download>Download install.ps1 <span>↓</span></a>
      <section>
        <div><b>01</b><p>Installs a user-level <code>luna-shop</code> command.</p></div>
        <div><b>02</b><p>Opens the private HTTPS store in your browser.</p></div>
        <div><b>03</b><p>Never stores a password, token, cookie or payment detail.</p></div>
      </section>
      <footer>DEMO ONLY · PUBLIC INSTALLER · PRIVATE STORE · PAYMENT DISABLED</footer>
    </main>
  );
}
