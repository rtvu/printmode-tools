export class DefaultMap<K, V> extends Map<K, V> {
  private defaultFactory: () => V;

  constructor(defaultFactory: () => V) {
    super();

    this.defaultFactory = defaultFactory;
  }

  override get(key: K): V {
    let value = super.get(key);

    if (value !== undefined) {
      return value;
    } else {
      value = this.defaultFactory();
      this.set(key, value);

      return value;
    }
  }
}
