"use client";
import {
  __export
} from "./chunk-DCHYNTHI.js";

// ../ui/dist/index.js
import * as React25 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs
import * as React2 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React from "react";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

// ../../node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs
import { Fragment as Fragment2, jsx } from "react/jsx-runtime";
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var use = React2[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React2.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = React2.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React2.Children.count(newElement) > 1) return React2.Children.only(null);
          return React2.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React2.isValidElement(newElement) ? React2.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = React2.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (React2.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React2.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React2.cloneElement(children, props2);
    }
    return React2.Children.count(children) > 1 ? React2.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return React2.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// ../../node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// ../../node_modules/.pnpm/tailwind-merge@2.6.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
};
var createClassMap = (config) => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
var getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  const parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index2 = 0; index2 < className.length; index2++) {
      let currentCharacter = className[index2];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index2, index2 + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index2));
          modifierStart = index2 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index2;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return (className) => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
var sortModifiers = (modifiers) => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index2 = classNames.length - 1; index2 >= 0; index2 -= 1) {
    const originalClassName = classNames[index2];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
function twJoin() {
  let index2 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index2 < arguments.length) {
    if (argument = arguments[index2++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
  const colors = fromTheme("colors");
  const spacing2 = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth2 = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap2 = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset2 = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity2 = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing2];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing2];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset2]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset2]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset2]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset2]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset2]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset2]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset2]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset2]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset2]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap2]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap2]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap2]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing2]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing2, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing2, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing2, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing2, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing2, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing2, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity2]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity2]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity2]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth2]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth2]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth2]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth2]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth2]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth2]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth2]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth2]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth2]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity2]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth2]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth2]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity2]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity2]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity2]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity2]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
};
var mergeConfigs = (baseConfig, {
  cacheSize,
  prefix,
  separator,
  experimentalParseClassName,
  extend = {},
  override = {}
}) => {
  overrideProperty(baseConfig, "cacheSize", cacheSize);
  overrideProperty(baseConfig, "prefix", prefix);
  overrideProperty(baseConfig, "separator", separator);
  overrideProperty(baseConfig, "experimentalParseClassName", experimentalParseClassName);
  for (const configKey in override) {
    overrideConfigProperties(baseConfig[configKey], override[configKey]);
  }
  for (const key in extend) {
    mergeConfigProperties(baseConfig[key], extend[key]);
  }
  return baseConfig;
};
var overrideProperty = (baseObject, overrideKey, overrideValue) => {
  if (overrideValue !== void 0) {
    baseObject[overrideKey] = overrideValue;
  }
};
var overrideConfigProperties = (baseObject, overrideObject) => {
  if (overrideObject) {
    for (const key in overrideObject) {
      overrideProperty(baseObject, key, overrideObject[key]);
    }
  }
};
var mergeConfigProperties = (baseObject, mergeObject) => {
  if (mergeObject) {
    for (const key in mergeObject) {
      const mergeValue = mergeObject[key];
      if (mergeValue !== void 0) {
        baseObject[key] = (baseObject[key] || []).concat(mergeValue);
      }
    }
  }
};
var extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);

// ../ui/dist/index.js
import { Fragment as Fragment5, jsx as jsx44, jsxs as jsxs27 } from "react/jsx-runtime";
import * as React26 from "react";
import { jsx as jsx210 } from "react/jsx-runtime";
import * as React32 from "react";
import { jsx as jsx310 } from "react/jsx-runtime";
import * as React42 from "react";
import { jsx as jsx45 } from "react/jsx-runtime";
import { jsx as jsx52, jsxs as jsxs28 } from "react/jsx-runtime";
import * as React52 from "react";

// ../icons/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  Add01: () => Add01,
  AlertCircle: () => AlertCircle,
  ArrowDown01Round: () => ArrowDown01Round,
  ArrowDown02: () => ArrowDown02,
  ArrowLeft01Round: () => ArrowLeft01Round,
  ArrowRight01Round: () => ArrowRight01Round,
  ArrowUp01Round: () => ArrowUp01Round,
  ArrowUp02: () => ArrowUp02,
  ArrowUpRight01: () => ArrowUpRight01,
  At: () => At,
  Calendar01: () => Calendar01,
  Cancel01: () => Cancel01,
  CheckmarkCircle02: () => CheckmarkCircle02,
  Clock01: () => Clock01,
  Clock02: () => Clock02,
  CloudServer: () => CloudServer,
  ColorPicker: () => ColorPicker,
  Copy01: () => Copy01,
  CreditCard: () => CreditCard,
  HelpCircle: () => HelpCircle,
  IconBase: () => IconBase,
  Inbox: () => Inbox,
  InformationCircle: () => InformationCircle,
  Lock: () => Lock,
  Mail01: () => Mail01,
  Remove01: () => Remove01,
  Search01: () => Search01,
  SearchRemove: () => SearchRemove,
  Star: () => Star,
  Tick02: () => Tick02,
  User: () => User,
  View: () => View,
  ViewOff: () => ViewOff,
  Wrench01: () => Wrench01,
  iconNames: () => iconNames
});
import * as React3 from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
import "react";
import { jsx as jsx22, jsxs as jsxs2 } from "react/jsx-runtime";
import "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
import "react";
import { jsx as jsx4 } from "react/jsx-runtime";
import "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
import "react";
import { jsx as jsx6 } from "react/jsx-runtime";
import "react";
import { jsx as jsx7 } from "react/jsx-runtime";
import "react";
import { jsx as jsx8 } from "react/jsx-runtime";
import "react";
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
import "react";
import { jsx as jsx10 } from "react/jsx-runtime";
import "react";
import { jsx as jsx11 } from "react/jsx-runtime";
import "react";
import { jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";
import "react";
import { jsx as jsx13 } from "react/jsx-runtime";
import "react";
import { jsx as jsx14, jsxs as jsxs7 } from "react/jsx-runtime";
import "react";
import { jsx as jsx15, jsxs as jsxs8 } from "react/jsx-runtime";
import "react";
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
import "react";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
import "react";
import { jsx as jsx18, jsxs as jsxs11 } from "react/jsx-runtime";
import "react";
import { jsx as jsx19, jsxs as jsxs12 } from "react/jsx-runtime";
import "react";
import { jsx as jsx20, jsxs as jsxs13 } from "react/jsx-runtime";
import "react";
import { jsx as jsx21, jsxs as jsxs14 } from "react/jsx-runtime";
import "react";
import { jsx as jsx222, jsxs as jsxs15 } from "react/jsx-runtime";
import "react";
import { jsx as jsx23, jsxs as jsxs16 } from "react/jsx-runtime";
import "react";
import { jsx as jsx24, jsxs as jsxs17 } from "react/jsx-runtime";
import "react";
import { jsx as jsx25, jsxs as jsxs18 } from "react/jsx-runtime";
import "react";
import { jsx as jsx26 } from "react/jsx-runtime";
import "react";
import { jsx as jsx27, jsxs as jsxs19 } from "react/jsx-runtime";
import "react";
import { jsx as jsx28, jsxs as jsxs20 } from "react/jsx-runtime";
import "react";
import { jsx as jsx29 } from "react/jsx-runtime";
import "react";
import { jsx as jsx30 } from "react/jsx-runtime";
import "react";
import { jsx as jsx31, jsxs as jsxs21 } from "react/jsx-runtime";
import "react";
import { jsx as jsx32, jsxs as jsxs22 } from "react/jsx-runtime";
import "react";
import { jsx as jsx33, jsxs as jsxs23 } from "react/jsx-runtime";
import "react";
import { jsx as jsx34, jsxs as jsxs24 } from "react/jsx-runtime";
var IconBase = React3.forwardRef(
  ({ size: size4 = "1em", title, children, ...props }, ref) => /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: size4,
      height: size4,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      role: title ? "img" : void 0,
      "aria-hidden": title ? void 0 : true,
      ...props,
      children: [
        title ? /* @__PURE__ */ jsx2("title", { children: title }) : null,
        children
      ]
    }
  )
);
IconBase.displayName = "IconBase";
var Add01 = (props) => /* @__PURE__ */ jsxs2(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx22("path", { d: "M12 5V19.002" }),
  /* @__PURE__ */ jsx22("path", { d: "M19.002 12.002L4.99998 12.002" })
] });
Add01.iconName = "add-01";
var AlertCircle = (props) => /* @__PURE__ */ jsxs3(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx3("path", { d: "M12 8V12.5" }),
  /* @__PURE__ */ jsx3("path", { d: "M12 15.9883V15.9983", strokeWidth: "1.8" })
] });
AlertCircle.iconName = "alert-circle";
var ArrowDown01Round = (props) => /* @__PURE__ */ jsx4(IconBase, { ...props, children: /* @__PURE__ */ jsx4("path", { d: "M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" }) });
ArrowDown01Round.iconName = "arrow-down-01-round";
var ArrowDown02 = (props) => /* @__PURE__ */ jsxs4(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx5("path", { d: "M12 18.502V5.00195" }),
  /* @__PURE__ */ jsx5("path", { d: "M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002" })
] });
ArrowDown02.iconName = "arrow-down-02";
var ArrowLeft01Round = (props) => /* @__PURE__ */ jsx6(IconBase, { ...props, children: /* @__PURE__ */ jsx6("path", { d: "M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" }) });
ArrowLeft01Round.iconName = "arrow-left-01-round";
var ArrowRight01Round = (props) => /* @__PURE__ */ jsx7(IconBase, { ...props, children: /* @__PURE__ */ jsx7("path", { d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" }) });
ArrowRight01Round.iconName = "arrow-right-01-round";
var ArrowUp01Round = (props) => /* @__PURE__ */ jsx8(IconBase, { ...props, children: /* @__PURE__ */ jsx8("path", { d: "M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15" }) });
ArrowUp01Round.iconName = "arrow-up-01-round";
var ArrowUp02 = (props) => /* @__PURE__ */ jsxs5(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx9("path", { d: "M12 5.50195V19.002" }),
  /* @__PURE__ */ jsx9("path", { d: "M18 11.0019C18 11.0019 13.5811 5.00197 12 5.00195C10.4188 5.00194 6 11.002 6 11.002" })
] });
ArrowUp02.iconName = "arrow-up-02";
var ArrowUpRight01 = (props) => /* @__PURE__ */ jsx10(IconBase, { ...props, children: /* @__PURE__ */ jsx10("path", { d: "M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" }) });
ArrowUpRight01.iconName = "arrow-up-right-01";
var At = (props) => /* @__PURE__ */ jsx11(IconBase, { ...props, children: /* @__PURE__ */ jsx11("path", { d: "M15.6 8.40033V12.9003C15.6 14.3915 16.8088 15.6003 18.3 15.6003C19.7912 15.6003 21 14.3915 21 12.9003V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.0265 21 15.8965 20.3302 17.4009 19.2M15.6 12.0003C15.6 13.9886 13.9882 15.6003 12 15.6003C10.0118 15.6003 8.4 13.9886 8.4 12.0003C8.4 10.0121 10.0118 8.40033 12 8.40033C13.9882 8.40033 15.6 10.0121 15.6 12.0003Z" }) });
At.iconName = "at";
var Calendar01 = (props) => /* @__PURE__ */ jsxs6(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx12("path", { d: "M16 2V6M8 2V6" }),
  /* @__PURE__ */ jsx12("path", { d: "M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" }),
  /* @__PURE__ */ jsx12("path", { d: "M3 10H21" }),
  /* @__PURE__ */ jsx12("path", { d: "M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5" })
] });
Calendar01.iconName = "calendar-01";
var Cancel01 = (props) => /* @__PURE__ */ jsx13(IconBase, { ...props, children: /* @__PURE__ */ jsx13("path", { d: "M18 6L6.00081 17.9992M17.9992 18L6 6.00085" }) });
Cancel01.iconName = "cancel-01";
var CheckmarkCircle02 = (props) => /* @__PURE__ */ jsxs7(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx14("path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" }),
  /* @__PURE__ */ jsx14("path", { d: "M8 12.5L10.5 15L16 9" })
] });
CheckmarkCircle02.iconName = "checkmark-circle-02";
var Clock01 = (props) => /* @__PURE__ */ jsxs8(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx15("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx15("path", { d: "M12 8V12L14 14" })
] });
Clock01.iconName = "clock-01";
var Clock02 = (props) => /* @__PURE__ */ jsxs9(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx16("path", { d: "M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844" }),
  /* @__PURE__ */ jsx16("path", { d: "M12 8V12L14 14" })
] });
Clock02.iconName = "clock-02";
var CloudServer = (props) => /* @__PURE__ */ jsxs10(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx17("path", { d: "M17.4776 8.00005C17.485 8.00002 17.4925 8 17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.9853 19.9853 17 17.5 17H7C4.23858 17 2 14.7614 2 12C2 9.40034 3.98398 7.26407 6.52042 7.0227M17.4776 8.00005C17.4924 7.83536 17.5 7.66856 17.5 7.5C17.5 4.46243 15.0376 2 12 2C9.12324 2 6.76233 4.20862 6.52042 7.0227M17.4776 8.00005C17.3753 9.1345 16.9286 10.1696 16.2428 11M6.52042 7.0227C6.67826 7.00768 6.83823 7 7 7C8.12582 7 9.16474 7.37209 10.0005 8" }),
  /* @__PURE__ */ jsx17("path", { d: "M14 20.75V20.5C14 19.9477 13.5523 19.5 13 19.5H12M14 20.75V21C14 21.5523 13.5523 22 13 22H11C10.4477 22 10 21.5523 10 21V20.75M14 20.75H19M10 20.75V20.5C10 19.9477 10.4477 19.5 11 19.5H12M10 20.75H5M12 19.5V17" })
] });
CloudServer.iconName = "cloud-server";
var ColorPicker = (props) => /* @__PURE__ */ jsxs11(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx18("path", { d: "M14.2891 13.2759L8.39227 19.1727C7.49068 20.0743 7.03988 20.5251 6.46663 20.7626C5.89338 21 5.25586 21 3.98082 21H3V20.0192C3 18.7441 3 18.1066 3.23745 17.5334C3.47489 16.9601 3.92569 16.5093 4.82728 15.6077L7.15915 13.2759L13.435 7M7.15915 13.2759H14.2891M14.2891 13.2759L17 10.565" }),
  /* @__PURE__ */ jsx18("path", { d: "M15.6113 4.79133L19.2087 8.38869L20.82 10M19.2087 8.38869L20.0705 7.52682C20.363 7.23431 20.5093 7.08805 20.611 6.94529C21.1297 6.21676 21.1297 5.23953 20.611 4.511C20.5093 4.36824 20.363 4.22198 20.0705 3.92947C19.778 3.63697 19.6318 3.4907 19.489 3.38905C18.7605 2.87032 17.7832 2.87032 17.0547 3.38905C16.912 3.4907 16.7657 3.63695 16.4732 3.92947L15.6113 4.79133M14 3.18002L15.6113 4.79133" })
] });
ColorPicker.iconName = "color-picker";
var Copy01 = (props) => /* @__PURE__ */ jsxs12(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx19("path", { d: "M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" }),
  /* @__PURE__ */ jsx19("path", { d: "M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" })
] });
Copy01.iconName = "copy-01";
var CreditCard = (props) => /* @__PURE__ */ jsxs13(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx20("path", { d: "M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z" }),
  /* @__PURE__ */ jsx20("path", { d: "M10 16H11.5" }),
  /* @__PURE__ */ jsx20("path", { d: "M14.5 16L18 16" }),
  /* @__PURE__ */ jsx20("path", { d: "M2 9H22" })
] });
CreditCard.iconName = "credit-card";
var HelpCircle = (props) => /* @__PURE__ */ jsxs14(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx21("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx21("path", { d: "M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5" }),
  /* @__PURE__ */ jsx21("path", { d: "M12 17H12.009", strokeWidth: "1.8" })
] });
HelpCircle.iconName = "help-circle";
var Inbox = (props) => /* @__PURE__ */ jsxs15(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx222("path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" }),
  /* @__PURE__ */ jsx222("path", { d: "M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5" })
] });
Inbox.iconName = "inbox";
var InformationCircle = (props) => /* @__PURE__ */ jsxs16(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx23("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx23("path", { d: "M12 16V11.5" }),
  /* @__PURE__ */ jsx23("path", { d: "M12 8.01172V8.00172", strokeWidth: "1.8" })
] });
InformationCircle.iconName = "information-circle";
var Lock = (props) => /* @__PURE__ */ jsxs17(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx24("path", { d: "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" }),
  /* @__PURE__ */ jsx24("path", { d: "M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 13L12 16" })
] });
Lock.iconName = "lock";
var Mail01 = (props) => /* @__PURE__ */ jsxs18(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx25("path", { d: "M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" }),
  /* @__PURE__ */ jsx25("path", { d: "M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" })
] });
Mail01.iconName = "mail-01";
var Remove01 = (props) => /* @__PURE__ */ jsx26(IconBase, { ...props, children: /* @__PURE__ */ jsx26("path", { d: "M19.002 12L4.99998 12" }) });
Remove01.iconName = "remove-01";
var Search01 = (props) => /* @__PURE__ */ jsxs19(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx27("path", { d: "M17 17L21 21" }),
  /* @__PURE__ */ jsx27("path", { d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" })
] });
Search01.iconName = "search-01";
var SearchRemove = (props) => /* @__PURE__ */ jsxs20(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx28("path", { d: "M17 17L21 21" }),
  /* @__PURE__ */ jsx28("path", { d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" }),
  /* @__PURE__ */ jsx28("path", { d: "M8 8L11 11M11 11L14 14M11 11L14 8M11 11L8 14" })
] });
SearchRemove.iconName = "search-remove";
var Star = (props) => /* @__PURE__ */ jsx29(IconBase, { ...props, children: /* @__PURE__ */ jsx29("path", { d: "M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" }) });
Star.iconName = "star";
var Tick02 = (props) => /* @__PURE__ */ jsx30(IconBase, { ...props, children: /* @__PURE__ */ jsx30("path", { d: "M5 14L8.5 17.5L19 6.5" }) });
Tick02.iconName = "tick-02";
var User = (props) => /* @__PURE__ */ jsxs21(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx31("path", { d: "M2 11C4.3317 8.55783 7.64323 8.44283 10 11M8.49509 4.5C8.49509 5.88071 7.37421 7 5.99153 7C4.60885 7 3.48797 5.88071 3.48797 4.5C3.48797 3.11929 4.60885 2 5.99153 2C7.37421 2 8.49509 3.11929 8.49509 4.5Z" }),
  /* @__PURE__ */ jsx31("path", { d: "M14 22C16.3317 19.5578 19.6432 19.4428 22 22M20.4951 15.5C20.4951 16.8807 19.3742 18 17.9915 18C16.6089 18 15.488 16.8807 15.488 15.5C15.488 14.1193 16.6089 13 17.9915 13C19.3742 13 20.4951 14.1193 20.4951 15.5Z" }),
  /* @__PURE__ */ jsx31("path", { d: "M3 14C3 17.87 6.13 21 10 21L9 19" }),
  /* @__PURE__ */ jsx31("path", { d: "M15 3H21M15 6H21M15 9H18.5" })
] });
User.iconName = "user";
var View = (props) => /* @__PURE__ */ jsxs22(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx32("path", { d: "M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" }),
  /* @__PURE__ */ jsx32("path", { d: "M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" })
] });
View.iconName = "view";
var ViewOff = (props) => /* @__PURE__ */ jsxs23(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx33("path", { d: "M22 8C22 8 18 14 12 14C6 14 2 8 2 8" }),
  /* @__PURE__ */ jsx33("path", { d: "M15 13.5L16.5 16" }),
  /* @__PURE__ */ jsx33("path", { d: "M20 11L22 13" }),
  /* @__PURE__ */ jsx33("path", { d: "M2 13L4 11" }),
  /* @__PURE__ */ jsx33("path", { d: "M9 13.5L7.5 16" })
] });
ViewOff.iconName = "view-off";
var Wrench01 = (props) => /* @__PURE__ */ jsxs24(IconBase, { ...props, children: [
  /* @__PURE__ */ jsx34("path", { d: "M20.3584 13.3567C19.1689 14.546 16.9308 14.4998 13.4992 14.4998C11.2914 14.4998 9.50138 12.7071 9.50024 10.4993C9.50024 7.07001 9.454 4.83065 10.6435 3.64138C11.8329 2.45212 12.3583 2.50027 17.6274 2.50027C18.1366 2.49809 18.3929 3.11389 18.0329 3.47394L15.3199 6.18714C14.6313 6.87582 14.6294 7.99233 15.3181 8.68092C16.0068 9.36952 17.1234 9.36959 17.8122 8.68109L20.5259 5.96855C20.886 5.60859 21.5019 5.86483 21.4997 6.37395C21.4997 11.6422 21.5479 12.1675 20.3584 13.3567Z" }),
  /* @__PURE__ */ jsx34("path", { d: "M13.5 14.5L7.32842 20.6716C6.22386 21.7761 4.433 21.7761 3.32843 20.6716C2.22386 19.567 2.22386 17.7761 3.32843 16.6716L9.5 10.5" }),
  /* @__PURE__ */ jsx34("path", { d: "M5.50896 18.5H5.5", strokeWidth: "2" })
] });
Wrench01.iconName = "wrench-01";
var iconNames = [
  "add-01",
  "alert-circle",
  "arrow-down-01-round",
  "arrow-down-02",
  "arrow-left-01-round",
  "arrow-right-01-round",
  "arrow-up-01-round",
  "arrow-up-02",
  "arrow-up-right-01",
  "at",
  "calendar-01",
  "cancel-01",
  "checkmark-circle-02",
  "clock-01",
  "clock-02",
  "cloud-server",
  "color-picker",
  "copy-01",
  "credit-card",
  "help-circle",
  "inbox",
  "information-circle",
  "lock",
  "mail-01",
  "remove-01",
  "search-01",
  "search-remove",
  "star",
  "tick-02",
  "user",
  "view",
  "view-off",
  "wrench-01"
];

// ../ui/dist/index.js
import { jsx as jsx62, jsxs as jsxs32 } from "react/jsx-runtime";
import * as React62 from "react";
import { jsx as jsx72 } from "react/jsx-runtime";
import * as React72 from "react";
import { jsx as jsx82, jsxs as jsxs42 } from "react/jsx-runtime";
import * as React82 from "react";
import { jsx as jsx92, jsxs as jsxs52 } from "react/jsx-runtime";
import * as React92 from "react";
import { jsx as jsx102, jsxs as jsxs62 } from "react/jsx-runtime";
import * as React102 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-switch@1.3.7_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3._dshm4aobwoctctkn2fhvnwdzye/node_modules/@radix-ui/react-switch/dist/index.mjs
import * as React12 from "react";

// ../../node_modules/.pnpm/@radix-ui+primitive@1.1.7/node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return /* @__PURE__ */ __name(function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  }, "handleEvent");
}
__name(composeEventHandlers, "composeEventHandlers");
function getOwnerWindow(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access window outside of the DOM");
  }
  return element?.ownerDocument?.defaultView ?? window;
}
__name(getOwnerWindow, "getOwnerWindow");
function getOwnerDocument(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access document outside of the DOM");
  }
  return element?.ownerDocument ?? document;
}
__name(getOwnerDocument, "getOwnerDocument");
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getOwnerDocument(node);
  if (!activeElement?.nodeName) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getOwnerDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
__name(getActiveElement, "getActiveElement");
function isFrame(element) {
  return element.tagName === "IFRAME";
}
__name(isFrame, "isFrame");

// ../../node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.5_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React4 from "react";
var __defProp2 = Object.defineProperty;
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
function setRef2(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name2(setRef2, "setRef");
function composeRefs2(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef2(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef2(refs[i], null);
          }
        }
      };
    }
  };
}
__name2(composeRefs2, "composeRefs");
function useComposedRefs(...refs) {
  return React4.useCallback(composeRefs2(...refs), refs);
}
__name2(useComposedRefs, "useComposedRefs");

// ../../node_modules/.pnpm/@radix-ui+react-context@1.2.2_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-context/dist/index.mjs
import * as React5 from "react";
import { jsx as jsx35 } from "react/jsx-runtime";
var __defProp3 = Object.defineProperty;
var __name3 = (target, value) => __defProp3(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createContext2(rootComponentName, defaultContext) {
  const Context = React5.createContext(defaultContext);
  Context.displayName = rootComponentName + "Context";
  const Provider2 = /* @__PURE__ */ __name3((props) => {
    const { children, ...context } = props;
    const value = React5.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsx35(Context.Provider, { value, children });
  }, "Provider");
  Provider2.displayName = rootComponentName + "Provider";
  function useContext22(consumerName, options = {}) {
    const { optional = false } = options;
    const context = React5.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    if (optional) return void 0;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  __name3(useContext22, "useContext");
  return [Provider2, useContext22];
}
__name3(createContext2, "createContext");
// @__NO_SIDE_EFFECTS__
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = React5.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider2 = /* @__PURE__ */ __name3((props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const value = React5.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx35(Context.Provider, { value, children });
    }, "Provider");
    Provider2.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope, options = {}) {
      const { optional = false } = options;
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const context = React5.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      if (optional) return void 0;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    __name3(useContext22, "useContext");
    return [Provider2, useContext22];
  }
  __name3(createContext32, "createContext");
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React5.createContext(defaultContext);
    });
    return /* @__PURE__ */ __name3(function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React5.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    }, "useScope");
  }, "createScope");
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
__name3(createContextScope, "createContextScope");
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return /* @__PURE__ */ __name3(function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React5.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    }, "useComposedScopes");
  }, "createScope");
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
__name3(composeContextScopes, "composeContextScopes");

// ../../node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.6_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React8 from "react";

// ../../node_modules/.pnpm/@radix-ui+primitive@1.1.7/node_modules/@radix-ui/primitive/dist/internal/is-development.false.mjs
var IS_DEVELOPMENT = false;

// ../../node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as React6 from "react";
var useLayoutEffect2 = globalThis?.document ? React6.useLayoutEffect : () => {
};

// ../../node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.6_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React22 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-use-effect-event@0.0.5_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
import * as React7 from "react";
var __defProp4 = Object.defineProperty;
var __name4 = (target, value) => __defProp4(target, "name", { value, configurable: true });
var useReactEffectEvent = React7[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = React7[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = React7.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      ref.current = callback;
    });
  }
  return React7.useMemo(() => ((...args) => ref.current?.(...args)), []);
}
__name4(useEffectEvent, "useEffectEvent");

