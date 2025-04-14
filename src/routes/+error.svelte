<script>
  import { page } from '$app/stores';
  import { base } from '$app/paths';
</script>

<div class="error-container">
  <h1>{$page.status}: {$page.error?.message || 'Page not found'}</h1>
  <p>Sorry, we couldn't find what you were looking for.</p>
  <a href="{base}/" class="back-button">Go back home</a>
</div>

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--dm-primary);
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--dm-text);
  }

  .back-button {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background: var(--dm-primary);
    color: white;
    text-decoration: none;
    border-radius: 0.3rem;
    border: 2px solid #331347;
    box-shadow: 2px 2px 0px #331347;
    transition: transform 0.1s ease;
  }

  .back-button:hover {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0px #331347;
  }
</style>
