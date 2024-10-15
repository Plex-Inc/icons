import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'src/icons/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm', // ESM формат для tree shaking
        },
    ],
    plugins: [typescript()],
};
