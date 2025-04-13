import { SvelteComponentTyped } from 'svelte';

declare module '$lib/components/Logo.svelte' {
  interface LogoProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
  }

  export default class Logo extends SvelteComponentTyped<LogoProps> {}
}
