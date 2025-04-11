<script lang="ts">
  export let title = 'Datamonkey';
  export let subtitle = 'Scalable Evolutionary Analyses in the Browser';
</script>

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
      <span class="dm-hero__title-main">{title}</span>
      <span class="dm-hero__divider"></span>
      <span class="dm-hero__subtitle">{subtitle}</span>
    </h1>
    <div class="dm-hero__buttons">
      <slot />
    </div>
  </div>
</section>
