import { Observable } from 'rxjs';

let typeCache: { [label: string]: boolean } = {};

type Predicate = (oldValues: Array<any>, newValues: Array<any>) => boolean;

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels are unique.
 *
 * @param label
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

/**
 * Runs through every condition, compares new and old values and returns true/false depends on condition state.
 * This is used to distinct if two observable values have changed.
 *
 * @param oldValues
 * @param newValues
 * @param conditions
 */
export function distinctChanges(oldValues: Array<any>, newValues: Array<any>, conditions: Predicate[]): boolean {
  if (conditions.every((cond) => cond(oldValues, newValues))) return false;
  return true;
}

/**
 * Returns true if the given value is type of Object
 *
 * @param val
 */
export function isObject(val: any) {
  if (val === null) return false;

  return typeof val === 'function' || typeof val === 'object';
}

/**
 * Returns true if the given value is type of Array
 *
 * @param val
 */
export function isArray(a: any) {
  return Array.isArray(a);
}

/**
 * Returns true if the given value is type of string
 *
 * @param val
 */
export function isString(x: any): x is string {
  return typeof x === 'string';
}

/**
 * Returns converted string (from snake to camel)
 *
 * @param val
 */
function toCamel(s: any) {
  return s.replace(/([-_][a-z0-9])/gi, ($1: any) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

/**
 * Returns converted string (from snake to camel)
 *
 * @param val
 */
function toSnake(s: any) {
  return s.replace(/[A-Z]/g, (letter: any) => {
    return `_${letter.toLowerCase()}`;
  });
}

/**
 * Capitalizes the first character in given string
 *
 * @param s
 */
export function capitalize(s: string) {
  if (!s || typeof s !== 'string') return s;
  return s && s[0].toUpperCase() + s.slice(1);
}

/**
 * Uncapitalizes the first character in given string
 *
 * @param s
 */
export function uncapitalize(s: string) {
  if (!s || typeof s !== 'string') return s;
  return s && s[0].toLowerCase() + s.slice(1);
}


/**
 * Returns formated date based on given culture
 *
 * @param dateString
 * @param culture
 */
export function localeDateString(dateString: string, culture: string = 'en-EN'): string {
  let date = new Date(dateString);
  return date.toLocaleDateString(culture);
}

export function extractContent(content: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!content) {
      observer.next('');
      observer.complete();
    } else if (content instanceof Blob) {
      let reader = new FileReader();
      reader.onload = function () {
        observer.next(this.result);
        observer.complete();
      };
      reader.readAsText(content);
    } else {
      if (typeof content === 'string') {
        observer.next(JSON.stringify({ message: content }));
        observer.complete();
      } else if (typeof content === 'object') {
        observer.next(JSON.stringify(content));
        observer.complete();
      }
    }
  });
}
