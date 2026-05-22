module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '^@app/pages$': '<rootDir>/src/app/pages',
    '^@app/routes$': '<rootDir>/src/app/app.routes.const.ts',
    '^@app/models$': '<rootDir>/src/app/core/models',
    '^@app/pipes$': '<rootDir>/src/app/shared/pipes',
    '^@app/utils$': '<rootDir>/src/app/core/utils',
    '^@app/services$': '<rootDir>/src/app/core/services',
    '^@app/components$': '<rootDir>/src/app/shared/components',
    '^@app/validators$': '<rootDir>/src/app/core/validators',
  },
};
