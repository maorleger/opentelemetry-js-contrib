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
import { Span, AttributeValue, SpanStatusCode } from '@opentelemetry/api';
import { SpanStatus, TracingSpan } from '@azure/core-tracing';

export class OpenTelemetrySpanWrapper implements TracingSpan {
  private _span: Span;

  constructor(span: Span) {
    this._span = span;
  }

  setStatus(status: SpanStatus): void {
    if (status.status === 'error') {
      if (status.error) {
        this._span.setStatus({
          code: SpanStatusCode.ERROR,
          message: status.error.toString(),
        });
        this.recordException(status.error);
      } else {
        this._span.setStatus({ code: SpanStatusCode.ERROR });
      }
    } else if (status.status === 'success') {
      this._span.setStatus({ code: SpanStatusCode.OK });
    }
  }

  setAttribute(name: string, value: unknown): void {
    if (value !== null && value !== undefined) {
      this._span.setAttribute(name, value as AttributeValue);
    }
  }

  end(): void {
    this._span.end();
  }

  recordException(exception: string | Error): void {
    this._span.recordException(exception);
  }

  isRecording(): boolean {
    return this._span.isRecording();
  }

  /**
   * Allows getting the wrapped span as needed.
   * @internal
   *
   * @returns The underlying span
   */
  unwrap(): Span {
    return this._span;
  }
}
