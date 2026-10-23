import Link from "next/link";

export default function OfflinePage() {
  return <main className="bookPage"><nav className="nav"><div className="container navInner"><Link href="/" className="logo"><span className="logoMark">G✦</span><span>Geerams Cleaning Services</span></Link></div></nav><div className="formWrap"><div className="formCard confirm"><div className="confirmIcon">📶</div><span className="kicker">Offline mode</span><h1>Still usable.</h1><p>Previously loaded Geerams Cleaning Services pages and public assets can remain available on this device.</p><p>You can browse previously loaded products while offline. Place an order after reconnecting so Geerams can receive it.</p><div className="actions centered"><Link className="button buttonPrimary" href="/services">Shop products</Link><Link className="button buttonLight" href="/">Open Geerams Cleaning Services</Link></div></div></div></main>;
}
