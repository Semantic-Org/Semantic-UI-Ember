# Change Log
All notable changes to this project will be documented in this file. The project adhere's to Semantic Versioning. See Versioning for more information.

## [2.0.0-beta.1]
### Changed
  - Base mixin has been updated with expendable methods to hook into
  - Base mixin now uses this.attrs to properly bind to passed in parameters
  - Base mixin directly interacts with the Semantic-UI modules to avoid re-rending
  - Base mixin now uses data down actions up principles instead of two way data binding
  - All components have now expose "execute" as a block parameter
  - ui-dropdown-array component has been removed
  - ui-dropdown has a new map-value helper for value data binding
  - Added and updated tests for changes

## [1.0.0]
  - Change log not recorded for version 1.0.

# Versioning

The versioning follows [Semantic Versioning 2.0.0](http://semver.org/.)

  {major}.{minor}.{increment}

## MAJOR
The major version will increment when there are public api-level incompatibilities released.

## MINOR
The minor version will increment when functionality is added in a backwards-compatible manner or when we rollover years.

## INCREMENT
The last number is incremented each time we deploy another version. It should always start out as 1. These must be API-compatible changes. If they break any form of the public API then the MAJOR version needs to be updated.
