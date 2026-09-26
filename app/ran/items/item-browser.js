'use client';

import { useEffect, useMemo, useState } from 'react';

const PASSWORD = 'rzE1oYuof8XX0TWh';
const AUTH_KEY = 'ran-items-auth';
const LOCKED_STYLE = { position: 'fixed', inset: 0, zIndex: 50, background: '#000' };

const GROUP_ORDER = [
  'Weapons',
  'Armor',
  'Accessories',
  'Potions',
  'Upgrades',
  'Skill Scrolls',
  'Quest',
  'Premium & Costumes',
  'Pets & Boards',
  'Regional',
  'Misc',
];

const css = `
.ri{
  position:fixed; inset:0; z-index:50; display:flex; justify-content:center;
  background:#000 url(/ran-items-bg.jpg) center/cover no-repeat; color:#fff;
  font-family:Tahoma,Dotum,Verdana,Geneva,sans-serif; font-size:12px;
}
.ri:before{ content:""; position:absolute; inset:0; background:rgba(0,0,0,.35); }
.ri *{ box-sizing:border-box; }
.ri-wrap{
  position:relative; display:flex; gap:10px; width:100%; max-width:72rem; height:100%; padding:16px;
}
.ri-win{ display:flex; flex-direction:column; min-height:0; }
.ri-title{
  flex-shrink:0; height:18px; line-height:18px; padding:0 20px 0 4px;
  border-style:solid; border-width:0 24px 0 7px;
  border-image:url(/ran-ui/title.png) 0 24 0 7 fill stretch;
  font-weight:bold; font-size:12px; color:#fff; text-shadow:1px 1px 0 #000;
  white-space:nowrap; overflow:hidden;
}
.ri-body{
  flex:1; min-height:0; display:flex; flex-direction:column;
  background:rgba(0,0,0,.6); border:2px solid #000; border-top-width:1px;
}
.ri-side{ width:250px; flex-shrink:0; }
.ri-brand{ padding:8px 10px; border-bottom:1px solid #444; line-height:1.6; }
.ri-brand a{ color:#9fd4ff; text-decoration:none; }
.ri-brand a:hover{ text-decoration:underline; }
.ri-brand code{ color:#ffd84a; font-family:inherit; font-weight:bold; }
.ri-nav{ flex:1; overflow-y:auto; padding:6px 6px 16px; }
.ri-btn, .ri-all, .ri-cat{
  display:flex; justify-content:space-between; align-items:center; gap:6px;
  width:100%; height:18px; margin:0 0 2px; padding:0 2px;
  border-style:solid; border-width:0 7px;
  border-image:url(/ran-ui/btn.png) 0 7 fill stretch;
  background:none; color:#fff; font:inherit; font-size:11px; text-align:left;
  text-shadow:1px 1px 0 #000; cursor:pointer; white-space:nowrap;
}
.ri-cat span:first-child{ overflow:hidden; text-overflow:ellipsis; }
.ri-btn:hover, .ri-all:hover, .ri-cat:hover, .ri-all.on, .ri-cat.on{
  border-image-source:url(/ran-ui/btn-on.png);
}
.ri-all.on, .ri-cat.on{ color:#ffd84a; }
.ri-n{ color:#bbb; font-size:10px; flex-shrink:0; }
.ri-all.on .ri-n, .ri-cat.on .ri-n{ color:#ffd84a; }
.ri-group{ margin-top:4px; }
.ri-cats{ padding-left:8px; }
.ri-gh{
  display:flex; align-items:center; gap:6px; width:100%; padding:4px 2px;
  border:0; background:none; cursor:pointer; font:inherit; font-weight:bold;
  color:#ffd84a; text-shadow:1px 1px 0 #000;
}
.ri-gh:hover{ color:#fff; }
.ri-chev{ font-size:8px; width:8px; transition:transform .15s; }
.ri-gh.closed .ri-chev{ transform:rotate(-90deg); }
.ri-main{ flex:1; min-width:0; }
.ri-top{ display:flex; align-items:center; gap:8px; padding:8px 10px; border-bottom:1px solid #444; }
.ri-menu{ display:none; width:40px !important; justify-content:center !important; }
.ri-search{
  flex:1; max-width:420px; height:20px; padding:0 6px;
  background:#9f9e9b; border:1px solid #000; color:#000; font:inherit; outline:none;
}
.ri-search::placeholder{ color:#4a4a48; }
.ri-count{ color:#bbb; white-space:nowrap; }
.ri-list{ flex:1; overflow-y:auto; padding:0 10px 24px; }
.ri-sec h2{
  position:sticky; top:0; z-index:1; margin:0; padding:10px 2px 6px;
  background:linear-gradient(#000 80%, rgba(0,0,0,0));
  font-size:12px; font-weight:bold; color:#ffd84a; text-shadow:1px 1px 0 #000;
  display:flex; align-items:baseline; gap:8px;
}
.ri-sec h2 span{ font-size:11px; font-weight:normal; color:#999; }
.ri-table{ width:100%; border-collapse:collapse; }
.ri-table td{ padding:2px 8px; border-bottom:1px solid rgba(255,255,255,.08); vertical-align:middle; }
.ri-table tr:hover td{ background:rgba(255,255,255,.08); }
.ri-icon{ width:1%; padding:2px 0 !important; }
.ri-icon span{
  display:block; width:35px; height:35px;
  background:url(/ran-ui/slot.png) no-repeat;
}
.ri-code{ width:1%; white-space:nowrap; color:#ffd84a; font-weight:bold; }
.ri-code i{ font-style:normal; font-weight:normal; color:#999; }
.ri-empty{ padding:60px 0; text-align:center; color:#bbb; }
.ri-nav, .ri-list{ scrollbar-width:thin; scrollbar-color:#777 #000; }
.ri-nav::-webkit-scrollbar, .ri-list::-webkit-scrollbar{ width:9px; background:#000; }
.ri-nav::-webkit-scrollbar-thumb, .ri-list::-webkit-scrollbar-thumb{
  border-style:solid; border-width:9px 0; border-image:url(/ran-ui/thumb.png) 9 0 fill stretch;
}
.ri-nav::-webkit-scrollbar-button:single-button, .ri-list::-webkit-scrollbar-button:single-button{
  display:block; width:9px; height:19px; background:no-repeat;
}
.ri-nav::-webkit-scrollbar-button:vertical:decrement, .ri-list::-webkit-scrollbar-button:vertical:decrement{
  background-image:url(/ran-ui/sb-btnup.png);
}
.ri-nav::-webkit-scrollbar-button:vertical:increment, .ri-list::-webkit-scrollbar-button:vertical:increment{
  background-image:url(/ran-ui/sb-btndn.png);
}
@media (max-width:760px){
  .ri-wrap{ padding:8px; }
  .ri-side{ position:fixed; top:8px; bottom:8px; left:8px; z-index:60; transform:translateX(calc(-100% - 16px));
    transition:transform .2s; }
  .ri-side.open{ transform:none; }
  .ri-menu{ display:flex; }
  .ri-count{ display:none; }
}
`;

