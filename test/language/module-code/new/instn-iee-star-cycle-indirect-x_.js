// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

// This module should be visited exactly one time during resolution of the "x"
// binding.
export { y as x } from './instn-iee-star-cycle-2_.js';
export var y = 45;
