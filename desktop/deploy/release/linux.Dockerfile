FROM electronuserland/builder:22

WORKDIR /project/desktop

COPY package.json yarn.lock .npmrc ./

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=secret,id=github_token \
    export GITHUB_TOKEN=$(cat /run/secrets/github_token) && \
    yarn install --frozen-lockfile

COPY . .

RUN node ./node_modules/electron-builder/cli.js install-app-deps

CMD ["./node_modules/.bin/tsx", "./scripts/build/build-release-linux-container.ts"]