export default function ItemBrowser({ categories, sheets }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(AUTH_KEY);
    } catch {}
    if (stored === PASSWORD) {
      setUnlocked(true);
      return;
    }
    const entered = window.prompt('Password');
    if (entered !== PASSWORD) return;
    try {
      localStorage.setItem(AUTH_KEY, PASSWORD);
    } catch {}
    setUnlocked(true);
  }, []);

  if (!unlocked) return <div style={LOCKED_STYLE} />;
  return (
    <Browser
      categories={categories}
      sheets={sheets}
    />
  );
}

function Browser({ categories, sheets }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const groups = useMemo(
    () =>
      GROUP_ORDER.map((name) => ({
        name,
        cats: categories.filter((c) => c.group === name),
      })).filter((g) => g.cats.length),
    [categories]
  );

  const total = useMemo(() => categories.reduce((n, c) => n + c.items.length, 0), [categories]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const codeQuery = q.match(/^(\d+)(?:\s+(\d*))?$/);
    const ordered = groups.flatMap((g) => g.cats);
    return ordered
      .filter((c) => selected === null || c.mid === selected)
      .map((c) => {
        if (!q) return c;
        let items;
        if (codeQuery) {
          const [, mid, sid] = codeQuery;
          if (codeQuery[2] !== undefined) {
            items = String(c.mid) === mid ? c.items.filter(([s]) => !sid || String(s).startsWith(sid)) : [];
          } else {
            items = c.items.filter(([, name]) => name.toLowerCase().includes(q));
            if (String(c.mid) === mid) items = c.items;
          }
        } else {
          items = c.items.filter(([, name]) => name.toLowerCase().includes(q));
        }
        return { ...c, items };
      })
      .filter((c) => c.items.length);
  }, [groups, query, selected]);

  const shown = visible.reduce((n, c) => n + c.items.length, 0);

  const pick = (mid) => {
    setSelected(mid);
    setMenuOpen(false);
  };

  return (
    <div className="ri">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ri-wrap">
        <aside className={`ri-win ri-side${menuOpen ? ' open' : ''}`}>
          <div className="ri-title">Item Codes</div>
          <div className="ri-body">
            <div className="ri-brand">
              <a href="/ran">&larr; RAN Odyssey</a>
              <br />
              Type <code>getitem MID SID</code> in chat
            </div>
            <nav className="ri-nav">
              <button
                className={`ri-all${selected === null ? ' on' : ''}`}
                onClick={() => pick(null)}
              >
                <span>All items</span> <span className="ri-n">{total.toLocaleString()}</span>
              </button>
              {groups.map((g) => (
                <div
                  className="ri-group"
                  key={g.name}
                >
                  <button
                    className={`ri-gh${open[g.name] ? '' : ' closed'}`}
                    onClick={() => setOpen((s) => ({ ...s, [g.name]: !s[g.name] }))}
                  >
                    <span className="ri-chev">▼</span>
                    {g.name}
                  </button>
                  {open[g.name] && (
                    <div className="ri-cats">
                      {g.cats.map((c) => (
                        <button
                          key={c.mid}
                          className={`ri-cat${selected === c.mid ? ' on' : ''}`}
                          onClick={() => pick(c.mid)}
                        >
                          <span>{c.name}</span>
                          <span className="ri-n">{c.items.length}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="ri-win ri-main">
          <div className="ri-title">
            {selected === null ? 'All Items' : categories.find((c) => c.mid === selected)?.name}
          </div>
          <div className="ri-body">
            <div className="ri-top">
              <button
                className="ri-btn ri-menu"
                onClick={() => setMenuOpen((o) => !o)}
              >
                ☰
              </button>
              <input
                className="ri-search"
                placeholder="Search items, or type a code like 0 14"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <span className="ri-count">
                {shown.toLocaleString()} item{shown === 1 ? '' : 's'}
              </span>
            </div>
            <div className="ri-list">
              {visible.length === 0 && <div className="ri-empty">No items match “{query}”.</div>}
              {visible.map((c) => (
                <section
                  className="ri-sec"
                  key={c.mid}
                >
                  <h2>
                    {c.name} <span>MID {c.mid}</span>
                  </h2>
                  <table className="ri-table">
                    <tbody>
                      {c.items.map(([sid, name, sheet, ix, iy]) => (
                        <tr key={sid}>
                          <td className="ri-icon">
                            <span
                              style={
                                sheet === undefined
                                  ? undefined
                                  : {
                                      backgroundImage: `url(/ran-icons/${sheets[sheet]}.jpg)`,
                                      backgroundPosition: `-${ix * 35}px -${iy * 35}px`,
                                    }
                              }
                            />
                          </td>
                          <td className="ri-code">
                            <i>getitem </i>
                            {c.mid} {sid}
                          </td>
                          <td>{name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
