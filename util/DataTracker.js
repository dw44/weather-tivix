class DataTracker {
  constructor() {
    this.data = [];
    this.insert.bind(this);
    this.showMax.bind(this);
    this.showMin.bind(this);
    this.showMean.bind(this);
    this.showMode.bind(this);
  }

  get data() {
    return [...this.data];
  }

  insert = (value) => {
    this.data.push(value);
  }

  /*
    For the sake of consistency, any mathematical methods
    on an empty "data" field return null
  */

  showMax = () => (this.data.length ? Math.max(...this.data) : null)

  showMin = () => (this.data.length ? Math.min(...this.data) : null)

  showMean = () => (this.data.length
    ? Math.floor(this.data.reduce((a, b) => a + b, 0) / this.data.length)
    : null)

  showMode = () => {
    if (!this.data.length) {
      return null;
    }

    // save how many times each value occurs in 'data'
    const occurences = {};

    // populate occurences
    this.data.forEach((value) => {
      if (occurences[value]) {
        occurences[value] += 1;
      } else {
        occurences[value] = 1;
      }
    });

    // mode = first value in array of keys of occurences sorted by
    // descending order of corresponding value
    return Number(Object.keys(occurences).sort((a, b) => occurences[b] - occurences[a])[0]);
  }
}

export default DataTracker;
