# OpenTelemetry Azure SDK Instrumentation for Node.js

[![NPM Published Version][npm-img]][npm-url]
[![Apache License][license-image]][license-image]

[component owners](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/.github/component_owners.yml): @maorleger

This module provides automatic instrumentation for the [`@azure`](https://github.com/@azure/azure-sdk-for-js) client libraries, which may be loaded using the [`@opentelemetry/sdk-trace-node`](https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-sdk-trace-node) package and is included in the [`@opentelemetry/auto-instrumentations-node`](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node) bundle.

If total installation size is not constrained, it is recommended to use the [`@opentelemetry/auto-instrumentations-node`](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node) bundle with [@opentelemetry/sdk-node](`https://www.npmjs.com/package/@opentelemetry/sdk-node`) for the most seamless instrumentation experience.

## Installation

```bash
npm install --save @opentelemetry/instrumentation-azure-sdk
```

## Usage

For further automatic instrumentation instruction see the [@opentelemetry/instrumentation](https://www.npmjs.com/package/@opentelemetry/instrumentation) package.

```js
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
  AzureSdkInstrumentation,
} = require('@opentelemetry/instrumentation-azure-sdk');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new AzureSdkInstrumentation({
      // see under for available configuration
    }),
  ],
});
```

## Migration From @azure/opentelemetry-instrumentation-azure-sdk

This instrumentation was originally published under the name `"@azure/opentelemetry-instrumentation-azure-sdk"` in [this repo](https://github.com/azure/azure-sdk-for-js). Few breaking changes were made during porting to the contrib repo to align with conventions:

### Top level export

The original package exported a factory function called `createAzureSdkInstrumentation` which was used to initialize the SDK. For consistency with the existing plugins, this library now exports the `AzureSdkInstrumentation` class directly, and the factory function has been removed.

In order to migrate, replace usage of the factory function with constructing a new `AzureSdkInstrumentation` object. For example:

```ts
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
  createAzureSdkInstrumentation,
} = require('@azure/opentelemetry-instrumentation-azure-sdk');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    createAzureSdkInstrumentation(),
  ],
});
```

Can be replaced with:


```ts
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
  AzureSdkInstrumentation,
} = require('@opentelemetry/instrumentation-azure-sdk');

const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new AzureSdkInstrumentation(),
  ],
});
```

## Useful links

- For more information on OpenTelemetry, visit: <https://opentelemetry.io/>
- For more about OpenTelemetry JavaScript: <https://github.com/open-telemetry/opentelemetry-js>
- For help or feedback on this project, join us in [GitHub Discussions][discussions-url]

## License

Apache 2.0 - See [LICENSE][license-url] for more information.

[discussions-url]: https://github.com/open-telemetry/opentelemetry-js/discussions
[license-url]: https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/license-Apache_2.0-green.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@opentelemetry/instrumentation-azure-sdk
