"use client";

import { useRef } from "react";
import Link from "next/link";

export function MobileMenu({ navigation }: { navigation: string[][] }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menu.current) menu.current.open = false; };

  return (
    <details className="mobile-menu" ref={menu}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        {navigation.map(([label, href]) => <Link key={href} href={href} onClick={close}>{label}</Link>)}
        <Link href="/contact" onClick={close}>Get started</Link>
      </nav>
    </details>
  );
}
