import {
  createSystem,
  defaultConfig,
  defineConfig,
  SystemConfig,
} from '@chakra-ui/react';

const config: SystemConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `"Be Vietnam Pro", sans-serif` },
        body: { value: `"Be Vietnam Pro", sans-serif` },
      },
    },
  },
});

const theme = createSystem(defaultConfig, config);
export default theme;
