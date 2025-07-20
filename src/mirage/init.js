export function startMirageIfNeeded() {
  if (process.env.NODE_ENV === 'development') {
    const { makeServer } = require('./server');
    makeServer();
  }
}
