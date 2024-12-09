# Porting from React.js to React.ts

This document's intent is to document my process of porting the Umbrella Today app from JS to TS for my own personal reference but I hope this may help others who stumble upon this.

## Javascript vs Typescript

Javascript is an easy-to-use language that is simple to pick up and extremely flexible to code with. However, the looseness of the language, especially when it comes to Type Strictness, can result in JS scripts/programs that are very error-prone or confusing to read due to the potential for a variable's or function's type to change "as and when".
Typescript, a language built upon Javascript and transpiles back to Javascript, introduces static typing and supports files containing Type definitions, allowing variables' types to be inferred and enforced, discouraging the alteration of types.
