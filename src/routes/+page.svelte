<script lang="ts">
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isDropdownOpen = false;
  let selectedMethod = 'Select Method';
  let dropdownEl: HTMLDivElement;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      isDropdownOpen = false;
    }
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function selectMethod(method: string) {
    selectedMethod = method;
    isDropdownOpen = false;
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="dm-app">
  <div class="dm-container">
  <!-- Header -->
  <header class="dm-header">
    <div class="dm-logo">
      <img src={`${base}/images/dm_whole.png`} alt="Datamonkey Logo" class="dm-logo__image" />
      <h1 class="dm-logo__text">Datamonkey</h1>
    </div>
    <nav class="dm-nav">
      <button class="dm-button">Analyses</button>
      <button class="dm-button">Documentation</button>
      <button class="dm-button">Support</button>
      <a href="https://github.com/veg" class="dm-github-link" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
        <svg height="32" viewBox="0 0 16 16" width="32">
          <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="dm-hero">
    <div class="dm-hero__background">
      <div class="dm-circuit-bg"></div>
      <div class="dm-glow"></div>
      <div class="dm-dna-rain dm-dna-rain--left">
        <div class="dm-dna-rain__column dm-dna-rain--slow dm-dna-rain--wide">
          <span class="dm-dna-rain__symbol">A</span><span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">G</span>
        </div>
        <div class="dm-dna-rain__column dm-dna-rain--fast dm-dna-rain--tight">
          <span class="dm-dna-rain__symbol">G</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">A</span><span class="dm-dna-rain__symbol">G</span><span class="dm-dna-rain__symbol">C</span>
        </div>
        <div class="dm-dna-rain__column dm-dna-rain--medium dm-dna-rain--normal">
          <span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">A</span><span class="dm-dna-rain__symbol">G</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">T</span>
        </div>
      </div>
      <div class="dm-dna-rain dm-dna-rain--right">
        <div class="dm-dna-rain__column dm-dna-rain--veryfast dm-dna-rain--tight">
          <span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">G</span><span class="dm-dna-rain__symbol">A</span><span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">G</span>
        </div>
        <div class="dm-dna-rain__column dm-dna-rain--slow dm-dna-rain--wide">
          <span class="dm-dna-rain__symbol">A</span><span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">G</span>
        </div>
        <div class="dm-dna-rain__column dm-dna-rain--medium dm-dna-rain--normal">
          <span class="dm-dna-rain__symbol">G</span><span class="dm-dna-rain__symbol">C</span><span class="dm-dna-rain__symbol">T</span><span class="dm-dna-rain__symbol">A</span>
        </div>
      </div>
    </div>
    <div class="dm-hero__content">
      <h1 class="dm-hero__title">
        <span class="dm-hero__title-main">Datamonkey</span>
        <span class="dm-hero__divider"></span>
        <span class="dm-hero__subtitle">Scalable Evolutionary Analyses in the Browser</span>
      </h1>
      <div class="dm-hero__buttons">
        <button class="dm-button dm-button--primary">Start an Analysis</button>
        <button class="dm-button dm-button--secondary">Explore Methods</button>
      </div>
    </div>
  </section>

  <!-- Tabs -->
  <div class="dm-tabs">
    <button class="dm-tabs__item dm-tabs__item--active">Analyses</button>
    <button class="dm-tabs__item">Upload Results</button>
    <button class="dm-tabs__item">Summary</button>
  </div>

  <!-- Cards Container -->
  <div class="dm-grid dm-grid--auto-fit">
    <!-- Left Card -->
    <div class="dm-card">
      <h2 class="dm-card__title">Upload a HyPhy JSON</h2>
      <input type="file" class="dm-upload__input" />
      <button class="dm-button dm-button--wide">Upload</button>

      <div class="dm-divider"></div>

      <!-- Progress Bar -->
      <h3 class="dm-text dm-text-lg">Upload Progress</h3>
      <div class="dm-progress">
        <div class="dm-progress__fill" style="width: 70%"></div>
      </div>

      <!-- Analysis Type -->
      <h3 class="dm-text dm-text-lg">Analysis Type</h3>
      <div class="dm-dropdown" bind:this={dropdownEl}>
        <button class="dm-dropdown__trigger" on:click|stopPropagation={toggleDropdown}>
          {selectedMethod}
          <span class="dm-dropdown__arrow" class:dm-dropdown__arrow--open={isDropdownOpen}>▼</span>
        </button>
        {#if isDropdownOpen}
        <div class="dm-dropdown__menu" transition:slide>
          <button class="dm-dropdown__item" on:click={() => selectMethod('SLAC')}>SLAC</button>
          <button class="dm-dropdown__item" on:click={() => selectMethod('FEL')}>FEL</button>
          <button class="dm-dropdown__item" on:click={() => selectMethod('MEME')}>MEME</button>
          <button class="dm-dropdown__item" on:click={() => selectMethod('FUBAR')}>FUBAR</button>
          <button class="dm-dropdown__item" on:click={() => selectMethod('aBSREL')}>aBSREL</button>
        </div>
        {/if}
      </div>

      <!-- Settings Section -->
      <div class="dm-section">
        <h3 class="dm-section__title">Analysis Settings</h3>
        
        <!-- Toggle Switches -->
        <div class="dm-section__item">
          <label class="dm-toggle">
            <span class="dm-toggle__label">Enable Advanced Mode</span>
            <input type="checkbox" class="dm-toggle__input" />
            <span class="dm-toggle__slider"></span>
          </label>
        </div>

        <div class="dm-section__item">
          <label class="dm-toggle">
            <span class="dm-toggle__label">Auto-save Results</span>
            <input type="checkbox" class="dm-toggle__input" />
            <span class="dm-toggle__slider"></span>
          </label>
        </div>

        <!-- Radio Buttons -->
        <div class="dm-section__item">
          <h4 class="dm-text dm-text-md">Analysis Type</h4>
          <div class="dm-radio-group">
            <label class="dm-radio">
              <input type="radio" name="analysis" value="quick" checked class="dm-radio__input" />
              <span class="dm-radio__custom"></span>
              <span class="dm-radio__label">Quick Analysis</span>
            </label>
            <label class="dm-radio">
              <input type="radio" name="analysis" value="standard" class="dm-radio__input" />
              <span class="dm-radio__custom"></span>
              <span class="dm-radio__label">Standard Analysis</span>
            </label>
            <label class="dm-radio">
              <input type="radio" name="analysis" value="detailed" class="dm-radio__input" />
              <span class="dm-radio__custom"></span>
              <span class="dm-radio__label">Detailed Analysis</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Card -->
    <div class="dm-card">
      <h2 class="dm-card__title">Configuration</h2>
      
      <!-- Text Inputs -->
      <div class="dm-form">
        <label class="dm-form__label">
          Project Name
          <input type="text" class="dm-form__input" placeholder="Enter project name" />
        </label>

        <label class="dm-form__label">
          Description
          <textarea class="dm-form__input" rows="3" placeholder="Enter project description"></textarea>
        </label>

        <label class="dm-form__label">
          Version Tag
          <input type="text" class="dm-form__input dm-text-mono" value="v1.0.0" />
        </label>
      </div>

      <!-- Table -->
      <div class="dm-section">
        <h3 class="dm-section__title">Recent Analyses</h3>
        <div class="dm-table__container">
          <table class="dm-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="dm-text-mono">#A1B2</td>
                <td>Quick</td>
                <td><span class="dm-status-success">Done</span></td>
                <td>2m ago</td>
              </tr>
              <tr>
                <td class="dm-text-mono">#C3D4</td>
                <td>Standard</td>
                <td><span class="dm-status-running">Running</span></td>
                <td>5m ago</td>
              </tr>
              <tr>
                <td class="dm-text-mono">#E5F6</td>
                <td>Detailed</td>
                <td><span class="dm-status-error">Failed</span></td>
                <td>12m ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Accordion Section -->
  <div class="dm-section">
    <div class="dm-accordion">
      <details class="dm-accordion__item">
        <summary class="dm-accordion__header">
          <span class="dm-accordion__title">Analysis Documentation</span>
          <span class="dm-accordion__icon">+</span>
        </summary>
        <div class="dm-accordion__content">
          <p class="dm-text">The HyPhy analysis suite provides a comprehensive set of methods for detecting selection. Here's what you need to know:</p>
          <ul class="dm-list">
            <li><a href="#/methods/quick" class="dm-link">Quick Analysis</a>: Best for initial screening, uses default parameters</li>
            <li><a href="#/methods/standard" class="dm-link">Standard Analysis</a>: Balanced approach with customizable options</li>
            <li><a href="#/methods/detailed" class="dm-link">Detailed Analysis</a>: In-depth analysis with full parameter control</li>
          </ul>
          <p class="dm-text dm-text--note">See our <a href="#/documentation" class="dm-link">complete documentation</a> for detailed explanations.</p>
        </div>
      </details>

      <details class="dm-accordion__item">
        <summary class="dm-accordion__header">
          <span class="dm-accordion__title">Frequently Asked Questions</span>
          <span class="dm-accordion__icon">+</span>
        </summary>
        <div class="dm-accordion__content">
          <p class="dm-text">Common questions about using Datamonkey:</p>
          <ul class="dm-list">
            <li>What file formats are supported? We accept <a href="#/formats/fasta" class="dm-link">FASTA</a>, <a href="#/formats/nexus" class="dm-link">NEXUS</a>, and <a href="#/formats/hyphy" class="dm-link">HyPhy batch files</a></li>
            <li>How long do analyses take? Check our <a href="#/performance" class="dm-link">performance guide</a> for estimates</li>
            <li>Can I save my results? Yes, all results can be downloaded in multiple formats - see <a href="#/export" class="dm-link">export options</a></li>
          </ul>
        </div>
      </details>

      <details class="dm-accordion__item">
        <summary class="dm-accordion__header">
          <span class="dm-accordion__title">Troubleshooting</span>
          <span class="dm-accordion__icon">+</span>
        </summary>
        <div class="dm-accordion__content">
          <p class="dm-text">If you encounter issues:</p>
          <ul class="dm-list">
            <li>Check our <a href="#/validation" class="dm-link">file validation guide</a></li>
            <li>Use our <a href="#/tools/alignment" class="dm-link">sequence alignment validator</a></li>
            <li>Review our <a href="#/errors" class="dm-link">common error messages</a></li>
            <li>Contact <a href="#/support" class="dm-link">support</a> with your job ID if problems persist</li>
          </ul>
          <p class="dm-text dm-text--note">Visit our <a href="#/troubleshooting" class="dm-link">troubleshooting guide</a> for more help.</p>
        </div>
      </details>
    </div>
  </div>

  <!-- Footer -->
  <footer class="dm-footer">
    <div class="dm-footer__content">
      <div class="dm-footer__logo">
        <img src={`${base}/images/dm_whole.png`} alt="Datamonkey Logo" width="48" height="48" class="dm-footer__image" />
      </div>
      <div class="dm-footer__text">
        <p class="dm-text dm-text--small">© 2025 Datamonkey.org — Powered by HyPhy</p>
      </div>
    </div>
  </footer>
  </div>
</div>
