import pluralize from 'pluralize'
import { camelCase, pascalCase, snakeCase } from 'change-case'

export const toPlural = (str: string) => pluralize(str)
export const ucFirst = (str: string, plural = false) => {
  const ucf = `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  if (plural) return pluralize(ucf)
  return ucf
}

export const toUppercase = (str: string, plural = false) => {
  if (plural) return pluralize(str.toUpperCase())
  return str.toUpperCase()
}

export const toLowercase = (str: string, plural = false) => {
  if (plural) return pluralize(str.toLowerCase())
  return str.toLowerCase()
}

export const toKebabCase = (str: string, plural = false) => {
  const matched = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  if (!matched) return str
  
  const kebab = matched
    .map(x => x.toLowerCase())
    .join('-');

  if (plural) return pluralize(kebab)
  return kebab
}

export const toCamelCase = (str: string, plural = false) => {
  if (plural) return camelCase(pluralize(str));
  return camelCase(str);
}

export const toPascalCase = (str: string, plural = false) => {
  if (plural) return pascalCase(pluralize(str));
  return pascalCase(str);
}

export const toSnakeCase = (str: string, plural = false) => {
  if (plural) return snakeCase(pluralize(str));
  return snakeCase(str);
}
