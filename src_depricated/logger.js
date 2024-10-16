const isDebugEnabled = process.env.REACT_APP_DEBUG === 'true';

export const logDebug = (message, ...optionalParams) => {
  if (isDebugEnabled) {
    console.log(message, ...optionalParams);
  }
};
