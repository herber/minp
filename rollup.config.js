import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  entry: 'index.js',
  format: 'umd',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    minify()
  ],
  dest: 'dist/bundle.js'
};
