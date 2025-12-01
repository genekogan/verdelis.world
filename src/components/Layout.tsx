import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <header className="site-header">
        <div className="header-logo">
          <img src="/images/verdelis1.png" alt="Verdelis" className="logo-icon" />
          <img src="/images/verdelis-type-green.png" alt="Verdelis" className="logo-text" />
        </div>
        <nav className="main-nav">
          <Link href="/" className={`nav-button ${isActive("/") ? "active" : ""}`}>
            Latest
          </Link>
          <Link href="/archive" className={`nav-button ${isActive("/archive") ? "active" : ""}`}>
            Archives
          </Link>
          <Link href="/about" className={`nav-button ${isActive("/about") ? "active" : ""}`}>
            About
          </Link>
          <a
            href="https://www.littlemartians.world"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-button"
          >
            Little Martians
          </a>
        </nav>
      </header>

      {children}

      <footer className="site-footer">
        <p>
          &copy; 2025 Verdelis | Part of the{" "}
          <a href="https://www.littlemartians.world" target="_blank" rel="noopener noreferrer">
            Little Martians
          </a>{" "}
          universe
        </p>
      </footer>
    </>
  );
}
