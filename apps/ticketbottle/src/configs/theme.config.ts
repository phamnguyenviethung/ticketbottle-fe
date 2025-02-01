import { createSystem, defineConfig, SystemConfig } from "@chakra-ui/react";

const config: SystemConfig = defineConfig({});

const theme = createSystem(config);
export default theme;
