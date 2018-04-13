const testsContext = (require as any).context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
