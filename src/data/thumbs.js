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

  'flame-shaper': (accent) => {
    const meshLines = [
      [118,42,154,36],[154,36,194,44],[118,42,98,74],[194,44,216,76],
      [98,74,116,116],[216,76,194,118],[116,116,154,142],[194,118,154,142],
      [118,42,132,80],[154,36,154,82],[194,44,176,82],
      [132,80,154,82],[154,82,176,82],[132,80,118,108],[176,82,192,110],
      [118,108,154,122],[192,110,154,122],[154,82,154,122],
      [114,72,132,80],[196,74,176,82],[126,98,154,92],[182,98,154,92],
      [134,126,154,122],[174,126,154,122],
    ].map(([x1, y1, x2, y2]) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
    ).join('');
    const verts = [
      [118,42],[154,36],[194,44],[98,74],[216,76],[132,80],[154,82],
      [176,82],[118,108],[192,110],[154,92],[154,122],[116,116],
      [194,118],[154,142],[114,72],[196,74],[126,98],[182,98],[134,126],[174,126],
    ].map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="${i === 10 || i === 11 ? 2.6 : 1.7}" fill="${i % 4 === 0 ? accent : '#D8DEE9'}" opacity="${i % 4 === 0 ? 0.95 : 0.62}"/>`
    ).join('');
    const handles = [[98,74],[154,36],[216,76],[154,142]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="2 3" opacity="0.75"/>`
    ).join('');
    const sliders = [
      [36,56,50,0.9],
      [36,82,32,0.58],
      [36,108,62,0.72],
      [36,134,42,0.44],
    ].map(([x, y, w, op], i) =>
      `<g opacity="${op}">
        <line x1="${x}" y1="${y}" x2="${x + 74}" y2="${y}" stroke="#4C566A" stroke-width="2"/>
        <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${accent}" stroke-width="2"/>
        <circle cx="${x + w}" cy="${y}" r="4" fill="${accent}"/>
        <text x="${x}" y="${y - 8}" fill="#D8DEE9" font-size="7" font-family="JetBrains Mono, monospace">b${i + 1}</text>
      </g>`
    ).join('');
    const objRows = ['v 0012', 'v 1284', 'v 5023', 'f ...'].map((txt, i) =>
      `<text x="238" y="${58 + i * 18}" fill="${i === 2 ? accent : '#D8DEE9'}" font-size="9" font-family="JetBrains Mono, monospace" opacity="${i === 2 ? 0.95 : 0.64}">${txt}</text>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <rect x="24" y="34" width="92" height="116" rx="4" fill="#3B4252" stroke="#4C566A"/>
      ${sliders}
      <g fill="none" stroke="#4C566A" stroke-width="1">
        <path d="M 154 34 C 116 36, 92 64, 94 94 C 96 128, 126 148, 154 150 C 184 148, 214 130, 218 96 C 222 64, 194 38, 154 34 Z" fill="#3B4252" opacity="0.52"/>
        ${meshLines}
      </g>
      <path d="M 126 98 C 140 104, 168 104, 182 98" stroke="${accent}" stroke-width="1.5" fill="none" opacity="0.85"/>
      <path d="M 154 82 L 148 108 L 160 108 Z" fill="${accent}" opacity="0.22" stroke="${accent}" stroke-width="1"/>
      ${handles}
      ${verts}
      <rect x="230" y="34" width="66" height="116" rx="4" fill="#3B4252" stroke="#4C566A"/>
      <text x="238" y="46" fill="${accent}" font-size="8" font-family="JetBrains Mono, monospace">OBJ IDs</text>
      ${objRows}
      <path d="M 238 130 H 288" stroke="${accent}" stroke-width="1.2"/>
      <path d="M 282 125 L 288 130 L 282 135" stroke="${accent}" stroke-width="1.2" fill="none"/>
    </svg>`;
  },

  'kd-and-qt': (accent) => {
    const kdDots = [[30,50],[62,82],[45,130],[90,38],[120,100],[110,150],[75,112]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="2.5" fill="${accent}"/>`
    ).join('');
    const qtDots = [[185,43],[212,70],[176,110],[228,130],[262,52],[287,85],[272,146],[252,102]].map(([x,y]) =>
      `<circle cx="${x}" cy="${y}" r="2.5" fill="${accent}"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <text x="78" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#D8DEE9">KD-Tree</text>
      <text x="242" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" fill="#D8DEE9">Quadtree</text>
      <line x1="160" y1="0" x2="160" y2="180" stroke="#4C566A" stroke-width="1" stroke-dasharray="4 3"/>
      <rect x="8" y="20" width="144" height="152" fill="none" stroke="#4C566A" stroke-width="0.8"/>
      <line x1="80" y1="20" x2="80" y2="172" stroke="${accent}" stroke-width="1.4"/>
      <line x1="8" y1="70" x2="80" y2="70" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      <line x1="80" y1="122" x2="152" y2="122" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      <line x1="44" y1="20" x2="44" y2="70" stroke="${accent}" stroke-width="0.8" opacity="0.45"/>
      <line x1="116" y1="122" x2="116" y2="172" stroke="${accent}" stroke-width="0.8" opacity="0.45"/>
      ${kdDots}
      <rect x="168" y="20" width="144" height="152" fill="none" stroke="#4C566A" stroke-width="0.8"/>
      <line x1="240" y1="20" x2="240" y2="172" stroke="${accent}" stroke-width="1.4"/>
      <line x1="168" y1="96" x2="312" y2="96" stroke="${accent}" stroke-width="1.4"/>
      <line x1="204" y1="20" x2="204" y2="96" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      <line x1="168" y1="58" x2="240" y2="58" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      <line x1="276" y1="96" x2="276" y2="172" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      <line x1="240" y1="134" x2="312" y2="134" stroke="${accent}" stroke-width="1" opacity="0.72"/>
      ${qtDots}
    </svg>`;
  },

  'pbr-pipeline': (accent) => {
    const dispStripes = [0, 1, 2, 3, 4].map(i => {
      const y = 124 + i * 8;
      const op = i % 2 === 0 ? 0.72 : 0.14;
      return `<rect x="79" y="${y}" width="67" height="8" fill="#D8DEE9" opacity="${op}"/>`;
    }).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="pbr_sp" cx="35%" cy="28%" r="65%">
          <stop offset="0%" stop-color="#ECEFF4"/>
          <stop offset="35%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="#2E3440"/>
        </radialGradient>
        <radialGradient id="pbr_ao">
          <stop offset="0%" stop-color="#D8DEE9"/>
          <stop offset="100%" stop-color="#2E3440"/>
        </radialGradient>
        <linearGradient id="pbr_rgh" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2E3440"/>
          <stop offset="100%" stop-color="#ECEFF4"/>
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="#2E3440"/>
      <text x="8" y="20" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Albedo</text>
      <rect x="8" y="22" width="67" height="44" rx="2" fill="#7A4D30"/>
      <rect x="8" y="22" width="34" height="22" fill="#9A6040" opacity="0.75"/>
      <rect x="41" y="44" width="34" height="22" fill="#3D2010" opacity="0.75"/>
      <text x="79" y="20" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Normal</text>
      <rect x="79" y="22" width="67" height="44" rx="2" fill="#5E7AAC"/>
      <line x1="94" y1="46" x2="100" y2="35" stroke="#ECEFF4" stroke-width="1.3" opacity="0.9"/>
      <line x1="113" y1="42" x2="120" y2="30" stroke="#ECEFF4" stroke-width="1.3" opacity="0.9"/>
      <line x1="133" y1="48" x2="137" y2="37" stroke="#ECEFF4" stroke-width="1.3" opacity="0.9"/>
      <text x="8" y="70" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Rough</text>
      <rect x="8" y="72" width="67" height="44" rx="2" fill="url(#pbr_rgh)"/>
      <text x="79" y="70" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Metal</text>
      <rect x="79" y="72" width="67" height="44" rx="2" fill="#1C1F26"/>
      <ellipse cx="133" cy="89" rx="13" ry="8" fill="#ECEFF4" opacity="0.82"/>
      <ellipse cx="97" cy="103" rx="5" ry="3" fill="#D8DEE9" opacity="0.28"/>
      <text x="8" y="120" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">AO</text>
      <rect x="8" y="122" width="67" height="44" rx="2" fill="#2E3440"/>
      <ellipse cx="41" cy="144" rx="28" ry="18" fill="url(#pbr_ao)"/>
      <text x="79" y="120" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Displ</text>
      <rect x="79" y="122" width="67" height="44" rx="2" fill="#2E3440"/>
      ${dispStripes}
      <line x1="153" y1="90" x2="168" y2="90" stroke="${accent}" stroke-width="1.5"/>
      <path d="M 165 86 L 170 90 L 165 94" stroke="${accent}" stroke-width="1.5" fill="none"/>
      <circle cx="242" cy="90" r="66" fill="url(#pbr_sp)"/>
      <ellipse cx="222" cy="66" rx="14" ry="9" fill="#ECEFF4" opacity="0.5"/>
      <circle cx="242" cy="90" r="66" fill="none" stroke="${accent}" stroke-width="1" opacity="0.4"/>
    </svg>`;
  },

  'penumbra': (accent) => {
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="pnSph" cx="34%" cy="28%" r="66%">
          <stop offset="0%" stop-color="#ECEFF4"/>
          <stop offset="24%" stop-color="${accent}"/>
          <stop offset="68%" stop-color="#2E3440"/>
          <stop offset="100%" stop-color="#1B2030"/>
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="152" y1="0" x2="152" y2="180" stroke="#3B4252" stroke-width="1"/>

      <!-- Distant: parallel vertical rays + ground line -->
      <g stroke="${accent}" stroke-width="1.1" opacity="0.88">
        <line x1="26" y1="12" x2="26" y2="33"/>
        <line x1="38" y1="10" x2="38" y2="31"/>
        <line x1="50" y1="12" x2="50" y2="33"/>
        <line x1="22" y1="35" x2="54" y2="35"/>
      </g>
      <text x="38" y="47" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Distant</text>

      <!-- Sphere: filled circle (radius matters) + surface rays -->
      <circle cx="114" cy="26" r="7" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="1"/>
      <g stroke="${accent}" stroke-width="0.9" opacity="0.78">
        <line x1="114" y1="19" x2="114" y2="13"/>
        <line x1="114" y1="33" x2="114" y2="39"/>
        <line x1="107" y1="26" x2="101" y2="26"/>
        <line x1="121" y1="26" x2="127" y2="26"/>
        <line x1="119" y1="21" x2="123" y2="17"/>
        <line x1="119" y1="31" x2="123" y2="35"/>
        <line x1="109" y1="31" x2="105" y2="35"/>
        <line x1="109" y1="21" x2="105" y2="17"/>
      </g>
      <text x="114" y="47" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Sphere</text>

      <!-- Rect: rectangle emitter + downward rays -->
      <rect x="22" y="73" width="32" height="18" rx="1" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-width="0.95"/>
      <g stroke="${accent}" stroke-width="0.85" opacity="0.68">
        <line x1="25" y1="91" x2="21" y2="104"/>
        <line x1="33" y1="91" x2="32" y2="107"/>
        <line x1="43" y1="91" x2="44" y2="107"/>
        <line x1="51" y1="91" x2="55" y2="104"/>
      </g>
      <text x="38" y="115" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Rect</text>

      <!-- Cylinder: cylinder outline + lateral rays -->
      <ellipse cx="114" cy="74" rx="12" ry="4" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="1"/>
      <line x1="102" y1="74" x2="102" y2="94" stroke="${accent}" stroke-width="1"/>
      <line x1="126" y1="74" x2="126" y2="94" stroke="${accent}" stroke-width="1"/>
      <path d="M 102 94 A 12 4 0 0 0 126 94" stroke="${accent}" stroke-width="0.85" fill="none" opacity="0.5"/>
      <g stroke="${accent}" stroke-width="0.85" opacity="0.72">
        <line x1="102" y1="81" x2="93" y2="77"/>
        <line x1="102" y1="90" x2="93" y2="90"/>
        <line x1="126" y1="81" x2="135" y2="77"/>
        <line x1="126" y1="90" x2="135" y2="90"/>
      </g>
      <text x="114" y="115" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Cylinder</text>

      <!-- Dome: half-sphere arc centered at bottom + upward rays -->
      <path d="M 58 158 A 18 18 0 0 1 94 158" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="1"/>
      <line x1="56" y1="158" x2="96" y2="158" stroke="${accent}" stroke-width="1"/>
      <g stroke="${accent}" stroke-width="0.85" opacity="0.68">
        <line x1="76" y1="140" x2="76" y2="132"/>
        <line x1="65" y1="145" x2="59" y2="137"/>
        <line x1="87" y1="145" x2="93" y2="137"/>
      </g>
      <text x="76" y="172" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9">Dome</text>

      <circle cx="182" cy="28" r="5" fill="${accent}" opacity="0.88"/>
      <g stroke="${accent}" stroke-width="0.9" opacity="0.58">
        <line x1="182" y1="15" x2="182" y2="20"/><line x1="195" y1="28" x2="200" y2="28"/>
        <line x1="191" y1="19" x2="195" y2="15"/><line x1="169" y1="28" x2="164" y2="28"/>
        <line x1="173" y1="19" x2="169" y2="15"/>
      </g>

      <ellipse cx="252" cy="152" rx="44" ry="13" fill="#1A1F2A" opacity="0.92"/>
      <ellipse cx="249" cy="150" rx="28" ry="8" fill="#131820" opacity="0.78"/>

      <circle cx="238" cy="88" r="52" fill="url(#pnSph)"/>
      <ellipse cx="220" cy="70" rx="9" ry="6" fill="#ECEFF4" opacity="0.35" transform="rotate(-22 220 70)"/>
    </svg>`;
  },

  'lagrange-mountaineer': (accent) => {
    const contours = [[18, 13], [34, 23], [52, 35], [70, 47], [90, 61]].map(([rx, ry], i) =>
      `<ellipse cx="106" cy="116" rx="${rx}" ry="${ry}" fill="none" stroke="${accent}" stroke-width="${0.7 + i * 0.15}" opacity="${0.18 + i * 0.13}" transform="rotate(-18 106 116)"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <ellipse cx="106" cy="116" rx="18" ry="13" fill="${accent}" fill-opacity="0.12" transform="rotate(-18 106 116)"/>
      ${contours}
      <circle cx="128" cy="83" r="40" fill="none" stroke="#D8DEE9" stroke-width="1.3" stroke-dasharray="5 3" opacity="0.55"/>
      <circle cx="150" cy="50" r="4.5" fill="${accent}"/>
      <circle cx="150" cy="50" r="9" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.4"/>
      <line x1="148" y1="49" x2="162" y2="27" stroke="${accent}" stroke-width="1.5"/>
      <path d="M 157 24 L 164 29 L 156 32" stroke="${accent}" stroke-width="1.1" fill="none"/>
      <text x="167" y="24" font-family="JetBrains Mono, monospace" font-size="8" fill="${accent}">∇f</text>
      <line x1="153" y1="52" x2="167" y2="30" stroke="#D8DEE9" stroke-width="1.5" opacity="0.72"/>
      <path d="M 162 27 L 169 32 L 161 35" stroke="#D8DEE9" stroke-width="1.1" fill="none" opacity="0.72"/>
      <text x="172" y="38" font-family="JetBrains Mono, monospace" font-size="8" fill="#D8DEE9" opacity="0.72">∇g</text>
      <text x="158" y="66" font-family="JetBrains Mono, monospace" font-size="10" fill="${accent}" opacity="0.80">λ</text>
      <circle cx="106" cy="116" r="3" fill="${accent}" opacity="0.55"/>
      <text x="112" y="136" font-family="JetBrains Mono, monospace" font-size="7" fill="${accent}" opacity="0.5">f*</text>
      <text x="225" y="60" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9" opacity="0.42">g(x,y)=c</text>
      <line x1="223" y1="62" x2="198" y2="73" stroke="#D8DEE9" stroke-width="0.7" opacity="0.35"/>
    </svg>`;
  },

  'cfl-condition': (accent) => {
    const bell = (cx, hw) =>
      `M ${cx - hw} 124 Q ${cx - hw * 0.35} 124, ${cx} 68 Q ${cx + hw * 0.35} 124, ${cx + hw} 124`;
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <line x1="160" y1="8" x2="160" y2="172" stroke="#4C566A" stroke-width="1" stroke-dasharray="4 3"/>
      <line x1="12" y1="124" x2="148" y2="124" stroke="#3B4252" stroke-width="1"/>
      <line x1="172" y1="124" x2="308" y2="124" stroke="#3B4252" stroke-width="1"/>
      <text x="80" y="20" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9" opacity="0.65">Stable</text>
      <text x="240" y="20" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9" opacity="0.65">Unstable</text>
      <path d="${bell(42, 22)}" stroke="${accent}" fill="${accent}" fill-opacity="0.07" stroke-width="1" opacity="0.32"/>
      <path d="${bell(76, 22)}" stroke="${accent}" fill="${accent}" fill-opacity="0.10" stroke-width="1.1" opacity="0.54"/>
      <path d="${bell(110, 22)}" stroke="${accent}" fill="${accent}" fill-opacity="0.14" stroke-width="1.5" opacity="0.88"/>
      <line x1="44" y1="148" x2="104" y2="148" stroke="${accent}" stroke-width="1" opacity="0.55"/>
      <path d="M 100 144 L 106 148 L 100 152" stroke="${accent}" stroke-width="1" fill="none" opacity="0.55"/>
      <text x="80" y="170" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="${accent}" opacity="0.85">CFL ≤ 1</text>
      <path d="M 176 124 L 190 104 L 204 124 L 218 90 L 232 124 L 246 68 L 260 124 L 274 42 L 288 124"
        stroke="${accent}" fill="none" stroke-width="1.4" opacity="0.85"/>
      <text x="240" y="170" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="${accent}" opacity="0.85">CFL > 1</text>
    </svg>`;
  },

  'formosa-edge': (accent) => {
    const gridH = Array.from({length: 7}, (_, i) =>
      `<line x1="20" y1="${28 + i * 22}" x2="300" y2="${28 + i * 22}" stroke="#3B4252" stroke-width="0.6"/>`
    ).join('');
    const gridV = Array.from({length: 7}, (_, i) =>
      `<line x1="${44 + i * 38}" y1="14" x2="${44 + i * 38}" y2="166" stroke="#3B4252" stroke-width="0.6"/>`
    ).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <rect width="320" height="180" fill="#2E3440"/>
      <g opacity="0.5">${gridH}${gridV}</g>
      <ellipse cx="148" cy="95" rx="118" ry="68" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.16" transform="rotate(-6 148 95)"/>
      <ellipse cx="148" cy="95" rx="92" ry="53" fill="none" stroke="${accent}" stroke-width="0.9" opacity="0.26" transform="rotate(-6 148 95)"/>
      <ellipse cx="148" cy="95" rx="68" ry="38" fill="none" stroke="${accent}" stroke-width="1.0" opacity="0.38" transform="rotate(-6 148 95)"/>
      <ellipse cx="148" cy="95" rx="46" ry="26" fill="none" stroke="${accent}" stroke-width="1.2" opacity="0.54" transform="rotate(-6 148 95)"/>
      <ellipse cx="148" cy="95" rx="26" ry="15" fill="none" stroke="${accent}" stroke-width="1.4" opacity="0.72" transform="rotate(-6 148 95)"/>
      <ellipse cx="148" cy="95" rx="11" ry="7" fill="none" stroke="${accent}" stroke-width="1.6" opacity="0.88" transform="rotate(-6 148 95)"/>
      <circle cx="148" cy="95" r="3" fill="${accent}"/>
      <ellipse cx="248" cy="44" rx="38" ry="24" fill="none" stroke="${accent}" stroke-width="0.8" opacity="0.22" transform="rotate(8 248 44)"/>
      <ellipse cx="248" cy="44" rx="22" ry="15" fill="none" stroke="${accent}" stroke-width="1.0" opacity="0.40" transform="rotate(8 248 44)"/>
      <ellipse cx="248" cy="44" rx="10" ry="7" fill="none" stroke="${accent}" stroke-width="1.3" opacity="0.62" transform="rotate(8 248 44)"/>
      <circle cx="248" cy="44" r="2" fill="${accent}" opacity="0.88"/>
      <path d="M 38 162 L 88 128 L 148 95 L 208 110 L 272 92" stroke="#D8DEE9" stroke-width="1.1" fill="none" opacity="0.36"/>
      <path d="M 72 14 L 112 50 L 148 95" stroke="#D8DEE9" stroke-width="0.9" fill="none" opacity="0.26"/>
      <path d="M 52 164 C 90 145, 128 152, 148 136 C 166 120, 190 152, 232 143 L 268 124"
        stroke="${accent}" stroke-width="1.2" fill="none" opacity="0.50" stroke-dasharray="4 3"/>
      <text x="48" y="25" font-family="JetBrains Mono, monospace" font-size="7" fill="#D8DEE9" opacity="0.58">TWD97</text>
      <g stroke="${accent}" stroke-width="0.9" fill="none" opacity="0.55">
        <polygon points="283,28 305,56 261,56"/>
        <line x1="283" y1="28" x2="283" y2="56"/>
        <line x1="261" y1="42" x2="305" y2="42"/>
        <line x1="272" y1="42" x2="261" y2="56"/>
        <line x1="294" y1="42" x2="305" y2="56"/>
      </g>
      <text x="283" y="68" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="6" fill="${accent}" opacity="0.70">LOD</text>
    </svg>`;
  },

  'meat-mesh': (accent) => {
    const grid = [
      [93,58],[121,48],[151,46],[181,52],[207,69],
      [82,86],[113,80],[146,76],[179,82],[217,96],
      [90,115],[120,114],[151,108],[185,118],[208,132],
      [113,143],[145,138],[175,146],
    ];
    const edges = [
      [0,1],[1,2],[2,3],[3,4],[5,6],[6,7],[7,8],[8,9],[10,11],[11,12],[12,13],[13,14],[15,16],[16,17],
      [0,5],[5,10],[1,6],[6,11],[11,15],[2,7],[7,12],[12,16],[3,8],[8,13],[13,17],[4,9],[9,14],
      [0,6],[1,7],[2,8],[3,9],[5,11],[6,12],[7,13],[8,14],[10,15],[11,16],[12,17],
    ].map(([a, b], i) => {
      const [x1, y1] = grid[a];
      const [x2, y2] = grid[b];
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" opacity="${i % 5 === 0 ? 0.72 : 0.42}"/>`;
    }).join('');
    const nodes = grid.map(([x, y], i) =>
      `<circle cx="${x}" cy="${y}" r="${i === 7 || i === 12 ? 3.1 : 2}" fill="${i % 4 === 0 ? accent : '#D8DEE9'}" opacity="${i % 4 === 0 ? 0.95 : 0.7}"/>`
    ).join('');
    const pins = [[93,58],[207,69],[113,143],[175,146]].map(([x, y]) =>
      `<circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="2 3" opacity="0.7"/>`
    ).join('');
    const traces = [0, 1, 2, 3].map((_, i) => {
      const y = 48 + i * 24;
      return `<path d="M 238 ${y} C 252 ${y - 12}, 266 ${y + 12}, 284 ${y}" stroke="${accent}" stroke-width="1.1" fill="none" opacity="${(0.85 - i * 0.14).toFixed(2)}"/>`;
    }).join('');
    return `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <radialGradient id="meatBody" cx="42%" cy="35%" r="70%">
          <stop offset="0%" stop-color="#D8DEE9"/>
          <stop offset="45%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="#3B4252"/>
        </radialGradient>
      </defs>
      <rect width="320" height="180" fill="#2E3440"/>
      <path d="M 86 61 C 111 30, 175 32, 210 62 C 238 86, 222 130, 188 151 C 153 172, 98 151, 82 121 C 69 96, 66 77, 86 61 Z"
        fill="url(#meatBody)" opacity="0.58"/>
      <g stroke="#4C566A" stroke-width="1" fill="none">
        ${edges}
      </g>
      <path d="M 74 130 C 111 108, 132 124, 158 102 S 199 94, 224 113" stroke="${accent}" stroke-width="1.8" fill="none" opacity="0.82"/>
      <path d="M 82 72 C 112 88, 144 62, 179 81 S 209 104, 225 88" stroke="#ECEFF4" stroke-width="1" fill="none" opacity="0.42"/>
      ${pins}
      ${nodes}
      <g font-family="JetBrains Mono, monospace" font-size="8" fill="#D8DEE9" opacity="0.74">
        <text x="238" y="30">PBD</text>
        <text x="238" y="150">60 fps</text>
      </g>
      ${traces}
      <line x1="238" y1="132" x2="288" y2="132" stroke="#4C566A" stroke-width="1"/>
      <circle cx="272" cy="132" r="4" fill="${accent}"/>
    </svg>`;
  },
};
