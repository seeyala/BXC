// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Đường dẫn đến các file chứa JSX/TSX
  ],
  theme: {
    extend: {
      colors: {
        'black-25': 'rgba(0, 0, 0, 0.25)', // Màu đen với độ mờ 25%
        'gray-custom': '#7c7c7c', // Màu xám tùy chỉnh cho 'Forget Password'
      },
      boxShadow: {
        'custom-shadow': '0px 4px 4px 0 rgba(0, 0, 0, 0.25)', // Tùy chỉnh bóng đổ
      },
    },
  },
  plugins: [],
};
