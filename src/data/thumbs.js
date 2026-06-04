export const THUMBS = {
  'gaussian-splatting': (accent) => {
    const positions = [
      [60,70,42,28,-15],[110,120,55,35,20],[170,60,38,55,40],[225,110,60,30,-30],
      [255,55,30,46,10],[80,135,30,38,55],[195,140,35,22,-10],[145,90,28,28,0],[40,40,18,18,0],
    ];
    const grads = positions.map((_, i) => `
      <radialGradient id="gs${i}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.85"/>
        <stop offset="60%" stop-color="${accent}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>`).join('');
    const ellipses = positions.map(([cx,cy,rx,ry,r], i) =>
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gs${i})" transform="rotate(${r} ${cx} ${cy})"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>${grads}</defs>
      <rect width="320" height="180" fill="#2E3440"/>${ellipses}
    </svg>`;
  },

  'tsdf-fusion': (accent) => {
    const waves = [-30,-22,-14,-6,2,10,18,26].map((off, i) =>
      `<path d="M 0 ${100+off} Q 60 ${70+off}, 120 ${100+off} T 240 ${100+off} T 360 ${100+off}"
        stroke="${accent}" fill="none" stroke-width="1"
        stroke-opacity="${i === 4 ? 1 : i === 3 || i === 5 ? 0.33 : 0.18}"/>`
    ).join('');
    const vlines = Array.from({length:17}, (_,i) =>
      `<line x1="${i*20}" y1="0" x2="${i*20}" y2="180" stroke="#434C5E" stroke-width="0.5"/>`
    ).join('');
    const hlines = Array.from({length:10}, (_,i) =>
      `<line x1="0" y1="${i*20}" x2="320" y2="${i*20}" stroke="#434C5E" stroke-width="0.5"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g opacity="0.7">${vlines}${hlines}</g>
      ${waves}
    </svg>`;
  },

  'marching-cubes': (accent) => {
    const cells = Array.from({length:8}, (_,r) =>
      Array.from({length:14}, (_,c) =>
        `<rect x="${20+c*20}" y="${20+r*20}" width="20" height="20" fill="none" stroke="#4C566A" stroke-width="1"/>`
      ).join('')
    ).join('');
    const dots = [[80,60],[140,40],[180,100],[120,120],[200,60]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="3" fill="${accent}"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      ${cells}
      ${dots}
      <path d="M 80 60 L 140 40 L 200 60 L 180 100 L 120 120 Z"
        fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="1.5"/>
    </svg>`;
  },

  'camera-projection': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g stroke="${accent}" fill="none" stroke-width="1.2">
        <path d="M 50 90 L 220 30 L 280 30 L 280 150 L 220 150 Z" stroke-opacity="0.85"/>
        <line x1="50" y1="90" x2="220" y2="30"/>
        <line x1="50" y1="90" x2="280" y2="30"/>
        <line x1="50" y1="90" x2="280" y2="150"/>
        <line x1="50" y1="90" x2="220" y2="150"/>
        <line x1="220" y1="30"  x2="220" y2="150"/>
        <line x1="280" y1="30"  x2="280" y2="150"/>
        <line x1="220" y1="60"  x2="280" y2="60"  stroke-opacity="0.4"/>
        <line x1="220" y1="90"  x2="280" y2="90"  stroke-opacity="0.4"/>
        <line x1="220" y1="120" x2="280" y2="120" stroke-opacity="0.4"/>
        <line x1="240" y1="30"  x2="240" y2="150" stroke-opacity="0.4"/>
        <line x1="260" y1="30"  x2="260" y2="150" stroke-opacity="0.4"/>
      </g>
      <circle cx="50" cy="90" r="4" fill="${accent}"/>
      <circle cx="170" cy="55" r="2.5" fill="#ECEFF4"/>
      <circle cx="185" cy="110" r="2.5" fill="#ECEFF4"/>
      <circle cx="200" cy="80" r="2.5" fill="#ECEFF4"/>
    </svg>`;
  },

  'camera-calibration': (accent) => {
    const squares = Array.from({length:5}, (_,r) =>
      Array.from({length:7}, (_,c) =>
        `<rect x="${c*28}" y="${r*22}" width="28" height="22" fill="${(r+c)%2 ? '#3B4252' : '#D8DEE9'}"/>`
      ).join('')
    ).join('');
    const corners = [
      [80,55],[108,53],[136,51],[164,49],
      [82,77],[110,75],[138,73],[166,71],
      [84,99],[112,97],[140,95],[168,93],
    ].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="${accent}"/>`).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g transform="translate(60 25) skewX(-12) skewY(4)">${squares}</g>
      ${corners}
      <line x1="108" y1="75" x2="115" y2="80" stroke="${accent}" stroke-width="1" opacity="0.7"/>
      <line x1="138" y1="73" x2="143" y2="69" stroke="${accent}" stroke-width="1" opacity="0.7"/>
    </svg>`;
  },

  'ransac': (accent) => {
    const inliers = [[55,128],[80,118],[105,107],[140,93],[170,80],[200,70],[230,60],[260,50]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="3" fill="${accent}"/>`
    ).join('');
    const outliers = [[70,50],[120,160],[180,40],[220,150],[90,160],[250,160]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="3" fill="none" stroke="#4C566A" stroke-width="1"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="30" y1="140" x2="290" y2="50" stroke="${accent}" stroke-width="1.5"/>
      <line x1="30" y1="120" x2="290" y2="30" stroke="${accent}" stroke-width="0.6" stroke-dasharray="3 3"/>
      <line x1="30" y1="160" x2="290" y2="70" stroke="${accent}" stroke-width="0.6" stroke-dasharray="3 3"/>
      ${inliers}${outliers}
    </svg>`;
  },

  'dlt': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g font-family="JetBrains Mono, monospace" font-size="10" fill="#D8DEE9">
        <text x="30" y="40">[</text>
        <text x="40" y="40">x</text><text x="60" y="40">y</text><text x="80" y="40">z</text><text x="100" y="40">1</text>
        <text x="40" y="58">0</text><text x="60" y="58">0</text><text x="80" y="58">0</text><text x="100" y="58">0</text>
        <text x="40" y="76">·</text><text x="60" y="76">·</text><text x="80" y="76">·</text><text x="100" y="76">·</text>
        <text x="115" y="58">]</text>
      </g>
      <line x1="135" y1="60" x2="170" y2="60" stroke="${accent}" stroke-width="1.2" fill="none"/>
      <path d="M 165 56 L 170 60 L 165 64" stroke="${accent}" stroke-width="1.2" fill="none"/>
      <g font-family="JetBrains Mono, monospace" font-size="10" fill="${accent}">
        <text x="180" y="40">P</text>
        <text x="200" y="40">=</text>
        <text x="220" y="40">[ p₁₁ p₁₂ p₁₃ p₁₄ ]</text>
        <text x="220" y="58">[ p₂₁ p₂₂ p₂₃ p₂₄ ]</text>
        <text x="220" y="76">[ p₃₁ p₃₂ p₃₃ p₃₄ ]</text>
      </g>
      <g stroke="${accent}" fill="none" stroke-width="1" opacity="0.55">
        <rect x="100" y="115" width="120" height="50"/>
        <line x1="100" y1="140" x2="220" y2="140" stroke-dasharray="2 3"/>
        <circle cx="135" cy="135" r="2.5" fill="${accent}"/>
        <circle cx="170" cy="148" r="2.5" fill="${accent}"/>
        <circle cx="200" cy="125" r="2.5" fill="${accent}"/>
      </g>
    </svg>`;
  },

  'taylorflow': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="0" y1="90" x2="320" y2="90" stroke="#434C5E" stroke-width="1"/>
      <line x1="160" y1="0" x2="160" y2="180" stroke="#434C5E" stroke-width="1"/>
      <path d="M 0 90 Q 40 30, 80 90 T 160 90 T 240 90 T 320 90"
        stroke="#4C566A" fill="none" stroke-width="1"/>
      <path d="M 110 90 Q 130 60, 160 90 T 210 90"
        stroke="${accent}" fill="none" stroke-width="1.5" opacity="0.5"/>
      <path d="M 80 90 Q 120 40, 160 90 T 240 90"
        stroke="${accent}" fill="none" stroke-width="1.5"/>
      <circle cx="160" cy="90" r="4" fill="${accent}"/>
      <circle cx="160" cy="90" r="9" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.5"/>
    </svg>`;
  },

  'newton': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="0" y1="120" x2="320" y2="120" stroke="#434C5E" stroke-width="1"/>
      <path d="M 20 30 C 80 30, 100 130, 160 130 S 280 50, 300 50"
        stroke="#D8DEE9" fill="none" stroke-width="1.3"/>
      <g stroke="${accent}" stroke-width="1" fill="none">
        <line x1="50"  y1="120" x2="50"  y2="42"/>
        <line x1="50"  y1="42"  x2="118" y2="120"/>
        <line x1="118" y1="120" x2="118" y2="98"/>
        <line x1="118" y1="98"  x2="148" y2="120"/>
        <line x1="148" y1="120" x2="148" y2="116"/>
      </g>
      <circle cx="155" cy="120" r="4" fill="${accent}"/>
      <circle cx="50"  cy="120" r="2.5" fill="${accent}"/>
      <circle cx="118" cy="120" r="2.5" fill="${accent}"/>
      <circle cx="148" cy="120" r="2.5" fill="${accent}"/>
    </svg>`;
  },

  'hessian': (accent) => {
    const uPaths = Array.from({length:9}, (_, i) => {
      const t = i / 8;
      const y0 = 40 + t * 100;
      const amp = 26;
      const phase = (t - 0.5) * 2;
      const op = Math.min(1, 0.25 + Math.abs(t - 0.5) * 1.2).toFixed(2);
      return `<path d="M 50 ${(y0 - amp*phase).toFixed(1)} Q 110 ${(y0 - amp*phase + amp*0.6).toFixed(1)}, 160 ${y0.toFixed(1)} T 270 ${(y0 + amp*phase).toFixed(1)}" stroke-opacity="${op}"/>`;
    }).join('');
    const vPaths = Array.from({length:11}, (_, i) => {
      const t = i / 10;
      const x = 50 + t * 220;
      const phase = (t - 0.5) * 2;
      const op = Math.min(1, 0.25 + Math.abs(t - 0.5) * 1.2).toFixed(2);
      return `<path d="M ${x.toFixed(1)} ${(40 + 26*phase).toFixed(1)} Q ${x.toFixed(1)} 90, ${x.toFixed(1)} ${(140 - 26*phase).toFixed(1)}" stroke-opacity="${op}"/>`;
    }).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g stroke="${accent}" fill="none" stroke-width="0.8" opacity="0.85">
        ${uPaths}${vPaths}
      </g>
      <circle cx="160" cy="90" r="4" fill="${accent}"/>
    </svg>`;
  },

  'matrix-decomp': (accent) => {
    const opacities = [0.7,0.4,0.9,0.5,0.8,0.35,0.6,0.85,0.45,0.75,0.3,0.65];
    const aBlocks = Array.from({length:4}, (_,r) =>
      Array.from({length:3}, (_,c) =>
        `<rect x="${36+c*18}" y="${56+r*18}" width="14" height="14" fill="${accent}" opacity="${opacities[(r*3+c)%12]}"/>`
      ).join('')
    ).join('');
    const uBlocks = [[0,0],[1,1],[2,2],[3,0]].map(([r,c]) =>
      `<rect x="${126+c*18}" y="${56+r*18}" width="14" height="14" fill="${accent}" opacity="0.85"/>`
    ).join('');
    const sigmaBlocks = [0,1,2].map(i =>
      `<rect x="${196+i*18}" y="${56+i*18}" width="14" height="14" fill="${accent}"/>`
    ).join('');
    const vBlocks = Array.from({length:3}, (_,r) =>
      Array.from({length:3}, (_,c) =>
        `<rect x="${264+c*15}" y="${69+r*15}" width="11" height="11" fill="${accent}" opacity="${opacities[(r*3+c+3)%12]}"/>`
      ).join('')
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <rect x="30" y="50" width="60" height="80" fill="#3B4252" stroke="#4C566A"/>
      ${aBlocks}
      <text x="100" y="95" font-family="JetBrains Mono, monospace" font-size="14" fill="#D8DEE9">=</text>
      <rect x="120" y="50" width="60" height="80" fill="#3B4252" stroke="#4C566A"/>
      ${uBlocks}
      <rect x="190" y="50" width="60" height="80" fill="#3B4252" stroke="#4C566A"/>
      ${sigmaBlocks}
      <rect x="260" y="65" width="50" height="50" fill="#3B4252" stroke="#4C566A"/>
      ${vBlocks}
    </svg>`;
  },

  'gram-schmidt': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g transform="translate(160 110)">
        <g stroke="#4C566A" fill="none" stroke-width="1">
          <line x1="0" y1="0" x2="100" y2="-30"/>
          <line x1="0" y1="0" x2="60" y2="-70"/>
          <line x1="0" y1="0" x2="-30" y2="-50"/>
        </g>
        <g stroke="${accent}" stroke-width="1.5" fill="${accent}">
          <line x1="0" y1="0" x2="100" y2="-30"/>
          <polygon points="100,-30 95,-26 95,-34"/>
          <line x1="0" y1="0" x2="-25" y2="-83"/>
          <polygon points="-25,-83 -29,-79 -19,-78"/>
          <line x1="0" y1="0" x2="-60" y2="20"/>
          <polygon points="-60,20 -57,16 -52,21"/>
        </g>
        <line x1="60" y1="-70" x2="60" y2="-18" stroke="${accent}" stroke-width="0.7" stroke-dasharray="2 3"/>
        <circle cx="0" cy="0" r="2.5" fill="#ECEFF4"/>
      </g>
    </svg>`;
  },

  'cpu-scheduling': (accent) => {
    const sc = 25, ox = 45, barH = 20;
    const oy = 152;
    const vgrid = Array.from({length: 11}, (_, i) =>
      `<line x1="${ox+i*sc}" y1="22" x2="${ox+i*sc}" y2="${oy}" stroke="#3B4252" stroke-width="1"/>`
    ).join('');
    const axis = `<line x1="${ox}" y1="${oy}" x2="${ox+10*sc}" y2="${oy}" stroke="#4C566A" stroke-width="1"/>`;
    const ticks = Array.from({length: 11}, (_, i) =>
      `<text x="${ox+i*sc}" y="${oy+12}" text-anchor="middle" font-size="8" fill="#4C566A" font-family="monospace">${i}</text>`
    ).join('');
    const procs = [
      [28,  [[0,2],[7,9]],  1.0],
      [58,  [[2,4]],        0.72],
      [88,  [[4,6],[9,10]], 0.50],
      [118, [[6,7]],        0.34],
    ];
    const bars = procs.map(([y, segs, op], idx) => {
      const label = `<text x="${ox-5}" y="${y+barH/2+4}" text-anchor="end" font-size="8" fill="#D8DEE9" font-family="monospace">P${idx+1}</text>`;
      const rects = segs.map(([s, e]) =>
        `<rect x="${ox+s*sc+1}" y="${y}" width="${(e-s)*sc-2}" height="${barH}" rx="2" fill="${accent}" opacity="${op}"/>`
      ).join('');
      return label + rects;
    }).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      ${vgrid}${axis}${ticks}${bars}
    </svg>`;
  },

  'pbd-flags': (accent) => {
    const verticals = Array.from({length: 8}, (_, i) => {
      const x = 58 + i * 28;
      return `<line x1="${x}" y1="32" x2="${x}" y2="148" stroke="#434C5E" stroke-width="0.8" opacity="0.7"/>`;
    }).join('');
    const horizontals = Array.from({length: 6}, (_, i) => {
      const y = 38 + i * 22;
      return `<path d="M 58 ${y} C 105 ${y - 4}, 155 ${y + 8}, 205 ${y + 2} S 255 ${y - 8}, 262 ${y - 2}" stroke="#4C566A" stroke-width="0.8" fill="none" opacity="0.75"/>`;
    }).join('');
    const particleDots = [
      [58,38],[86,34],[114,36],[142,46],[170,48],[198,43],[226,37],[254,32],[262,34],
      [58,60],[86,57],[114,60],[142,68],[170,70],[198,66],[226,59],[254,55],[262,56],
      [58,82],[86,80],[114,83],[142,90],[170,92],[198,88],[226,82],[254,78],[262,79],
      [58,104],[86,103],[114,106],[142,112],[170,114],[198,110],[226,104],[254,101],[262,101],
      [58,126],[86,126],[114,128],[142,133],[170,135],[198,132],[226,127],[254,124],[262,123],
      [58,140],[86,140],[114,142],[142,146],[170,148],[198,146],[226,142],[254,140],[262,140],
    ].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${accent}" opacity="0.9"/>`).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="52" y1="24" x2="52" y2="154" stroke="#D8DEE9" stroke-width="2"/>
      <circle cx="52" cy="24" r="3" fill="#D8DEE9"/>
      ${verticals}
      ${horizontals}
      <path d="M 58 38 C 110 24, 162 56, 214 44 S 254 28, 262 34
               L 262 140
               C 218 148, 166 118, 116 130 S 74 146, 58 140 Z"
        fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="1.6"/>
      ${particleDots}
    </svg>`;
  },

  'spherical-harmonic-planet': (accent) => {
    const longitudes = Array.from({length: 9}, (_, i) => {
      const x = 160 + (i - 4) * 15;
      const rx = Math.max(6, 62 - Math.abs(i - 4) * 10);
      return `<ellipse cx="${x}" cy="92" rx="${rx}" ry="66" fill="none" stroke="#4C566A" stroke-width="0.7" opacity="0.42"/>`;
    }).join('');
    const latitudes = [-48, -28, -10, 10, 28, 48].map((y, i) => {
      const rx = 86 * Math.cos((Math.abs(y) / 60) * Math.PI / 2);
      return `<ellipse cx="160" cy="${92 + y}" rx="${rx.toFixed(1)}" ry="${(rx * 0.25).toFixed(1)}" fill="none" stroke="#4C566A" stroke-width="0.75" opacity="${i === 2 || i === 3 ? 0.55 : 0.34}"/>`;
    }).join('');
    const bands = [
      [80, 128, 30, 8, 0.22],
      [106, 88, 42, 11, 0.32],
      [152, 58, 36, 9, 0.44],
      [186, 110, 52, 13, 0.36],
      [224, 76, 34, 8, 0.26],
    ].map(([x, y, rx, ry, op]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${accent}" opacity="${op}" transform="rotate(-18 ${x} ${y})"/>`
    ).join('');
    const samples = [
      [102,56],[128,41],[171,34],[209,47],[232,82],[220,120],[184,145],
      [140,146],[99,126],[82,91],[118,76],[151,100],[190,82],[166,122],
    ].map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 2.2 : 1.6}" fill="${i % 2 ? '#ECEFF4' : accent}" opacity="${i % 2 ? 0.65 : 0.9}"/>`
    ).join('');
    const spectrum = Array.from({length: 8}, (_, i) => {
      const h = [15, 28, 42, 31, 23, 17, 11, 7][i];
      return `<rect x="${246 + i * 7}" y="${140 - h}" width="4" height="${h}" fill="${accent}" opacity="${Math.max(0.25, 0.95 - i * 0.09).toFixed(2)}"/>`;
    }).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="shPlanetBody" cx="42%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#D8DEE9"/>
          <stop offset="38%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="#2E3440"/>
        </radialGradient>
        <clipPath id="shPlanetClip">
          <circle cx="160" cy="92" r="70"/>
        </clipPath>
      </defs>
      <rect width="320" height="180" fill="#2E3440"/>
      <g opacity="0.45" stroke="#434C5E" stroke-width="0.7">
        <path d="M 36 146 C 75 126, 108 126, 145 146 S 222 166, 284 132" fill="none"/>
        <path d="M 38 120 C 78 100, 116 106, 156 123 S 229 136, 282 104" fill="none" opacity="0.55"/>
      </g>
      <circle cx="160" cy="92" r="70" fill="url(#shPlanetBody)"/>
      <g clip-path="url(#shPlanetClip)">
        ${bands}
        ${longitudes}
        ${latitudes}
        <path d="M 75 100 C 103 73, 126 84, 153 62 S 203 54, 238 77" stroke="${accent}" stroke-width="2" fill="none" opacity="0.9"/>
        <path d="M 87 124 C 126 116, 144 135, 184 119 S 220 99, 237 120" stroke="#ECEFF4" stroke-width="1.1" fill="none" opacity="0.48"/>
      </g>
      <circle cx="160" cy="92" r="70" fill="none" stroke="${accent}" stroke-width="1.4" opacity="0.9"/>
      ${samples}
      <g font-family="JetBrains Mono, monospace" font-size="8" fill="#D8DEE9" opacity="0.78">
        <text x="238" y="35">l=0</text>
        <text x="267" y="35">12</text>
      </g>
      <line x1="246" y1="140" x2="304" y2="140" stroke="#4C566A" stroke-width="1"/>
      ${spectrum}
    </svg>`;
  },
};
