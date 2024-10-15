module.exports = {
    icon: true,
    typescript: true,
    svgo: true,
    svgoConfig: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
      ],
    },
  };
  