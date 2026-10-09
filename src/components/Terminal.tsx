import * as React from 'react';
import { motion } from 'framer-motion';
import { SectionHead } from './ui';
import { fadeUp } from '../lib/anim';
import { RESUME_URL } from './Hero';
import { openExternal } from '../lib/open';

const EMAIL = 'lakshitsinghsaini@gmail.com';
const QUICK = ['neofetch', 'about', 'projects', 'stats', 'stack', 'socials', 'vibe'];

interface Entry {
  cmd: string | null;
  out: React.ReactNode;
}

function Out({ children }: { children: React.ReactNode }) {
  return <div className="text-dim">{children}</div>;
}

const WELCOME: Entry = {
  cmd: null,
  out: (
    <Out>
      This is a real shell, not a decoration. Type <span className="text-glow">help</span> to see
      everything it knows, or <span className="text-glow">neofetch</span> for the short version of
      me.
    </Out>
  ),
};

export default function Terminal() {
  const [entries, setEntries] = React.useState<Entry[]>([WELCOME]);
  const [input, setInput] = React.useState('');
  const [history, setHistory] = React.useState<string[]>([]);
  const [hIdx, setHIdx] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const push = (cmd: string, out: React.ReactNode) => {
    setEntries((e) => [...e.slice(-40), { cmd, out }]);
    setHistory((h) => [...h, cmd]);
    setHIdx(-1);
    setInput('');
  };

  const run = async (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    let out: React.ReactNode;

    const link = (url: string, text: string, ok: string) =>
      openExternal(url) ? <Out>{ok}</Out> : <Out>Pop up blocked. The address is {text}</Out>;

    switch (cmd) {
      case 'help': {
        const Cmd = ({ c, d }: { c: string; d: string }) => (
          <div className="contents">
            <button
              type="button"
              onClick={() => run(c)}
              aria-label={`Run the ${c} command`}
              className="cursor-pointer text-left text-glow underline-offset-2 transition-colors hover:text-leaf hover:underline"
            >
              {c}
            </button>
            <span>{d}</span>
          </div>
        );
        const Group = ({ t }: { t: string }) => (
          <div className="contents">
            <span className="mt-3 text-faint">{t}</span>
            <span />
          </div>
        );
        out = (
          <Out>
            <p className="text-faint">Click any command to run it.</p>
            <div className="mt-2 grid grid-cols-[128px_1fr] gap-y-1">
              <Cmd c="about" d="who I am, briefly" />
              <Cmd c="projects" d="what I have shipped" />
              <Cmd c="stack" d="languages and tools" />
              <Cmd c="stats" d="a few numbers" />
              <Cmd c="neofetch" d="the system readout" />
              <Group t="reach me" />
              <Cmd c="socials" d="every profile at once" />
              <Cmd c="github" d="opens GitHub" />
              <Cmd c="linkedin" d="opens LinkedIn" />
              <Cmd c="discord" d="opens the server" />
              <Cmd c="resume" d="opens my résumé" />
              <Cmd c="email" d="copies my address" />
              <Group t="pretend it is linux" />
              <Cmd c="ls" d="list files" />
              <Cmd c="pwd" d="where am I" />
              <Cmd c="cat" d="try cat about.txt" />
              <Cmd c="date" d="current time in IST" />
              <Group t="for fun" />
              <Cmd c="coffee" d="fuel check" />
              <Cmd c="vibe" d="how I work" />
              <Cmd c="clear" d="wipe the screen" />
            </div>
          </Out>
        );
        break;
      }
      case 'about':
      case 'whoami':
        out = (
          <Out>
            Lakshit Singh Saini. Computer science student in India who keeps turning side
            experiments into actual products. Mostly web, plenty of AI, some Android when the
            idea calls for it.
          </Out>
        );
        break;
      case 'stack':
      case 'skills':
        out = (
          <Out>
            <p>Core: C, C++, Python, HTML, CSS, JavaScript, TypeScript</p>
            <p>Web: React, Express, Node, Tailwind, Vite</p>
            <p>AI: Gemini API, Claude, ChatGPT, prompt engineering</p>
            <p>Also around: Firebase, MongoDB, Git, Kotlin</p>
          </Out>
        );
        break;
      case 'projects':
        out = (
          <Out>
            <p><span className="text-ink">SaBuddy</span> &nbsp;AI writing help for social posts, Android. <span className="text-leaf">shipped</span></p>
            <p><span className="text-ink">Veylo</span> &nbsp;&nbsp;&nbsp;Habit planner that learns your patterns. <span className="text-leaf">shipped</span></p>
            <p><span className="text-ink">FacilityFix</span> &nbsp;Campus issue tracker. <span className="text-leaf">shipped</span></p>
            <p><span className="text-ink">L.A.V.I.</span> &nbsp;Study assistant for students. <span className="text-sky">in progress</span></p>
            <p className="mt-1 text-faint">The code is public. Type github to go read it.</p>
          </Out>
        );
        break;
      case 'socials':
        out = (
          <Out>
            <p>GitHub &nbsp;&nbsp;&nbsp;github.com/hmmlavi</p>
            <p>LinkedIn &nbsp;linkedin.com/in/lakshitsinghsaini</p>
            <p>Instagram instagram.com/lakshitsinghsaini</p>
            <p>Discord &nbsp;&nbsp;discord.com/invite/28KbZRtt65</p>
            <p>X &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x.com/Lakshits27</p>
            <p>Email &nbsp;&nbsp;&nbsp;&nbsp;{EMAIL}</p>
          </Out>
        );
        break;
      case 'github':
        out = link('https://github.com/hmmlavi', 'github.com/hmmlavi', 'Opening github.com/hmmlavi in a new tab.');
        break;
      case 'linkedin':
        out = link('https://www.linkedin.com/in/lakshitsinghsaini/', 'linkedin.com/in/lakshitsinghsaini', 'Opening LinkedIn in a new tab.');
        break;
      case 'instagram':
      case 'ig':
        out = link('https://www.instagram.com/lakshitsinghsaini/', 'instagram.com/lakshitsinghsaini', 'Opening Instagram in a new tab.');
        break;
      case 'discord':
        out = link('https://discord.com/invite/28KbZRtt65', 'discord.com/invite/28KbZRtt65', 'Opening the Discord server. Come say hi.');
        break;
      case 'x':
      case 'twitter':
        out = link('https://x.com/Lakshits27', 'x.com/Lakshits27', 'Opening X in a new tab.');
        break;
      case 'resume':
      case 'cv':
        out = link(RESUME_URL, 'in the résumé button above', 'Opened my résumé in a new tab.');
        break;
      case 'email': {
        let ok = false;
        try {
          await navigator.clipboard.writeText(EMAIL);
          ok = true;
        } catch {
          ok = false;
        }
        out = (
          <Out>
            {EMAIL} {ok ? <span className="text-leaf">copied to your clipboard.</span> : '(copying failed, select it manually)'}
          </Out>
        );
        break;
      }
      case 'stats':
        out = (
          <Out>
            <p>2,300+ contributions in the last year</p>
            <p>9 public repositories, 4 projects shipped</p>
            <p className="mt-1 text-faint">The GitHub panel above pulls the live numbers.</p>
          </Out>
        );
        break;
      case 'ls':
        out = <Out>about.txt&nbsp;&nbsp;stack.txt&nbsp;&nbsp;projects/&nbsp;&nbsp;resume.pdf&nbsp;&nbsp;secrets/ <span className="text-faint">(empty, sorry)</span></Out>;
        break;
      case 'pwd':
        out = <Out>/home/lakshit/portfolio</Out>;
        break;
      case 'cd':
        out = <Out>You cannot leave. This is a website.</Out>;
        break;
      case 'cat': {
        const f = args[0];
        if (!f) out = <Out>cat: missing file name. Try <span className="text-glow">cat about.txt</span></Out>;
        else if (f.startsWith('about')) out = <Out>Student, builder, chronic experimenter. Currently teaching L.A.V.I. how to be a decent study companion.</Out>;
        else if (f.startsWith('stack')) out = <Out>Type <span className="text-glow">stack</span>. It reads better.</Out>;
        else if (f.startsWith('resume')) out = <Out>That one is a PDF. Try <span className="text-glow">resume</span> instead.</Out>;
        else out = <Out>cat: {f}: no such file. I only keep the essentials here.</Out>;
        break;
      }
      case 'coffee':
        out = <Out>Fuel level: well past the recommended limit. Continuing anyway.</Out>;
        break;
      case 'vibe':
        out = <Out>Build the small version first. Ship it before it feels ready. Fix what actually breaks.</Out>;
        break;
      case 'date':
        out = <Out>{new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })} IST</Out>;
        break;
      case 'neofetch':
        out = (
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-dim">
            <pre className="text-glow">{`   ▄▄▄▄
  █    █
  █    █
  █▄▄▄▄█
  █
  █`}</pre>
            <pre>{`lakshit@portfolio
-----------------
role     web developer
studying computer science
location India
stack    react, typescript, python
editor   vs code
uptime   building daily
coffee   critical`}</pre>
          </div>
        );
        break;
      case 'echo':
        out = <Out>{args.join(' ')}</Out>;
        break;
      case 'clear':
        setEntries([]);
        setInput('');
        return;
      case 'sudo':
        out = <Out>Permission denied. Nice try though.</Out>;
        break;
      case 'rm':
        out = <Out>rm: permission denied, and honestly a bit rude.</Out>;
        break;
      case 'exit':
        out = <Out>There is no exit. There is only scroll.</Out>;
        break;
      default:
        out = (
          <Out>
            Command not found: <span className="text-peach">{cmd}</span>. Try{' '}
            <span className="text-glow">help</span>.
          </Out>
        );
    }

    push(trimmed, out);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(input);
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const i = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(history[i]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx === -1) return;
      const i = hIdx + 1;
      if (i >= history.length) {
        setHIdx(-1);
        setInput('');
      } else {
        setHIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <section id="terminal" className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead kicker="Shell" index="07" accent="text-leaf" title="Prefer typing? Same." />
          <p className="-mt-6 text-[14px] leading-[1.75] text-dim">
            A small shell with real commands. Arrow keys walk your history, and there are more
            commands than you would expect.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
            Quick runs
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {QUICK.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => run(c)}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-dim transition-colors hover:border-leaf/40 hover:text-leaf"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="glass relative overflow-hidden rounded-xl"
        >
          <div className="scan-line pointer-events-none absolute left-0 h-px w-full bg-glow/20" aria-hidden="true" />

          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-peach/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-leaf/70" />
            <span className="ml-3 font-mono text-[11px] text-faint">lakshit@portfolio: ~</span>
          </div>

          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="h-[360px] overflow-y-auto p-4 font-mono text-[13px] leading-[1.7] md:h-[400px] md:p-5"
          >
            {entries.map((e, i) => (
              <div key={i} className="mb-4">
                {e.cmd !== null && (
                  <div className="text-ink">
                    <span className="mr-2 text-leaf">$</span>
                    {e.cmd}
                  </div>
                )}
                {e.out}
              </div>
            ))}

            <div className="flex items-center text-ink">
              <span className="mr-2 text-leaf">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                className="term-input flex-1 bg-transparent font-mono text-[13px] text-ink caret-glow placeholder:text-faint"
                placeholder="type help"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
