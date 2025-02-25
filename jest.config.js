module.exports = {
  rootDir: "./", // 루트 디렉토리를 명시적으로 설정
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // Jest는 이미지, 스타일 파일(CSS, LESS)을 해석하지 못하므로 파일을 fileMock.js로 대체
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|module\\.css)$": "<rootDir>/__mocks__/fileMock.js", // 수정된 부분
  },

  testMatch: [
    "<rootDir>/**/*.test.(js|jsx|ts|tsx)",
    "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!axios)"],
};
