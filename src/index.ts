import { TeXOptions, load, tex } from './bootstrap';
import { SvgOptions, dvi2svg } from './dvi2svg';

export * from './bootstrap';
export * from './dvi2svg';

/**
 * Compiles TeX source code to SVG image.
 */
async function tex2svg(input: string, options?: TeXOptions & SvgOptions) {
  await load();

  const result = await tex(input, options);
  
  if (!result.success || !result.dvi) {
    throw new Error(`TeX compilation failed: ${result.errors}`);
  }
  
  const svg = await dvi2svg(result.dvi, options);
  return svg;
}

export default tex2svg;
