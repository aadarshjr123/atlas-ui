import React, { Suspense, lazy, useMemo, useState } from "react";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Moon, Search, Sun } from "lucide-react";
import { Input, Button, ThemeProvider, useTheme } from "@atlas-ui/core";
import { allPages } from "./data";
import "./styles.css";

const GettingStartedPage = lazy(() => import("./pages/GettingStartedPage").then((module) => ({ default: module.GettingStartedPage })));
const InstallationPage = lazy(() => import("./pages/InstallationPage").then((module) => ({ default: module.InstallationPage })));
const DocPage = lazy(() => import("./pages/DocPage").then((module) => ({ default: module.DocPage })));

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button className="rounded-full" variant="secondary" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}

function Sidebar({ search, onSearch }: { search: string; onSearch: (val: string) => void }) {
  const location = useLocation();
  const visiblePages = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return allPages;
    return allPages.filter((page) => `${page.title} ${page.description} ${page.packageName ?? ""}`.toLowerCase().includes(normalized));
  }, [search]);
  const hasSearchResults = visiblePages.length > 0;

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-[16rem] lg:shrink-0 lg:overflow-auto xl:w-[19rem]">
      <nav className="docs-nav rounded-[1.5rem] border border-atlas-line p-3 shadow-xl shadow-black/5 backdrop-blur-2xl">
        {(["Guides", "Components", "Hooks"] as const).map((group) => {
          const groupPages = visiblePages.filter((page) => page.group === group);
          if (groupPages.length === 0) return null;
          return (
            <div key={group} className="mb-4 last:mb-0">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-atlas-muted">{group}</p>
              <div className="docs-nav-list grid gap-1">
                {groupPages.map((page) => {
                  const to = group === "Guides" ? `/${page.id}` : `/${group.toLowerCase()}/${page.id}`;
                  const isActive = location.pathname === to || (location.pathname === "/" && page.id === "getting-started");
                  return (
                    <Link
                      key={page.id}
                      to={to}
                      onClick={() => onSearch("")}
                      className={`whitespace-nowrap rounded-2xl px-3 py-2 text-sm transition ${isActive ? "bg-atlas-accent text-white shadow-sm" : "text-atlas-muted hover:bg-atlas-surface hover:text-atlas-ink"}`}
                    >
                      {page.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
        {!hasSearchResults ? (
          <div className="rounded-2xl border border-atlas-line bg-atlas-surface p-4">
            <p className="text-sm font-semibold text-atlas-ink">No results</p>
            <p className="mt-1 text-sm leading-6 text-atlas-muted">Try a component name, hook name, or package.</p>
          </div>
        ) : null}
      </nav>
    </aside>
  );
}

function DocsLayout() {
  const [search, setSearch] = useState("");
  const location = useLocation();

  // Find the active page based on the current path to render in the content area
  const activePage = useMemo(() => {
    const path = location.pathname;
    if (path === "/" || path === "/getting-started") return allPages.find(p => p.id === "getting-started");
    if (path === "/installation") return allPages.find(p => p.id === "installation");
    
    // components/button or hooks/use-chat
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return allPages.find((page) => page.id === id) ?? allPages[0];
  }, [location.pathname]);

  return (
    <main className="docs-shell min-h-screen">
      <header className="docs-header sticky top-0 z-30 border-b border-atlas-line bg-atlas-panel/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] flex-col gap-4 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="min-w-0">
            <p className="text-lg font-semibold text-atlas-ink">Atlas UI</p>
            <p className="truncate text-sm text-atlas-muted">React components and patterns for AI product interfaces</p>
          </Link>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center md:max-w-xl md:justify-end">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-atlas-muted" size={16} />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 rounded-full pl-9 shadow-sm md:min-w-72 docs-card"
                placeholder="Search components and hooks..."
                aria-label="Search documentation"
              />
            </label>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[92rem] flex-col gap-6 px-4 py-6 sm:px-5 lg:flex-row lg:items-start">
        <Sidebar search={search} onSearch={setSearch} />
        
        <div className="min-w-0 flex-1 pb-10">
          <Suspense fallback={<div className="docs-card rounded-2xl border border-atlas-line p-6 text-sm text-atlas-muted">Loading docs...</div>}>
            <Routes>
              <Route path="/" element={<GettingStartedPage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/installation" element={<InstallationPage />} />
              <Route path="/components/:id" element={activePage ? <DocPage page={activePage} /> : <p>Not found</p>} />
              <Route path="/hooks/:id" element={activePage ? <DocPage page={activePage} /> : <p>Not found</p>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <HashRouter>
        <DocsLayout />
      </HashRouter>
    </ThemeProvider>
  );
}
