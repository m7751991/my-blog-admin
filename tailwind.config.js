const Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 确保 Tailwind 能找到您的组件
  ],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`;
      return map;
    }, {}),
    extend: {
      fontSize: ({ theme }) => ({
        ...theme("spacing"),
      }),
      colors: {
        customGray: "rgb(202 205 210)", // 自定义灰色
        f7f7f7: "#f7f7f7",
      },
    },
  },
  plugins: [],
};

export default Config;
