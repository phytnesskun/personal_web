/* A dependency-free, accessible two-wave superposition lab. */
(() => {
  const COPY = {
    zh: {
      title: '改变相位，看看波如何相遇。',
      subtitle: '两列同频率的波，在每一个位置相加。',
      play: '播放', pause: '暂停', playback: '波形动画',
      waveA: '波 ①', waveB: '波 ②', sum: '合成波',
      plot: '两列同频率波及其合成波',
      plotDescription: '横轴显示两个完整周期；纵轴为相对位移，范围负二至正二。紫色为第一列波，蓝色为第二列波，亮色为逐点相加的合成波。',
      phase: '相位差', amplitude: '第二列波的振幅',
      phaseStart: '同相', phaseMiddle: '反相', phaseEnd: '同相',
      amplitudeStart: '关闭', amplitudeEnd: '与波 ① 相同',
      result: '合振幅', resultUnit: '第一列波的振幅 = 1',
      mode: '解释方式', intuition: '直觉', mathematics: '数学',
      position: '位置 x', displacement: '相对位移',
      constructive: '相长干涉', partial: '部分叠加', destructive: '相消干涉', single: '只有一列波',
      constructiveText: (r, a) => `波峰与波峰相遇，两列波同向叠加。当前合振幅为 ${a}；完全同相时，它等于 1 + r = ${r}。`,
      partialText: (min, max) => `两列波既不完全同相，也不完全反相。拖动相位差，合振幅会在 ${min} 与 ${max} 之间连续变化。`,
      destructiveText: (a) => `一列波的波峰遇到另一列波的波谷，振动彼此抵消。当前合振幅为 ${a}；反相且等振幅时，两列波完全抵消。`,
      singleText: '第二列波的振幅为 0，图中只剩第一列波。此时改变相位差，合振幅仍然为 1。',
      equationNote: 'r 是第二列波的相对振幅，φ 是相位差；两列波的频率相同。',
      equationDefinition: '逐点相加：y = sin θ + r sin(θ + φ)',
      equationResult: (r, p, a) => `r = ${r}，φ = ${p}° → R = ${a}`,
      screenResult: (p, r, a) => `相位差 ${p} 度，第二列波振幅 ${r}，合振幅 ${a}。`,
    },
    en: {
      title: 'Change the phase. See how waves meet.',
      subtitle: 'Two waves of the same frequency, added at every point.',
      play: 'Play', pause: 'Pause', playback: 'Wave animation',
      waveA: 'Wave ①', waveB: 'Wave ②', sum: 'Resultant',
      plot: 'Two equal-frequency waves and their sum',
      plotDescription: 'The horizontal axis spans two complete periods. The vertical axis shows relative displacement from minus two to plus two. Purple is wave one, blue is wave two, and bright ice blue is their point-by-point sum.',
      phase: 'Phase difference', amplitude: 'Amplitude of wave ②',
      phaseStart: 'In phase', phaseMiddle: 'Opposite', phaseEnd: 'In phase',
      amplitudeStart: 'Off', amplitudeEnd: 'Same as wave ①',
      result: 'Resultant amplitude', resultUnit: 'Amplitude of wave ① = 1',
      mode: 'Explanation', intuition: 'Intuition', mathematics: 'Mathematics',
      position: 'Position x', displacement: 'Relative displacement',
      constructive: 'Constructive interference', partial: 'Partial superposition', destructive: 'Destructive interference', single: 'A single wave',
      constructiveText: (r, a) => `Crests meet crests, so the waves reinforce each other. The resultant amplitude is ${a}; exactly in phase, it equals 1 + r = ${r}.`,
      partialText: (min, max) => `The waves are neither exactly in phase nor exactly opposite. Move the phase slider to vary the resultant amplitude continuously between ${min} and ${max}.`,
      destructiveText: (a) => `A crest of one wave meets a trough of the other, so their displacements cancel. The resultant amplitude is ${a}; opposite waves cancel completely when their amplitudes are equal.`,
      singleText: 'The second wave has zero amplitude, leaving only the first wave. Changing the phase now leaves the resultant amplitude at 1.',
      equationNote: 'r is the relative amplitude of wave ② and φ is the phase difference; both waves have the same frequency.',
      equationDefinition: 'Point by point: y = sin θ + r sin(θ + φ)',
      equationResult: (r, p, a) => `r = ${r}, φ = ${p}° → R = ${a}`,
      screenResult: (p, r, a) => `Phase difference ${p} degrees, wave two amplitude ${r}, resultant amplitude ${a}.`,
    },
  };

  class WaveLab extends HTMLElement {
    static get observedAttributes() { return ['lang']; }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.phase = 90;
      this.amplitude = 1;
      this.time = 0;
      this.mode = 'intuition';
      this.frame = null;
      this.lastFrame = null;
      this.lastDraw = null;
      this.inView = true;
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.playing = !this.motionQuery.matches;
      this.onVisibility = () => this.syncAnimation();
      this.onMotionPreference = event => {
        if (event.matches) this.playing = false;
        this.updatePlayback();
        this.syncAnimation();
      };
      this.tick = timestamp => {
        this.frame = null;
        if (!this.shouldAnimate()) return;
        if (this.lastFrame !== null) {
          this.time += Math.min(timestamp - this.lastFrame, 64) * 0.0007;
        }
        this.lastFrame = timestamp;
        if (this.lastDraw === null || timestamp - this.lastDraw >= 1000 / 30) {
          this.draw();
          this.lastDraw = timestamp;
        }
        this.frame = window.requestAnimationFrame(this.tick);
      };
    }

    connectedCallback() {
      if (!this.shadowRoot.firstChild) this.render();
      document.addEventListener('visibilitychange', this.onVisibility);
      this.motionQuery.addEventListener('change', this.onMotionPreference);
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(entries => {
          this.inView = entries[0].isIntersecting;
          this.syncAnimation();
        }, { threshold: 0 });
        this.observer.observe(this);
      }
      this.translate();
      this.draw();
      this.syncAnimation();
    }

    disconnectedCallback() {
      this.stopAnimation();
      this.observer?.disconnect();
      this.observer = null;
      document.removeEventListener('visibilitychange', this.onVisibility);
      this.motionQuery.removeEventListener('change', this.onMotionPreference);
      window.clearTimeout(this.announcementTimer);
    }

    attributeChangedCallback() {
      if (this.shadowRoot.firstChild) this.translate();
    }

    get copy() { return COPY[this.getAttribute('lang') === 'en' ? 'en' : 'zh']; }
    get resultant() {
      const phi = this.phase * Math.PI / 180;
      return Math.sqrt(Math.max(0, 1 + this.amplitude ** 2 + 2 * this.amplitude * Math.cos(phi)));
    }
    format(value) { return (Math.abs(value) < 0.00001 ? 0 : value).toFixed(2); }
    getNode(id) { return this.shadowRoot.getElementById(id); }

    render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host{display:block;min-width:0;color:#edf4ff;font-family:inherit;--ink:#edf4ff;--muted:#9caec8;--paper:#0d1628;--plot:#0a1020;--purple:#b794ff;--blue:#48c7ff;--sum:#e2f5ff;--line:rgba(130,163,218,.2)}
          *,*::before,*::after{box-sizing:border-box}
          button,input{font:inherit}
          button{cursor:pointer;-webkit-tap-highlight-color:transparent}
          button:focus-visible,input:focus-visible{outline:3px solid var(--blue);outline-offset:5px}
          .lab{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:clamp(18px,3.4vw,36px);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.16)}
          .head{display:flex;align-items:flex-start;justify-content:space-between;gap:22px}
          .heading{min-width:0}
          h3{font-size:clamp(19px,2.15vw,26px);font-weight:600;letter-spacing:-.035em;line-height:1.35;margin:0 0 8px}
          .subtitle{font-size:13px;line-height:1.65;color:var(--muted);margin:0}
          .play{min-width:91px;min-height:44px;flex-shrink:0;display:inline-flex;justify-content:center;align-items:center;gap:9px;border:1px solid rgba(72,199,255,.45);color:var(--blue);background:rgba(72,199,255,.06);padding:10px 15px;border-radius:8px;transition:background .18s,color .18s;font-size:12px;font-weight:600}
          .play:hover{background:var(--blue);color:var(--plot)}
          .play svg{width:11px;height:12px;fill:currentColor;flex-shrink:0}
          .legend{display:flex;flex-wrap:wrap;gap:12px 23px;align-items:center;margin:27px 0 15px;font-size:12px;line-height:1.4}
          .legend span{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}
          .legend i{width:23px;display:block;border-top:2px solid var(--purple)}
          .legend .b{border-color:var(--blue);border-top-style:dashed}
          .legend .sum{border-color:var(--sum);border-top-width:3px}
          .legend strong{font-weight:650}
          .plot-meta{display:flex;justify-content:space-between;font-size:10px;line-height:1.4;letter-spacing:.025em;color:var(--muted);margin-bottom:4px;gap:12px}
          .plot-row{display:flex;gap:9px;width:100%;height:clamp(220px,26vw,300px)}
          .y-scale{position:relative;flex:0 0 20px;font-size:10px;color:var(--muted);font-variant-numeric:tabular-nums;text-align:right}
          .y-scale span{position:absolute;right:0;transform:translateY(-50%)}
          .y-scale span:nth-child(1){top:7.14286%}.y-scale span:nth-child(2){top:28.57143%}.y-scale span:nth-child(3){top:50%}.y-scale span:nth-child(4){top:71.42857%}.y-scale span:nth-child(5){top:92.85714%}
          .plot{display:block;width:100%;height:100%;overflow:visible;min-width:0;background:var(--plot);border-radius:8px}
          .grid{stroke:#82a3da;stroke-opacity:.22;stroke-width:.75;vector-effect:non-scaling-stroke}
          .grid.minor{stroke-opacity:.1;stroke-width:.5}
          .zero{stroke-opacity:.42}
          .curve{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
          #wave-a{stroke:var(--purple);stroke-width:2}
          #wave-b{stroke:var(--blue);stroke-width:2;stroke-dasharray:6 5}
          #wave-sum{stroke:var(--sum);stroke-width:3}
          .x-scale{display:flex;justify-content:space-between;margin:3px 0 0 29px;color:var(--muted);font-size:10px;line-height:1.4;font-variant-numeric:tabular-nums}
          .sliders{display:grid;grid-template-columns:1fr 1fr;gap:36px;margin:29px 0 26px}
          .field{min-width:0}
          .label-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
          label{font-size:13px;font-weight:550;line-height:1.45}
          .value{font-size:19px;font-variant-numeric:tabular-nums;font-weight:550;letter-spacing:-.035em;white-space:nowrap;line-height:1.3}
          .value span{font-size:12px;margin-left:3px;font-weight:400}
          input[type=range]{display:block;width:100%;height:44px;margin:0;padding:0;border:0;background:transparent;appearance:none;-webkit-appearance:none;cursor:pointer;touch-action:pan-y;--range-fill:25%}
          input[type=range]::-webkit-slider-runnable-track{height:3px;background:linear-gradient(to right,var(--blue) 0,var(--blue) var(--range-fill),#2a3d5a var(--range-fill),#2a3d5a 100%);border-radius:2px}
          input[type=range]::-moz-range-track{height:3px;background:#2a3d5a;border:0;border-radius:2px}
          input[type=range]::-moz-range-progress{height:3px;background:var(--blue);border-radius:2px}
          input[type=range]::-webkit-slider-thumb{width:20px;height:20px;border:4px solid var(--paper);outline:1.5px solid var(--blue);border-radius:50%;background:var(--blue);appearance:none;-webkit-appearance:none;margin-top:-8.5px;box-shadow:0 0 12px rgba(72,199,255,.18)}
          input[type=range]::-moz-range-thumb{width:13px;height:13px;border:4px solid var(--paper);outline:1.5px solid var(--blue);border-radius:50%;background:var(--blue);box-shadow:0 0 12px rgba(72,199,255,.18)}
          .range-notes{display:flex;justify-content:space-between;gap:6px;color:var(--muted);font-size:10px;line-height:1.4}
          .readout{display:grid;grid-template-columns:minmax(145px,.8fr) minmax(0,1.6fr);gap:28px;border-top:1px solid var(--line);padding-top:23px}
          .result-label{font-size:12px;line-height:1.5;margin:1px 0 7px}
          .result-number{display:flex;gap:9px;align-items:baseline;font-size:clamp(39px,5vw,54px);font-weight:450;line-height:1;letter-spacing:-.06em;font-variant-numeric:tabular-nums}
          .result-number .symbol{font-family:Georgia,serif;font-style:italic;font-weight:400;font-size:23px;letter-spacing:0}
          .result-unit{font-size:10px;line-height:1.6;color:var(--muted);margin:10px 0 0}
          .explanation{min-width:0}
          .modes{display:flex;gap:5px;align-items:center;margin:-6px 0 10px}
          .mode{min-height:44px;padding:10px 13px;border:0;border-bottom:2px solid transparent;font-size:12px;font-weight:500;color:var(--muted);background:transparent;transition:color .18s,border-color .18s}
          .mode:first-child{padding-left:0;padding-right:13px}
          .mode[aria-pressed=true]{color:var(--blue);border-bottom-color:var(--blue);font-weight:650}
          .mode:hover{color:var(--blue)}
          .status{font-size:14px;font-weight:600;line-height:1.45;margin:0 0 6px;display:flex;align-items:center;gap:8px}
          .status::before{content:'';height:6px;width:6px;flex:0 0 6px;border-radius:50%;background:var(--blue)}
          .status[data-state=destructive]::before{background:var(--purple)}
          .status[data-state=constructive]::before{background:var(--sum)}
          .explanation-text{font-size:12px;line-height:1.8;color:var(--muted);margin:0;max-width:48ch}
          .formula{font-family:Georgia,'Times New Roman',serif;font-size:clamp(17px,2.15vw,22px);line-height:1.5;letter-spacing:-.02em;margin:0 0 5px;color:var(--ink);overflow-wrap:anywhere}
          .formula sub,.formula sup{font-size:.7em}
          .math-detail{font-size:11px;line-height:1.7;color:var(--muted);margin:4px 0}
          .calculation{font-size:12px;font-variant-numeric:tabular-nums;line-height:1.6;margin:9px 0 0;color:var(--ink)}
          [hidden]{display:none!important}
          .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
          @media(max-width:600px){.head{gap:14px}.sliders{gap:24px}.readout{grid-template-columns:1fr;gap:23px}.result{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:16px}.result-label{margin:0}.result-number{grid-column:2;grid-row:1 / 3;font-size:42px}.result-unit{margin:3px 0 0}.explanation-text{max-width:none}.legend{margin-top:23px}}
          @media(max-width:410px){.head{display:block}.play{margin-top:15px;min-height:44px}.sliders{grid-template-columns:1fr;gap:21px;margin-top:25px}.legend{gap:10px 17px}.plot-row{height:220px}.readout{padding-top:20px}.result-number{font-size:37px}.formula{font-size:18px}.plot-meta{font-size:9px}}
          @media(prefers-reduced-motion:reduce){button{transition:none!important}}
          @media(forced-colors:active){.curve,.grid{stroke:CanvasText}#wave-a{stroke-dasharray:2 4}#wave-b{stroke-dasharray:8 5}.legend i{border-color:CanvasText}.play{border:1px solid ButtonText}.status::before{background:CanvasText}}
        </style>
        <section class="lab" aria-labelledby="lab-title">
          <div class="head">
            <div class="heading"><h3 id="lab-title" data-copy="title"></h3><p class="subtitle" data-copy="subtitle"></p></div>
            <button class="play" id="play" type="button" aria-pressed="false"><svg viewBox="0 0 12 12" aria-hidden="true"><path id="play-icon"></path></svg><span id="play-label"></span></button>
          </div>
          <div class="legend" aria-hidden="true">
            <span><i></i><span data-copy="waveA"></span></span>
            <span><i class="b"></i><span data-copy="waveB"></span></span>
            <span><i class="sum"></i><strong data-copy="sum"></strong></span>
          </div>
          <div class="plot-meta" aria-hidden="true"><span data-copy="displacement"></span><span data-copy="position"></span></div>
          <div class="plot-row">
            <div class="y-scale" aria-hidden="true"><span>2</span><span>1</span><span>0</span><span>−1</span><span>−2</span></div>
            <svg class="plot" viewBox="0 0 720 280" preserveAspectRatio="none" role="img" aria-labelledby="plot-title plot-description">
              <title id="plot-title"></title><desc id="plot-description"></desc>
              <path class="grid minor" d="M0 50H720M0 110H720M0 170H720M0 230H720M90 20V260M270 20V260M450 20V260M630 20V260"></path>
              <path class="grid" d="M0 20H720M0 80H720M0 200H720M0 260H720M0 20V260M180 20V260M360 20V260M540 20V260M720 20V260"></path>
              <path class="grid zero" d="M0 140H720"></path>
              <path class="curve" id="wave-a"></path><path class="curve" id="wave-b"></path><path class="curve" id="wave-sum"></path>
            </svg>
          </div>
          <div class="x-scale" aria-hidden="true"><span>0</span><span>π</span><span>2π</span><span>3π</span><span>4π</span></div>
          <div class="sliders">
            <div class="field">
              <div class="label-row"><label for="phase" data-copy="phase"></label><output class="value" id="phase-value" for="phase">90<span>°</span></output></div>
              <input id="phase" type="range" min="0" max="360" step="1" value="90" aria-describedby="phase-notes">
              <div class="range-notes" id="phase-notes"><span data-copy="phaseStart"></span><span data-copy="phaseMiddle"></span><span data-copy="phaseEnd"></span></div>
            </div>
            <div class="field">
              <div class="label-row"><label for="amplitude" data-copy="amplitude"></label><output class="value" id="amplitude-value" for="amplitude">1.00</output></div>
              <input id="amplitude" type="range" min="0" max="1" step="0.01" value="1" aria-describedby="amplitude-notes">
              <div class="range-notes" id="amplitude-notes"><span data-copy="amplitudeStart"></span><span data-copy="amplitudeEnd"></span></div>
            </div>
          </div>
          <div class="readout">
            <div class="result">
              <p class="result-label" data-copy="result"></p>
              <div class="result-number"><span class="symbol" aria-hidden="true">R</span><output id="result-value" for="phase amplitude" aria-label="Resultant amplitude">1.41</output></div>
              <p class="result-unit" data-copy="resultUnit"></p>
            </div>
            <div class="explanation">
              <div class="modes" id="modes" role="group">
                <button class="mode" id="intuition-button" type="button" aria-pressed="true" aria-controls="intuition-panel" data-copy="intuition"></button>
                <button class="mode" id="mathematics-button" type="button" aria-pressed="false" aria-controls="mathematics-panel" data-copy="mathematics"></button>
              </div>
              <div id="intuition-panel"><p class="status" id="status"></p><p class="explanation-text" id="explanation"></p></div>
              <div id="mathematics-panel" hidden>
                <p class="formula" aria-label="R equals square root of one plus r squared plus two r cosine phi">R = √(1 + r² + 2r cos φ)</p>
                <p class="math-detail" data-copy="equationDefinition"></p>
                <p class="math-detail" data-copy="equationNote"></p>
                <p class="calculation" id="calculation"></p>
              </div>
            </div>
          </div>
          <p class="sr-only" id="announcement" aria-live="polite" aria-atomic="true"></p>
        </section>`;

      this.getNode('phase').addEventListener('input', event => {
        this.phase = Number(event.target.value);
        this.updateValues();
        this.draw();
        this.announce();
      });
      this.getNode('amplitude').addEventListener('input', event => {
        this.amplitude = Number(event.target.value);
        this.updateValues();
        this.draw();
        this.announce();
      });
      this.getNode('play').addEventListener('click', () => {
        this.playing = !this.playing;
        this.updatePlayback();
        this.syncAnimation();
      });
      for (const mode of ['intuition', 'mathematics']) {
        this.getNode(`${mode}-button`).addEventListener('click', () => {
          this.mode = mode;
          this.updateMode();
        });
      }
    }

    translate() {
      const c = this.copy;
      this.shadowRoot.querySelector('.lab').lang = this.getAttribute('lang') === 'en' ? 'en' : 'zh';
      this.shadowRoot.querySelectorAll('[data-copy]').forEach(node => {
        node.textContent = c[node.dataset.copy];
      });
      this.getNode('plot-title').textContent = c.plot;
      this.getNode('plot-description').textContent = c.plotDescription;
      this.getNode('modes').setAttribute('aria-label', c.mode);
      this.getNode('result-value').setAttribute('aria-label', c.result);
      this.shadowRoot.querySelector('.formula').setAttribute('aria-label', this.getAttribute('lang') === 'en'
        ? 'R equals the square root of one plus r squared plus two r cosine phi'
        : 'R 等于一加 r 平方加二 r 乘以余弦 φ 的平方根');
      this.updatePlayback();
      this.updateValues();
      this.updateMode();
    }

    updateValues() {
      const c = this.copy;
      const r = this.format(this.amplitude);
      const a = this.format(this.resultant);
      this.getNode('phase-value').innerHTML = `${this.phase}<span>°</span>`;
      this.getNode('amplitude-value').textContent = r;
      this.getNode('result-value').textContent = a;
      this.getNode('phase').style.setProperty('--range-fill', `${this.phase / 360 * 100}%`);
      this.getNode('amplitude').style.setProperty('--range-fill', `${this.amplitude * 100}%`);
      this.getNode('phase').setAttribute('aria-valuetext', this.getAttribute('lang') === 'en' ? `${this.phase} degrees` : `${this.phase} 度`);
      this.getNode('amplitude').setAttribute('aria-valuetext', r);
      let state = 'partial';
      let explanation = c.partialText(this.format(1 - this.amplitude), this.format(1 + this.amplitude));
      if (this.amplitude === 0) {
        state = 'single';
        explanation = c.singleText;
      } else if (this.phase === 0 || this.phase === 360) {
        state = 'constructive';
        explanation = c.constructiveText(this.format(1 + this.amplitude), a);
      } else if (this.phase === 180) {
        state = 'destructive';
        explanation = c.destructiveText(a);
      }
      this.getNode('status').textContent = c[state];
      this.getNode('status').dataset.state = state;
      this.getNode('explanation').textContent = explanation;
      this.getNode('calculation').textContent = c.equationResult(r, this.phase, a);
    }

    updateMode() {
      for (const mode of ['intuition', 'mathematics']) {
        const active = mode === this.mode;
        this.getNode(`${mode}-button`).setAttribute('aria-pressed', String(active));
        this.getNode(`${mode}-panel`).hidden = !active;
      }
    }

    updatePlayback() {
      if (!this.getNode('play')) return;
      const label = this.playing ? this.copy.pause : this.copy.play;
      this.getNode('play-label').textContent = label;
      this.getNode('play').setAttribute('aria-label', `${label} · ${this.copy.playback}`);
      this.getNode('play').setAttribute('aria-pressed', String(this.playing));
      this.getNode('play-icon').setAttribute('d', this.playing ? 'M2 1H5V11H2ZM7 1H10V11H7Z' : 'M2 1L11 6L2 11Z');
    }

    announce() {
      window.clearTimeout(this.announcementTimer);
      this.announcementTimer = window.setTimeout(() => {
        if (this.isConnected) this.getNode('announcement').textContent = this.copy.screenResult(this.phase, this.format(this.amplitude), this.format(this.resultant));
      }, 250);
    }

    draw() {
      if (!this.getNode('wave-a')) return;
      const phi = this.phase * Math.PI / 180;
      const points = [[], [], []];
      for (let i = 0; i <= 240; i += 1) {
        const x = i * 3;
        const angle = i / 240 * Math.PI * 4 - this.time;
        const a = Math.sin(angle);
        const b = this.amplitude * Math.sin(angle + phi);
        const command = i === 0 ? 'M' : 'L';
        [a, b, a + b].forEach((value, index) => {
          points[index].push(`${command}${x},${(140 - 60 * value).toFixed(2)}`);
        });
      }
      ['wave-a', 'wave-b', 'wave-sum'].forEach((id, index) => this.getNode(id).setAttribute('d', points[index].join('')));
    }

    shouldAnimate() { return this.isConnected && this.playing && this.inView && !document.hidden; }

    stopAnimation() {
      if (this.frame !== null) window.cancelAnimationFrame(this.frame);
      this.frame = null;
      this.lastFrame = null;
      this.lastDraw = null;
    }

    syncAnimation() {
      if (!this.shouldAnimate()) this.stopAnimation();
      else if (this.frame === null) this.frame = window.requestAnimationFrame(this.tick);
    }
  }

  if (!window.customElements.get('wave-lab')) window.customElements.define('wave-lab', WaveLab);
})();
