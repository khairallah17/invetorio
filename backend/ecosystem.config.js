MediaSourceHandle.exports = {
    apps: [
        {
            name: "inventorio",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
                ENV_VAR: "environment-variable"
            }
        }
    ]
}