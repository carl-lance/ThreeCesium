/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

define(['./BoxGeometry-14396797', './when-4bbc8319', './GeometryOffsetAttribute-7e016332', './RuntimeError-5b082e8f', './Transforms-8b90e17c', './Matrix2-265d9610', './ComponentDatatype-aad54330', './WebGLConstants-508b9636', './combine-e9466e32', './GeometryAttribute-4bcb785f', './GeometryAttributes-7827a6c2', './VertexFormat-07539138'], (function (BoxGeometry, when, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, VertexFormat) { 'use strict';

  function createBoxGeometry(boxGeometry, offset) {
    if (when.defined(offset)) {
      boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
    }
    return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
  }

  return createBoxGeometry;

}));
//# sourceMappingURL=createBoxGeometry.js.map
