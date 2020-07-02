export const resolveWithTimeout = (response) => {
    const isTestingEnv: boolean = Boolean(process.env.JEST_WORKER_ID)
    if (isTestingEnv) {
        return new Promise((resolve) => resolve(response))
    }

    else {
        return new Promise(resolve => setTimeout(() => resolve(response), 2000))
    }
}
