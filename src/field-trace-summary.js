const R = require('ramda')

const fieldTraceSummary = trace => {
  if (!trace || R.isEmpty(trace)) {
    return 'No trace data'
  }

  try {
    const { duration, execution: { resolvers } } = trace
    return R.pipe(
      R.defaultTo([]),
      R.filter(R.propEq('parentType', 'RootQuery')),
      R.map(resolverFieldSummary),
      R.prepend(`Total Duration (ms): ${milliseconds(duration)}`),
      R.join(' | ')
    )(resolvers)
  } catch (err) {
    return `Error getting trace summary: ${err.message}`
  }
}

export const milliseconds = R.divide(R.__, 1000000)

const resolverFieldSummary = ({ fieldName, returnType, duration }) =>
  `Field: ${fieldName} - ReturnType: ${returnType} - Duration (ms): ${milliseconds(
    duration
  )}`

module.exports = fieldTraceSummary
