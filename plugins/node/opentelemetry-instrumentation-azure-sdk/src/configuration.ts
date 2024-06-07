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

/**
 * @internal
 *
 * Keys of known environment variables we look up.
 */
export type KnownEnvironmentKey =
  | 'AZURE_HTTP_TRACING_CHILDREN_DISABLED'
  | 'AZURE_TRACING_DISABLED';

/**
 * @internal
 *
 * Cached values of environment variables that were fetched.
 */
export const environmentCache = new Map<
  KnownEnvironmentKey,
  string | undefined
>();

/**
 * Converts an environment variable to Boolean.
 * the strings "false" and "0" are treated as falsy values.
 *
 * @internal
 */
export function envVarToBoolean(key: KnownEnvironmentKey): boolean {
  if (!environmentCache.has(key)) {
    loadEnvironmentVariable(key);
  }
  const value = (environmentCache.get(key) ?? '').toLowerCase();
  return value !== 'false' && value !== '0' && Boolean(value);
}

function loadEnvironmentVariable(key: KnownEnvironmentKey): void {
  if (typeof process !== 'undefined' && process.env) {
    const rawValue = process.env[key] ?? process.env[key.toLowerCase()];
    environmentCache.set(key, rawValue);
  }
}
