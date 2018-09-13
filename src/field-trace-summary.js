const R = require('ramda')

const fieldTraceSummary = trace => {
  if (!trace || R.isEmpty(trace)) {
    return 'No trace data'
  }

  try {
    return R.pipe(
      R.pathOr([], ['execution', 'resolvers']),
      R.filter(R.propEq('parentType', 'RootQuery')),
      R.map(resolverFieldSummary),
      R.prepend(`Total Duration (ms): ${milliseconds(trace.duration)}`),
      R.join(' | ')
    )(trace)
  } catch (err) {
    return `Error getting trace summary: ${err.message}`
  }
}

const milliseconds = R.divide(R.__, 1000000)

const resolverFieldSummary = ({ fieldName, returnType, duration }) =>
  `Field: ${fieldName} - ReturnType: ${returnType} - Duration (ms): ${milliseconds(
    duration
  )}`

module.exports = fieldTraceSummary