// ../../node_modules/.pnpm/@radix-ui+react-use-controllable-state@1.2.6_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var __defProp5 = Object.defineProperty;
var __name5 = (target, value) => __defProp5(target, "name", { value, configurable: true });
var useInsertionEffect = React8[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = /* @__PURE__ */ __name5(() => {
  }, "onChange"),
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  if (IS_DEVELOPMENT) {
    const isControlledRef = React8.useRef(prop !== void 0);
    React8.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = React8.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
__name5(useControllableState, "useControllableState");
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = React8.useState(defaultProp);
  const prevValueRef = React8.useRef(value);
  const onChangeRef = React8.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React8.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
__name5(useUncontrolledState, "useUncontrolledState");
function isFunction(value) {
  return typeof value === "function";
}
__name5(isFunction, "isFunction");
var SYNC_STATE = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
  const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
  const isControlled = controlledState !== void 0;
  const onChange = useEffectEvent(onChangeProp);
  if (IS_DEVELOPMENT) {
    const isControlledRef = React22.useRef(controlledState !== void 0);
    React22.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const args = [{ ...initialArg, state: defaultProp }];
  if (init) {
    args.push(init);
  }
  const [internalState, dispatch] = React22.useReducer(
    (state22, action) => {
      if (action.type === SYNC_STATE) {
        return { ...state22, state: action.state };
      }
      const next = reducer(state22, action);
      if (isControlled && !Object.is(next.state, state22.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );
  const uncontrolledState = internalState.state;
  const prevValueRef = React22.useRef(uncontrolledState);
  React22.useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [uncontrolledState, prevValueRef, isControlled]);
  const state2 = React22.useMemo(() => {
    const isControlled2 = controlledState !== void 0;
    if (isControlled2) {
      return { ...internalState, state: controlledState };
    }
    return internalState;
  }, [internalState, controlledState]);
  React22.useEffect(() => {
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ type: SYNC_STATE, state: controlledState });
    }
  }, [controlledState, internalState.state, isControlled]);
  return [state2, dispatch];
}
__name5(useControllableStateReducer, "useControllableStateReducer");

// ../../node_modules/.pnpm/@radix-ui+react-use-size@1.1.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-size/dist/index.mjs
import * as React9 from "react";
var __defProp6 = Object.defineProperty;
var __name6 = (target, value) => __defProp6(target, "name", { value, configurable: true });
function useSize(element) {
  const [size4, setSize] = React9.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size4;
}
__name6(useSize, "useSize");

// ../../node_modules/.pnpm/@radix-ui+react-primitive@2.1.10_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@1_6rb44ivkszst5x7mczd7ubxihy/node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as React11 from "react";
import * as ReactDOM from "react-dom";

// ../../node_modules/.pnpm/@radix-ui+react-slot@1.3.3_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-slot/dist/index.mjs
import * as React10 from "react";
var __defProp7 = Object.defineProperty;
var __name7 = (target, value) => __defProp7(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createSlot2(ownerName) {
  const Slot2 = React10.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    let slottableElement = null;
    let hasSlottable = false;
    const newChildren = [];
    if (isLazyComponent2(children) && typeof use2 === "function") {
      children = use2(children._payload);
    }
    React10.Children.forEach(children, (maybeSlottable) => {
      if (isSlottable2(maybeSlottable)) {
        hasSlottable = true;
        const slottable = maybeSlottable;
        let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
        if (isLazyComponent2(child) && typeof use2 === "function") {
          child = use2(child._payload);
        }
        slottableElement = getSlottableElementFromSlottable(slottable, child);
        newChildren.push(slottableElement?.props?.children);
      } else {
        newChildren.push(maybeSlottable);
      }
    });
    if (slottableElement) {
      slottableElement = React10.cloneElement(slottableElement, void 0, newChildren);
    } else if (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !hasSlottable && React10.Children.count(children) === 1 && React10.isValidElement(children)
    ) {
      slottableElement = children;
    }
    const slottableElementRef = slottableElement ? getElementRef2(slottableElement) : void 0;
    const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
    if (!slottableElement) {
      if (children || children === 0) {
        throw new Error(
          hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName)
        );
      }
      return children;
    }
    const mergedProps = mergeProps2(slotProps, slottableElement.props ?? {});
    if (slottableElement.type !== React10.Fragment) {
      mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
    }
    return React10.cloneElement(slottableElement, mergedProps);
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
__name7(createSlot2, "createSlot");
var SLOTTABLE_IDENTIFIER2 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = /* @__PURE__ */ __name7((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER2;
  return Slottable2;
}
__name7(createSlottable, "createSlottable");
var getSlottableElementFromSlottable = /* @__PURE__ */ __name7((slottable, child) => {
  if ("child" in slottable.props) {
    const child2 = slottable.props.child;
    if (!React10.isValidElement(child2)) return null;
    return React10.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
  }
  return React10.isValidElement(child) ? child : null;
}, "getSlottableElementFromSlottable");
function mergeProps2(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
__name7(mergeProps2, "mergeProps");
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
__name7(getElementRef2, "getElementRef");
function isSlottable2(child) {
  return React10.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER2;
}
__name7(isSlottable2, "isSlottable");
var REACT_LAZY_TYPE2 = /* @__PURE__ */ Symbol.for("react.lazy");
function isLazyComponent2(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE2 && "_payload" in element && isPromiseLike2(element._payload);
}
__name7(isLazyComponent2, "isLazyComponent");
function isPromiseLike2(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
__name7(isPromiseLike2, "isPromiseLike");
var createSlotError = /* @__PURE__ */ __name7((ownerName) => {
  return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
}, "createSlotError");
var createSlottableError = /* @__PURE__ */ __name7((ownerName) => {
  return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
}, "createSlottableError");
var use2 = React10[" use ".trim().toString()];

// ../../node_modules/.pnpm/@radix-ui+react-primitive@2.1.10_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@1_6rb44ivkszst5x7mczd7ubxihy/node_modules/@radix-ui/react-primitive/dist/index.mjs
import { jsx as jsx36 } from "react/jsx-runtime";
var __defProp8 = Object.defineProperty;
var __name8 = (target, value) => __defProp8(target, "name", { value, configurable: true });
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot2(`Primitive.${node}`);
  const Node2 = React11.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx36(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}
__name8(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");

// ../../node_modules/.pnpm/@radix-ui+react-switch@1.3.7_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3._dshm4aobwoctctkn2fhvnwdzye/node_modules/@radix-ui/react-switch/dist/index.mjs
import { Fragment as Fragment4, jsx as jsx37, jsxs as jsxs25 } from "react/jsx-runtime";
var __defProp9 = Object.defineProperty;
var __name9 = (target, value) => __defProp9(target, "name", { value, configurable: true });
var SWITCH_NAME = "Switch";
var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
var [SwitchProviderImpl, useSwitchContext] = createSwitchContext(SWITCH_NAME);
function SwitchProvider(props) {
  const {
    __scopeSwitch,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: SWITCH_NAME
  });
  const [control, setControl] = React12.useState(null);
  const [bubbleInput, setBubbleInput] = React12.useState(null);
  const hasConsumerStoppedPropagationRef = React12.useRef(false);
  const [userInteractionCount, onUserInteraction] = React12.useReducer(
    (count2) => count2 + 1,
    0
  );
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    setChecked,
    disabled,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    userInteractionCount,
    onUserInteraction,
    required,
    defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsx37(SwitchProviderImpl, { scope: __scopeSwitch, ...context, children: isFunction2(internal_do_not_use_render) ? internal_do_not_use_render(context) : children });
}
__name9(SwitchProvider, "SwitchProvider");
var TRIGGER_NAME = "SwitchTrigger";
var SwitchTrigger = /* @__PURE__ */ React12.forwardRef(
  /* @__PURE__ */ __name9(function SwitchTrigger2({ __scopeSwitch, onClick, ...switchProps }, forwardedRef) {
    const {
      control,
      form,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      onUserInteraction,
      isFormControl,
      bubbleInput
    } = useSwitchContext(TRIGGER_NAME, __scopeSwitch);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = React12.useRef(checked);
    React12.useEffect(() => {
      const associatedForm = form ? control?.ownerDocument.getElementById(form) : control?.form;
      if (associatedForm instanceof HTMLFormElement) {
        const reset = /* @__PURE__ */ __name9(() => setChecked(initialCheckedStateRef.current), "reset");
        associatedForm.addEventListener("reset", reset);
        return () => associatedForm.removeEventListener("reset", reset);
      }
    }, [control, form, setChecked]);
    return /* @__PURE__ */ jsx37(
      Primitive.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...switchProps,
        ref: composedRefs,
        onClick: composeEventHandlers(onClick, (event) => {
          onUserInteraction();
          setChecked((prevChecked) => !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }, "SwitchTrigger")
);
var Switch = /* @__PURE__ */ React12.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name9(function Switch2(props, forwardedRef) {
    const {
      __scopeSwitch,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    return /* @__PURE__ */ jsx37(
      SwitchProvider,
      {
        __scopeSwitch,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxs25(Fragment4, { children: [
          /* @__PURE__ */ jsx37(
            SwitchTrigger,
            {
              ...switchProps,
              ref: forwardedRef,
              __scopeSwitch
            }
          ),
          isFormControl && /* @__PURE__ */ jsx37(
            SwitchBubbleInput,
            {
              __scopeSwitch
            }
          )
        ] })
      }
    );
  }, "Switch")
);
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = /* @__PURE__ */ React12.forwardRef(
  /* @__PURE__ */ __name9(function SwitchThumb2(props, forwardedRef) {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsx37(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }, "SwitchThumb")
);
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = /* @__PURE__ */ React12.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name9(function SwitchBubbleInput2({ __scopeSwitch, onClick, ...props }, forwardedRef) {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      userInteractionCount,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useSwitchContext(BUBBLE_INPUT_NAME, __scopeSwitch);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const controlSize = useSize(control);
    const shouldStopClickPropagationRef = React12.useRef(false);
    const prevCheckedRef = React12.useRef(checked);
    const prevUserInteractionCountRef = React12.useRef(userInteractionCount);
    React12.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const isUserInteraction = userInteractionCount !== prevUserInteractionCountRef.current;
      prevUserInteractionCountRef.current = userInteractionCount;
      const checkedChanged = prevCheckedRef.current !== checked;
      prevCheckedRef.current = checked;
      const bubbles = !(isUserInteraction && hasConsumerStoppedPropagationRef.current);
      if (checkedChanged && setChecked) {
        shouldStopClickPropagationRef.current = !isUserInteraction;
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
        shouldStopClickPropagationRef.current = false;
      }
    }, [bubbleInput, checked, hasConsumerStoppedPropagationRef, userInteractionCount]);
    const defaultCheckedRef = React12.useRef(checked);
    return /* @__PURE__ */ jsx37(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        onClick: composeEventHandlers(onClick, (event) => {
          if (shouldStopClickPropagationRef.current) {
            event.stopPropagation();
          }
        }),
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "SwitchBubbleInput")
);
function isFunction2(value) {
  return typeof value === "function";
}
__name9(isFunction2, "isFunction");
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
__name9(getState, "getState");

// ../ui/dist/index.js
import { jsx as jsx112 } from "react/jsx-runtime";
import * as React112 from "react";
import { jsx as jsx122, jsxs as jsxs72 } from "react/jsx-runtime";
import * as React122 from "react";
import { jsx as jsx132, jsxs as jsxs82 } from "react/jsx-runtime";
import * as React132 from "react";
import { jsx as jsx142, jsxs as jsxs92 } from "react/jsx-runtime";
import * as React142 from "react";
import { jsx as jsx152, jsxs as jsxs102 } from "react/jsx-runtime";
import * as React162 from "react";
import * as React152 from "react";
import { jsx as jsx162, jsxs as jsxs112 } from "react/jsx-runtime";
import { jsx as jsx172, jsxs as jsxs122 } from "react/jsx-runtime";
import * as React172 from "react";
import { jsx as jsx182, jsxs as jsxs132 } from "react/jsx-runtime";
import * as React182 from "react";
import { jsx as jsx192, jsxs as jsxs142 } from "react/jsx-runtime";
import * as React192 from "react";
import { jsx as jsx202, jsxs as jsxs152 } from "react/jsx-runtime";
import * as React202 from "react";
import { jsx as jsx212, jsxs as jsxs162 } from "react/jsx-runtime";
import * as React212 from "react";
import { jsx as jsx223, jsxs as jsxs172 } from "react/jsx-runtime";
import * as React222 from "react";
import { jsx as jsx232 } from "react/jsx-runtime";
import * as React232 from "react";
import { jsx as jsx242 } from "react/jsx-runtime";
import * as React242 from "react";
import { jsx as jsx252 } from "react/jsx-runtime";
import * as React252 from "react";
import { jsx as jsx262, jsxs as jsxs182 } from "react/jsx-runtime";
import * as React262 from "react";
import { jsx as jsx272, jsxs as jsxs192 } from "react/jsx-runtime";
import * as React27 from "react";
import { jsx as jsx282, jsxs as jsxs202 } from "react/jsx-runtime";
import * as React28 from "react";
import { jsx as jsx292, jsxs as jsxs212 } from "react/jsx-runtime";
import * as React29 from "react";
import { jsx as jsx302, jsxs as jsxs222 } from "react/jsx-runtime";

// ../../node_modules/.pnpm/@radix-ui+react-tooltip@1.2.16_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18._ort6j2vciilvofczpjkp5fn3iy/node_modules/@radix-ui/react-tooltip/dist/index.mjs
import * as React24 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.19_@types+react-dom@18.3.7_@types+react@18.3.28__@types_cpl3xwzrfoo2uufobeb5t4jl3y/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import * as React14 from "react";

// ../../node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as React13 from "react";
var __defProp10 = Object.defineProperty;
var __name10 = (target, value) => __defProp10(target, "name", { value, configurable: true });
function useCallbackRef(callback) {
  const callbackRef = React13.useRef(callback);
  React13.useEffect(() => {
    callbackRef.current = callback;
  });
  return React13.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
__name10(useCallbackRef, "useCallbackRef");

// ../../node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.19_@types+react-dom@18.3.7_@types+react@18.3.28__@types_cpl3xwzrfoo2uufobeb5t4jl3y/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import { jsx as jsx38 } from "react/jsx-runtime";
var __defProp11 = Object.defineProperty;
var __name11 = (target, value) => __defProp11(target, "name", { value, configurable: true });
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React14.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
});
var DismissableLayer = /* @__PURE__ */ React14.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name11(function DismissableLayer2(props, forwardedRef) {
    const {
      disableOutsidePointerEvents = false,
      deferPointerDownOutside = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = React14.useContext(DismissableLayerContext);
    const [node, setNode] = React14.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React14.useState({});
    const composedRefs = useComposedRefs(forwardedRef, setNode);
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
      ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
    const index2 = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const isDeferredPointerDownOutsideRef = React14.useRef(false);
    const pointerDownOutside = usePointerDownOutside(
      (event) => {
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
      },
      {
        ownerDocument,
        deferPointerDownOutside,
        isDeferredPointerDownOutsideRef,
        dismissableSurfaces: context.dismissableSurfaces,
        shouldHandlePointerDownOutside: React14.useCallback(
          (target) => {
            if (!(target instanceof Node)) {
              return false;
            }
            const isPointerDownOnBranch = [...context.branches].some(
              (branch) => branch.contains(target)
            );
            return isPointerEventsEnabled && !isPointerDownOnBranch;
          },
          [context.branches, isPointerEventsEnabled]
        )
      }
    );
    const focusOutside = useFocusOutside((event) => {
      if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const isHighestLayer = node ? index2 === layers.length - 1 : false;
    const handleKeyDown = useCallbackRef((event) => {
      if (event.key !== "Escape") {
        return;
      }
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    });
    React14.useEffect(() => {
      if (!isHighestLayer) {
        return;
      }
      ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
    }, [ownerDocument, isHighestLayer, handleKeyDown]);
    React14.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents) {
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
          }
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React14.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    React14.useEffect(() => {
      const handleUpdate = /* @__PURE__ */ __name11(() => force({}), "handleUpdate");
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsx38(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function useDismissableLayerSurface() {
  const context = React14.useContext(DismissableLayerContext);
  const [node, setNode] = React14.useState(null);
  React14.useEffect(() => {
    if (!node) {
      return;
    }
    context.dismissableSurfaces.add(node);
    return () => {
      context.dismissableSurfaces.delete(node);
    };
  }, [node, context.dismissableSurfaces]);
  return setNode;
}
__name11(useDismissableLayerSurface, "useDismissableLayerSurface");
var IS_TRUE = /* @__PURE__ */ __name11(() => true, "IS_TRUE");
function usePointerDownOutside(onPointerDownOutside, args) {
  const {
    ownerDocument = globalThis?.document,
    deferPointerDownOutside = false,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces,
    shouldHandlePointerDownOutside = IS_TRUE
  } = args;
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React14.useRef(false);
  const isPointerDownOutsideRef = React14.useRef(false);
  const interceptedOutsideInteractionEventsRef = React14.useRef(/* @__PURE__ */ new Map());
  const handleClickRef = React14.useRef(() => {
  });
  React14.useEffect(() => {
    function resetOutsideInteraction() {
      isPointerDownOutsideRef.current = false;
      isDeferredPointerDownOutsideRef.current = false;
      interceptedOutsideInteractionEventsRef.current.clear();
    }
    __name11(resetOutsideInteraction, "resetOutsideInteraction");
    function isOutsideInteractionIntercepted() {
      return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
    }
    __name11(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
    function handleInteractionCapture(event) {
      if (!isPointerDownOutsideRef.current) {
        return;
      }
      const target = event.target;
      const isDismissableSurface = target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target));
      if (!isDismissableSurface) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, true);
      }
      if (event.type === "click") {
        window.setTimeout(() => {
          if (isPointerDownOutsideRef.current) {
            handleClickRef.current();
          }
        }, 0);
      }
    }
    __name11(handleInteractionCapture, "handleInteractionCapture");
    function handleInteractionBubble(event) {
      if (isPointerDownOutsideRef.current) {
        interceptedOutsideInteractionEventsRef.current.set(event.type, false);
      }
    }
    __name11(handleInteractionBubble, "handleInteractionBubble");
    const handlePointerDown = /* @__PURE__ */ __name11((event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
          resetOutsideInteraction();
          if (!wasOutsideInteractionIntercepted) {
            handleAndDispatchCustomEvent(
              POINTER_DOWN_OUTSIDE,
              handlePointerDownOutside,
              eventDetail,
              { discrete: true }
            );
          }
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        __name11(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
        if (!shouldHandlePointerDownOutside(event.target)) {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          resetOutsideInteraction();
          isPointerInsideReactTreeRef.current = false;
          return;
        }
        const eventDetail = { originalEvent: event };
        isPointerDownOutsideRef.current = true;
        isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
        interceptedOutsideInteractionEventsRef.current.clear();
        if (!deferPointerDownOutside || event.button !== 0) {
          handleAndDispatchPointerDownOutsideEvent2();
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
        resetOutsideInteraction();
      }
      isPointerInsideReactTreeRef.current = false;
    }, "handlePointerDown");
    const outsideInteractionEvents = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const eventName of outsideInteractionEvents) {
      ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
      ownerDocument.addEventListener(eventName, handleInteractionBubble);
    }
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
      for (const eventName of outsideInteractionEvents) {
        ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
        ownerDocument.removeEventListener(eventName, handleInteractionBubble);
      }
    };
  }, [
    ownerDocument,
    handlePointerDownOutside,
    deferPointerDownOutside,
    isDeferredPointerDownOutsideRef,
    dismissableSurfaces,
    shouldHandlePointerDownOutside
  ]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ __name11(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture")
  };
}
__name11(usePointerDownOutside, "usePointerDownOutside");
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React14.useRef(false);
  React14.useEffect(() => {
    const handleFocus = /* @__PURE__ */ __name11((event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    }, "handleFocus");
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: /* @__PURE__ */ __name11(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ __name11(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
  };
}
__name11(useFocusOutside, "useFocusOutside");
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
__name11(dispatchUpdate, "dispatchUpdate");
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
__name11(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");

// ../../node_modules/.pnpm/@radix-ui+react-id@1.1.4_@types+react@18.3.28_react@18.3.1/node_modules/@radix-ui/react-id/dist/index.mjs
import * as React15 from "react";
var __defProp12 = Object.defineProperty;
var __name12 = (target, value) => __defProp12(target, "name", { value, configurable: true });
var useReactId = React15[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = React15.useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
__name12(useId, "useId");

// ../../node_modules/.pnpm/@radix-ui+react-popper@1.3.7_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3._aeg366h4kpc3mcubn5q35pjbx4/node_modules/@radix-ui/react-popper/dist/index.mjs
import * as React18 from "react";

// ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

// ../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = getAlignment(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}
async function detectOverflow(state2, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state2;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state2);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state2) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state2;
    const {
      element,
      padding = 0
    } = evaluate(options, state2) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset4 = clamp(minPadding, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset4,
        centerOffset: center - offset4 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state2) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state2);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state2, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state2) {
      const {
        rects,
        platform: platform2
      } = state2;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state2);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state2, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state2, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state2, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state2);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state2) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state2;
      const diffCoords = await convertValueToCoords(state2, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state2) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state2;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state2);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state2, detectOverflowOptions);
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state2,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state2) {
      var _rawOffset$mainAxis, _rawOffset$crossAxis;
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state2;
      const {
        offset: offset4 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state2);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset4, state2);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
        crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state2) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state2;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state2);
      const overflow = await platform2.detectOverflow(state2, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const shiftData = state2.middlewareData.shift;
      const noShift = !shiftData;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (shiftData != null && shiftData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if (shiftData != null && shiftData.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        if (isYAxis) {
          availableWidth = width - 2 * max(overflow.left, overflow.right);
        } else {
          availableHeight = height - 2 * max(overflow.top, overflow.bottom);
        }
      }
      await apply({
        ...state2,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// ../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// ../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = getWindow(domElement);
    const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
  const scroll = getNodeScroll(html);
  const body = html.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = "viewport";
  }
  const isLayoutViewport = rootBoundary === "layoutViewport";
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x = -visualViewport.offsetLeft;
        y = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let lastKeptComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        return refresh();
      }
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  const win = getWindow(element);
  const handleResize = () => refresh(ancestorResize);
  win.addEventListener("resize", handleResize);
  refresh(true);
  return () => {
    win.removeEventListener("resize", handleResize);
    cleanup();
  };
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update);
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// ../../node_modules/.pnpm/@floating-ui+react-dom@2.1.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
import * as React16 from "react";
import { useLayoutEffect as useLayoutEffect3 } from "react";
import * as ReactDOM2 from "react-dom";
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? useLayoutEffect3 : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React16.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React16.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React16.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React16.useState(null);
  const [_floating, _setFloating] = React16.useState(null);
  const setReference = React16.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React16.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React16.useRef(null);
  const floatingRef = React16.useRef(null);
  const dataRef = React16.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React16.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM2.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React16.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React16.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React16.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React16.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React16.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state2) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state2) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state2);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state2);
      }
      return {};
    }
  };
};
var offset3 = (options, deps) => {
  const result = offset2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var shift3 = (options, deps) => {
  const result = shift2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var limitShift3 = (options, deps) => {
  const result = limitShift2(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};
var flip3 = (options, deps) => {
  const result = flip2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var size3 = (options, deps) => {
  const result = size2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var hide3 = (options, deps) => {
  const result = hide2(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var arrow3 = (options, deps) => {
  const result = arrow$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};

// ../../node_modules/.pnpm/@radix-ui+react-arrow@1.1.15_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3._pveugs45eibcc25wsceuvecgki/node_modules/@radix-ui/react-arrow/dist/index.mjs
import * as React17 from "react";
import { jsx as jsx39 } from "react/jsx-runtime";
var __defProp13 = Object.defineProperty;
var __name13 = (target, value) => __defProp13(target, "name", { value, configurable: true });
var Arrow = /* @__PURE__ */ React17.forwardRef(
  /* @__PURE__ */ __name13(function Arrow2(props, forwardedRef) {
    const { children, width = 10, height = 5, ...arrowProps } = props;
    return /* @__PURE__ */ jsx39(
      Primitive.svg,
      {
        ...arrowProps,
        ref: forwardedRef,
        width,
        height,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none",
        children: props.asChild ? children : /* @__PURE__ */ jsx39("polygon", { points: "0,0 30,0 15,10" })
      }
    );
  }, "Arrow")
);
var Root = Arrow;

// ../../node_modules/.pnpm/@radix-ui+react-popper@1.3.7_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3._aeg366h4kpc3mcubn5q35pjbx4/node_modules/@radix-ui/react-popper/dist/index.mjs
import { jsx as jsx40 } from "react/jsx-runtime";
var __defProp14 = Object.defineProperty;
var __name14 = (target, value) => __defProp14(target, "name", { value, configurable: true });
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = /* @__PURE__ */ __name14((props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React18.useState(null);
  const [placementState, setPlacementState] = React18.useState(void 0);
  return /* @__PURE__ */ jsx40(
    PopperProvider,
    {
      scope: __scopePopper,
      anchor,
      onAnchorChange: setAnchor,
      placementState,
      setPlacementState,
      children
    }
  );
}, "Popper");
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = /* @__PURE__ */ React18.forwardRef(
  /* @__PURE__ */ __name14(function PopperAnchor2(props, forwardedRef) {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = React18.useRef(null);
    const onAnchorChange = context.onAnchorChange;
    const callbackRef = React18.useCallback(
      (node) => {
        ref.current = node;
        if (node) {
          onAnchorChange(node);
        }
      },
      [onAnchorChange]
    );
    const composedRefs = useComposedRefs(forwardedRef, callbackRef);
    const anchorRef = React18.useRef(null);
    React18.useEffect(() => {
      if (!virtualRef) {
        return;
      }
      const previousAnchor = anchorRef.current;
      anchorRef.current = virtualRef.current;
      if (previousAnchor !== anchorRef.current) {
        onAnchorChange(anchorRef.current);
      }
    });
    const sideAndAlign = context.placementState && getSideAndAlignFromPlacement(context.placementState);
    const placedSide = sideAndAlign?.[0];
    const placedAlign = sideAndAlign?.[1];
    return virtualRef ? null : /* @__PURE__ */ jsx40(
      Primitive.div,
      {
        "data-radix-popper-side": placedSide,
        "data-radix-popper-align": placedAlign,
        ...anchorProps,
        ref: composedRefs
      }
    );
  }, "PopperAnchor")
);
var CONTENT_NAME = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME);
var PopperContent = /* @__PURE__ */ React18.forwardRef(
  /* @__PURE__ */ __name14(function PopperContent2(props, forwardedRef) {
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME, __scopePopper);
    const [content, setContent] = React18.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, setContent);
    const [arrow4, setArrow] = React18.useState(null);
    const arrowSize = useSize(arrow4);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: /* @__PURE__ */ __name14((...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      }, "whileElementsMounted"),
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift3({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift3() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip3({ ...detectOverflowOptions }),
        size3({
          ...detectOverflowOptions,
          apply: /* @__PURE__ */ __name14(({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }, "apply")
        }),
        arrow4 && arrow3({ element: arrow4, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide3({
          strategy: "referenceHidden",
          ...detectOverflowOptions,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: hasExplicitBoundaries ? detectOverflowOptions.boundary : void 0
        })
      ]
    });
    const setPlacementState = context.setPlacementState;
    useLayoutEffect2(() => {
      setPlacementState(placement);
      return () => {
        setPlacementState(void 0);
      };
    }, [placement, setPlacementState]);
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced?.();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React18.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsx40(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          "--radix-popper-transform-origin": [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...middlewareData.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsx40(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            placedAlign,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsx40(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all
                  // measurements done) we prevent animations so that users'
                  // animations don't kick in too early from the wrong sides.
                  animation: !isPositioned ? "none" : contentProps.style?.animation
                }
              }
            )
          }
        )
      }
    );
  }, "PopperContent")
);
var ARROW_NAME = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = /* @__PURE__ */ React18.forwardRef(
  /* @__PURE__ */ __name14(function PopperArrow2(props, forwardedRef) {
    const { __scopePopper, ...arrowProps } = props;
    const contentContext = useContentContext(ARROW_NAME, __scopePopper);
    const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
    return (
      // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
      // doesn't report size as we'd expect on SVG elements.
      // it reports their bounding box which is effectively the largest path inside the SVG.
      /* @__PURE__ */ jsx40(
        "span",
        {
          ref: contentContext.onArrowChange,
          style: {
            position: "absolute",
            left: contentContext.arrowX,
            top: contentContext.arrowY,
            [baseSide]: 0,
            transformOrigin: {
              top: "",
              right: "0 0",
              bottom: "center 0",
              left: "100% 0"
            }[contentContext.placedSide],
            transform: {
              top: "translateY(100%)",
              right: "translateY(50%) rotate(90deg) translateX(-50%)",
              bottom: `rotate(180deg)`,
              left: "translateY(50%) rotate(-90deg) translateX(50%)"
            }[contentContext.placedSide],
            visibility: contentContext.shouldHideArrow ? "hidden" : void 0
          },
          children: /* @__PURE__ */ jsx40(
            Root,
            {
              ...arrowProps,
              ref: forwardedRef,
              style: {
                ...arrowProps.style,
                // ensures the element can be measured correctly (mostly for if SVG)
                display: "block"
              }
            }
          )
        }
      )
    );
  }, "PopperArrow")
);
function isNotNull(value) {
  return value !== null;
}
__name14(isNotNull, "isNotNull");
var transformOrigin = /* @__PURE__ */ __name14((options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
}), "transformOrigin");
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
__name14(getSideAndAlignFromPlacement, "getSideAndAlignFromPlacement");
var Root2 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow3 = PopperArrow;

// ../../node_modules/.pnpm/@radix-ui+react-portal@1.1.17_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18.3_62qly2sixwldagz7wm3apdjg2a/node_modules/@radix-ui/react-portal/dist/index.mjs
import * as React19 from "react";
import * as ReactDOM3 from "react-dom";
import { jsx as jsx41 } from "react/jsx-runtime";
var __defProp15 = Object.defineProperty;
var __name15 = (target, value) => __defProp15(target, "name", { value, configurable: true });
var Portal = /* @__PURE__ */ React19.forwardRef(
  /* @__PURE__ */ __name15(function Portal2(props, forwardedRef) {
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = React19.useState(false);
    useLayoutEffect2(() => setMounted(true), []);
    const container2 = containerProp || mounted && globalThis?.document?.body;
    return container2 ? ReactDOM3.createPortal(/* @__PURE__ */ jsx41(Primitive.div, { ...portalProps, ref: forwardedRef }), container2) : null;
  }, "Portal")
);

// ../../node_modules/.pnpm/@radix-ui+react-presence@1.1.10_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18_e7x6ilddht3twpdiuot2wo7asi/node_modules/@radix-ui/react-presence/dist/index.mjs
import * as React23 from "react";
import * as React20 from "react";
var __defProp16 = Object.defineProperty;
var __name16 = (target, value) => __defProp16(target, "name", { value, configurable: true });
function useStateMachine(initialState, machine) {
  return React20.useReducer((state2, event) => {
    const nextState = machine[state2][event];
    return nextState ?? state2;
  }, initialState);
}
__name16(useStateMachine, "useStateMachine");
var Presence = /* @__PURE__ */ __name16((props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React23.Children.only(children);
  const ref = useStableComposedRefs(presence.ref, getElementRef3(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React23.cloneElement(child, { ref }) : null;
}, "Presence");
function usePresence(present) {
  const [node, setNode] = React23.useState();
  const stylesRef = React23.useRef(null);
  const prevPresentRef = React23.useRef(present);
  const prevAnimationNameRef = React23.useRef("none");
  const mountAnimationNameRef = React23.useRef(void 0);
  const initialState = present ? "mounted" : "unmounted";
  const [state2, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React23.useEffect(() => {
    if (state2 === "mounted") {
      prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
      mountAnimationNameRef.current = void 0;
    } else {
      prevAnimationNameRef.current = "none";
    }
  }, [state2]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        mountAnimationNameRef.current = currentAnimationName;
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = /* @__PURE__ */ __name16((event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      }, "handleAnimationEnd");
      const handleAnimationStart = /* @__PURE__ */ __name16((event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      }, "handleAnimationStart");
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state2),
    ref: React23.useCallback((node2) => {
      if (node2) {
        const styles = getComputedStyle(node2);
        stylesRef.current = styles;
        mountAnimationNameRef.current = getAnimationName(styles);
      } else {
        stylesRef.current = null;
      }
      setNode(node2);
    }, [])
  };
}
__name16(usePresence, "usePresence");
function setRef3(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name16(setRef3, "setRef");
function useStableComposedRefs(...refs) {
  const refsRef = React23.useRef(refs);
  refsRef.current = refs;
  return React23.useCallback((node) => {
    const currentRefs = refsRef.current;
    let hasCleanup = false;
    const cleanups = currentRefs.map((ref) => {
      const cleanup = setRef3(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef3(currentRefs[i], null);
          }
        }
      };
    }
  }, []);
}
__name16(useStableComposedRefs, "useStableComposedRefs");
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
__name16(getAnimationName, "getAnimationName");
function getElementRef3(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
__name16(getElementRef3, "getElementRef");

// ../../node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.11_@types+react-dom@18.3.7_@types+react@18.3.28__@types+r_euzzw7hj3wws7gb2mhgfgbzoey/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
import * as React21 from "react";
import { jsx as jsx42 } from "react/jsx-runtime";
var __defProp17 = Object.defineProperty;
var __name17 = (target, value) => __defProp17(target, "name", { value, configurable: true });
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var VisuallyHidden = /* @__PURE__ */ React21.forwardRef(
  /* @__PURE__ */ __name17(function VisuallyHidden2(props, forwardedRef) {
    return /* @__PURE__ */ jsx42(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }, "VisuallyHidden")
);
var Root3 = VisuallyHidden;

// ../../node_modules/.pnpm/@radix-ui+react-tooltip@1.2.16_@types+react-dom@18.3.7_@types+react@18.3.28__@types+react@18._ort6j2vciilvofczpjkp5fn3iy/node_modules/@radix-ui/react-tooltip/dist/index.mjs
import { jsx as jsx43, jsxs as jsxs26 } from "react/jsx-runtime";
var __defProp18 = Object.defineProperty;
var __name18 = (target, value) => __defProp18(target, "name", { value, configurable: true });
var [createTooltipContext, createTooltipScope] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider = /* @__PURE__ */ __name18((props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const isOpenDelayedRef = React24.useRef(true);
  const isPointerInTransitRef = React24.useRef(false);
  const skipDelayTimerRef = React24.useRef(0);
  React24.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsx43(
    TooltipProviderContextProvider,
    {
      scope: __scopeTooltip,
      isOpenDelayedRef,
      delayDuration,
      onOpen: React24.useCallback(() => {
        if (skipDelayDuration <= 0) return;
        window.clearTimeout(skipDelayTimerRef.current);
        isOpenDelayedRef.current = false;
      }, [skipDelayDuration]),
      onClose: React24.useCallback(() => {
        if (skipDelayDuration <= 0) return;
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => isOpenDelayedRef.current = true,
          skipDelayDuration
        );
      }, [skipDelayDuration]),
      isPointerInTransitRef,
      onPointerInTransitChange: React24.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    }
  );
}, "TooltipProvider");
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip = /* @__PURE__ */ __name18((props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope(__scopeTooltip);
  const [trigger, setTrigger] = React24.useState(null);
  const [contentIdState, setContentId] = React24.useState(void 0);
  const generatedContentId = useId();
  const openTimerRef = React24.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = React24.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: /* @__PURE__ */ __name18((open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange?.(open2);
    }, "onChange"),
    caller: TOOLTIP_NAME
  });
  const stateAttribute = React24.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = React24.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = React24.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = React24.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  React24.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  const contentId = contentIdState ?? generatedContentId;
  return /* @__PURE__ */ jsx43(Root2, { ...popperScope, children: /* @__PURE__ */ jsx43(
    TooltipContextProvider,
    {
      scope: __scopeTooltip,
      contentId,
      setContentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: React24.useCallback(() => {
        if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
        else handleOpen();
      }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
      onTriggerLeave: React24.useCallback(() => {
        if (disableHoverableContent) {
          handleClose();
        } else {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children
    }
  ) });
}, "Tooltip");
var TRIGGER_NAME2 = "TooltipTrigger";
var TooltipTrigger = /* @__PURE__ */ React24.forwardRef(
  /* @__PURE__ */ __name18(function TooltipTrigger2(props, forwardedRef) {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME2, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME2, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = React24.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = React24.useRef(false);
    const hasPointerMoveOpenedRef = React24.useRef(false);
    const handlePointerUp = React24.useCallback(() => isPointerDownRef.current = false, []);
    React24.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerUp]);
    return /* @__PURE__ */ jsx43(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx43(
      Primitive.button,
      {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          if (context.open) {
            context.onClose();
          }
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, { once: true });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      }
    ) });
  }, "TooltipTrigger")
);
var PORTAL_NAME = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, {
  forceMount: void 0
});
var TooltipPortal = /* @__PURE__ */ __name18((props) => {
  const { __scopeTooltip, forceMount, children, container: container2 } = props;
  const context = useTooltipContext(PORTAL_NAME, __scopeTooltip);
  return /* @__PURE__ */ jsx43(PortalProvider, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsx43(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx43(Portal, { asChild: true, container: container2, children }) }) });
}, "TooltipPortal");
var CONTENT_NAME2 = "TooltipContent";
var TooltipContent = /* @__PURE__ */ React24.forwardRef(
  /* @__PURE__ */ __name18(function TooltipContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME2, props.__scopeTooltip);
    return /* @__PURE__ */ jsx43(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsx43(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx43(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
  }, "TooltipContent")
);
var TooltipContentHoverable = /* @__PURE__ */ React24.forwardRef(/* @__PURE__ */ __name18(function TooltipContentHoverable2(props, forwardedRef) {
  const context = useTooltipContext(CONTENT_NAME2, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME2, props.__scopeTooltip);
  const ref = React24.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = React24.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = React24.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = React24.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = { x: event.clientX, y: event.clientY };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    },
    [onPointerInTransitChange]
  );
  React24.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  React24.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = /* @__PURE__ */ __name18((event) => handleCreateGraceArea(event, content), "handleTriggerLeave");
      const handleContentLeave = /* @__PURE__ */ __name18((event) => handleCreateGraceArea(event, trigger), "handleContentLeave");
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  React24.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = /* @__PURE__ */ __name18((event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      }, "handleTrackPointerGrace");
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsx43(TooltipContentImpl, { ...props, ref: composedRefs });
}, "TooltipContentHoverable"));
var Slottable = createSlottable("TooltipContent");
var TooltipContentImpl = /* @__PURE__ */ React24.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name18(function TooltipContentImpl2(props, forwardedRef) {
    const {
      __scopeTooltip,
      children,
      "aria-label": ariaLabel,
      id: idProp,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...contentProps
    } = props;
    const context = useTooltipContext(CONTENT_NAME2, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    React24.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [onClose]);
    React24.useEffect(() => {
      if (context.trigger) {
        const handleScroll = /* @__PURE__ */ __name18((event) => {
          if (event.target instanceof Node && event.target.contains(context.trigger)) {
            onClose();
          }
        }, "handleScroll");
        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => window.removeEventListener("scroll", handleScroll, { capture: true });
      }
    }, [context.trigger, onClose]);
    const { setContentId } = context;
    useLayoutEffect2(() => {
      setContentId(idProp);
      return () => {
        setContentId(void 0);
      };
    }, [idProp, setContentId]);
    return /* @__PURE__ */ jsx43(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ jsxs26(
          Content,
          {
            "data-state": context.stateAttribute,
            role: ariaLabel ? void 0 : "tooltip",
            id: ariaLabel ? void 0 : context.contentId,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
              }
            },
            children: [
              /* @__PURE__ */ jsx43(Slottable, { children }),
              ariaLabel ? /* @__PURE__ */ jsx43(Root3, { id: context.contentId, role: "tooltip", children: ariaLabel }) : null
            ]
          }
        )
      }
    );
  }, "TooltipContentImpl")
);
var TooltipArrow = /* @__PURE__ */ React24.forwardRef(
  /* @__PURE__ */ __name18(function TooltipArrow2(props, forwardedRef) {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    return /* @__PURE__ */ jsx43(Arrow3, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }, "TooltipArrow")
);
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
__name18(getExitSideFromRect, "getExitSideFromRect");
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "bottom":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      );
      break;
    case "left":
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "right":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      );
      break;
  }
  return paddedExitPoints;
}
__name18(getPaddedExitPoints, "getPaddedExitPoints");
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
__name18(getPointsFromRect, "getPointsFromRect");
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
__name18(isPointInPolygon, "isPointInPolygon");
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
__name18(getHull, "getHull");
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r2 = upperHull[upperHull.length - 2];
      if ((q.x - r2.x) * (p.y - r2.y) >= (q.y - r2.y) * (p.x - r2.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r2 = lowerHull[lowerHull.length - 2];
      if ((q.x - r2.x) * (p.y - r2.y) >= (q.y - r2.y) * (p.x - r2.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
__name18(getHullPresorted, "getHullPresorted");
var Provider = TooltipProvider;
var Root32 = Tooltip;
var Trigger = TooltipTrigger;
var Portal3 = TooltipPortal;
var Content2 = TooltipContent;
var Arrow22 = TooltipArrow;

// ../ui/dist/index.js
import { jsx as jsx312, jsxs as jsxs232 } from "react/jsx-runtime";
import * as React30 from "react";
import { jsx as jsx322, jsxs as jsxs242 } from "react/jsx-runtime";
import * as React31 from "react";
import { jsx as jsx332, jsxs as jsxs252 } from "react/jsx-runtime";
import * as React322 from "react";
import { jsx as jsx342, jsxs as jsxs262 } from "react/jsx-runtime";
import * as React33 from "react";
import { jsx as jsx352, jsxs as jsxs272 } from "react/jsx-runtime";
import * as React34 from "react";
import { jsx as jsx362, jsxs as jsxs282 } from "react/jsx-runtime";
import * as React35 from "react";
import { jsx as jsx372, jsxs as jsxs29 } from "react/jsx-runtime";
import * as React36 from "react";
import { jsx as jsx382, jsxs as jsxs30 } from "react/jsx-runtime";
import * as React37 from "react";
import { jsx as jsx392, jsxs as jsxs31 } from "react/jsx-runtime";
import * as React38 from "react";
import { jsx as jsx402, jsxs as jsxs322 } from "react/jsx-runtime";
import * as React40 from "react";
import * as React39 from "react";
import { jsx as jsx412, jsxs as jsxs33 } from "react/jsx-runtime";
import * as React41 from "react";
import { jsx as jsx422, jsxs as jsxs34 } from "react/jsx-runtime";
import * as React422 from "react";
import { jsx as jsx432, jsxs as jsxs35 } from "react/jsx-runtime";
import * as React43 from "react";
import { jsx as jsx442, jsxs as jsxs36 } from "react/jsx-runtime";
import * as React44 from "react";
import { Fragment as Fragment32, jsx as jsx452, jsxs as jsxs37 } from "react/jsx-runtime";
import * as React45 from "react";
import { jsx as jsx46 } from "react/jsx-runtime";
var cva2 = cva;
var FONT_SIZES = [
  "display-xl",
  "display-lg",
  "display-md",
  "heading-h1",
  "heading-h2",
  "heading-h3",
  "heading-h4",
  "heading-h5",
  "heading-h6",
  "body-xs",
  "body-sm",
  "body-md",
  "body-lg",
  "body-xl",
  "body-xs-medium",
  "body-sm-medium",
  "body-md-medium",
  "body-lg-medium",
  "body-xl-medium",
  "label-xl",
  "label-lg",
  "label-md",
  "label-sm",
  "caption-md",
  "caption-sm",
  "overline-md",
  "overline-sm",
  "code-md",
  "code-sm"
];
var twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }]
    }
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var motionState = "transition-[color,background-color,border-color,box-shadow] duration-interaction ease-decelerate";
var motionPress = "transition-[color,background-color,border-color,box-shadow,transform] duration-interaction ease-decelerate active:duration-instant active:scale-[0.97]";
var motionLift = "hover:-translate-y-px hover:shadow-2 active:translate-y-0";
var motionSwell = "hover:scale-[1.02]";
var motionSpring = "duration-normal ease-spring";
var buttonVariants = cva2(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    // Figma padding is measured from the frame edge and its INSIDE stroke sits
    // inside it, so a bordered button puts its label at the same offset as an
    // unbordered one. CSS border-box adds the border on top, so bordered
    // hierarchies subtract it back out through --bd.
    "[--bd:0px]",
    "font-sans " + motionPress,
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    // Figma: every hierarchy collapses to the same Disabled treatment —
    // disabled-bg + disabled-text, no border, no depth. Ghost and Outline
    // are NOT transparent when disabled.
    "disabled:pointer-events-none disabled:shadow-none",
    "disabled:bg-button-disabled-bg disabled:bg-none",
    "disabled:text-button-disabled-text disabled:border-transparent"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-bg text-button-primary-text shadow-depth-accent",
          motionLift,
          "hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]"
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          motionSwell,
          "border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]",
          "hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover",
          "active:bg-button-secondary-bg-pressed active:border-button-secondary-border-hover",
          "focus-visible:border-border-focus"
        ],
        ghost: [
          // Figma: Ghost label uses button/secondary-text, not ghost-text.
          "bg-transparent text-button-secondary-text",
          motionSwell,
          "hover:bg-button-ghost-bg-hover active:bg-bg-surface-raised"
        ],
        danger: [
          // Figma: Danger label is button/primary-text (white), same value as danger-text.
          "bg-button-danger-bg text-button-primary-text shadow-depth-accent",
          motionLift,
          "hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]"
        ],
        tonal: [
          "bg-button-tonal-bg text-button-tonal-text",
          motionSwell,
          "hover:bg-button-tonal-bg-hover active:bg-button-tonal-bg-pressed",
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-on-fill)]"
        ],
        outline: [
          // Border stays brand in every state — only the fill changes.
          "bg-transparent text-text-brand",
          motionSwell,
          "border-solid border-[1.5px] border-border-brand [--bd:1.5px]",
          "hover:bg-button-outline-bg-hover active:bg-button-outline-bg-pressed"
        ],
        inverse: [
          "bg-button-inverse-bg text-button-inverse-text",
          motionSwell,
          "hover:bg-button-inverse-bg-hover active:bg-button-inverse-bg-pressed",
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo-inverse)]"
        ],
        ai: [
          // Figma paint style `Brand/AI gradient` — violet/600 → blue/600.
          "bg-ai text-text-on-brand shadow-depth-accent",
          motionLift,
          "hover:bg-ai-hover active:bg-ai-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]"
        ]
      },
      size: {
        sm: "h-[32px] rounded-[8px] px-[calc(12px-var(--bd))] gap-[6px] text-label-md [&_svg]:size-[14px]",
        md: "h-[36px] rounded-[8px] px-[calc(14px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
        lg: "h-[40px] rounded-[12px] px-[calc(16px-var(--bd))] gap-[6px] text-label-lg [&_svg]:size-[16px]",
        xl: "h-[44px] rounded-[12px] px-[calc(20px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]",
        "2xl": "h-[48px] rounded-[16px] px-[calc(24px-var(--bd))] gap-[8px] text-label-xl [&_svg]:size-[20px]"
      }
    },
    defaultVariants: { variant: "primary", size: "lg" }
  }
);
var spinnerSize = {
  sm: "size-[14px]",
  md: "size-[16px]",
  lg: "size-[16px]",
  xl: "size-[20px]",
  "2xl": "size-[20px]"
};
function Spinner({ className }) {
  return /* @__PURE__ */ jsxs27(
    "svg",
    {
      className: cn("animate-spin", className),
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx44("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "4" }),
        /* @__PURE__ */ jsx44("path", { d: "M22 12a10 10 0 0 0-10-10", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round" })
      ]
    }
  );
}
var Button = React25.forwardRef(
  ({ className, variant, size: size4, asChild = false, loading = false, disabled, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const sz = size4 ?? "lg";
    return /* @__PURE__ */ jsx44(
      Comp,
      {
        ref,
        className: cn(
          buttonVariants({ variant, size: size4 }),
          // Loading keeps its colours but blocks input — disabled would grey it out.
          loading && "pointer-events-none",
          className
        ),
        disabled: disabled || void 0,
        "aria-busy": loading || void 0,
        "aria-disabled": loading || void 0,
        ...props,
        children: asChild ? children : /* @__PURE__ */ jsxs27(Fragment5, { children: [
          loading ? /* @__PURE__ */ jsx44(Spinner, { className: spinnerSize[sz] }) : leftIcon,
          children,
          !loading && rightIcon
        ] })
      }
    );
  }
);
Button.displayName = "Button";
var iconButtonVariants = cva2(
  [
    "inline-flex items-center justify-center shrink-0 select-none",
    "[--bd:0px]",
    motionPress,
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "disabled:pointer-events-none disabled:shadow-none",
    "disabled:bg-button-disabled-bg disabled:text-button-disabled-text disabled:border-transparent"
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-bg text-button-primary-text shadow-depth-accent",
          motionLift,
          "hover:bg-button-primary-bg-hover active:bg-button-primary-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-on-fill)]"
        ],
        secondary: [
          "bg-button-secondary-bg text-button-secondary-text",
          motionSwell,
          "border-solid border-[1.5px] border-button-secondary-border [--bd:1.5px]",
          "hover:bg-button-secondary-bg-hover hover:border-button-secondary-border-hover",
          "active:bg-button-secondary-bg-pressed"
        ],
        ghost: [
          "bg-transparent text-icon-default",
          motionSwell,
          "hover:bg-button-ghost-bg-hover hover:text-text-primary",
          "active:bg-bg-surface-raised"
        ],
        danger: [
          "bg-button-danger-bg text-button-danger-text shadow-depth-accent",
          motionLift,
          "hover:bg-button-danger-bg-hover active:bg-button-danger-bg-pressed",
          "focus-visible:shadow-[var(--shadow-depth-accent),0_0_0_3px_var(--color-focus-halo-danger)]"
        ]
      },
      size: {
        32: "size-[32px] rounded-[6px] [&_svg]:size-[16px]",
        36: "size-[36px] rounded-[8px] [&_svg]:size-[18px]",
        40: "size-[40px] rounded-[8px] [&_svg]:size-[20px]",
        44: "size-[44px] rounded-[12px] [&_svg]:size-[22px]",
        48: "size-[48px] rounded-[12px] [&_svg]:size-[24px]"
      }
    },
    defaultVariants: { variant: "ghost", size: 40 }
  }
);
var IconButton = React26.forwardRef(
  ({ className, variant, size: size4, children, ...props }, ref) => /* @__PURE__ */ jsx210("button", { ref, className: cn(iconButtonVariants({ variant, size: size4 }), className), ...props, children })
);
IconButton.displayName = "IconButton";
var linkVariants = cva2(
  [
    "inline-flex items-center gap-[4px] font-sans cursor-pointer",
    "underline-offset-2 hover:underline",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
    "aria-disabled:pointer-events-none aria-disabled:text-text-disabled aria-disabled:no-underline"
  ],
  {
    variants: {
      size: {
        sm: "text-body-xs-medium [&>svg]:size-[12px]",
        md: "text-body-sm-medium [&>svg]:size-[14px]",
        lg: "text-body-md-medium [&>svg]:size-[16px]"
      },
      color: {
        brand: "text-text-brand hover:text-text-brand-hover",
        neutral: "text-text-primary",
        inverse: "text-text-inverse",
        error: "text-text-error hover:text-text-error-hover"
      }
    },
    defaultVariants: { size: "md", color: "brand" }
  }
);
var Link = React32.forwardRef(
  ({ className, size: size4, color, asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return /* @__PURE__ */ jsx310(
      Comp,
      {
        ref,
        "aria-disabled": disabled || void 0,
        tabIndex: disabled ? -1 : props.tabIndex,
        className: cn(linkVariants({ size: size4, color }), className),
        ...props,
        children
      }
    );
  }
);
Link.displayName = "Link";
var buttonGroupSegmentVariants = cva2(
  [
    "relative inline-flex flex-1 items-center justify-center gap-[6px] font-sans whitespace-nowrap",
    "bg-bg-surface text-text-primary",
    motionPress,
    "outline-none focus-visible:z-10 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "hover:bg-bg-subtle",
    "aria-pressed:bg-bg-brand aria-pressed:text-text-on-brand aria-pressed:hover:bg-bg-brand",
    "disabled:pointer-events-none disabled:bg-bg-subtle disabled:text-text-disabled",
    // Divider between segments — Figma draws it as the container border showing
    // through, so only the inner edges get a line.
    "border-l border-border first:border-l-0"
  ],
  {
    variants: {
      size: {
        sm: "h-[32px] px-[10px] text-body-xs-medium [&>svg]:size-[14px]",
        md: "h-[36px] px-[12px] text-body-sm-medium [&>svg]:size-[16px]",
        lg: "h-[40px] px-[14px] text-body-md-medium [&>svg]:size-[16px]",
        xl: "h-[44px] px-[16px] text-body-md-medium [&>svg]:size-[16px]"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var ButtonGroupSegment = React42.forwardRef(
  ({ className, size: size4, selected, children, ...props }, ref) => /* @__PURE__ */ jsx45(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": selected || void 0,
      className: cn(buttonGroupSegmentVariants({ size: size4 }), className),
      ...props,
      children
    }
  )
);
ButtonGroupSegment.displayName = "ButtonGroupSegment";
var ButtonGroup = React42.forwardRef(
  ({ className, size: size4 = "md", children, ...props }, ref) => /* @__PURE__ */ jsx45(
    "div",
    {
      ref,
      role: "group",
      className: cn(
        "inline-flex overflow-hidden rounded-[8px] border border-border align-middle",
        className
      ),
      ...props,
      children: React42.Children.map(
        children,
        (child) => React42.isValidElement(child) ? React42.cloneElement(child, { size: child.props.size ?? size4 }) : child
      )
    }
  )
);
ButtonGroup.displayName = "ButtonGroup";
var fieldLabelClass = {
  32: "text-label-sm",
  36: "text-label-sm",
  40: "text-label-md",
  44: "text-label-md",
  48: "text-label-lg"
};
var fieldRowGap = {
  32: "gap-[4px]",
  36: "gap-[4px]",
  40: "gap-[4px]",
  44: "gap-[6px]",
  48: "gap-[6px]"
};
var controlClass = {
  32: "h-[32px] rounded-[8px] px-[8.5px] gap-[8px]",
  36: "h-[36px] rounded-[8px] px-[8.5px] gap-[8px]",
  40: "h-[40px] rounded-[12px] px-[10.5px] gap-[8px]",
  44: "h-[44px] rounded-[12px] px-[10.5px] gap-[8px]",
  48: "h-[48px] rounded-[16px] px-[12.5px] gap-[8px]"
};
var valueClass = {
  32: "text-body-sm",
  36: "text-body-sm",
  40: "text-body-sm",
  44: "text-body-md",
  48: "text-body-md"
};
var iconClass = {
  32: "[&_svg]:size-[16px]",
  36: "[&_svg]:size-[16px]",
  40: "[&_svg]:size-[16px]",
  44: "[&_svg]:size-[20px]",
  48: "[&_svg]:size-[20px]"
};
var controlChrome = [
  "flex w-full items-center bg-input-bg text-input-text",
  "border-solid border-[1.5px] border-input-border",
  "transition-[colors,box-shadow] duration-interaction ease-decelerate",
  "hover:border-input-border-hover",
  "outline-none",
  "focus-within:border-input-border-focus",
  "focus-within:shadow-[0_0_0_3px_var(--color-focus-halo)]",
  // Error — border stays red, the halo turns red too
  "data-[invalid=true]:border-input-border-error",
  "data-[invalid=true]:hover:border-input-border-error",
  "data-[invalid=true]:focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
  // Disabled
  "data-[disabled=true]:pointer-events-none",
  "data-[disabled=true]:bg-input-bg-disabled",
  "data-[disabled=true]:border-input-border-disabled",
  "data-[disabled=true]:text-text-disabled"
].join(" ");
function FieldShell({
  size: size4 = 40,
  label,
  required,
  helperText,
  error,
  disabled,
  className,
  htmlFor,
  footerRight,
  children
}) {
  const message = error ?? helperText;
  return /* @__PURE__ */ jsxs28("div", { className: cn("flex w-full flex-col", fieldRowGap[size4], className), children: [
    label && /* @__PURE__ */ jsxs28(
      "label",
      {
        htmlFor,
        className: cn(
          "font-sans",
          fieldLabelClass[size4],
          disabled ? "text-text-disabled" : "text-input-label"
        ),
        children: [
          label,
          required && /* @__PURE__ */ jsx52("span", { className: "ml-[2px] text-input-error-text", "aria-hidden": "true", children: "*" })
        ]
      }
    ),
    children,
    (message || footerRight) && /* @__PURE__ */ jsxs28("div", { className: "flex items-start justify-between gap-[8px]", children: [
      /* @__PURE__ */ jsx52(
        "p",
        {
          id: htmlFor ? `${htmlFor}-description` : void 0,
          className: cn(
            // Helper is Caption/MD; the error swaps to Label/MD, which is
            // the same 12/16 in semibold with the label's tracking.
            "font-sans",
            error ? "text-label-md" : "text-caption-md",
            disabled ? "text-text-disabled" : error ? "text-input-error-text" : "text-input-helper"
          ),
          children: message
        }
      ),
      footerRight && /* @__PURE__ */ jsx52(
        "span",
        {
          className: cn(
            "shrink-0 font-sans text-caption-md tabular-nums",
            disabled ? "text-text-disabled" : "text-input-helper"
          ),
          children: footerRight
        }
      )
    ] })
  ] });
}
var addonRadius = {
  32: "rounded-l-[6.5px]",
  36: "rounded-l-[6.5px]",
  40: "rounded-l-[10.5px]",
  44: "rounded-l-[10.5px]",
  48: "rounded-l-[14.5px]"
};
var addonRadiusRight = {
  32: "rounded-r-[6.5px]",
  36: "rounded-r-[6.5px]",
  40: "rounded-r-[10.5px]",
  44: "rounded-r-[10.5px]",
  48: "rounded-r-[14.5px]"
};
var addonPad = {
  32: "px-[8.5px]",
  36: "px-[8.5px]",
  40: "px-[10.5px]",
  44: "px-[10.5px]",
  48: "px-[12.5px]"
};
var Input = React52.forwardRef(
  ({
    size: size4 = 40,
    label,
    required,
    helperText,
    error,
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    prefixSelect,
    prefixSelectProps,
    suffixSelect,
    suffixSelectProps,
    className,
    containerClassName,
    disabled,
    id,
    ...props
  }, ref) => {
    const autoId = React52.useId();
    const inputId = id ?? autoId;
    const invalid = Boolean(error);
    const addonShell = (side, extra) => cn(
      "flex shrink-0 self-stretch items-center bg-bg-subtle text-input-placeholder",
      "font-sans",
      valueClass[size4],
      addonPad[size4],
      side === "l" ? addonRadius[size4] : addonRadiusRight[size4],
      extra
    );
    const addon = (node, side) => /* @__PURE__ */ jsx62("span", { className: addonShell(side), children: node });
    const selectAddon = (options, side, selectProps) => /* @__PURE__ */ jsxs32("span", { className: addonShell(side, "gap-[4px] text-input-text"), children: [
      /* @__PURE__ */ jsx62(
        "select",
        {
          disabled,
          ...selectProps,
          className: cn(
            "cursor-pointer appearance-none bg-transparent font-sans outline-none",
            "text-input-text disabled:cursor-not-allowed disabled:text-text-disabled",
            valueClass[size4],
            selectProps?.className
          ),
          children: options
        }
      ),
      /* @__PURE__ */ jsx62(ArrowDown01Round, { className: "shrink-0 text-icon-default" })
    ] });
    return /* @__PURE__ */ jsx62(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: inputId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs32(
          "div",
          {
            "data-invalid": invalid,
            "data-disabled": Boolean(disabled),
            className: cn(
              controlChrome,
              controlClass[size4],
              iconClass[size4],
              // The addon supplies the edge padding, so drop it from the shell.
              (prefix || prefixSelect) && "pl-[1.5px]",
              (suffix || suffixSelect) && "pr-[1.5px]",
              "[&_svg]:shrink-0 [&_svg]:text-icon-default"
            ),
            children: [
              prefixSelect ? selectAddon(prefixSelect, "l", prefixSelectProps) : null,
              prefix ? addon(prefix, "l") : null,
              leftIcon,
              /* @__PURE__ */ jsx62(
                "input",
                {
                  ref,
                  id: inputId,
                  disabled,
                  "aria-invalid": invalid || void 0,
                  "aria-describedby": helperText || error ? `${inputId}-description` : void 0,
                  className: cn(
                    "min-w-0 flex-1 bg-transparent font-sans text-input-text outline-none",
                    "placeholder:text-input-placeholder",
                    "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
                    valueClass[size4],
                    className
                  ),
                  ...props
                }
              ),
              rightIcon,
              suffix ? addon(suffix, "r") : null,
              suffixSelect ? selectAddon(suffixSelect, "r", suffixSelectProps) : null
            ]
          }
        )
      }
    );
  }
);
Input.displayName = "Input";
var rowsClass = {
  sm: "min-h-[80px] rounded-[8px] pt-[8.5px] pr-[10.5px] pb-[6.5px] pl-[10.5px]",
  md: "min-h-[104px] rounded-[12px] pt-[10.5px] pr-[12.5px] pb-[6.5px] pl-[12.5px]",
  lg: "min-h-[128px] rounded-[16px] pt-[12.5px] pr-[14.5px] pb-[6.5px] pl-[14.5px]"
};
var rowsValueClass = {
  sm: "text-body-sm",
  md: "text-body-sm",
  lg: "text-body-md"
};
var rowsToFieldSize = { sm: 36, md: 40, lg: 48 };
var Textarea = React62.forwardRef(
  ({
    rows = "md",
    label,
    required,
    helperText,
    error,
    className,
    containerClassName,
    disabled,
    id,
    maxLength,
    showCount,
    value,
    defaultValue,
    onChange,
    ...props
  }, ref) => {
    const autoId = React62.useId();
    const areaId = id ?? autoId;
    const invalid = Boolean(error);
    const size4 = rowsToFieldSize[rows];
    const [count2, setCount] = React62.useState(String(value ?? defaultValue ?? "").length);
    const handleChange = (e) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };
    return /* @__PURE__ */ jsx72(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: areaId,
        className: containerClassName,
        footerRight: showCount && maxLength ? `${count2}/${maxLength}` : void 0,
        children: /* @__PURE__ */ jsx72(
          "div",
          {
            "data-invalid": invalid,
            "data-disabled": Boolean(disabled),
            className: cn(controlChrome, rowsClass[rows], "items-stretch"),
            children: /* @__PURE__ */ jsx72(
              "textarea",
              {
                ref,
                id: areaId,
                disabled,
                maxLength,
                value,
                defaultValue,
                onChange: handleChange,
                "aria-invalid": invalid || void 0,
                "aria-describedby": helperText || error ? `${areaId}-description` : void 0,
                className: cn(
                  // Figma draws a resize handle bottom-right, so the field is vertically resizable.
                  "min-h-full w-full resize-y bg-transparent font-sans",
                  rowsValueClass[rows],
                  "text-input-text outline-none placeholder:text-input-placeholder",
                  "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
                  className
                ),
                ...props
              }
            )
          }
        )
      }
    );
  }
);
Textarea.displayName = "Textarea";
var Select = React72.forwardRef(
  ({
    size: size4 = 40,
    label,
    required,
    helperText,
    error,
    placeholder,
    leftIcon,
    className,
    containerClassName,
    disabled,
    id,
    children,
    defaultValue,
    value,
    ...props
  }, ref) => {
    const autoId = React72.useId();
    const selectId = id ?? autoId;
    const invalid = Boolean(error);
    return /* @__PURE__ */ jsx82(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: selectId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs42(
          "div",
          {
            "data-invalid": invalid,
            "data-disabled": Boolean(disabled),
            className: cn(
              controlChrome,
              controlClass[size4],
              iconClass[size4],
              "relative [&_svg]:shrink-0 [&_svg]:text-icon-default"
            ),
            children: [
              leftIcon,
              /* @__PURE__ */ jsxs42(
                "select",
                {
                  ref,
                  id: selectId,
                  disabled,
                  value,
                  defaultValue: defaultValue ?? (placeholder ? "" : void 0),
                  "aria-invalid": invalid || void 0,
                  "aria-describedby": helperText || error ? `${selectId}-description` : void 0,
                  className: cn(
                    "min-w-0 flex-1 appearance-none bg-transparent font-sans outline-none",
                    "text-input-text",
                    // The placeholder option keeps the muted colour until something is chosen
                    "invalid:text-input-placeholder [&:has(option[value='']:checked)]:text-input-placeholder",
                    "disabled:cursor-not-allowed disabled:text-text-disabled",
                    valueClass[size4],
                    className
                  ),
                  ...props,
                  children: [
                    placeholder ? /* @__PURE__ */ jsx82("option", { value: "", disabled: true, children: placeholder }) : null,
                    children
                  ]
                }
              ),
              /* @__PURE__ */ jsx82(ArrowDown01Round, {})
            ]
          }
        )
      }
    );
  }
);
Select.displayName = "Select";
var boxClass = {
  sm: "size-[20px] rounded-[6px]",
  md: "size-[24px] rounded-[8px]"
};
var glyphSize = {
  sm: "size-[16px]",
  md: "size-[20px]"
};
var labelClass = {
  sm: "text-body-sm",
  md: "text-body-md"
};
var supportClass = {
  sm: "text-caption-sm",
  md: "text-caption-md"
};
var Checkbox = React82.forwardRef(
  ({ size: size4 = "sm", label, description, indeterminate, className, containerClassName, disabled, id, ...props }, ref) => {
    const autoId = React82.useId();
    const boxId = id ?? autoId;
    const inner = React82.useRef(null);
    React82.useImperativeHandle(ref, () => inner.current);
    React82.useEffect(() => {
      if (inner.current) inner.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);
    return /* @__PURE__ */ jsxs52("div", { className: cn("flex items-start gap-[16px]", containerClassName), children: [
      /* @__PURE__ */ jsxs52("span", { className: cn("relative inline-flex shrink-0", boxClass[size4]), children: [
        /* @__PURE__ */ jsx92(
          "input",
          {
            ref: inner,
            id: boxId,
            type: "checkbox",
            disabled,
            className: cn(
              "peer appearance-none border-solid border-[2px] bg-input-bg border-input-border",
              "transition-[colors,box-shadow] duration-interaction ease-decelerate outline-none",
              "hover:border-input-border-hover",
              "checked:border-transparent checked:bg-bg-brand checked:hover:bg-bg-brand-hover",
              "indeterminate:border-transparent indeterminate:bg-bg-brand indeterminate:hover:bg-bg-brand-hover",
              "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              "disabled:pointer-events-none disabled:border-input-border-disabled",
              "disabled:checked:bg-input-bg-disabled disabled:indeterminate:bg-input-bg-disabled",
              boxClass[size4],
              className
            ),
            ...props
          }
        ),
        /* @__PURE__ */ jsx92(
          Tick02,
          {
            className: cn(
              "pointer-events-none absolute inset-0 m-auto text-icon-on-brand",
              "opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0",
              "peer-disabled:text-icon-disabled",
              glyphSize[size4]
            )
          }
        ),
        /* @__PURE__ */ jsx92(
          Remove01,
          {
            className: cn(
              "pointer-events-none absolute inset-0 m-auto text-icon-on-brand",
              "opacity-0 peer-indeterminate:opacity-100",
              "peer-disabled:text-icon-disabled",
              glyphSize[size4]
            )
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs52("span", { className: "flex flex-col gap-[4px]", children: [
        label && /* @__PURE__ */ jsx92(
          "label",
          {
            htmlFor: boxId,
            className: cn(
              "cursor-pointer font-sans",
              labelClass[size4],
              disabled ? "cursor-not-allowed text-text-disabled" : "text-input-label"
            ),
            children: label
          }
        ),
        description && /* @__PURE__ */ jsx92(
          "span",
          {
            className: cn(
              "font-sans",
              supportClass[size4],
              disabled ? "text-text-disabled" : "text-input-helper"
            ),
            children: description
          }
        )
      ] })
    ] });
  }
);
Checkbox.displayName = "Checkbox";
var boxClass2 = {
  sm: "size-[20px]",
  md: "size-[24px]"
};
var dotClass = {
  sm: "size-[8px]",
  md: "size-[10px]"
};
var labelClass2 = {
  sm: "text-body-sm",
  md: "text-body-md"
};
var supportClass2 = {
  sm: "text-caption-sm",
  md: "text-caption-md"
};
var Radio = React92.forwardRef(
  ({ size: size4 = "sm", label, description, className, containerClassName, disabled, id, ...props }, ref) => {
    const autoId = React92.useId();
    const radioId = id ?? autoId;
    return /* @__PURE__ */ jsxs62("div", { className: cn("flex items-start gap-[16px]", containerClassName), children: [
      /* @__PURE__ */ jsxs62("span", { className: cn("relative inline-flex shrink-0", boxClass2[size4]), children: [
        /* @__PURE__ */ jsx102(
          "input",
          {
            ref,
            id: radioId,
            type: "radio",
            disabled,
            className: cn(
              "peer appearance-none rounded-full border-solid border-[2px] bg-input-bg border-input-border",
              "transition-[colors,box-shadow] duration-interaction ease-decelerate outline-none",
              "hover:border-input-border-hover",
              "checked:border-bg-brand checked:hover:border-bg-brand-hover",
              "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              "disabled:pointer-events-none disabled:border-input-border-disabled",
              boxClass2[size4],
              className
            ),
            ...props
          }
        ),
        /* @__PURE__ */ jsx102(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "pointer-events-none absolute inset-0 m-auto rounded-full bg-bg-brand",
              "transition-colors duration-interaction ease-decelerate",
              "opacity-0 peer-checked:opacity-100",
              // Figma tracks the ring: Selected=On, State=Hover puts the dot on
              // bg/brand-hover too, and Disabled drops it to input/bg-disabled
              // — not text/disabled, which is a step darker.
              "peer-checked:peer-hover:bg-bg-brand-hover",
              "peer-disabled:bg-input-bg-disabled",
              dotClass[size4]
            )
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs62("span", { className: "flex flex-col gap-[4px]", children: [
        label && /* @__PURE__ */ jsx102(
          "label",
          {
            htmlFor: radioId,
            className: cn(
              "cursor-pointer font-sans",
              labelClass2[size4],
              disabled ? "cursor-not-allowed text-text-disabled" : "text-input-label"
            ),
            children: label
          }
        ),
        description && /* @__PURE__ */ jsx102(
          "span",
          {
            className: cn(
              "font-sans",
              supportClass2[size4],
              disabled ? "text-text-disabled" : "text-input-helper"
            ),
            children: description
          }
        )
      ] })
    ] });
  }
);
Radio.displayName = "Radio";
var trackVariants = cva2(
  [
    "group relative inline-flex shrink-0 cursor-pointer rounded-full align-middle",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "bg-input-border hover:bg-input-border-hover",
    "data-[state=checked]:bg-bg-brand data-[state=checked]:hover:bg-bg-brand-hover",
    // Disabled outranks the checked fill in Figma. `disabled:` and
    // `data-[state=checked]:` have equal specificity, so which one wins would
    // otherwise depend on Tailwind's output order — hence the important flag.
    "disabled:cursor-not-allowed disabled:!bg-input-bg-disabled"
  ],
  {
    variants: {
      size: {
        sm: "h-[20px] w-[36px]",
        md: "h-[24px] w-[44px]"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var thumbVariants = cva2(
  [
    "pointer-events-none absolute top-[2px] block rounded-full bg-bg-surface shadow-1",
    "transition-[left] " + motionSpring
  ],
  {
    variants: {
      size: {
        sm: "size-[16px] left-[2px] data-[state=checked]:left-[18px]",
        md: "size-[20px] left-[2px] data-[state=checked]:left-[22px]"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Toggle = React102.forwardRef(({ className, size: size4, ...props }, ref) => /* @__PURE__ */ jsx112(Switch, { ref, className: cn(trackVariants({ size: size4 }), className), ...props, children: /* @__PURE__ */ jsx112(SwitchThumb, { className: cn(thumbVariants({ size: size4 })) }) }));
Toggle.displayName = "Toggle";
var Search = React112.forwardRef(
  ({ className, containerClassName, size: size4 = 40, label, required, helperText, error, disabled, onClear, id, value, defaultValue, ...props }, ref) => {
    const autoId = React112.useId();
    const inputId = id ?? autoId;
    const [inner, setInner] = React112.useState(defaultValue ?? "");
    const current = value !== void 0 ? value : inner;
    const hasValue = String(current ?? "").length > 0;
    return /* @__PURE__ */ jsx122(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: inputId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs72(
          "div",
          {
            className: cn(
              controlChrome,
              controlClass[size4],
              error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
              disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
              className
            ),
            children: [
              /* @__PURE__ */ jsx122(Search01, { className: cn(iconClass[size4], "shrink-0 text-icon"), "aria-hidden": "true" }),
              /* @__PURE__ */ jsx122(
                "input",
                {
                  ref,
                  id: inputId,
                  type: "search",
                  role: "searchbox",
                  disabled,
                  value,
                  defaultValue,
                  onChange: (e) => {
                    if (value === void 0) setInner(e.target.value);
                    props.onChange?.(e);
                  },
                  className: cn(
                    "min-w-0 flex-1 bg-transparent outline-none",
                    "text-input-text placeholder:text-input-placeholder",
                    // Chrome draws its own clear affordance on type=search.
                    "[&::-webkit-search-cancel-button]:appearance-none",
                    valueClass[size4]
                  ),
                  ...props
                }
              ),
              hasValue && onClear && /* @__PURE__ */ jsx122(
                "button",
                {
                  type: "button",
                  onClick: onClear,
                  "aria-label": "Clear search",
                  className: cn("shrink-0 rounded-full text-icon outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]", iconClass[size4]),
                  children: /* @__PURE__ */ jsx122(Cancel01, { className: "size-full", "aria-hidden": "true" })
                }
              )
            ]
          }
        )
      }
    );
  }
);
Search.displayName = "Search";
var controlPad = {
  32: "!pl-[8.5px] !pr-[2.5px]",
  36: "!pl-[10.5px] !pr-[2.5px]",
  40: "!pl-[10.5px] !pr-[2.5px]",
  44: "!pl-[12.5px] !pr-[2.5px]",
  48: "!pl-[12.5px] !pr-[2.5px]"
};
var stepBtn = "inline-flex size-[32px] shrink-0 items-center justify-center rounded-[6px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle active:bg-bg-surface-raised disabled:pointer-events-none disabled:text-text-disabled focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]";
var NumberInput = React122.forwardRef(
  ({
    className,
    containerClassName,
    size: size4 = 40,
    stepper = "plus-minus",
    label,
    required,
    helperText,
    error,
    disabled,
    prefix,
    suffix,
    id,
    step = 1,
    min: min2,
    max: max2,
    value,
    defaultValue,
    onChange,
    ...props
  }, ref) => {
    const autoId = React122.useId();
    const inputId = id ?? autoId;
    const inner = React122.useRef(null);
    React122.useImperativeHandle(ref, () => inner.current);
    const nudge = (direction) => {
      const el = inner.current;
      if (!el) return;
      direction === 1 ? el.stepUp() : el.stepDown();
      el.dispatchEvent(new Event("input", { bubbles: true }));
    };
    return /* @__PURE__ */ jsx132(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: inputId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs82(
          "div",
          {
            className: cn(
              controlChrome,
              controlClass[size4],
              controlPad[size4],
              error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
              disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
              className
            ),
            children: [
              prefix && /* @__PURE__ */ jsx132("span", { className: cn("shrink-0 text-text-secondary", valueClass[size4]), children: prefix }),
              /* @__PURE__ */ jsx132(
                "input",
                {
                  ref: inner,
                  id: inputId,
                  type: "number",
                  inputMode: "decimal",
                  disabled,
                  step,
                  min: min2,
                  max: max2,
                  value,
                  defaultValue,
                  onChange,
                  className: cn(
                    "min-w-0 flex-1 bg-transparent outline-none",
                    "text-input-text placeholder:text-input-placeholder",
                    // The native spinners are replaced by the Figma stepper.
                    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                    valueClass[size4]
                  ),
                  ...props
                }
              ),
              suffix && /* @__PURE__ */ jsx132("span", { className: cn("shrink-0 text-text-secondary", valueClass[size4]), children: suffix }),
              stepper === "plus-minus" ? /* @__PURE__ */ jsxs82("span", { className: "flex shrink-0 items-center gap-[2px]", children: [
                /* @__PURE__ */ jsx132("button", { type: "button", className: stepBtn, onClick: () => nudge(-1), disabled, "aria-label": "Decrease", children: /* @__PURE__ */ jsx132(Remove01, { className: "size-[16px]", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsx132("button", { type: "button", className: stepBtn, onClick: () => nudge(1), disabled, "aria-label": "Increase", children: /* @__PURE__ */ jsx132(Add01, { className: "size-[16px]", "aria-hidden": "true" }) })
              ] }) : /* @__PURE__ */ jsxs82("span", { className: "flex size-[32px] shrink-0 flex-col items-center justify-center rounded-[6px]", children: [
                /* @__PURE__ */ jsx132("button", { type: "button", className: "flex h-[16px] w-[32px] items-center justify-center rounded-t-[6px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] disabled:text-text-disabled", onClick: () => nudge(1), disabled, "aria-label": "Increase", children: /* @__PURE__ */ jsx132(ArrowUp01Round, { className: "size-[16px]", "aria-hidden": "true" }) }),
                /* @__PURE__ */ jsx132("button", { type: "button", className: "flex h-[16px] w-[32px] items-center justify-center rounded-b-[6px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] disabled:text-text-disabled", onClick: () => nudge(-1), disabled, "aria-label": "Decrease", children: /* @__PURE__ */ jsx132(ArrowDown01Round, { className: "size-[16px]", "aria-hidden": "true" }) })
              ] })
            ]
          }
        )
      }
    );
  }
);
NumberInput.displayName = "NumberInput";
var metrics = {
  sm: { track: "h-[4px]", radius: "rounded-[2px]", thumb: 12, hover: 13.5 },
  md: { track: "h-[6px]", radius: "rounded-[4px]", thumb: 16, hover: 18 },
  lg: { track: "h-[8px]", radius: "rounded-[4px]", thumb: 20, hover: 22.5 }
};
var Slider = React132.forwardRef(
  ({
    className,
    size: size4 = "md",
    min: min2 = 0,
    max: max2 = 100,
    step = 1,
    value,
    defaultValue = 50,
    disabled,
    showValue = true,
    formatValue,
    onChange,
    ...props
  }, ref) => {
    const m = metrics[size4];
    const [inner, setInner] = React132.useState(Number(defaultValue));
    const current = value !== void 0 ? Number(value) : inner;
    const lo = Number(min2);
    const hi = Number(max2);
    const pct = hi === lo ? 0 : (current - lo) / (hi - lo) * 100;
    const text = formatValue ? formatValue(current) : String(current);
    return /* @__PURE__ */ jsxs92("div", { className: cn("group relative flex w-full items-center", className), children: [
      /* @__PURE__ */ jsx142("div", { className: cn("absolute inset-x-0 w-full bg-bg-subtle", m.track, m.radius), "aria-hidden": "true", children: /* @__PURE__ */ jsx142(
        "div",
        {
          className: cn("h-full", m.radius, disabled ? "bg-border" : "bg-bg-brand"),
          style: { width: `${pct}%` }
        }
      ) }),
      showValue && /* @__PURE__ */ jsx142(
        "span",
        {
          "aria-hidden": "true",
          className: cn(
            "pointer-events-none absolute bottom-[calc(100%+6px)] -translate-x-1/2 rounded-full bg-bg-inverse px-[8px] py-[3px] text-caption-sm text-text-inverse",
            "opacity-0 transition-opacity duration-interaction ease-decelerate group-hover:opacity-100 group-focus-within:opacity-100"
          ),
          style: { left: `${pct}%` },
          children: text
        }
      ),
      /* @__PURE__ */ jsx142(
        "input",
        {
          ref,
          type: "range",
          min: min2,
          max: max2,
          step,
          value,
          defaultValue,
          disabled,
          onChange: (e) => {
            if (value === void 0) setInner(Number(e.target.value));
            onChange?.(e);
          },
          style: {
            "--thumb": `${m.thumb}px`,
            "--thumb-hover": `${m.hover}px`
          },
          className: cn(
            "relative w-full cursor-pointer appearance-none bg-transparent outline-none",
            "disabled:pointer-events-none",
            // WebKit and Firefox need the thumb styled separately; both take
            // the Figma geometry — surface fill, 2px brand ring.
            "[&::-webkit-slider-thumb]:size-[var(--thumb)] [&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bg-surface",
            "[&::-webkit-slider-thumb]:border-[2px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-bg-brand",
            "[&::-webkit-slider-thumb]:transition-[width,height]",
            "hover:[&::-webkit-slider-thumb]:size-[var(--thumb-hover)]",
            "disabled:[&::-webkit-slider-thumb]:border-border",
            "[&::-moz-range-thumb]:size-[var(--thumb)] [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-bg-surface [&::-moz-range-thumb]:border-[2px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-bg-brand",
            "disabled:[&::-moz-range-thumb]:border-border",
            "focus-visible:[&::-webkit-slider-thumb]:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            "focus-visible:[&::-moz-range-thumb]:shadow-[0_0_0_3px_var(--color-focus-halo)]"
          ),
          ...props
        }
      )
    ] });
  }
);
Slider.displayName = "Slider";
var swatchClass = {
  32: "size-[22px]",
  36: "size-[26px]",
  40: "size-[28px]",
  44: "size-[32px]",
  48: "size-[36px]"
};
var HEX = /^#?[0-9a-fA-F]{0,6}$/;
var ColorPicker2 = React142.forwardRef(
  ({
    className,
    containerClassName,
    size: size4 = 40,
    label,
    required,
    helperText,
    error,
    disabled,
    value,
    defaultValue = "#7C2DB9",
    onValueChange,
    id,
    ...props
  }, ref) => {
    const autoId = React142.useId();
    const inputId = id ?? autoId;
    const [inner, setInner] = React142.useState(defaultValue);
    const current = value ?? inner;
    const normalised = current.startsWith("#") ? current : `#${current}`;
    const complete = /^#[0-9a-fA-F]{6}$/.test(normalised);
    const set = (next) => {
      if (value === void 0) setInner(next);
      onValueChange?.(next);
    };
    return /* @__PURE__ */ jsx152(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: inputId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs102(
          "div",
          {
            className: cn(
              controlChrome,
              controlClass[size4],
              error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
              disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
              className
            ),
            children: [
              /* @__PURE__ */ jsxs102("span", { className: cn("relative shrink-0 overflow-hidden rounded-[4px] border border-border", swatchClass[size4]), children: [
                /* @__PURE__ */ jsx152("span", { className: "absolute inset-0", style: { background: complete ? normalised : "transparent" }, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx152(
                  "input",
                  {
                    type: "color",
                    value: complete ? normalised : "#000000",
                    onChange: (e) => set(e.target.value.toUpperCase()),
                    disabled,
                    "aria-label": "Pick a colour",
                    className: "absolute inset-0 size-full cursor-pointer opacity-0 outline-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx152("span", { className: "shrink-0 text-code-md text-text-tertiary", "aria-hidden": "true", children: "#" }),
              /* @__PURE__ */ jsx152(
                "input",
                {
                  ref,
                  id: inputId,
                  type: "text",
                  inputMode: "text",
                  spellCheck: false,
                  maxLength: 6,
                  disabled,
                  value: normalised.slice(1).toUpperCase(),
                  onChange: (e) => {
                    const next = e.target.value.toUpperCase();
                    if (HEX.test(next)) set(`#${next}`);
                  },
                  className: "min-w-0 flex-1 bg-transparent text-code-md text-input-text outline-none placeholder:text-input-placeholder",
                  ...props
                }
              ),
              /* @__PURE__ */ jsx152(ColorPicker, { className: cn(iconClass[size4], "shrink-0 text-icon"), "aria-hidden": "true" })
            ]
          }
        )
      }
    );
  }
);
ColorPicker2.displayName = "ColorPicker";
var tagVariants = cva2(
  "inline-flex items-center rounded-full border font-sans whitespace-nowrap align-middle " + motionState,
  {
    variants: {
      // The leading icon is 16px at every size; only the X close shrinks to 12
      // at SM. A blanket `[&_svg]` rule would size both, so they are separate.
      size: {
        sm: "h-[24px] gap-[4px] px-[8px] text-caption-sm",
        md: "h-[28px] gap-[6px] px-[10px] text-caption-md",
        lg: "h-[32px] gap-[6px] px-[12px] text-label-sm"
      },
      selected: {
        true: "bg-bg-brand-subtle border-border-brand text-text-brand",
        false: "bg-bg-surface-raised border-border text-text-primary"
      },
      // Only a selectable chip presses; a static one must not react to :active.
      interactive: { true: "cursor-pointer " + motionPress, false: "" }
    },
    compoundVariants: [
      // Figma `State=Hover` — only on the unselected chip.
      { selected: false, interactive: true, class: "hover:bg-bg-subtle hover:border-border-strong" }
    ],
    defaultVariants: { size: "md", selected: false, interactive: false }
  }
);
var dotSize = { sm: "size-[6px]", md: "size-[7px]", lg: "size-[8px]" };
var leadingIcon = "[&>svg]:size-[16px] [&>svg]:shrink-0";
var closeSize = { sm: "[&>svg]:size-[12px]", md: "[&>svg]:size-[16px]", lg: "[&>svg]:size-[16px]" };
var Tag = React152.forwardRef(
  ({ className, size: size4 = "md", selected, dot: dot2, avatar, leftIcon, onDismiss, onSelect, disabled, children, ...props }, ref) => {
    const key = size4 ?? "md";
    return /* @__PURE__ */ jsxs112(
      "span",
      {
        ref,
        role: onSelect ? "button" : void 0,
        tabIndex: onSelect && !disabled ? 0 : void 0,
        "aria-pressed": onSelect ? Boolean(selected) : void 0,
        "aria-disabled": disabled || void 0,
        onClick: disabled ? void 0 : onSelect,
        className: cn(
          tagVariants({ size: size4, selected, interactive: Boolean(onSelect) && !disabled }),
          onSelect && !disabled && "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          // Figma `State=Disabled` is a flat 50% on the whole chip.
          disabled && "pointer-events-none opacity-50",
          className
        ),
        ...props,
        children: [
          dot2 && /* @__PURE__ */ jsx162("span", { className: cn("shrink-0 rounded-full bg-text-primary", dotSize[key]), "aria-hidden": "true" }),
          avatar && /* @__PURE__ */ jsx162("span", { className: "inline-flex shrink-0 items-center", children: avatar }),
          leftIcon && /* @__PURE__ */ jsx162("span", { className: cn("inline-flex shrink-0 items-center", leadingIcon), children: leftIcon }),
          children,
          onDismiss && /* @__PURE__ */ jsx162(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                onDismiss();
              },
              disabled,
              "aria-label": "Remove",
              className: cn(
                "-mr-[2px] inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-opacity duration-interaction ease-decelerate hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
                closeSize[key]
              ),
              children: /* @__PURE__ */ jsx162("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx162("path", { d: "M6 6l12 12M18 6L6 18" }) })
            }
          )
        ]
      }
    );
  }
);
Tag.displayName = "Tag";
var MultiSelect = React162.forwardRef(
  ({
    size: size4 = 40,
    label,
    required,
    helperText,
    error,
    disabled,
    placeholder = "Select\u2026",
    options,
    value,
    defaultValue = [],
    onValueChange,
    maxTags,
    id,
    className,
    containerClassName
  }, ref) => {
    const autoId = React162.useId();
    const fieldId = id ?? autoId;
    const [inner, setInner] = React162.useState(defaultValue);
    const selected = value ?? inner;
    const [open, setOpen] = React162.useState(false);
    const [active, setActive] = React162.useState(0);
    const rootRef = React162.useRef(null);
    const commit = (next) => {
      if (value === void 0) setInner(next);
      onValueChange?.(next);
    };
    const toggle = (v) => commit(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
    React162.useEffect(() => {
      if (!open) return;
      const onDown = (e) => {
        if (!rootRef.current?.contains(e.target)) setOpen(false);
      };
      document.addEventListener("pointerdown", onDown);
      return () => document.removeEventListener("pointerdown", onDown);
    }, [open]);
    const chips = maxTags ? selected.slice(0, maxTags) : selected;
    const hidden = selected.length - chips.length;
    const labelOf = (v) => options.find((o) => o.value === v)?.label ?? v;
    const onKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        setActive((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const option = options[active];
        if (open && option && !option.disabled) toggle(option.value);
        else if (!open) setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "Backspace" && selected.length) {
        commit(selected.slice(0, -1));
      }
    };
    return /* @__PURE__ */ jsx172(
      FieldShell,
      {
        size: size4,
        label,
        required,
        helperText,
        error,
        disabled,
        htmlFor: fieldId,
        className: containerClassName,
        children: /* @__PURE__ */ jsxs122("div", { ref: rootRef, className: "relative", children: [
          /* @__PURE__ */ jsxs122(
            "div",
            {
              ref,
              id: fieldId,
              role: "combobox",
              "aria-expanded": open,
              "aria-haspopup": "listbox",
              "aria-disabled": disabled || void 0,
              tabIndex: disabled ? -1 : 0,
              onClick: () => !disabled && setOpen((o) => !o),
              onKeyDown,
              className: cn(
                controlChrome,
                controlClass[size4],
                "!py-[2.5px] cursor-pointer",
                error && "border-input-border-error focus-within:shadow-[0_0_0_3px_var(--color-focus-halo-danger)]",
                disabled && "pointer-events-none bg-input-bg-disabled border-input-border-disabled",
                className
              ),
              children: [
                /* @__PURE__ */ jsxs122("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-[4px]", children: [
                  chips.map((v) => /* @__PURE__ */ jsx172(
                    Tag,
                    {
                      size: "sm",
                      disabled,
                      onDismiss: () => commit(selected.filter((x) => x !== v)),
                      children: labelOf(v)
                    },
                    v
                  )),
                  hidden > 0 && /* @__PURE__ */ jsxs122(Tag, { size: "sm", children: [
                    "+",
                    hidden
                  ] }),
                  selected.length === 0 && /* @__PURE__ */ jsx172("span", { className: cn("text-input-placeholder", valueClass[size4]), children: placeholder })
                ] }),
                /* @__PURE__ */ jsx172(
                  ArrowDown01Round,
                  {
                    className: cn(iconClass[size4], "shrink-0 text-icon transition-transform duration-interaction ease-decelerate", open && "rotate-180"),
                    "aria-hidden": "true"
                  }
                )
              ]
            }
          ),
          open && /* @__PURE__ */ jsx172(
            "ul",
            {
              role: "listbox",
              "aria-multiselectable": "true",
              className: cn(
                "absolute left-0 right-0 top-[calc(100%+4px)] z-dropdown max-h-[240px] overflow-auto",
                "rounded-[12px] border border-border bg-bg-surface py-[4px] shadow-3"
              ),
              children: options.map((o, i) => {
                const on = selected.includes(o.value);
                return /* @__PURE__ */ jsxs122(
                  "li",
                  {
                    role: "option",
                    "aria-selected": on,
                    "aria-disabled": o.disabled || void 0,
                    onPointerDown: (e) => {
                      e.preventDefault();
                      if (!o.disabled) toggle(o.value);
                    },
                    onPointerEnter: () => setActive(i),
                    className: cn(
                      "flex cursor-pointer items-center justify-between px-[12px] py-[8px]",
                      valueClass[size4],
                      o.disabled ? "cursor-not-allowed text-text-disabled" : "text-input-text",
                      i === active && !o.disabled && "bg-bg-subtle",
                      on && "text-text-brand"
                    ),
                    children: [
                      o.label,
                      on && /* @__PURE__ */ jsx172("span", { "aria-hidden": "true", children: "\u2713" })
                    ]
                  },
                  o.value
                );
              })
            }
          )
        ] })
      }
    );
  }
);
MultiSelect.displayName = "MultiSelect";
var badgeVariants = cva2(
  // No `font-medium` — the Label styles carry semibold, matching Figma.
  "inline-flex items-center font-sans whitespace-nowrap rounded-full",
  {
    variants: {
      variant: { subtle: "", solid: "", outline: "border bg-transparent" },
      color: { brand: "", neutral: "", blue: "", success: "", warning: "", error: "" },
      // Figma: SM Caption/SM, MD Caption/MD, LG Label/SM. Caption is regular
      // and Label is semibold, so the earlier Label ramp rendered every badge
      // bold. LG really is smaller type than MD — 11/16 semibold against
      // 12/16 regular — which reads as heavier, not larger.
      size: {
        sm: "h-[20px] gap-[4px] px-[6px] text-caption-sm",
        md: "h-[24px] gap-[4px] px-[8px] text-caption-md",
        lg: "h-[24px] gap-[6px] px-[10px] text-label-sm"
      }
    },
    // Every pair below is the token Figma binds, not an equivalent value.
    compoundVariants: [
      { variant: "subtle", color: "brand", class: "bg-badge-brand-bg text-badge-brand-text" },
      // Neutral is the one colour with no badge token pair in Figma.
      { variant: "subtle", color: "neutral", class: "bg-bg-subtle text-text-secondary" },
      { variant: "subtle", color: "blue", class: "bg-badge-blue-bg text-badge-blue-text" },
      { variant: "subtle", color: "success", class: "bg-badge-success-bg text-badge-success-text" },
      { variant: "subtle", color: "warning", class: "bg-badge-warning-bg text-badge-warning-text" },
      { variant: "subtle", color: "error", class: "bg-badge-error-bg text-badge-error-text" },
      { variant: "solid", color: "brand", class: "bg-bg-brand text-text-on-brand" },
      { variant: "solid", color: "neutral", class: "bg-bg-inverse text-text-inverse" },
      // Solid non-brand labels are text/inverse in Figma, not text/on-brand:
      // inverse flips with the theme, on-brand is white in both.
      { variant: "solid", color: "blue", class: "bg-bg-blue text-text-inverse" },
      { variant: "solid", color: "success", class: "bg-bg-success text-text-inverse" },
      { variant: "solid", color: "warning", class: "bg-bg-warning text-text-inverse" },
      { variant: "solid", color: "error", class: "bg-bg-error text-text-inverse" },
      { variant: "outline", color: "brand", class: "border-border-brand text-text-brand" },
      { variant: "outline", color: "neutral", class: "border-border text-text-secondary" },
      { variant: "outline", color: "blue", class: "border-border-blue text-text-blue" },
      { variant: "outline", color: "success", class: "border-border-success text-text-success" },
      { variant: "outline", color: "warning", class: "border-border-warning text-text-warning" },
      { variant: "outline", color: "error", class: "border-border-error text-text-error" }
    ],
    defaultVariants: { variant: "subtle", color: "brand", size: "md" }
  }
);
var leadingIcon2 = "[&>svg]:size-[12px] [&>svg]:shrink-0";
var closeSize2 = {
  sm: "[&>svg]:size-[12px]",
  md: "[&>svg]:size-[16px]",
  lg: "[&>svg]:size-[16px]"
};
var dotSize2 = {
  sm: "size-[6px]",
  md: "size-[6px]",
  lg: "size-[8px]"
};
var Badge = React172.forwardRef(
  ({ className, variant, color, size: size4, dot: dot2, leftIcon, rightIcon, onDismiss, children, ...props }, ref) => /* @__PURE__ */ jsxs132("span", { ref, className: cn(badgeVariants({ variant, color, size: size4 }), className), ...props, children: [
    dot2 && /* @__PURE__ */ jsx182("span", { className: cn("shrink-0 rounded-full bg-current", dotSize2[size4 ?? "md"]), "aria-hidden": "true" }),
    leftIcon && /* @__PURE__ */ jsx182("span", { className: cn("inline-flex shrink-0 items-center", leadingIcon2), children: leftIcon }),
    children,
    rightIcon && /* @__PURE__ */ jsx182("span", { className: cn("inline-flex shrink-0 items-center", leadingIcon2), children: rightIcon }),
    onDismiss && /* @__PURE__ */ jsx182(
      "button",
      {
        type: "button",
        onClick: onDismiss,
        "aria-label": "Remove",
        className: cn(
          "-mr-[2px] inline-flex shrink-0 items-center justify-center rounded-full outline-none transition-opacity duration-interaction ease-decelerate hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          closeSize2[size4 ?? "md"]
        ),
        children: /* @__PURE__ */ jsx182("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx182("path", { d: "M6 6l12 12M18 6L6 18" }) })
      }
    )
  ] })
);
Badge.displayName = "Badge";
var avatarVariants = cva2(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-sans align-middle select-none",
  {
    variants: {
      size: {
        "2xs": "size-[20px] text-overline-sm",
        xs: "size-[24px] text-label-sm",
        sm: "size-[32px] text-label-lg",
        md: "size-[40px] text-heading-h6",
        lg: "size-[48px] text-heading-h5",
        xl: "size-[64px] text-heading-h3"
      },
      /** Figma fills Initials with bg/brand-subtle and Icon with bg/surface-raised. */
      tone: {
        initials: "bg-bg-brand-subtle text-text-brand",
        icon: "bg-bg-surface-raised text-icon",
        image: "bg-bg-surface-raised"
      },
      interactive: {
        true: "cursor-pointer outline-none transition-[colors,box-shadow] duration-interaction ease-decelerate focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
        false: ""
      }
    },
    defaultVariants: { size: "md", tone: "initials", interactive: false }
  }
);
var ringClass = {
  "2xs": "ring-1 ring-inset ring-bg-surface",
  xs: "ring-1 ring-inset ring-bg-surface",
  sm: "ring-2 ring-inset ring-bg-surface",
  md: "ring-2 ring-inset ring-bg-surface",
  lg: "ring-2 ring-inset ring-bg-surface",
  xl: "ring-2 ring-inset ring-bg-surface"
};
var iconClass2 = {
  "2xs": "size-[12px]",
  xs: "size-[14px]",
  sm: "size-[18px]",
  md: "size-[22px]",
  lg: "size-[26px]",
  xl: "size-[36px]"
};
var dotClass2 = {
  "2xs": "size-[6px] right-0 bottom-0",
  xs: "size-[7px] right-0 bottom-0",
  sm: "size-[9px] right-0 bottom-0",
  md: "size-[11px] right-0 bottom-0",
  lg: "size-[13px] right-[1px] bottom-[1px]",
  xl: "size-[16px] right-[1px] bottom-[1px]"
};
var statusColor = {
  online: "bg-icon-success",
  offline: "bg-icon-disabled",
  verified: "bg-icon-blue"
};
var UserGlyph = /* @__PURE__ */ jsxs142("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "size-full", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx192("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ jsx192("circle", { cx: "12", cy: "7", r: "4" })
] });
var Avatar = React182.forwardRef(
  ({ className, size: size4 = "md", src, alt, initials, icon, status, onClick, disabled, ...props }, ref) => {
    const [failed, setFailed] = React182.useState(false);
    const showImage = Boolean(src) && !failed;
    const tone = showImage ? "image" : initials ? "initials" : "icon";
    const key = size4 ?? "md";
    return /* @__PURE__ */ jsxs142("span", { className: "relative inline-flex", children: [
      /* @__PURE__ */ jsx192(
        "span",
        {
          ref,
          role: onClick ? "button" : void 0,
          tabIndex: onClick && !disabled ? 0 : void 0,
          "aria-disabled": disabled || void 0,
          "aria-label": !showImage && !initials ? alt : void 0,
          onClick: disabled ? void 0 : onClick,
          className: cn(
            avatarVariants({ size: size4, tone, interactive: Boolean(onClick) && !disabled }),
            ringClass[key],
            // `Hover overlay` — text/primary at 8% over the fill.
            onClick && !disabled && "after:absolute after:inset-0 after:bg-text-primary after:opacity-0 after:transition-opacity after:duration-interaction after:ease-decelerate hover:after:opacity-[0.08]",
            disabled && "pointer-events-none opacity-50",
            className
          ),
          ...props,
          children: showImage ? /* @__PURE__ */ jsx192("img", { src, alt: alt ?? "", onError: () => setFailed(true), className: "size-full object-cover" }) : initials ? initials.slice(0, 2).toUpperCase() : /* @__PURE__ */ jsx192("span", { className: cn("inline-flex items-center justify-center", iconClass2[key]), children: icon ?? UserGlyph })
        }
      ),
      status && // Ring in bg/surface, coloured core at two thirds — matches `_Status dot`.
      /* @__PURE__ */ jsx192(
        "span",
        {
          className: cn("absolute inline-flex items-center justify-center rounded-full bg-bg-surface", dotClass2[key]),
          role: "img",
          "aria-label": status,
          children: /* @__PURE__ */ jsx192("span", { className: cn("h-2/3 w-2/3 rounded-full", statusColor[status]), children: status === "verified" && /* @__PURE__ */ jsx192("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "var(--color-icon-on-brand)", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", className: "size-full", "aria-hidden": "true", children: /* @__PURE__ */ jsx192("path", { d: "M5 12.5l5 5 9-10" }) }) })
        }
      )
    ] });
  }
);
Avatar.displayName = "Avatar";
var spinnerVariants = cva2("inline-block shrink-0 align-middle", {
  variants: {
    size: {
      sm: "size-[16px]",
      md: "size-[20px]",
      lg: "size-[24px]",
      xl: "size-[32px]"
    },
    color: {
      brand: "text-icon-brand",
      neutral: "text-icon-secondary",
      inverse: "text-icon-on-brand",
      blue: "text-icon-blue",
      success: "text-icon-success",
      warning: "text-icon-warning",
      error: "text-icon-error"
    }
  },
  defaultVariants: { size: "md", color: "brand" }
});
var metrics2 = {
  sm: { box: 16, stroke: 2, dot: 2.5 },
  md: { box: 20, stroke: 2, dot: 3 },
  lg: { box: 24, stroke: 2.5, dot: 3.5 },
  xl: { box: 32, stroke: 3, dot: 4.5 }
};
var DOTS = 12;
var START_DEG = 0.87 * 180 / Math.PI - 90;
var Spinner2 = React192.forwardRef(
  ({ className, size: size4 = "md", color = "brand", variant = "arc", label = "Loading", ...props }, ref) => {
    const key = size4 ?? "md";
    const { box, stroke, dot: dot2 } = metrics2[key];
    const r2 = (box - stroke) / 2;
    const half = Math.PI * r2;
    return /* @__PURE__ */ jsx202(
      "span",
      {
        ref,
        role: "status",
        "aria-label": label,
        className: cn(spinnerVariants({ size: size4, color }), "relative", className),
        ...props,
        children: variant === "dots" ? /* @__PURE__ */ jsx202("span", { className: "absolute inset-0 animate-spin", style: { animationDuration: "1.2s" }, "aria-hidden": "true", children: Array.from({ length: DOTS }, (_, i) => (
          // Each layer fills the box and rotates about its centre, so the
          // dot pinned to its top edge lands on the circle at i × 30°.
          /* @__PURE__ */ jsx202("span", { className: "absolute inset-0", style: { transform: `rotate(${360 / DOTS * i}deg)` }, children: /* @__PURE__ */ jsx202(
            "span",
            {
              className: "absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-current",
              style: { width: dot2, height: dot2, opacity: 1 - i * 0.073 }
            }
          ) }, i)
        )) }) : /* @__PURE__ */ jsxs152(
          "svg",
          {
            viewBox: `0 0 ${box} ${box}`,
            className: "size-full animate-spin",
            style: { animationDuration: "0.8s" },
            "aria-hidden": "true",
            children: [
              variant === "ring" && /* @__PURE__ */ jsx202(
                "circle",
                {
                  cx: box / 2,
                  cy: box / 2,
                  r: r2,
                  fill: "none",
                  stroke: "var(--color-border-subtle)",
                  strokeWidth: stroke
                }
              ),
              /* @__PURE__ */ jsx202(
                "circle",
                {
                  cx: box / 2,
                  cy: box / 2,
                  r: r2,
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: stroke,
                  strokeLinecap: "round",
                  strokeDasharray: `${half} ${half}`,
                  transform: `rotate(${START_DEG} ${box / 2} ${box / 2})`
                }
              )
            ]
          }
        )
      }
    );
  }
);
Spinner2.displayName = "Spinner";
var skeletonVariants = cva2("bg-bg-subtle", {
  variants: {
    shape: {
      rectangle: "rounded-lg",
      line: "rounded-sm",
      circle: "rounded-full"
    },
    size: { sm: "", md: "", lg: "" },
    animate: { true: "animate-pulse", false: "" }
  },
  compoundVariants: [
    { shape: "rectangle", size: "sm", class: "w-[120px] h-[60px]" },
    { shape: "rectangle", size: "md", class: "w-[200px] h-[100px]" },
    { shape: "rectangle", size: "lg", class: "w-[320px] h-[160px]" },
    { shape: "line", size: "sm", class: "w-[80px] h-[8px]" },
    { shape: "line", size: "md", class: "w-[160px] h-[12px]" },
    { shape: "line", size: "lg", class: "w-[240px] h-[16px]" },
    { shape: "circle", size: "sm", class: "size-[24px]" },
    { shape: "circle", size: "md", class: "size-[32px]" },
    { shape: "circle", size: "lg", class: "size-[48px]" }
  ],
  defaultVariants: { shape: "rectangle", size: "md", animate: true }
});
var composed = {
  avatar: {
    sm: { circle: "size-[24px]", gap: "gap-[8px]", lines: "gap-[6px]", l1: "h-[8px] w-[80px]", l2: "h-[6px] w-[60px]" },
    md: { circle: "size-[32px]", gap: "gap-[10px]", lines: "gap-[8px]", l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]" },
    lg: { circle: "size-[48px]", gap: "gap-[12px]", lines: "gap-[10px]", l1: "h-[14px] w-[160px]", l2: "h-[10px] w-[100px]" }
  },
  card: {
    sm: { img: "w-[160px] h-[80px]", gap: "gap-[12px]", lines: "gap-[8px]", l1: "h-[10px] w-[120px]", l2: "h-[8px] w-[80px]" },
    md: { img: "w-[240px] h-[140px]", gap: "gap-[14px]", lines: "gap-[10px]", l1: "h-[12px] w-[180px]", l2: "h-[10px] w-[120px]" },
    lg: { img: "w-[320px] h-[180px]", gap: "gap-[16px]", lines: "gap-[12px]", l1: "h-[16px] w-[240px]", l2: "h-[12px] w-[160px]" }
  }
};
var Skeleton = React202.forwardRef(
  ({ className, shape = "rectangle", size: size4 = "md", animate = true, ...props }, ref) => {
    const key = size4 ?? "md";
    const pulse = animate ? "animate-pulse" : "";
    if (shape === "avatar") {
      const s = composed.avatar[key];
      return /* @__PURE__ */ jsxs162("div", { ref, "aria-hidden": "true", className: cn("inline-flex items-center", s.gap, className), ...props, children: [
        /* @__PURE__ */ jsx212("div", { className: cn("shrink-0 rounded-full bg-bg-subtle", s.circle, pulse) }),
        /* @__PURE__ */ jsxs162("div", { className: cn("flex flex-col", s.lines), children: [
          /* @__PURE__ */ jsx212("div", { className: cn("rounded-sm bg-bg-subtle", s.l1, pulse) }),
          /* @__PURE__ */ jsx212("div", { className: cn("rounded-sm bg-bg-subtle", s.l2, pulse) })
        ] })
      ] });
    }
    if (shape === "card") {
      const s = composed.card[key];
      return /* @__PURE__ */ jsxs162("div", { ref, "aria-hidden": "true", className: cn("inline-flex flex-col", s.gap, className), ...props, children: [
        /* @__PURE__ */ jsx212("div", { className: cn("rounded-lg bg-bg-subtle", s.img, pulse) }),
        /* @__PURE__ */ jsxs162("div", { className: cn("flex flex-col", s.lines), children: [
          /* @__PURE__ */ jsx212("div", { className: cn("rounded-sm bg-bg-subtle", s.l1, pulse) }),
          /* @__PURE__ */ jsx212("div", { className: cn("rounded-sm bg-bg-subtle", s.l2, pulse) })
        ] })
      ] });
    }
    return /* @__PURE__ */ jsx212(
      "div",
      {
        ref,
        "aria-hidden": "true",
        className: cn(skeletonVariants({ shape, size: size4, animate }), className),
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var dividerVariants = cva2("", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full inline-flex"
    }
  },
  defaultVariants: { orientation: "horizontal" }
});
var Line = ({ vertical }) => /* @__PURE__ */ jsx223("span", { className: cn("shrink-0 bg-border-subtle", vertical ? "w-px flex-1" : "h-px flex-1"), "aria-hidden": "true" });
var Divider = React212.forwardRef(
  ({ className, orientation = "horizontal", variant = "line", align = "center", children, ...props }, ref) => {
    const vertical = orientation === "vertical";
    if (variant === "fill") {
      return /* @__PURE__ */ jsx223(
        "div",
        {
          ref,
          role: "separator",
          className: cn(
            "flex w-full items-center bg-bg-subtle px-[16px] py-[10px] text-body-sm text-text-secondary",
            align === "center" && "justify-center",
            align === "right" && "justify-end",
            className
          ),
          ...props,
          children
        }
      );
    }
    if (!children) {
      return /* @__PURE__ */ jsx223(
        "div",
        {
          ref,
          role: "separator",
          "aria-orientation": vertical ? "vertical" : "horizontal",
          className: cn(
            "shrink-0 bg-border-subtle",
            vertical ? "h-full w-px self-stretch" : "h-px w-full",
            className
          ),
          ...props
        }
      );
    }
    return /* @__PURE__ */ jsxs172(
      "div",
      {
        ref,
        role: "separator",
        "aria-orientation": vertical ? "vertical" : "horizontal",
        className: cn(
          "flex items-center gap-[16px] text-body-sm text-text-secondary",
          vertical ? "h-full flex-col" : "w-full",
          className
        ),
        ...props,
        children: [
          align !== "left" && /* @__PURE__ */ jsx223(Line, { vertical }),
          /* @__PURE__ */ jsx223("span", { className: "shrink-0", children }),
          align !== "right" && /* @__PURE__ */ jsx223(Line, { vertical })
        ]
      }
    );
  }
);
Divider.displayName = "Divider";
var dotVariants = cva2("inline-block shrink-0 rounded-full ring-2 ring-bg-surface align-middle", {
  variants: {
    size: {
      xs: "size-[6px]",
      sm: "size-[8px]",
      md: "size-[10px]",
      lg: "size-[12px]"
    },
    color: {
      brand: "bg-bg-brand",
      // Figma uses bg/inverse for Neutral, so it flips with the theme.
      neutral: "bg-bg-inverse",
      blue: "bg-bg-blue",
      success: "bg-bg-success",
      warning: "bg-bg-warning",
      error: "bg-bg-error"
    }
  },
  defaultVariants: { size: "md", color: "brand" }
});
var Dot = React222.forwardRef(
  ({ className, size: size4, color, label, ...props }, ref) => /* @__PURE__ */ jsx232(
    "span",
    {
      ref,
      role: label ? "img" : void 0,
      "aria-label": label,
      "aria-hidden": label ? void 0 : true,
      className: cn(dotVariants({ size: size4, color }), className),
      ...props
    }
  )
);
Dot.displayName = "Dot";
var kbdVariants = cva2(
  [
    "inline-flex items-center justify-center rounded-[4px] font-mono align-middle whitespace-nowrap",
    "border border-border bg-bg-surface-raised text-text-secondary"
  ],
  {
    variants: {
      size: {
        sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
        md: "h-[24px] px-[8px] py-[3px] text-code-sm",
        lg: "h-[30px] px-[10px] py-[5px] text-code-md"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Kbd = React232.forwardRef(
  ({ className, size: size4, children, ...props }, ref) => /* @__PURE__ */ jsx242("kbd", { ref, className: cn(kbdVariants({ size: size4 }), className), ...props, children })
);
Kbd.displayName = "Kbd";
var codeVariants = cva2(
  "inline-flex items-center rounded-[4px] font-mono align-middle bg-bg-subtle text-text-primary",
  {
    variants: {
      size: {
        sm: "h-[22px] px-[6px] py-[2px] text-code-sm",
        md: "h-[24px] px-[8px] py-[3px] text-code-sm",
        lg: "h-[28px] px-[10px] py-[4px] text-code-md"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var Code = React242.forwardRef(
  ({ className, size: size4, children, ...props }, ref) => /* @__PURE__ */ jsx252("code", { ref, className: cn(codeVariants({ size: size4 }), className), ...props, children })
);
Code.displayName = "Code";
var deltaChipVariants = cva2(
  "inline-flex items-center rounded-full font-sans whitespace-nowrap align-middle",
  {
    variants: {
      size: {
        sm: "h-[20px] gap-[3px] px-[8px] py-[2px] text-label-sm [&>svg]:size-[12px]",
        md: "h-[24px] gap-[4px] px-[10px] py-[4px] text-label-md [&>svg]:size-[14px]"
      },
      trend: { up: "", down: "", flat: "" },
      variant: { subtle: "", filled: "", text: "" }
    },
    compoundVariants: [
      { variant: "subtle", trend: "up", class: "bg-chart-delta-up-bg text-chart-delta-up-text" },
      { variant: "subtle", trend: "down", class: "bg-chart-delta-down-bg text-chart-delta-down-text" },
      { variant: "subtle", trend: "flat", class: "bg-chart-delta-flat-bg text-chart-delta-flat-text" },
      { variant: "filled", trend: "up", class: "bg-chart-delta-up-icon text-text-inverse" },
      { variant: "filled", trend: "down", class: "bg-chart-delta-down-icon text-text-inverse" },
      { variant: "filled", trend: "flat", class: "bg-chart-delta-flat-icon text-text-inverse" },
      { variant: "text", trend: "up", class: "text-chart-delta-up-text" },
      { variant: "text", trend: "down", class: "text-chart-delta-down-text" },
      { variant: "text", trend: "flat", class: "text-chart-delta-flat-text" }
    ],
    defaultVariants: { size: "md", trend: "up", variant: "subtle" }
  }
);
var arrows = {
  up: "M12 19V5M5 12l7-7 7 7",
  down: "M12 5v14M19 12l-7 7-7-7",
  flat: "M5 12h14"
};
var DeltaChip = React252.forwardRef(
  ({ className, size: size4, trend = "up", variant, icon, children, ...props }, ref) => /* @__PURE__ */ jsxs182("span", { ref, className: cn(deltaChipVariants({ size: size4, trend, variant }), className), ...props, children: [
    icon ?? /* @__PURE__ */ jsx262("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx262("path", { d: arrows[trend] }) }),
    children
  ] })
);
DeltaChip.displayName = "DeltaChip";
var Track = ({ pct }) => /* @__PURE__ */ jsx272("div", { className: "h-[8px] w-full overflow-hidden rounded-[4px] bg-bg-subtle", children: /* @__PURE__ */ jsx272(
  "div",
  {
    className: "h-full rounded-[4px] bg-bg-brand transition-[width] duration-normal ease-standard",
    style: { width: `${pct}%` }
  }
) });
var Pill = ({ text }) => /* @__PURE__ */ jsx272("span", { className: "inline-flex h-[22px] items-center rounded-[6px] border border-border-subtle bg-bg-surface-raised px-[8px] text-label-sm text-text-primary", children: text });
var ProgressBar = React262.forwardRef(
  ({ className, value = 0, label = "none", formatValue, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, value));
    const text = formatValue ? formatValue(pct) : `${Math.round(pct)}%`;
    const shell2 = /* @__PURE__ */ jsxs192(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        className: cn("w-full", className),
        ...props,
        children: [
          label === "top-floating" && /* @__PURE__ */ jsx272("div", { className: "mb-[6px] flex", children: /* @__PURE__ */ jsx272("span", { style: { marginLeft: `calc(${pct}% - 20px)` }, children: /* @__PURE__ */ jsx272(Pill, { text }) }) }),
          label === "right" ? /* @__PURE__ */ jsxs192("div", { className: "flex items-center gap-[12px]", children: [
            /* @__PURE__ */ jsx272(Track, { pct }),
            /* @__PURE__ */ jsx272("span", { className: "shrink-0 text-caption-md text-text-primary", children: text })
          ] }) : /* @__PURE__ */ jsx272(Track, { pct }),
          label === "bottom" && /* @__PURE__ */ jsx272("div", { className: "mt-[6px] text-caption-md text-text-primary", children: text }),
          label === "bottom-floating" && /* @__PURE__ */ jsx272("div", { className: "mt-[6px] flex", children: /* @__PURE__ */ jsx272("span", { style: { marginLeft: `calc(${pct}% - 20px)` }, children: /* @__PURE__ */ jsx272(Pill, { text }) }) })
        ]
      }
    );
    return shell2;
  }
);
ProgressBar.displayName = "ProgressBar";
var metrics3 = {
  xs: { box: 40, stroke: 4, value: "text-overline-sm", title: "text-caption-sm" },
  sm: { box: 56, stroke: 6, value: "text-label-lg", title: "text-caption-sm" },
  md: { box: 80, stroke: 8, value: "text-heading-h4", title: "text-caption-md" },
  lg: { box: 120, stroke: 10, value: "text-heading-h3", title: "text-caption-md" },
  xl: { box: 160, stroke: 14, value: "text-heading-h1", title: "text-caption-md" }
};
var ProgressRing = React27.forwardRef(
  ({ className, value = 0, size: size4 = "md", variant = "ring", title, formatValue, ...props }, ref) => {
    const { box, stroke, value: valueClass2, title: titleClass } = metrics3[size4];
    const pct = Math.min(100, Math.max(0, value));
    const text = formatValue ? formatValue(pct) : `${Math.round(pct)}%`;
    const r2 = (box - stroke) / 2;
    const circumference = 2 * Math.PI * r2;
    const arc = variant === "gauge" ? circumference / 2 : circumference;
    const rotation = variant === "gauge" ? 180 : -90;
    return /* @__PURE__ */ jsxs202(
      "div",
      {
        ref,
        role: "progressbar",
        "aria-valuenow": Math.round(pct),
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        className: cn("relative inline-flex shrink-0 items-center justify-center align-middle", className),
        style: { width: box, height: box },
        ...props,
        children: [
          /* @__PURE__ */ jsx282("svg", { viewBox: `0 0 ${box} ${box}`, className: "absolute inset-0 size-full", "aria-hidden": "true", children: /* @__PURE__ */ jsxs202("g", { transform: `rotate(${rotation} ${box / 2} ${box / 2})`, children: [
            /* @__PURE__ */ jsx282(
              "circle",
              {
                cx: box / 2,
                cy: box / 2,
                r: r2,
                fill: "none",
                stroke: "var(--color-border-subtle)",
                strokeWidth: stroke,
                strokeDasharray: `${arc} ${circumference}`
              }
            ),
            /* @__PURE__ */ jsx282(
              "circle",
              {
                cx: box / 2,
                cy: box / 2,
                r: r2,
                fill: "none",
                stroke: "var(--color-icon-brand)",
                strokeWidth: stroke,
                strokeDasharray: `${arc * pct / 100} ${circumference}`,
                className: "transition-[stroke-dasharray] duration-normal ease-standard"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs202(
            "div",
            {
              className: cn(
                "relative flex flex-col items-center justify-center text-center",
                // The gauge's arc only covers the top, so its text sits low in the box.
                variant === "gauge" && "translate-y-[15%]"
              ),
              children: [
                title && /* @__PURE__ */ jsx282("span", { className: cn(titleClass, "text-text-tertiary"), children: title }),
                /* @__PURE__ */ jsx282("span", { className: cn(valueClass2, "text-text-primary"), children: text })
              ]
            }
          )
        ]
      }
    );
  }
);
ProgressRing.displayName = "ProgressRing";
var inlineCtaVariants = cva2(
  [
    "inline-flex items-center gap-[6px] font-sans cursor-pointer",
    "transition-colors duration-interaction ease-decelerate",
    "outline-none focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
    "aria-disabled:pointer-events-none aria-disabled:text-text-disabled",
    "[&>svg]:transition-transform [&>svg]:duration-interaction ease-decelerate"
  ],
  {
    variants: {
      size: {
        sm: "text-caption-md [&>svg]:size-[12px]",
        md: "text-body-sm-medium [&>svg]:size-[14px]",
        lg: "text-body-md-medium [&>svg]:size-[16px]"
      },
      color: {
        brand: "text-text-brand",
        neutral: "text-text-primary"
      },
      arrow: {
        right: "hover:[&>svg]:translate-x-[2px]",
        down: "hover:[&>svg]:translate-y-[2px]"
      }
    },
    defaultVariants: { size: "md", color: "brand", arrow: "right" }
  }
);
var arrowPath = {
  right: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6"
};
var InlineCta = React28.forwardRef(
  ({ className, size: size4, color, arrow: arrow4 = "right", asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return /* @__PURE__ */ jsxs212(
      Comp,
      {
        ref,
        "aria-disabled": disabled || void 0,
        tabIndex: disabled ? -1 : props.tabIndex,
        className: cn(inlineCtaVariants({ size: size4, color, arrow: arrow4 }), className),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsx292("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx292("path", { d: arrowPath[arrow4] }) })
        ]
      }
    );
  }
);
InlineCta.displayName = "InlineCta";
var overlap = {
  xs: "-space-x-[6px]",
  sm: "-space-x-[8px]",
  md: "-space-x-[10px]",
  lg: "-space-x-[12px]"
};
var chipType = {
  xs: "size-[24px] text-overline-sm",
  sm: "size-[32px] text-label-sm",
  md: "size-[40px] text-label-md",
  lg: "size-[48px] text-label-lg"
};
var AvatarGroup = React29.forwardRef(
  ({ className, size: size4 = "md", max: max2, onAdd, children, ...props }, ref) => {
    const faces = React29.Children.toArray(children).filter(React29.isValidElement);
    const shown = max2 ? faces.slice(0, max2) : faces;
    const hidden = faces.length - shown.length;
    return /* @__PURE__ */ jsxs222("div", { ref, className: cn("flex items-center", overlap[size4], className), ...props, children: [
      shown.map(
        (child, i) => React29.isValidElement(child) ? React29.cloneElement(child, { key: i, size: child.props.size ?? size4 }) : child
      ),
      hidden > 0 && /* @__PURE__ */ jsxs222(
        "span",
        {
          className: cn(
            "inline-flex shrink-0 items-center justify-center rounded-full font-sans",
            "bg-bg-surface-raised text-text-secondary ring-2 ring-inset ring-bg-surface",
            chipType[size4]
          ),
          children: [
            "+",
            hidden
          ]
        }
      ),
      onAdd && /* @__PURE__ */ jsx302(
        "button",
        {
          type: "button",
          onClick: onAdd,
          "aria-label": "Add person",
          className: cn(
            "inline-flex shrink-0 items-center justify-center rounded-full",
            "border border-dashed border-border-strong bg-bg-surface text-icon",
            "outline-none transition-colors duration-interaction ease-decelerate hover:bg-bg-subtle focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            chipType[size4]
          ),
          children: /* @__PURE__ */ jsx302("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", className: "size-[45%]", "aria-hidden": "true", children: /* @__PURE__ */ jsx302("path", { d: "M12 5v14M5 12h14" }) })
        }
      )
    ] });
  }
);
AvatarGroup.displayName = "AvatarGroup";
var labelGroup = {
  sm: { avatar: "sm", gap: "gap-[8px]", name: "text-body-sm-medium", sub: "text-caption-md" },
  md: { avatar: "md", gap: "gap-[12px]", name: "text-body-md-medium", sub: "text-body-sm" },
  lg: { avatar: "lg", gap: "gap-[14px]", name: "text-label-lg", sub: "text-body-md" },
  xl: { avatar: "xl", gap: "gap-[16px]", name: "text-label-xl", sub: "text-body-lg" }
};
var AvatarLabelGroup = React29.forwardRef(
  ({ className, size: size4 = "md", name, subtitle, avatar, ...props }, ref) => {
    const s = labelGroup[size4];
    return /* @__PURE__ */ jsxs222("div", { ref, className: cn("inline-flex items-center", s.gap, className), ...props, children: [
      /* @__PURE__ */ jsx302(Avatar, { size: s.avatar, ...avatar }),
      /* @__PURE__ */ jsxs222("span", { className: "flex flex-col gap-[2px]", children: [
        /* @__PURE__ */ jsx302("span", { className: cn(s.name, "text-text-primary"), children: name }),
        subtitle && /* @__PURE__ */ jsx302("span", { className: cn(s.sub, "text-text-secondary"), children: subtitle })
      ] })
    ] });
  }
);
AvatarLabelGroup.displayName = "AvatarLabelGroup";
var TooltipProvider2 = Provider;
var Tooltip2 = ({
  content,
  arrow: arrow4 = true,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 200,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children
}) => /* @__PURE__ */ jsxs232(
  Root32,
  {
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    children: [
      /* @__PURE__ */ jsx312(Trigger, { asChild: true, children }),
      /* @__PURE__ */ jsx312(Portal3, { children: /* @__PURE__ */ jsxs232(
        Content2,
        {
          side,
          align,
          sideOffset,
          className: cn(
            "z-popover max-w-[280px] rounded-[8px] bg-bg-inverse px-[12px] py-[8px]",
            "text-body-xs-medium text-text-inverse shadow-3",
            // Plain data-state transitions rather than tailwindcss-animate — the
            // package is not a dependency and one tooltip does not justify it.
            "transition-opacity duration-interaction ease-decelerate",
            "data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100 data-[state=closed]:opacity-0",
            className
          ),
          children: [
            content,
            arrow4 && /* @__PURE__ */ jsx312(Arrow22, { width: 10, height: 6, className: "fill-bg-inverse" })
          ]
        }
      ) })
    ]
  }
);
Tooltip2.displayName = "Tooltip";
var alertVariants = cva2("flex w-full items-center border", {
  variants: {
    size: {
      sm: "gap-[10px] rounded-[8px] px-[14px] py-[12px]",
      md: "gap-[12px] rounded-[12px] px-[18px] py-[16px]"
    },
    severity: {
      info: "bg-bg-info-subtle border-border-blue",
      success: "bg-bg-success-subtle border-border-success",
      warning: "bg-bg-warning-subtle border-border-warning",
      error: "bg-bg-error-subtle border-border-error"
    }
  },
  defaultVariants: { size: "md", severity: "info" }
});
var badge = {
  info: "bg-icon-blue",
  success: "bg-icon-success",
  warning: "bg-icon-warning",
  error: "bg-icon-error"
};
var accent = {
  info: "text-icon-blue",
  success: "text-icon-success",
  warning: "text-icon-warning",
  error: "text-icon-error"
};
var glyph = {
  info: InformationCircle,
  success: CheckmarkCircle02,
  warning: AlertCircle,
  error: AlertCircle
};
var ramp = {
  sm: { badge: "size-[18px]", glyph: "size-[12px]", gap: "gap-[2px]", title: "text-body-sm-medium", body: "text-caption-md", dismiss: "size-[18px]" },
  md: { badge: "size-[20px]", glyph: "size-[14px]", gap: "gap-[4px]", title: "text-body-md-medium", body: "text-body-sm", dismiss: "size-[20px]" }
};
var Alert = React30.forwardRef(
  ({ className, size: size4 = "md", severity = "info", title, description, action, onActionClick, onDismiss, children, ...props }, ref) => {
    const s = ramp[size4 ?? "md"];
    const Glyph = glyph[severity];
    return /* @__PURE__ */ jsxs242("div", { ref, role: "alert", className: cn(alertVariants({ size: size4, severity }), className), ...props, children: [
      /* @__PURE__ */ jsx322("span", { className: cn("inline-flex shrink-0 items-center justify-center rounded-full", badge[severity], s.badge), children: /* @__PURE__ */ jsx322(Glyph, { className: cn(s.glyph, "text-icon-on-brand"), "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxs242("div", { className: cn("flex min-w-0 flex-1 flex-col", s.gap), children: [
        title && /* @__PURE__ */ jsx322("span", { className: cn(s.title, "text-text-primary"), children: title }),
        description && /* @__PURE__ */ jsx322("span", { className: cn(s.body, "text-text-secondary"), children: description }),
        children,
        action && /* @__PURE__ */ jsx322(
          "button",
          {
            type: "button",
            onClick: onActionClick,
            className: cn(
              "w-fit text-left outline-none transition-colors duration-interaction ease-decelerate hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)] rounded-[2px]",
              s.title,
              accent[severity]
            ),
            children: action
          }
        )
      ] }),
      onDismiss && /* @__PURE__ */ jsx322(
        "button",
        {
          type: "button",
          onClick: onDismiss,
          "aria-label": "Dismiss",
          className: cn(
            "inline-flex shrink-0 items-center justify-center rounded-[4px] text-icon outline-none",
            "transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            s.dismiss
          ),
          children: /* @__PURE__ */ jsx322(Cancel01, { className: "size-[14px]", "aria-hidden": "true" })
        }
      )
    ] });
  }
);
Alert.displayName = "Alert";
var inlineMessageVariants = cva2("inline-flex items-center gap-[4px] text-caption-md", {
  variants: {
    severity: {
      helper: "text-text-secondary",
      info: "text-icon-blue",
      success: "text-text-success",
      warning: "text-text-warning",
      error: "text-text-error"
    }
  },
  defaultVariants: { severity: "helper" }
});
var glyph2 = {
  helper: HelpCircle,
  info: InformationCircle,
  success: CheckmarkCircle02,
  warning: AlertCircle,
  error: AlertCircle
};
var InlineMessage = React31.forwardRef(
  ({ className, severity = "helper", hideIcon, children, ...props }, ref) => {
    const Glyph = glyph2[severity];
    return /* @__PURE__ */ jsxs252("span", { ref, className: cn(inlineMessageVariants({ severity }), className), ...props, children: [
      !hideIcon && /* @__PURE__ */ jsx332(Glyph, { className: "size-[14px] shrink-0", "aria-hidden": "true" }),
      children
    ] });
  }
);
InlineMessage.displayName = "InlineMessage";
var bannerVariants = cva2(
  "flex w-full items-center gap-[6px] rounded-[6px] border py-[8px] pl-[12px] pr-[8px]",
  {
    variants: {
      severity: {
        info: "bg-bg-info-subtle border-border-blue",
        success: "bg-bg-success-subtle border-border-success",
        warning: "bg-bg-warning-subtle border-border-warning",
        error: "bg-bg-error-subtle border-border-error",
        neutral: "bg-bg-subtle border-border"
      }
    },
    defaultVariants: { severity: "info" }
  }
);
var accent2 = {
  info: "text-icon-blue",
  success: "text-icon-success",
  warning: "text-icon-warning",
  error: "text-icon-error",
  neutral: "text-icon"
};
var glyph3 = {
  info: InformationCircle,
  success: CheckmarkCircle02,
  warning: AlertCircle,
  error: AlertCircle,
  neutral: InformationCircle
};
var Banner = React322.forwardRef(
  ({ className, severity = "info", title, description, actions, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph3[severity];
    return /* @__PURE__ */ jsxs262("div", { ref, role: "status", className: cn(bannerVariants({ severity }), className), ...props, children: [
      !hideIcon && /* @__PURE__ */ jsx342("span", { className: cn("inline-flex size-[24px] shrink-0 items-center justify-center", accent2[severity]), children: /* @__PURE__ */ jsx342(Glyph, { className: "size-[20px]", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxs262("div", { className: "flex min-w-0 flex-1 flex-col gap-[4px]", children: [
        title && /* @__PURE__ */ jsx342("span", { className: "text-body-sm-medium text-text-primary", children: title }),
        description && /* @__PURE__ */ jsx342("span", { className: "text-caption-md text-text-secondary", children: description }),
        children
      ] }),
      actions && /* @__PURE__ */ jsx342("div", { className: "flex shrink-0 items-center gap-[6px]", children: actions }),
      onDismiss && /* @__PURE__ */ jsx342(
        "button",
        {
          type: "button",
          onClick: onDismiss,
          "aria-label": "Dismiss",
          className: "inline-flex size-[24px] shrink-0 items-center justify-center rounded-[4px] text-icon outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          children: /* @__PURE__ */ jsx342(Cancel01, { className: "size-[16px]", "aria-hidden": "true" })
        }
      )
    ] });
  }
);
Banner.displayName = "Banner";
var snackbarVariants = cva2(
  "flex items-center gap-[6px] rounded-[8px] bg-bg-inverse py-[6px] pl-[8px] pr-[6px] shadow-3",
  {
    variants: {
      severity: { info: "", success: "", warning: "", error: "" }
    },
    defaultVariants: { severity: "info" }
  }
);
var badge2 = {
  info: "bg-icon-blue",
  success: "bg-icon-success",
  warning: "bg-icon-warning",
  error: "bg-icon-error"
};
var accent3 = {
  info: "text-icon-blue",
  success: "text-icon-success",
  warning: "text-icon-warning",
  error: "text-icon-error"
};
var glyph4 = {
  info: InformationCircle,
  success: CheckmarkCircle02,
  warning: AlertCircle,
  error: AlertCircle
};
var Snackbar = React33.forwardRef(
  ({ className, severity = "info", action, onActionClick, onDismiss, hideIcon, children, ...props }, ref) => {
    const Glyph = glyph4[severity];
    return /* @__PURE__ */ jsxs272("div", { ref, role: "status", "aria-live": "polite", className: cn(snackbarVariants({ severity }), className), ...props, children: [
      !hideIcon && /* @__PURE__ */ jsx352("span", { className: cn("inline-flex size-[20px] shrink-0 items-center justify-center rounded-full", badge2[severity]), children: /* @__PURE__ */ jsx352(Glyph, { className: "size-[14px] text-icon-on-brand", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx352("span", { className: "min-w-0 flex-1 text-body-sm-medium text-text-inverse", children }),
      action && /* @__PURE__ */ jsx352(
        "button",
        {
          type: "button",
          onClick: onActionClick,
          className: cn(
            "shrink-0 rounded-[4px] px-[4px] text-body-sm-medium outline-none",
            "transition-colors duration-interaction ease-decelerate hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
            accent3[severity]
          ),
          children: action
        }
      ),
      onDismiss && /* @__PURE__ */ jsx352(
        "button",
        {
          type: "button",
          onClick: onDismiss,
          "aria-label": "Dismiss",
          className: "inline-flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-text-inverse outline-none transition-opacity duration-interaction ease-decelerate hover:opacity-70 focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          children: /* @__PURE__ */ jsx352(Cancel01, { className: "size-[14px]", "aria-hidden": "true" })
        }
      )
    ] });
  }
);
Snackbar.displayName = "Snackbar";
var badge3 = {
  primary: "bg-bg-brand",
  gray: "bg-icon-secondary",
  success: "bg-icon-success",
  warning: "bg-icon-warning",
  error: "bg-icon-error"
};
var glyph5 = {
  primary: InformationCircle,
  gray: InformationCircle,
  success: CheckmarkCircle02,
  warning: AlertCircle,
  error: AlertCircle
};
var Toast = React34.forwardRef(
  ({ className, leading = "primary", title, description, actions, media, progress = 0, onDismiss, children, ...props }, ref) => {
    const isIcon = leading in badge3;
    const Glyph = isIcon ? glyph5[leading] : null;
    const body = /* @__PURE__ */ jsxs282("div", { className: "flex min-w-0 flex-1 flex-col gap-[4px]", children: [
      title && /* @__PURE__ */ jsx362("span", { className: "text-body-md-medium text-text-primary", children: title }),
      description && /* @__PURE__ */ jsx362("span", { className: "text-body-sm text-text-secondary", children: description }),
      children,
      actions && /* @__PURE__ */ jsx362("div", { className: "mt-[4px] flex items-center gap-[8px]", children: actions })
    ] });
    const dismiss = onDismiss && /* @__PURE__ */ jsx362(
      "button",
      {
        type: "button",
        onClick: onDismiss,
        "aria-label": "Dismiss",
        className: "inline-flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-icon outline-none hover:text-text-primary focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
        children: /* @__PURE__ */ jsx362(Cancel01, { className: "size-[14px]", "aria-hidden": "true" })
      }
    );
    const shell2 = cn(
      "w-full rounded-[12px] border border-border-subtle bg-bg-surface-raised p-[14px] pl-[16px] shadow-3",
      className
    );
    if (leading === "progress") {
      return /* @__PURE__ */ jsxs282("div", { ref, role: "status", "aria-live": "polite", className: cn(shell2, "flex flex-col gap-[12px]"), ...props, children: [
        /* @__PURE__ */ jsxs282("div", { className: "flex items-start gap-[12px]", children: [
          body,
          dismiss
        ] }),
        /* @__PURE__ */ jsx362("div", { className: "h-[6px] w-full overflow-hidden rounded-[4px] bg-bg-subtle", children: /* @__PURE__ */ jsx362(
          "div",
          {
            className: "h-full rounded-[4px] bg-bg-brand transition-[width] duration-normal ease-standard",
            style: { width: `${Math.min(100, Math.max(0, progress))}%` }
          }
        ) })
      ] });
    }
    return /* @__PURE__ */ jsxs282("div", { ref, role: "status", "aria-live": "polite", className: cn(shell2, "flex items-center gap-[12px]"), ...props, children: [
      isIcon && Glyph && /* @__PURE__ */ jsx362("span", { className: cn("inline-flex size-[20px] shrink-0 items-center justify-center rounded-full", badge3[leading]), children: /* @__PURE__ */ jsx362(Glyph, { className: "size-[14px] text-icon-on-brand", "aria-hidden": "true" }) }),
      leading === "image" && /* @__PURE__ */ jsx362("span", { className: "inline-flex size-[40px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-bg-subtle", children: media }),
      leading === "avatar" && /* @__PURE__ */ jsx362("span", { className: "shrink-0", children: media }),
      leading === "none" && /* @__PURE__ */ jsx362("span", { className: "w-px shrink-0", "aria-hidden": "true" }),
      body,
      dismiss
    ] });
  }
);
Toast.displayName = "Toast";
var statusBlockVariants = cva2(
  "inline-flex items-center gap-[6px] rounded-[6px] border border-border bg-bg-subtle px-[8px] py-[6px]",
  {
    variants: { status: { operational: "", degraded: "", outage: "", maintenance: "" } },
    defaultVariants: { status: "operational" }
  }
);
var dot = {
  operational: "bg-icon-success",
  degraded: "bg-icon-warning",
  outage: "bg-icon-error",
  maintenance: "bg-icon-blue"
};
var StatusBlock = React35.forwardRef(
  ({ className, status = "operational", label, detail, ...props }, ref) => /* @__PURE__ */ jsxs29("div", { ref, role: "status", className: cn(statusBlockVariants({ status }), className), ...props, children: [
    /* @__PURE__ */ jsx372("span", { className: "inline-flex size-[16px] shrink-0 items-center justify-center", "aria-hidden": "true", children: /* @__PURE__ */ jsx372("span", { className: cn("size-[10px] rounded-full", dot[status]) }) }),
    /* @__PURE__ */ jsxs29("span", { className: "flex min-w-0 flex-col gap-[2px]", children: [
      /* @__PURE__ */ jsx372("span", { className: "text-body-sm-medium text-text-primary", children: label }),
      detail && /* @__PURE__ */ jsx372("span", { className: "text-caption-md text-text-secondary", children: detail })
    ] })
  ] })
);
StatusBlock.displayName = "StatusBlock";
var badgeTone = {
  neutral: "bg-bg-subtle",
  error: "bg-bg-error-subtle",
  success: "bg-bg-success-subtle",
  warning: "bg-bg-warning-subtle",
  info: "bg-bg-info-subtle",
  brand: "bg-bg-brand-subtle"
};
var glyphTone = {
  inherit: "text-icon",
  error: "text-icon-error",
  success: "text-icon-success",
  warning: "text-icon-warning",
  blue: "text-icon-blue",
  secondary: "text-icon-secondary"
};
var statePresets = {
  empty: { icon: Inbox, badge: "neutral", glyph: "inherit" },
  error: { icon: AlertCircle, badge: "error", glyph: "error" },
  success: { icon: CheckmarkCircle02, badge: "success", glyph: "success" },
  "no-results": { icon: SearchRemove, badge: "neutral", glyph: "inherit" },
  "permission-denied": { icon: Lock, badge: "warning", glyph: "warning" },
  "no-connection": { icon: AlertCircle, badge: "warning", glyph: "warning" },
  maintenance: { icon: Wrench01, badge: "info", glyph: "blue" },
  "not-found": { icon: AlertCircle, badge: "brand", glyph: "secondary" },
  "coming-soon": { icon: Clock02, badge: "brand", glyph: "secondary" },
  "server-error": { icon: CloudServer, badge: "error", glyph: "error" }
};
var StateView = React36.forwardRef(
  ({ className, preset = "empty", icon, badgeTone: badgeOverride, glyphTone: glyphOverride, title, description, actions, children, ...props }, ref) => {
    const p = statePresets[preset];
    const Glyph = p.icon;
    const badge4 = badgeOverride ?? p.badge;
    const glyph6 = glyphOverride ?? p.glyph;
    return /* @__PURE__ */ jsxs30(
      "div",
      {
        ref,
        className: cn("flex w-full flex-col items-center gap-[10px] bg-bg-surface p-[12px] text-center", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx382("span", { className: cn("inline-flex size-[80px] items-center justify-center rounded-full", badgeTone[badge4]), children: icon ?? /* @__PURE__ */ jsx382(Glyph, { className: cn("size-[40px]", glyphTone[glyph6]) }) }),
          /* @__PURE__ */ jsxs30("div", { className: "flex flex-col items-center gap-[4px]", children: [
            title && /* @__PURE__ */ jsx382("span", { className: "text-heading-h3 text-text-primary", children: title }),
            description && /* @__PURE__ */ jsx382("span", { className: "text-body-sm text-text-secondary", children: description }),
            children
          ] }),
          actions && /* @__PURE__ */ jsx382("div", { className: "flex items-center gap-[6px]", children: actions })
        ]
      }
    );
  }
);
StateView.displayName = "StateView";
var loadingStateVariants = cva2("flex items-center bg-bg-surface", {
  variants: {
    variant: {
      page: "flex-col gap-[16px] p-[48px]",
      inline: "flex-col gap-[16px] p-[32px]",
      compact: "flex-row gap-[10px] p-[20px]"
    }
  },
  defaultVariants: { variant: "page" }
});
var spinnerSize2 = { page: "xl", inline: "lg", compact: "md" };
var labelClass3 = {
  page: "text-heading-h4 text-text-primary",
  inline: "text-heading-h6 text-text-primary",
  compact: "text-body-sm-medium text-text-primary"
};
var LoadingState = React37.forwardRef(
  ({ className, variant = "page", label = "Loading", description, ...props }, ref) => /* @__PURE__ */ jsxs31(
    "div",
    {
      ref,
      role: "status",
      "aria-live": "polite",
      className: cn(loadingStateVariants({ variant }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsx392(Spinner2, { size: spinnerSize2[variant] }),
        label && /* @__PURE__ */ jsx392("span", { className: labelClass3[variant], children: label }),
        description && /* @__PURE__ */ jsx392("span", { className: "text-body-md text-text-tertiary", children: description })
      ]
    }
  )
);
LoadingState.displayName = "LoadingState";
var shell = "bg-bg-surface";
var bordered = "border border-border-subtle";
var SkeletonLayout = React38.forwardRef(
  ({ className, layout = "card", animate = true, ...props }, ref) => {
    const line = (w, h) => /* @__PURE__ */ jsx402(Skeleton, { shape: "line", animate, className: cn(w, h) });
    if (layout === "list-item") {
      return /* @__PURE__ */ jsxs322("div", { ref, "aria-hidden": "true", className: cn(shell, bordered, "flex w-[480px] items-center gap-[12px] rounded-[6px] px-[16px] py-[12px]", className), ...props, children: [
        /* @__PURE__ */ jsx402(Skeleton, { shape: "circle", animate, className: "size-[32px] shrink-0" }),
        /* @__PURE__ */ jsxs322("div", { className: "flex flex-1 flex-col gap-[8px]", children: [
          line("w-full", "h-[10px]"),
          line("w-[60%]", "h-[8px]")
        ] }),
        /* @__PURE__ */ jsx402(Skeleton, { shape: "rectangle", animate, className: "size-[24px] shrink-0 rounded-[6px]" })
      ] });
    }
    if (layout === "article") {
      return /* @__PURE__ */ jsxs322("div", { ref, "aria-hidden": "true", className: cn(shell, bordered, "flex w-[640px] flex-col gap-[20px] rounded-[8px] p-[24px]", className), ...props, children: [
        /* @__PURE__ */ jsxs322("div", { className: "flex items-center gap-[10px]", children: [
          /* @__PURE__ */ jsx402(Skeleton, { shape: "circle", animate, className: "size-[32px]" }),
          line("w-[120px]", "h-[10px]")
        ] }),
        /* @__PURE__ */ jsxs322("div", { className: "flex flex-col gap-[12px]", children: [
          line("w-full", "h-[16px]"),
          line("w-[70%]", "h-[16px]")
        ] }),
        /* @__PURE__ */ jsxs322("div", { className: "flex flex-col gap-[10px]", children: [
          line("w-full", "h-[10px]"),
          line("w-full", "h-[10px]"),
          line("w-[85%]", "h-[10px]")
        ] }),
        /* @__PURE__ */ jsxs322("div", { className: "flex items-center gap-[8px]", children: [
          line("w-[80px]", "h-[8px]"),
          line("w-[80px]", "h-[8px]")
        ] })
      ] });
    }
    if (layout === "chart") {
      const bars = [70, 45, 90, 60, 80, 35];
      return /* @__PURE__ */ jsxs322("div", { ref, "aria-hidden": "true", className: cn(shell, "flex w-[336px] flex-col gap-[16px] rounded-[8px] p-[20px]", className), ...props, children: [
        /* @__PURE__ */ jsxs322("div", { className: "flex items-center gap-[12px]", children: [
          line("w-[48px]", "h-[8px]"),
          line("w-[48px]", "h-[8px]"),
          line("w-[48px]", "h-[8px]")
        ] }),
        /* @__PURE__ */ jsx402("div", { className: "flex h-[152px] items-end gap-[12px]", children: bars.map((h, i) => /* @__PURE__ */ jsx402(Skeleton, { shape: "rectangle", animate, className: "w-full rounded-[4px]", style: { height: `${h}%` } }, i)) }),
        /* @__PURE__ */ jsx402("div", { className: "flex items-center gap-[12px]", children: bars.map((_, i) => /* @__PURE__ */ jsx402(Skeleton, { shape: "line", animate, className: "h-[8px] w-full" }, i)) })
      ] });
    }
    return /* @__PURE__ */ jsxs322("div", { ref, "aria-hidden": "true", className: cn(shell, bordered, "flex w-[360px] flex-col gap-[16px] rounded-[8px] p-[20px]", className), ...props, children: [
      /* @__PURE__ */ jsx402(Skeleton, { shape: "rectangle", animate, className: "h-[160px] w-full rounded-[8px]" }),
      /* @__PURE__ */ jsxs322("div", { className: "flex flex-col gap-[10px]", children: [
        line("w-full", "h-[14px]"),
        line("w-[60%]", "h-[14px]")
      ] }),
      /* @__PURE__ */ jsxs322("div", { className: "flex flex-col gap-[8px]", children: [
        line("w-full", "h-[8px]"),
        line("w-[80%]", "h-[8px]")
      ] }),
      /* @__PURE__ */ jsxs322("div", { className: "flex items-center gap-[12px]", children: [
        line("w-[72px]", "h-[24px]"),
        line("w-[72px]", "h-[24px]")
      ] })
    ] });
  }
);
SkeletonLayout.displayName = "SkeletonLayout";
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React39.useLayoutEffect : React39.useEffect;
var item = {
  fill: {
    sm: "h-[36px] rounded-[6px] px-[12px] py-[8px] text-body-sm-medium",
    md: "h-[38px] rounded-[8px] px-[14px] py-[9px] text-body-sm-medium",
    lg: "h-[44px] rounded-[8px] px-[16px] py-[10px] text-body-md-medium"
  },
  line: {
    sm: "h-[36px] px-[4px] py-[8px] text-body-sm-medium",
    md: "h-[40px] px-[4px] py-[10px] text-body-sm-medium",
    lg: "h-[48px] px-[4px] py-[12px] text-body-md-medium"
  },
  toggle: {
    sm: "h-[32px] rounded-[6px] px-[12px] py-[6px] text-body-sm-medium",
    md: "h-[36px] rounded-[8px] px-[14px] py-[8px] text-body-sm-medium",
    lg: "h-[44px] rounded-[8px] px-[16px] py-[10px] text-body-md-medium"
  }
};
var state = {
  fill: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "text-text-inverse",
    disabled: "bg-bg-subtle text-text-disabled"
  },
  line: {
    idle: "text-text-tertiary border-b-[2px] border-transparent hover:border-border-subtle hover:text-text-primary",
    active: "text-text-brand border-b-[2px] border-transparent",
    disabled: "text-text-disabled border-b-[2px] border-transparent"
  },
  toggle: {
    idle: "text-text-tertiary hover:bg-bg-subtle hover:text-text-primary",
    active: "text-text-primary",
    disabled: "text-text-disabled"
  }
};
var indicator = {
  fill: { sm: "rounded-[6px]", md: "rounded-[8px]", lg: "rounded-[8px]" },
  toggle: { sm: "rounded-[6px]", md: "rounded-[8px]", lg: "rounded-[8px]" },
  line: { sm: "", md: "", lg: "" }
};
var indicatorPaint = {
  fill: "bg-bg-brand",
  line: "bg-border-brand",
  toggle: "bg-bg-surface border border-border-subtle"
};
var container = {
  fill: "h-[38px] gap-0",
  line: "h-[40px] gap-0",
  "line-full": "h-[40px] gap-0 border-b border-border-subtle",
  toggle: "h-[44px] gap-[4px] rounded-[12px] bg-bg-subtle p-[4px]"
};
var itemStyleFor = (v) => v === "line-full" ? "line" : v;
var TabsContext = React40.createContext({ variant: "fill", size: "md" });
var Tabs = React40.forwardRef(
  ({ className, variant = "fill", size: size4 = "md", fill, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [inner, setInner] = React40.useState(defaultValue);
    const current = value ?? inner;
    const change = (v) => {
      if (value === void 0) setInner(v);
      onValueChange?.(v);
    };
    const style = itemStyleFor(variant);
    const list = React40.useRef(null);
    const [box, setBox] = React40.useState(null);
    const placed = React40.useRef(false);
    useIsomorphicLayoutEffect(() => {
      const el = list.current;
      if (!el) return;
      const measure = () => {
        const tab = el.querySelector('[role="tab"][aria-selected="true"]');
        setBox(
          tab ? { left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight } : null
        );
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      el.querySelectorAll('[role="tab"]').forEach((t) => ro.observe(t));
      return () => ro.disconnect();
    }, [current, variant, size4, fill, children]);
    React40.useEffect(() => {
      if (box) placed.current = true;
    }, [box]);
    return /* @__PURE__ */ jsx412(TabsContext.Provider, { value: { variant, size: size4, value: current, onValueChange: change }, children: /* @__PURE__ */ jsxs33(
      "div",
      {
        ref: mergeRefs(ref, list),
        role: "tablist",
        className: cn("relative flex items-center", container[variant], fill && "w-full", className),
        ...props,
        children: [
          box && /* @__PURE__ */ jsx412(
            "span",
            {
              "aria-hidden": "true",
              className: cn(
                "pointer-events-none absolute",
                indicatorPaint[style],
                indicator[style][size4],
                placed.current && "transition-[left,top,width,height] " + motionSpring
              ),
              style: style === "line" ? { left: box.left, width: box.width, top: box.top + box.height - 2, height: 2 } : { left: box.left, top: box.top, width: box.width, height: box.height }
            }
          ),
          children
        ]
      }
    ) });
  }
);
Tabs.displayName = "Tabs";
var Tab = React40.forwardRef(
  ({ className, value, counter, fill, disabled, children, onClick, ...props }, ref) => {
    const ctx = React40.useContext(TabsContext);
    const style = itemStyleFor(ctx.variant);
    const selected = ctx.value === value;
    return /* @__PURE__ */ jsxs33(
      "button",
      {
        ref,
        type: "button",
        role: "tab",
        "aria-selected": selected,
        disabled,
        onClick: (e) => {
          ctx.onValueChange?.(value);
          onClick?.(e);
        },
        className: cn(
          // `relative` puts the label above the absolutely positioned indicator;
          // it changes no geometry.
          "relative inline-flex items-center justify-center gap-[6px] whitespace-nowrap font-sans",
          "outline-none " + motionPress,
          "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
          "disabled:pointer-events-none",
          item[style][ctx.size],
          disabled ? state[style].disabled : selected ? state[style].active : state[style].idle,
          fill && "flex-1",
          className
        ),
        ...props,
        children: [
          children,
          counter !== void 0 && /* @__PURE__ */ jsx412("span", { className: "inline-flex h-[20px] min-w-[19px] items-center justify-center rounded-full bg-bg-subtle px-[6px] text-caption-sm text-text-secondary", children: counter })
        ]
      }
    );
  }
);
Tab.displayName = "Tab";
var Breadcrumb = React41.forwardRef(
  ({ className, items, separator = "/", ...props }, ref) => /* @__PURE__ */ jsx422("nav", { ref, "aria-label": "Breadcrumb", className: cn("flex items-center gap-[8px]", className), ...props, children: items.map((item2, i) => {
    const last = i === items.length - 1;
    const content = last ? /* @__PURE__ */ jsx422("span", { "aria-current": "page", className: "text-body-sm-medium text-text-primary", children: item2.label }) : item2.href || item2.onClick ? /* @__PURE__ */ jsx422(
      "a",
      {
        href: item2.href,
        onClick: item2.onClick,
        className: "rounded-[2px] text-body-sm text-text-tertiary outline-none transition-colors duration-interaction ease-decelerate hover:text-text-primary hover:underline focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
        children: item2.label
      }
    ) : /* @__PURE__ */ jsx422("span", { className: "text-body-sm text-text-tertiary", children: item2.label });
    return /* @__PURE__ */ jsxs34(React41.Fragment, { children: [
      content,
      !last && /* @__PURE__ */ jsx422("span", { "aria-hidden": "true", className: "text-body-sm text-text-tertiary", children: separator })
    ] }, i);
  }) })
);
Breadcrumb.displayName = "Breadcrumb";
var cell = {
  sm: "size-[32px] rounded-[8px] text-body-sm-medium",
  md: "size-[40px] rounded-[8px] text-body-md-medium"
};
var gap = { sm: "gap-[4px]", md: "gap-[6px]" };
function paginationRange(current, total, window2 = 1) {
  const pages = /* @__PURE__ */ new Set([1, total]);
  for (let i = current - window2; i <= current + window2; i++) if (i >= 1 && i <= total) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push("gap");
    out.push(p);
    prev = p;
  }
  return out;
}
var Pagination = React422.forwardRef(
  ({ className, size: size4 = "sm", page, pageCount, onPageChange, siblingCount = 1, ...props }, ref) => {
    const items = paginationRange(page, pageCount, siblingCount);
    const step = (to) => onPageChange?.(Math.min(pageCount, Math.max(1, to)));
    const base = cn(
      "inline-flex items-center justify-center font-sans outline-none",
      motionPress,
      "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
      "disabled:pointer-events-none disabled:text-text-disabled",
      cell[size4]
    );
    return /* @__PURE__ */ jsxs35("nav", { ref, "aria-label": "Pagination", className: cn("flex items-center", gap[size4], className), ...props, children: [
      /* @__PURE__ */ jsx432(
        "button",
        {
          type: "button",
          "aria-label": "Previous page",
          disabled: page <= 1,
          onClick: () => step(page - 1),
          className: cn(base, "text-text-primary hover:bg-bg-subtle"),
          children: /* @__PURE__ */ jsx432(ArrowDown01Round, { className: "size-[16px] rotate-90", "aria-hidden": "true" })
        }
      ),
      items.map(
        (it, i) => it === "gap" ? /* @__PURE__ */ jsx432("span", { "aria-hidden": "true", className: cn(base, "text-text-tertiary"), children: "\u2026" }, `gap-${i}`) : /* @__PURE__ */ jsx432(
          "button",
          {
            type: "button",
            "aria-current": it === page ? "page" : void 0,
            onClick: () => step(it),
            className: cn(
              base,
              it === page ? "bg-bg-brand-subtle text-text-brand" : "text-text-primary hover:bg-bg-subtle"
            ),
            children: it
          },
          it
        )
      ),
      /* @__PURE__ */ jsx432(
        "button",
        {
          type: "button",
          "aria-label": "Next page",
          disabled: page >= pageCount,
          onClick: () => step(page + 1),
          className: cn(base, "text-text-primary hover:bg-bg-subtle"),
          children: /* @__PURE__ */ jsx432(ArrowDown01Round, { className: "size-[16px] -rotate-90", "aria-hidden": "true" })
        }
      )
    ] });
  }
);
Pagination.displayName = "Pagination";
var navItemSurface = (selected, disabled) => cn(
  "flex h-[40px] w-full items-center gap-[10px] rounded-[6px] px-[12px] text-left",
  "outline-none " + motionPress,
  "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
  disabled ? "pointer-events-none" : selected ? "bg-bg-brand-subtle" : "hover:bg-bg-subtle"
);
var NavItem = React43.forwardRef(
  ({ className, selected, disabled, dot: dot2, leading, label, description, trailing, href, as, ...props }, ref) => {
    const Comp = as ?? (href ? "a" : "button");
    const tone = disabled ? "text-text-disabled" : selected ? "text-text-brand" : void 0;
    return /* @__PURE__ */ jsxs36(
      Comp,
      {
        ref,
        href,
        type: Comp === "button" ? "button" : void 0,
        "aria-current": selected ? "page" : void 0,
        "aria-disabled": disabled || void 0,
        className: cn(navItemSurface(selected, disabled), className),
        ...props,
        children: [
          dot2 && /* @__PURE__ */ jsx442("span", { className: "flex size-[8px] shrink-0 items-center justify-center", children: dot2 }),
          leading && /* @__PURE__ */ jsx442("span", { className: "inline-flex size-[20px] shrink-0 items-center justify-center [&>svg]:size-[20px]", children: leading }),
          /* @__PURE__ */ jsxs36("span", { className: "flex min-w-0 flex-1 flex-col gap-[2px]", children: [
            /* @__PURE__ */ jsx442("span", { className: cn("truncate text-body-sm-medium", tone ?? "text-text-primary"), children: label }),
            description && /* @__PURE__ */ jsx442("span", { className: cn("truncate text-caption-md", tone ?? "text-text-secondary"), children: description })
          ] }),
          trailing && /* @__PURE__ */ jsx442("span", { className: "flex shrink-0 items-center gap-[8px]", children: trailing })
        ]
      }
    );
  }
);
NavItem.displayName = "NavItem";
var SidebarItem = React44.forwardRef(
  ({ className, items, expanded, defaultExpanded, onExpandedChange, trailing, disabled, onClick, ...props }, ref) => {
    const [inner, setInner] = React44.useState(defaultExpanded ?? false);
    const open = expanded ?? inner;
    const hasChildren = Boolean(items?.length);
    const toggle = () => {
      if (!hasChildren) return;
      if (expanded === void 0) setInner(!open);
      onExpandedChange?.(!open);
    };
    return /* @__PURE__ */ jsxs37("div", { ref, className: cn("flex w-full flex-col gap-[2px]", className), children: [
      /* @__PURE__ */ jsx452(
        NavItem,
        {
          ...props,
          disabled,
          onClick: (e) => {
            toggle();
            onClick?.(e);
          },
          "aria-expanded": hasChildren ? open : void 0,
          trailing: /* @__PURE__ */ jsxs37(Fragment32, { children: [
            trailing,
            hasChildren && /* @__PURE__ */ jsx452(
              ArrowDown01Round,
              {
                className: cn("size-[16px] text-icon transition-transform duration-interaction ease-decelerate", open && "rotate-180"),
                "aria-hidden": "true"
              }
            )
          ] })
        }
      ),
      hasChildren && open && /* @__PURE__ */ jsx452("div", { className: "flex flex-col gap-[2px]", children: items.map((sub, i) => {
        const Comp = sub.href ? "a" : "button";
        return /* @__PURE__ */ jsx452(
          Comp,
          {
            href: sub.href,
            type: sub.href ? void 0 : "button",
            onClick: sub.onClick,
            "aria-current": sub.selected ? "page" : void 0,
            "aria-disabled": sub.disabled || void 0,
            className: cn(
              // 40px of left padding is the indent that lines the label
              // up under the parent's, past its 20px icon.
              "flex h-[36px] w-full items-center rounded-[6px] pl-[40px] pr-[12px] text-left",
              "text-body-sm-medium outline-none transition-colors duration-interaction ease-decelerate",
              "focus-visible:shadow-[0_0_0_3px_var(--color-focus-halo)]",
              sub.disabled ? "pointer-events-none text-text-disabled" : sub.selected ? "bg-bg-brand-subtle text-text-brand" : "text-text-primary hover:bg-bg-subtle"
            ),
            children: /* @__PURE__ */ jsx452("span", { className: "truncate", children: sub.label })
          },
          i
        );
      }) })
    ] });
  }
);
SidebarItem.displayName = "SidebarItem";
var DropdownMenu = React45.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx46(
    "div",
    {
      ref,
      role: "menu",
      className: cn(
        "flex w-[280px] flex-col gap-[2px] rounded-[12px] border border-border bg-bg-surface p-[4px] shadow-3",
        className
      ),
      ...props,
      children
    }
  )
);
DropdownMenu.displayName = "DropdownMenu";
var DropdownMenuItem = React45.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx46(NavItem, { ref, role: "menuitem", ...props })
);
DropdownMenuItem.displayName = "DropdownMenuItem";
var DropdownMenuSeparator = ({ className, ...props }) => /* @__PURE__ */ jsx46("div", { role: "separator", className: cn("my-[4px] h-px bg-border-subtle", className), ...props });
var DropdownMenuLabel = ({ className, ...props }) => /* @__PURE__ */ jsx46("div", { className: cn("px-[12px] py-[6px] text-overline-md text-text-tertiary", className), ...props });

// ../tokens/dist/index.js
var violet = {
  50: "#f8f5ff",
  100: "#ede5ff",
  200: "#d9cafe",
  300: "#bb96fc",
  400: "#ab60f7",
  500: "#9126d9",
  600: "#7c2db9",
  // brand
  700: "#6a1fa4",
  800: "#55168a",
  900: "#3e0e68",
  950: "#280850"
};
var blue = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  // brand secondary
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
  950: "#172554"
};
var gray = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0c121d",
  950: "#020513"
};
var green = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d"
};
var red = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d"
};
var yellow = {
  50: "#fefce8",
  100: "#fef9c3",
  200: "#fef08a",
  400: "#facc15",
  500: "#eab308",
  600: "#ca8a04",
  700: "#a16207",
  800: "#854d0e",
  900: "#713f12"
};
var orange = {
  50: "#fff7ed",
  100: "#ffedd5",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c"
};
var white = "#ffffff";
var black = "#000000";
var primitives = {
  violet,
  blue,
  gray,
  green,
  red,
  yellow,
  orange,
  white,
  black
};
var semanticColors = {
  // ── Backgrounds ────────────────────────────────────────────────
  "bg.page": { light: "#f8fafc", dark: "#020513" },
  "bg.surface": { light: "#ffffff", dark: "#0c121d" },
  "bg.surface-raised": { light: "#f1f5f9", dark: "#1e293b" },
  "bg.subtle": { light: "#f1f5f9", dark: "#1e293b" },
  "bg.inverse": { light: "#0c121d", dark: "#f8fafc" },
  "bg.overlay": { light: "#0c121d", dark: "#020513" },
  "bg.brand": { light: "#7c2db9", dark: "#9126d9" },
  "bg.brand-hover": { light: "#6a1fa4", dark: "#ab60f7" },
  "bg.brand-pressed": { light: "#55168a", dark: "#bb96fc" },
  "bg.brand-subtle": { light: "#f8f5ff", dark: "#280850" },
  "bg.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "bg.blue-subtle": { light: "#eff6ff", dark: "#172554" },
  "bg.success": { light: "#22c55e", dark: "#4ade80" },
  "bg.success-subtle": { light: "#f0fdf4", dark: "#14532d" },
  "bg.warning": { light: "#eab308", dark: "#facc15" },
  "bg.warning-subtle": { light: "#fefce8", dark: "#713f12" },
  "bg.error": { light: "#ef4444", dark: "#f87171" },
  "bg.error-subtle": { light: "#fef2f2", dark: "#7f1d1d" },
  "bg.info": { light: "#3b82f6", dark: "#60a5fa" },
  "bg.info-subtle": { light: "#eff6ff", dark: "#172554" },
  "bg.ai": { light: "#7c2db9", dark: "#9126d9" },
  "bg.ai-subtle": { light: "#f8f5ff", dark: "#280850" },
  // ── Text ───────────────────────────────────────────────────────
  "text.primary": { light: "#0c121d", dark: "#f8fafc" },
  "text.secondary": { light: "#334155", dark: "#cbd5e1" },
  "text.tertiary": { light: "#475569", dark: "#94a3b8" },
  "text.disabled": { light: "#cbd5e1", dark: "#475569" },
  "text.inverse": { light: "#ffffff", dark: "#0c121d" },
  "text.on-brand": { light: "#ffffff", dark: "#ffffff" },
  "text.brand": { light: "#7c2db9", dark: "#bb96fc" },
  "text.brand-hover": { light: "#6a1fa4", dark: "#bb96fc" },
  "text.blue": { light: "#2563eb", dark: "#93c5fd" },
  "text.link": { light: "#1d4ed8", dark: "#60a5fa" },
  "text.success": { light: "#15803d", dark: "#4ade80" },
  "text.warning": { light: "#a16207", dark: "#facc15" },
  "text.error": { light: "#dc2626", dark: "#f87171" },
  "text.error-hover": { light: "#991b1b", dark: "#fecaca" },
  "text.ai": { light: "#7c2db9", dark: "#d9cafe" },
  // ── Borders ────────────────────────────────────────────────────
  "border.default": { light: "#e2e8f0", dark: "#1e293b" },
  "border.strong": { light: "#cbd5e1", dark: "#475569" },
  "border.subtle": { light: "#f1f5f9", dark: "#334155" },
  "border.focus": { light: "#7c2db9", dark: "#ab60f7" },
  "border.focus-on-fill": { light: "#3e0e68", dark: "#d9cafe" },
  "border.focus-danger": { light: "#7f1d1d", dark: "#fecaca" },
  "border.focus-inverse": { light: "#d9cafe", dark: "#d9cafe" },
  "border.error": { light: "#ef4444", dark: "#f87171" },
  "border.brand": { light: "#7c2db9", dark: "#ab60f7" },
  "border.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "border.ai": { light: "#9126d9", dark: "#ab60f7" },
  "border.success": { light: "#22c55e", dark: "#4ade80" },
  "border.warning": { light: "#eab308", dark: "#facc15" },
  // ── Icons ──────────────────────────────────────────────────────
  "icon.default": { light: "#475569", dark: "#94a3b8" },
  "icon.secondary": { light: "#64748b", dark: "#cbd5e1" },
  "icon.disabled": { light: "#cbd5e1", dark: "#475569" },
  "icon.on-brand": { light: "#ffffff", dark: "#ffffff" },
  "icon.brand": { light: "#7c2db9", dark: "#bb96fc" },
  "icon.blue": { light: "#3b82f6", dark: "#60a5fa" },
  "icon.success": { light: "#16a34a", dark: "#4ade80" },
  "icon.warning": { light: "#ca8a04", dark: "#facc15" },
  "icon.error": { light: "#ef4444", dark: "#f87171" },
  "icon.ai": { light: "#9126d9", dark: "#bb96fc" }
};
var componentColors = {
  // ── Button ─────────────────────────────────────────────────────
  "button.primary-bg": { light: "#7c2db9", dark: "#9126d9" },
  "button.primary-bg-hover": { light: "#6a1fa4", dark: "#7c2db9" },
  "button.primary-bg-pressed": { light: "#55168a", dark: "#6a1fa4" },
  "button.primary-text": { light: "#ffffff", dark: "#ffffff" },
  "button.secondary-bg": { light: "#ffffff", dark: "#0c121d" },
  "button.secondary-border": { light: "#e2e8f0", dark: "#1e293b" },
  "button.secondary-text": { light: "#0c121d", dark: "#f8fafc" },
  "button.ghost-text": { light: "#0c121d", dark: "#f8fafc" },
  "button.ghost-bg-hover": { light: "#f1f5f9", dark: "#1e293b" },
  "button.danger-bg": { light: "#dc2626", dark: "#dc2626" },
  "button.danger-text": { light: "#ffffff", dark: "#ffffff" },
  "button.disabled-bg": { light: "#f1f5f9", dark: "#1e293b" },
  "button.disabled-text": { light: "#cbd5e1", dark: "#475569" },
  "button.danger-bg-hover": { light: "#b91c1c", dark: "#b91c1c" },
  "button.danger-bg-pressed": { light: "#991b1b", dark: "#991b1b" },
  "button.secondary-bg-hover": { light: "#f1f5f9", dark: "#1e293b" },
  "button.secondary-bg-pressed": { light: "#e2e8f0", dark: "#334155" },
  "button.secondary-border-hover": { light: "#94a3b8", dark: "#64748b" },
  "button.tonal-bg": { light: "#f8f5ff", dark: "#280850" },
  "button.tonal-bg-hover": { light: "#ede5ff", dark: "#3e0e68" },
  "button.tonal-bg-pressed": { light: "#d9cafe", dark: "#55168a" },
  "button.tonal-text": { light: "#6a1fa4", dark: "#d9cafe" },
  "button.outline-bg-hover": { light: "#ede5ff", dark: "#3e0e68" },
  "button.outline-bg-pressed": { light: "#d9cafe", dark: "#55168a" },
  "button.inverse-bg": { light: "#ffffff", dark: "#ffffff" },
  "button.inverse-bg-hover": { light: "#f1f5f9", dark: "#f1f5f9" },
  "button.inverse-bg-pressed": { light: "#e2e8f0", dark: "#e2e8f0" },
  "button.inverse-text": { light: "#0c121d", dark: "#0c121d" },
  // ── Input ──────────────────────────────────────────────────────
  "input.bg": { light: "#ffffff", dark: "#0c121d" },
  "input.bg-disabled": { light: "#f1f5f9", dark: "#1e293b" },
  "input.border": { light: "#e2e8f0", dark: "#1e293b" },
  "input.border-hover": { light: "#cbd5e1", dark: "#475569" },
  "input.border-focus": { light: "#7c2db9", dark: "#ab60f7" },
  "input.border-error": { light: "#ef4444", dark: "#f87171" },
  "input.border-disabled": { light: "#f1f5f9", dark: "#334155" },
  "input.text": { light: "#0c121d", dark: "#f8fafc" },
  "input.placeholder": { light: "#475569", dark: "#94a3b8" },
  "input.label": { light: "#334155", dark: "#cbd5e1" },
  "input.helper": { light: "#475569", dark: "#94a3b8" },
  "input.error-text": { light: "#b91c1c", dark: "#f87171" },
  // ── Badge ──────────────────────────────────────────────────────
  "badge.brand-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "badge.brand-text": { light: "#7c2db9", dark: "#7c2db9" },
  "badge.blue-bg": { light: "#eff6ff", dark: "#eff6ff" },
  "badge.blue-text": { light: "#2563eb", dark: "#2563eb" },
  "badge.success-bg": { light: "#f0fdf4", dark: "#f0fdf4" },
  "badge.success-text": { light: "#15803d", dark: "#15803d" },
  "badge.warning-bg": { light: "#fefce8", dark: "#fefce8" },
  "badge.warning-text": { light: "#a16207", dark: "#a16207" },
  "badge.error-bg": { light: "#fef2f2", dark: "#fef2f2" },
  "badge.error-text": { light: "#dc2626", dark: "#dc2626" },
  // ── Modal / Card / Tag / AI / Toast ────────────────────────────
  "modal.bg": { light: "#ffffff", dark: "#ffffff" },
  "modal.border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "modal.overlay": { light: "#0c121d", dark: "#0c121d" },
  "card.bg": { light: "#ffffff", dark: "#ffffff" },
  "card.border": { light: "#e2e8f0", dark: "#e2e8f0" },
  "card.bg-hover": { light: "#f1f5f9", dark: "#f1f5f9" },
  "tag.neutral-bg": { light: "#f1f5f9", dark: "#f1f5f9" },
  "tag.neutral-text": { light: "#475569", dark: "#475569" },
  "tag.brand-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "tag.brand-text": { light: "#7c2db9", dark: "#7c2db9" },
  "ai.prompt-bg": { light: "#ffffff", dark: "#ffffff" },
  "ai.prompt-border": { light: "#7c2db9", dark: "#9126d9" },
  "ai.badge-bg": { light: "#f8f5ff", dark: "#f8f5ff" },
  "ai.badge-text": { light: "#7c2db9", dark: "#7c2db9" },
  "toast.info-bg": { light: "#eff6ff", dark: "#eff6ff" },
  "toast.success-bg": { light: "#f0fdf4", dark: "#f0fdf4" },
  "toast.warning-bg": { light: "#fefce8", dark: "#fefce8" },
  "toast.error-bg": { light: "#fef2f2", dark: "#fef2f2" }
};
var glassColors = {
  "glass.fill-xs": { light: "rgba(255,255,255,0.30)", dark: "rgba(0,0,0,0.25)" },
  "glass.fill-sm": { light: "rgba(255,255,255,0.50)", dark: "rgba(0,0,0,0.40)" },
  "glass.fill-md": { light: "rgba(255,255,255,0.65)", dark: "rgba(0,0,0,0.55)" },
  "glass.fill-lg": { light: "rgba(255,255,255,0.75)", dark: "rgba(0,0,0,0.70)" },
  "glass.fill-xl": { light: "rgba(255,255,255,0.85)", dark: "rgba(0,0,0,0.80)" },
  "glass.fill-brand": { light: "rgba(124,45,185,0.15)", dark: "rgba(124,45,185,0.25)" },
  "glass.fill-ai": { light: "rgba(124,45,185,0.20)", dark: "rgba(124,45,185,0.30)" },
  "glass.border-subtle": { light: "rgba(255,255,255,0.10)", dark: "rgba(255,255,255,0.08)" },
  "glass.border-default": { light: "rgba(255,255,255,0.18)", dark: "rgba(255,255,255,0.15)" },
  "glass.border-strong": { light: "rgba(255,255,255,0.30)", dark: "rgba(255,255,255,0.25)" },
  "glass.highlight": { light: "rgba(255,255,255,0.40)", dark: "rgba(255,255,255,0.20)" },
  "glass.shadow": { light: "rgba(0,0,0,0.08)", dark: "rgba(0,0,0,0.30)" }
};
var focusColors = {
  "focus.halo": { light: "rgba(124,45,185,0.45)", dark: "rgba(171,96,247,0.55)" },
  "focus.halo-on-fill": { light: "rgba(124,45,185,0.55)", dark: "rgba(145,38,217,0.55)" },
  "focus.halo-danger": { light: "rgba(220,38,38,0.50)", dark: "rgba(248,113,113,0.50)" },
  "focus.halo-inverse": { light: "rgba(255,255,255,0.60)", dark: "rgba(255,255,255,0.60)" },
  /** Exists in Figma for the AI hierarchy but currently identical to -on-fill and unused. */
  "focus.halo-ai": { light: "rgba(124,45,185,0.55)", dark: "rgba(171,96,247,0.55)" }
};
var spacing = {
  0: { desktop: 0, mobile: 0 },
  1: { desktop: 2, mobile: 2 },
  2: { desktop: 4, mobile: 4 },
  3: { desktop: 6, mobile: 6 },
  4: { desktop: 8, mobile: 8 },
  5: { desktop: 10, mobile: 10 },
  6: { desktop: 12, mobile: 12 },
  7: { desktop: 14, mobile: 14 },
  8: { desktop: 16, mobile: 16 },
  10: { desktop: 20, mobile: 16 },
  12: { desktop: 24, mobile: 20 },
  16: { desktop: 32, mobile: 24 },
  20: { desktop: 40, mobile: 32 },
  24: { desktop: 48, mobile: 40 },
  32: { desktop: 64, mobile: 56 },
  40: { desktop: 80, mobile: 64 },
  48: { desktop: 96, mobile: 80 }
};
var touchTarget = {
  min: 44,
  comfortable: 48,
  large: 56
};
var radius = {
  none: { desktop: 0, mobile: 0 },
  xs: { desktop: 2, mobile: 4 },
  sm: { desktop: 4, mobile: 6 },
  md: { desktop: 6, mobile: 8 },
  lg: { desktop: 8, mobile: 10 },
  xl: { desktop: 12, mobile: 14 },
  "2xl": { desktop: 16, mobile: 18 },
  "3xl": { desktop: 24, mobile: 28 },
  full: { desktop: 9999, mobile: 9999 }
};
var fontSize = {
  "2xs": { desktop: 10, mobile: 10 },
  xs: { desktop: 11, mobile: 11 },
  sm: { desktop: 12, mobile: 12 },
  md: { desktop: 14, mobile: 14 },
  lg: { desktop: 16, mobile: 16 },
  xl: { desktop: 18, mobile: 16 },
  "2xl": { desktop: 20, mobile: 18 },
  "3xl": { desktop: 24, mobile: 20 },
  "4xl": { desktop: 28, mobile: 24 },
  "5xl": { desktop: 32, mobile: 28 },
  "6xl": { desktop: 48, mobile: 36 },
  "7xl": { desktop: 60, mobile: 44 },
  "8xl": { desktop: 72, mobile: 52 }
};
var lineHeight = {
  "2xs": { desktop: 14, mobile: 14 },
  xs: { desktop: 16, mobile: 16 },
  sm: { desktop: 18, mobile: 18 },
  md: { desktop: 20, mobile: 20 },
  lg: { desktop: 24, mobile: 24 },
  xl: { desktop: 26, mobile: 24 },
  "2xl": { desktop: 28, mobile: 26 },
  "3xl": { desktop: 30, mobile: 28 },
  "4xl": { desktop: 32, mobile: 28 },
  "5xl": { desktop: 36, mobile: 32 },
  "6xl": { desktop: 40, mobile: 36 },
  "7xl": { desktop: 56, mobile: 42 },
  "8xl": { desktop: 68, mobile: 50 },
  "9xl": { desktop: 80, mobile: 58 }
};
var letterSpacing = {
  tighter: { desktop: -2.5, mobile: -1.8 },
  tight: { desktop: -2, mobile: -1.5 },
  snug: { desktop: -1.5, mobile: -1.1 },
  close: { desktop: -0.75, mobile: -0.7 },
  near: { desktop: -0.5, mobile: -0.4 },
  slight: { desktop: -0.25, mobile: -0.2 },
  normal: { desktop: 0, mobile: 0 },
  wide: { desktop: 0.1, mobile: 0.1 },
  wider: { desktop: 0.15, mobile: 0.15 },
  widest: { desktop: 1.2, mobile: 1.2 },
  caps: { desktop: 1.5, mobile: 1.5 }
};
var textStyle = {
  "display-xl": { size: "8xl", line: "9xl", tracking: "tighter", weight: "bold" },
  "display-lg": { size: "7xl", line: "8xl", tracking: "tight", weight: "semibold" },
  "display-md": { size: "6xl", line: "7xl", tracking: "snug", weight: "semibold" },
  "heading-h1": { size: "5xl", line: "6xl", tracking: "close", weight: "semibold" },
  "heading-h2": { size: "4xl", line: "5xl", tracking: "near", weight: "semibold" },
  "heading-h3": { size: "3xl", line: "4xl", tracking: "slight", weight: "semibold" },
  "heading-h4": { size: "2xl", line: "2xl", tracking: "normal", weight: "semibold" },
  "heading-h5": { size: "xl", line: "xl", tracking: "normal", weight: "semibold" },
  "heading-h6": { size: "lg", line: "lg", tracking: "normal", weight: "semibold" },
  "body-xs": { size: "sm", line: "sm", tracking: "normal", weight: "regular" },
  "body-sm": { size: "md", line: "md", tracking: "normal", weight: "regular" },
  "body-md": { size: "lg", line: "lg", tracking: "normal", weight: "regular" },
  "body-lg": { size: "xl", line: "2xl", tracking: "normal", weight: "regular" },
  "body-xl": { size: "2xl", line: "3xl", tracking: "normal", weight: "regular" },
  "body-xs-medium": { size: "sm", line: "sm", tracking: "normal", weight: "medium" },
  "body-sm-medium": { size: "md", line: "md", tracking: "normal", weight: "medium" },
  "body-md-medium": { size: "lg", line: "lg", tracking: "normal", weight: "medium" },
  "body-lg-medium": { size: "xl", line: "2xl", tracking: "normal", weight: "medium" },
  "body-xl-medium": { size: "2xl", line: "3xl", tracking: "normal", weight: "medium" },
  "label-xl": { size: "lg", line: "lg", tracking: "wide", weight: "semibold" },
  "label-lg": { size: "md", line: "md", tracking: "wide", weight: "semibold" },
  "label-md": { size: "sm", line: "xs", tracking: "wide", weight: "semibold" },
  "label-sm": { size: "xs", line: "xs", tracking: "wider", weight: "semibold" },
  "caption-md": { size: "sm", line: "xs", tracking: "normal", weight: "regular" },
  "caption-sm": { size: "xs", line: "xs", tracking: "normal", weight: "regular" },
  "overline-md": { size: "xs", line: "xs", tracking: "widest", weight: "semibold" },
  "overline-sm": { size: "2xs", line: "2xs", tracking: "caps", weight: "semibold" },
  "code-md": { size: "md", line: "md", tracking: "normal", weight: "regular" },
  "code-sm": { size: "sm", line: "sm", tracking: "normal", weight: "regular" }
};
var fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
};
var fontFamily = {
  display: '"Manrope", system-ui, -apple-system, sans-serif',
  body: '"Manrope", system-ui, -apple-system, sans-serif',
  mono: '"Roboto Mono", ui-monospace, "SF Mono", monospace'
};
var opacity = {
  disabled: 0.4,
  muted: 0.6,
  overlay: 0.8,
  hover: 0.08,
  pressed: 0.12
};
var borderWidth = {
  1: 1,
  "1-5": 1.5,
  2: 2,
  3: 3,
  4: 4
};
var motion = {
  duration: {
    instant: 0,
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 500
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    spring: "cubic-bezier(0.5, 1.25, 0.75, 1.25)"
  }
};
var elevation = {
  0: { light: "none", dark: "none" },
  1: {
    light: "0px 1px 2px 0px rgba(0,0,0,0.05)",
    dark: "0px 1px 2px 0px rgba(0,0,0,0.5)"
  },
  2: {
    light: "0px 2px 4px 0px rgba(0,0,0,0.08)",
    dark: "0px 2px 4px 0px rgba(0,0,0,0.6)"
  },
  3: {
    light: "0px 4px 8px 0px rgba(0,0,0,0.10)",
    dark: "0px 4px 8px 0px rgba(0,0,0,0.7)"
  },
  4: {
    light: "0px 8px 16px 0px rgba(0,0,0,0.12)",
    dark: "0px 8px 16px 0px rgba(0,0,0,0.75)"
  },
  5: {
    light: "0px 12px 24px 0px rgba(0,0,0,0.14)",
    dark: "0px 12px 24px 0px rgba(0,0,0,0.8)"
  },
  6: {
    light: "0px 16px 32px 0px rgba(0,0,0,0.16)",
    dark: "0px 16px 32px 0px rgba(0,0,0,0.85)"
  },
  inner: {
    light: "inset 0px 1px 2px 0px rgba(0,0,0,0.06)",
    dark: "inset 0px 1px 2px 0px rgba(0,0,0,0.4)"
  }
};
var zIndex = {
  base: 0,
  sticky: 10,
  dropdown: 1e3,
  overlay: 1100,
  sheet: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  notification: 1600,
  max: 9999
};
var safeArea = {
  top: 44,
  bottom: 34,
  left: 0,
  right: 0
};
var inset = {
  statusBar: 24,
  navBar: 48,
  keyboard: 0
};
var breakpoint = {
  mobile: 0,
  desktop: 768
  // px
};
var tokens = {
  primitives,
  semanticColors,
  componentColors,
  glassColors,
  focusColors,
  spacing,
  radius,
  fontSize,
  lineHeight,
  fontWeight,
  fontFamily,
  opacity,
  borderWidth,
  motion,
  elevation,
  zIndex,
  safeArea,
  inset,
  touchTarget,
  breakpoint
};
export {
  Alert,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonGroupSegment,
  Checkbox,
  Code,
  ColorPicker2 as ColorPicker,
  DeltaChip,
  Divider,
  Dot,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  FieldShell,
  IconBase,
  IconButton,
  dist_exports as Icons,
  InlineCta,
  InlineMessage,
  Input,
  Kbd,
  Link,
  LoadingState,
  MultiSelect,
  NavItem,
  NumberInput,
  Pagination,
  ProgressBar,
  ProgressRing,
  Radio,
  Search,
  Select,
  SidebarItem,
  Skeleton,
  SkeletonLayout,
  Slider,
  Snackbar,
  Spinner2 as Spinner,
  StateView,
  StatusBlock,
  Tab,
  Tabs,
  Tag,
  Textarea,
  Toast,
  Toggle,
  Tooltip2 as Tooltip,
  TooltipProvider2 as TooltipProvider,
  alertVariants,
  avatarVariants,
  badgeVariants,
  bannerVariants,
  black,
  blue,
  borderWidth,
  breakpoint,
  buttonGroupSegmentVariants,
  buttonVariants,
  cn,
  codeVariants,
  componentColors,
  controlChrome,
  controlClass,
  deltaChipVariants,
  dividerVariants,
  dotVariants,
  elevation,
  fieldLabelClass,
  fieldRowGap,
  focusColors,
  fontFamily,
  fontSize,
  fontWeight,
  glassColors,
  gray,
  green,
  iconButtonVariants,
  iconClass,
  inlineCtaVariants,
  inlineMessageVariants,
  inset,
  kbdVariants,
  letterSpacing,
  lineHeight,
  linkVariants,
  loadingStateVariants,
  motion,
  navItemSurface,
  opacity,
  orange,
  paginationRange,
  primitives,
  radius,
  red,
  safeArea,
  semanticColors,
  skeletonVariants,
  snackbarVariants,
  spacing,
  spinnerVariants,
  statePresets,
  statusBlockVariants,
  tagVariants,
  textStyle,
  tokens,
  touchTarget,
  valueClass,
  violet,
  white,
  yellow,
  zIndex
};
//# sourceMappingURL=index.js.map