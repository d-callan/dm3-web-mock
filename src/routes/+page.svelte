<script>
  import { base } from '$app/paths';
</script>

<div class="container">
  <!-- Header -->
  <header class="header">
    <div class="logo-container">
      <img src="{base}/images/dm_whole.png" alt="Datamonkey Logo" class="logo" />
      <h1>Datamonkey</h1>
    </div>
    <nav>
      <button class="nav-button">Analyses</button>
      <button class="nav-button">Documentation</button>
      <button class="nav-button">Support</button>
      <a href="https://github.com/veg" class="github-link" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
        <svg height="32" viewBox="0 0 16 16" width="32">
          <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
      </a>
    </nav>
  </header>

  <!-- Hero Section -->
  <div class="hero">
    <div class="hero-background">
      <div class="hero-circuit"></div>
      <div class="hero-glow"></div>
      <div class="dna-rain left">
        <div class="rain-column speed-slow spacing-wide">
          <span>A</span><span>T</span><span>C</span><span>G</span>
        </div>
        <div class="rain-column speed-fast spacing-tight">
          <span>G</span><span>C</span><span>T</span><span>A</span><span>G</span><span>C</span>
        </div>
        <div class="rain-column speed-medium spacing-normal">
          <span>T</span><span>A</span><span>G</span><span>C</span><span>T</span>
        </div>
        <div class="rain-column speed-veryslow spacing-wide">
          <span>C</span><span>G</span><span>A</span><span>T</span>
        </div>
        <div class="rain-column speed-veryfast spacing-tight">
          <span>A</span><span>T</span><span>C</span><span>G</span><span>A</span><span>T</span>
        </div>
        <div class="rain-column speed-medium spacing-normal">
          <span>G</span><span>C</span><span>T</span><span>A</span>
        </div>
      </div>
      <div class="dna-rain right">
        <div class="rain-column speed-veryfast spacing-tight">
          <span>C</span><span>G</span><span>A</span><span>T</span><span>C</span><span>G</span>
        </div>
        <div class="rain-column speed-slow spacing-wide">
          <span>A</span><span>T</span><span>C</span><span>G</span>
        </div>
        <div class="rain-column speed-medium spacing-normal">
          <span>G</span><span>C</span><span>T</span><span>A</span><span>G</span>
        </div>
        <div class="rain-column speed-veryslow spacing-wide">
          <span>T</span><span>A</span><span>G</span><span>C</span>
        </div>
        <div class="rain-column speed-fast spacing-tight">
          <span>C</span><span>G</span><span>A</span><span>T</span><span>A</span><span>T</span>
        </div>
        <div class="rain-column speed-medium spacing-normal">
          <span>G</span><span>C</span><span>T</span><span>A</span>
        </div>
      </div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title-main">Datamonkey</span>
        <span class="hero-divider"></span>
        <span class="hero-title-sub">Scalable Evolutionary Analyses in the Browser</span>
      </h1>
      <div class="hero-buttons">
        <button class="hero-button primary">Start an Analysis</button>
        <button class="hero-button secondary">Explore Methods</button>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tabs">
    <button class="tab active">Analyses</button>
    <button class="tab">Upload Results</button>
    <button class="tab">Summary</button>
  </div>

  <!-- Cards Container -->
  <div class="cards-container">
    <!-- Left Card -->
    <div class="card">
      <h2 class="card-title">Upload a HyPhy JSON</h2>
      <input type="file" class="file-input" />
      <button class="upload-button">Upload</button>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress-bar-fill"></div>
      </div>

      <!-- Settings Section -->
      <div class="settings-section">
        <h3>Analysis Settings</h3>
        
        <!-- Toggle Switches -->
        <div class="setting-item">
          <label class="toggle">
            <span class="toggle-label">Enable Advanced Mode</span>
            <input type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="setting-item">
          <label class="toggle">
            <span class="toggle-label">Auto-save Results</span>
            <input type="checkbox" />
            <span class="toggle-slider"></span>
          </label>
        </div>

        <!-- Radio Buttons -->
        <div class="setting-item">
          <h4>Analysis Type</h4>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" name="analysis" value="quick" checked />
              <span class="radio-label">Quick Analysis</span>
            </label>
            <label class="radio">
              <input type="radio" name="analysis" value="standard" />
              <span class="radio-label">Standard Analysis</span>
            </label>
            <label class="radio">
              <input type="radio" name="analysis" value="detailed" />
              <span class="radio-label">Detailed Analysis</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Card -->
    <div class="card">
      <h2 class="card-title">Configuration</h2>
      
      <!-- Text Inputs -->
      <div class="input-group">
        <label class="input-label">
          Project Name
          <input type="text" class="text-input" placeholder="Enter project name" />
        </label>

        <label class="input-label">
          Description
          <textarea class="text-input" rows="3" placeholder="Enter project description"></textarea>
        </label>

        <label class="input-label">
          Version Tag
          <input type="text" class="text-input monospace" value="v1.0.0" />
        </label>
      </div>

      <!-- Table -->
      <div class="table-section">
        <h3>Recent Analyses</h3>
        <div class="table-container">
          <table class="retro-table">
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
                <td class="monospace">#A1B2</td>
                <td>Quick</td>
                <td class="status-success">Done</td>
                <td>2m ago</td>
              </tr>
              <tr>
                <td class="monospace">#C3D4</td>
                <td>Standard</td>
                <td class="status-running">Running</td>
                <td>5m ago</td>
              </tr>
              <tr>
                <td class="monospace">#E5F6</td>
                <td>Detailed</td>
                <td class="status-error">Failed</td>
                <td>12m ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Accordion Section -->
  <div class="accordion-section">
    <div class="accordion">
      <details class="accordion-item">
        <summary class="accordion-header">
          <span class="accordion-title">Analysis Documentation</span>
          <span class="accordion-icon">+</span>
        </summary>
        <div class="accordion-content">
          <p>The HyPhy analysis suite provides a comprehensive set of methods for detecting selection. Here's what you need to know:</p>
          <ul>
            <li><a href="#/methods/quick" class="accordion-link">Quick Analysis</a>: Best for initial screening, uses default parameters</li>
            <li><a href="#/methods/standard" class="accordion-link">Standard Analysis</a>: Balanced approach with customizable options</li>
            <li><a href="#/methods/detailed" class="accordion-link">Detailed Analysis</a>: In-depth analysis with full parameter control</li>
          </ul>
          <p class="accordion-note">See our <a href="#/documentation" class="accordion-link">complete documentation</a> for detailed explanations.</p>
        </div>
      </details>

      <details class="accordion-item">
        <summary class="accordion-header">
          <span class="accordion-title">Frequently Asked Questions</span>
          <span class="accordion-icon">+</span>
        </summary>
        <div class="accordion-content">
          <p>Common questions about using Datamonkey:</p>
          <ul>
            <li>What file formats are supported? We accept <a href="#/formats/fasta" class="accordion-link">FASTA</a>, <a href="#/formats/nexus" class="accordion-link">NEXUS</a>, and <a href="#/formats/hyphy" class="accordion-link">HyPhy batch files</a></li>
            <li>How long do analyses take? Check our <a href="#/performance" class="accordion-link">performance guide</a> for estimates</li>
            <li>Can I save my results? Yes, all results can be downloaded in multiple formats - see <a href="#/export" class="accordion-link">export options</a></li>
          </ul>
        </div>
      </details>

      <details class="accordion-item">
        <summary class="accordion-header">
          <span class="accordion-title">Troubleshooting</span>
          <span class="accordion-icon">+</span>
        </summary>
        <div class="accordion-content">
          <p>If you encounter issues:</p>
          <ul>
            <li>Check our <a href="#/validation" class="accordion-link">file validation guide</a></li>
            <li>Use our <a href="#/tools/alignment" class="accordion-link">sequence alignment validator</a></li>
            <li>Review our <a href="#/errors" class="accordion-link">common error messages</a></li>
            <li>Contact <a href="#/support" class="accordion-link">support</a> with your job ID if problems persist</li>
          </ul>
          <p class="accordion-note">Visit our <a href="#/troubleshooting" class="accordion-link">troubleshooting guide</a> for more help.</p>
        </div>
      </details>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/images/dm_whole.png" alt="Datamonkey Logo" width="48" height="48" />
      </div>
      <div class="footer-text">
        <p>© 2025 Datamonkey.org — Powered by HyPhy</p>
      </div>
    </div>
  </footer>
</div>
