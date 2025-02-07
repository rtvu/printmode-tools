export class DefaultMap<K, V> extends Map<K, V> {
  defaultFactory: () => V;

  constructor(defaultFactory: () => V) {
    super();

    this.defaultFactory = defaultFactory;
  }

  override get(key: K): V {
    if (this.has(key)) {
      return super.get(key)!;
    } else {
      const value = this.defaultFactory();
      this.set(key, value);

      return value;
    }
  }
}

export default DefaultMap;
