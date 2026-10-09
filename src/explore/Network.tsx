import { PROJECTS, type Project } from '../data/projects';

/**
 * Hand-laid relationship map: technologies on the left, projects on the right,
 * an SVG path between connected pairs. Selecting a tech or a project lightens
 * its links and subdues the rest. Clicking a project opens its detail.
 */

const W = 720;
const ROW = 46;
const yAt = (i: number) => 48 + i * ROW;

/* tech order follows first appearance across projects for a tidy stable map */
const TECHS: string[] = [];
PROJECTS.forEach((p) => p.technologies.forEach((t) => {
  if (!TECHS.includes(t)) TECHS.push(t);
}));

function curve(x0: number, y0: number, x1: number, y1: number) {
  const mx = (x0 + x1) / 2;
  return `M ${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
}

export default function Network({
  tech,
  project,
  onProject,
}: {
  tech: string | null;
  project: string | null;
  onProject: (id: string) => void;
}) {
  const hasSel = tech !== null || project !== null;

  const techHot = (t: string) =>
    !hasSel || tech === t || (project !== null && PROJECTS.find((p) => p.id === project)?.technologies.includes(t));
  const projHot = (p: Project) =>
    !hasSel || project === p.id || (tech !== null && p.technologies.includes(tech));
  const linkHot = (t: string, p: Project) =>
    (tech !== null && tech === t) || (project !== null && project === p.id);

  const height =
    36 + ROW * Math.max(TECHS.length, PROJECTS.length) + 20;

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      role="img"
      aria-label="A map of technologies to projects. Selecting a technology or a project dims the rest."
      className="h-auto w-full"
    >
      {/* connections */}
      {PROJECTS.flatMap((p) =>
        p.technologies.map((t) => {
          const hot = hasSel ? linkHot(t, p) : true;
          return (
            <path
              key={`${t}-${p.id}`}
              d={curve(132, yAt(TECHS.indexOf(t)), W - 180, yAt(PROJECTS.indexOf(p)))}
              fill="none"
              stroke="var(--c-glow)"
              strokeWidth={1}
              strokeOpacity={hot ? 0.5 : 0.08}
            />
          );
        }),
      )}

      {/* tech nodes */}
      {TECHS.map((t, i) => {
        const y = yAt(i);
        const hot = techHot(t);
        return (
          <g key={t} className={hot ? '' : 'opacity-30'}>
            <circle
              cx="132"
              cy={y}
              r={hot ? 3.5 : 2.5}
              fill="var(--c-glow)"
              opacity={hot ? 0.9 : 0.4}
            />
            <text
              x="118"
              y={y + 4}
              textAnchor="end"
              fill="var(--c-dim)"
              fontSize="12"
              fontFamily="var(--font-mono, monospace)"
            >
              {t}
            </text>
          </g>
        );
      })}

      {/* project nodes */}
      {PROJECTS.map((p, i) => {
        const y = yAt(i);
        const hot = projHot(p);
        return (
          <g
            key={p.id}
            onClick={() => onProject(p.id)}
            role="button"
            tabIndex={0}
            aria-label={`Inspect ${p.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onProject(p.id);
              }
            }}
            className={`cursor-pointer focus:outline-none focus-visible:outline-2 ${hot ? '' : 'opacity-30'}`}
          >
            <circle
              cx={W - 180}
              cy={y}
              r={hot ? 4 : 3}
              fill="var(--c-glow)"
              opacity={hot ? 0.95 : 0.4}
            />
            <text
              x={W - 164}
              y={y + 4}
              fill="var(--c-ink)"
              fontSize="13"
              fontFamily="var(--font-display, sans-serif)"
              fontWeight={hot ? 600 : 400}
            >
              {p.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
