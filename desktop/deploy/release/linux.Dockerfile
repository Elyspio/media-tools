FROM electronuserland/builder:22

ARG PNPM_VERSION=10.32.1
WORKDIR /project/desktop

RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=secret,id=github_token \
    export GITHUB_TOKEN=$(cat /run/secrets/github_token) && \
    pnpm install --frozen-lockfile

COPY . .

RUN node ./node_modules/electron-builder/cli.js install-app-deps

CMD ["./node_modules/.bin/tsx", "./scripts/build/build-release-linux-container.ts"]
