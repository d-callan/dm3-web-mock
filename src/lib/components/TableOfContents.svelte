<script lang="ts">
  import Text from '$lib/components/Text.svelte';
  export let sections: { id: string; title: string }[] = [];
  export let activeSection = '';
</script>

<nav class="dm-toc">
  <h2 class="dm-toc__title">Jump to:</h2>
  <ul class="dm-toc__list">
    {#each sections as section}
      <li>
        <a 
          href="#{section.id}" 
          class="dm-toc__link"
          class:dm-toc__link--active={activeSection === section.id}
        >
          {section.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .dm-toc {
    background: var(--dm-background-light);
    border-radius: var(--dm-border-radius);
    padding: var(--dm-spacing-lg);
  }

  .dm-toc__title {
    margin: 0 0 var(--dm-spacing-md);
    color: var(--dm-text);
    font-size: 1.125rem;
    font-weight: 500;
  }

  .dm-toc__list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 2px solid var(--dm-border-color);
  }

  .dm-toc__link {
    display: block;
    padding: var(--dm-spacing-md) var(--dm-spacing-lg);
    color: var(--dm-text-muted);
    text-decoration: none;
    font-size: 1.125rem;
    line-height: 1.4;
    position: relative;
    transition: all 0.2s ease;
  }

  .dm-toc__link:hover {
    color: var(--dm-primary);
    background: var(--dm-primary-extra-light);
  }

  .dm-toc__link--active {
    color: var(--dm-primary);
    font-weight: 500;
  }

  .dm-toc__link--active::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--dm-primary);
  }
</style>
