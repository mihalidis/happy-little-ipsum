import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Background.module.css'

// ── Pine Tree ────────────────────────────────────────────────────────────────

interface TreeProps { cx: number; by: number; s: number }

function PineTree({ cx, by, s }: TreeProps) {
  const green     = '#3D6B47'
  const darkGreen = '#2E5236'
  const brown     = '#7A4E2D'
  return (
    <g>
      <polygon points={`${cx},${by-82*s} ${cx-24*s},${by-52*s} ${cx+24*s},${by-52*s}`} fill={darkGreen} />
      <polygon points={`${cx},${by-62*s} ${cx-36*s},${by-24*s} ${cx+36*s},${by-24*s}`} fill={green} />
      <polygon points={`${cx},${by-40*s} ${cx-48*s},${by}      ${cx+48*s},${by}`}      fill={darkGreen} />
      <rect x={cx-6*s} y={by} width={12*s} height={14*s} fill={brown} />
    </g>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TREES: (TreeProps & { key: number })[] = [
  { key: 0,  cx: 55,   by: 845, s: 1.05 },
  { key: 1,  cx: 145,  by: 835, s: 1.30 },
  { key: 2,  cx: 240,  by: 848, s: 0.90 },
  { key: 3,  cx: 340,  by: 838, s: 1.15 },
  { key: 4,  cx: 445,  by: 850, s: 0.82 },
  { key: 5,  cx: 560,  by: 840, s: 1.20 },
  { key: 6,  cx: 685,  by: 845, s: 1.00 },
  { key: 7,  cx: 820,  by: 834, s: 1.38 },
  { key: 8,  cx: 970,  by: 847, s: 0.88 },
  { key: 9,  cx: 1095, by: 837, s: 1.10 },
  { key: 10, cx: 1215, by: 842, s: 1.05 },
  { key: 11, cx: 1345, by: 834, s: 1.22 },
  { key: 12, cx: 1425, by: 848, s: 0.92 },
]

// Peek positions — clear gaps between tree pairs
const BOB_POSITIONS = [
  { cx: 290,  by: 868 },
  { cx: 905,  by: 866 },
  { cx: 1278, by: 866 },
]

// Image ratio 2816:1536 ≈ 1.833 → 380×207 SVG units
const BOB_W = 380
const BOB_H = 207

interface CloudConfig { y: number; dur: number; begin: number; s: number; op: number }

const CLOUDS: CloudConfig[] = [
  { y: 82,  dur: 62, begin:   0, s: 1.30, op: 0.72 },
  { y: 148, dur: 44, begin: -14, s: 1.00, op: 0.65 },
  { y: 58,  dur: 36, begin:  -8, s: 0.78, op: 0.58 },
  { y: 198, dur: 54, begin: -27, s: 1.10, op: 0.68 },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Background() {
  const [bobVisible, setBobVisible] = useState(false)
  const [bobPos, setBobPos] = useState(BOB_POSITIONS[1])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const rand = (min: number, max: number) =>
      min + Math.random() * (max - min)

    const pickPos = () =>
      BOB_POSITIONS[Math.floor(Math.random() * BOB_POSITIONS.length)]

    const hide = () => {
      setBobVisible(false)
      // After hiding, wait 20–40 s before next appearance
      timerRef.current = setTimeout(show, rand(20000, 40000))
    }

    const show = () => {
      setBobPos(pickPos())
      setBobVisible(true)
      // Stay visible 7–12 s
      timerRef.current = setTimeout(hide, rand(7000, 12000))
    }

    // First appearance after 4–10 s
    timerRef.current = setTimeout(show, rand(4000, 10000))

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className={styles.bg} aria-hidden="true">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
        overflow="hidden"
      >
        {/* ── Far misty hills ── */}
        <path
          d="M0,670 C200,610 400,655 600,615 C800,575 1000,635 1180,598 C1290,575 1370,590 1440,582 L1440,900 L0,900 Z"
          fill="rgba(139,168,136,0.18)"
        />

        {/* ── Near hill ── */}
        <path
          d="M0,795 C230,738 440,774 640,738 C840,702 1030,758 1210,722 C1305,702 1375,714 1440,708 L1440,900 L0,900 Z"
          fill="rgba(61,107,71,0.22)"
        />

        {/* ── Pine trees ── */}
        {TREES.map((t) => (
          <g
            key={t.key}
            className={styles.tree}
            style={{
              animationDelay:    `${(t.key * 0.42) % 2.2}s`,
              animationDuration: `${3.2 + (t.key % 5) * 0.55}s`,
              transformOrigin:   `${t.cx}px ${t.by + 14 * t.s}px`,
            }}
            opacity={0.50}
          >
            <PineTree cx={t.cx} by={t.by} s={t.s} />
          </g>
        ))}

        {/* ── Bob Ross peek — single instance, React-controlled ── */}
        <g
          style={{
            transform:  bobVisible ? 'translateY(0)' : 'translateY(270px)',
            transition: bobVisible
              ? 'transform 0.75s cubic-bezier(0.34, 1.45, 0.64, 1)'
              : 'transform 0.55s ease-in',
          }}
        >
          <image
            href="/images/bob-ross-chibi.png"
            x={bobPos.cx - BOB_W / 2}
            y={bobPos.by - BOB_H}
            width={BOB_W}
            height={BOB_H}
          />
        </g>

        {/* ── Floating clouds (SMIL translate) ── */}
        {CLOUDS.map((c, i) => (
          <g key={i} opacity={c.op}>
            <ellipse cx={62*c.s}  cy={c.y}            rx={54*c.s} ry={30*c.s} fill="white" />
            <ellipse cx={104*c.s} cy={c.y - 9*c.s}    rx={42*c.s} ry={26*c.s} fill="white" />
            <ellipse cx={22*c.s}  cy={c.y + 4*c.s}    rx={30*c.s} ry={20*c.s} fill="white" />
            <rect x={-12*c.s} y={c.y + 6*c.s} width={164*c.s} height={26*c.s} rx={13*c.s} fill="white" />
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-320 0"
              to="1760 0"
              dur={`${c.dur}s`}
              begin={`${c.begin}s`}
              repeatCount="indefinite"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
