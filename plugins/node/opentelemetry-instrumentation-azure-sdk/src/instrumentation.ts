/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  InstrumentationBase,
  InstrumentationConfig,
  InstrumentationModuleDefinition,
  InstrumentationNodeModuleDefinition,
} from '@opentelemetry/instrumentation';
import { OpenTelemetryInstrumenter } from './instrumenter';
import { PACKAGE_NAME, PACKAGE_VERSION } from './version';

/**
 * Configuration options that can be passed to {@link createAzureSdkInstrumentation} function.
 */
export interface AzureSdkInstrumentationOptions extends InstrumentationConfig {}

/**
 * The instrumentation module for the Azure SDK. Implements OpenTelemetry's {@link Instrumentation}.
 */
export class AzureSdkInstrumentation extends InstrumentationBase {
  constructor(options: AzureSdkInstrumentationOptions = {}) {
    super(PACKAGE_NAME, PACKAGE_VERSION, Object.assign({}, options));
  }

  /**
   * Entrypoint for the module registration.
   *
   * @returns The patched \@azure/core-tracing module after setting its instrumenter.
   */
  protected init(): InstrumentationModuleDefinition {
    const result: InstrumentationModuleDefinition =
      new InstrumentationNodeModuleDefinition(
        '@azure/core-tracing',
        ['^1.0.0-preview.14', '^1.0.0'],
        moduleExports => {
          if (typeof moduleExports.useInstrumenter === 'function') {
            moduleExports.useInstrumenter(new OpenTelemetryInstrumenter());
          }

          return moduleExports;
        }
      );
    // Needed to support 1.0.0-preview.14
    result.includePrerelease = true;
    return result;
  }
}
