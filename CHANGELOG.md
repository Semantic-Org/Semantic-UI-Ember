# Change Log
All notable changes to this project will be documented in this file. The project adhere's to Semantic Versioning. See Versioning for more information.

## [2.1.0]
 - Supports `ember-fastboot` for Ember 2.x
 - Bower not required (hence no blueprint)

## [2.0.1]
### Changed
 - Updated Ember to 2.10 and dependencies

### Fixed
 - Mutable cell symbol change
 - Checkbox and Radio initial property initialization

### Removed
 - Blanket dependency

## [2.0.0] - 2016-10-18

## [2.0.0-beta.3]
### Fixed
  - hasOwnProperty now properly works for objects without prototype
  - Updating tests for Glimmer 2

## [2.0.0-beta.2]
### Changed
  - Required is html safe as dependency

## [2.0.0-beta.1]
### Added
  - Allowing better configuration for [customization](http://semantic-org.github.io/Semantic-UI-Ember/#/modules/usage) https://github.com/Semantic-Org/Semantic-UI-Ember/pull/141

### Fixed
  - Popup: only update attributes passed in
  - Popup: unwrap html safe values
  - Popup: don't update position
  - Base Mixin: added attribute bindings for autofocus, tabindex, title
  - Base Mixin: upwrap html safe values
  - Base Mixin: fix contains deprecation https://github.com/Semantic-Org/Semantic-UI-Ember/pull/143

#### Internal Changed
  - Updating Ember, Ember Data, and Ember CLI to 2.8
  - Updating multiple dependencies to latest version
  - Adding additional ember try versions
  - Moved promise tools to external addon
  - Fixed build https://github.com/Semantic-Org/Semantic-UI-Ember/pull/151

## [2.0.0-beta.0]
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
